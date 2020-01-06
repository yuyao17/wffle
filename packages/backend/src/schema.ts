import {
  makeSchema,
  objectType,
  fieldAuthorizePlugin,
  stringArg,
  queryType,
  mutationType,
  subscriptionField,
} from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { hash, compare } from 'bcryptjs';
import { pubsub } from './index';

const USER_ADDED = 'USER_ADDED';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.password();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.users();
    t.list.field('filterUser', {
      type: 'User',
      args: {
        nameContains: stringArg(),
      },
      resolve: (_, { nameContains }, ctx) => {
        return ctx.photon.users.findMany({
          where: {
            name: {
              contains: nameContains,
            },
          },
        });
      },
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.deleteManyUser();

    t.field('changePassword', {
      type: 'User',
      args: {
        email: stringArg({ nullable: false }),
        currentPassword: stringArg({ nullable: false }),
        newPassword: stringArg({ nullable: false }),
      },
      resolve: async (_, { currentPassword, newPassword, email }, ctx) => {
        const user = await ctx.photon.users.findOne({
          where: { email },
        });
        if (!user) {
          throw Error('User not found');
        }
        const valid = await compare(currentPassword, user.password);

        if (!valid) {
          throw Error('Passwords do not match');
        }

        const newHashedPass = await hash(newPassword, 10);

        return ctx.photon.users.update({
          where: {
            id: user.id,
          },
          data: {
            password: newHashedPass,
          },
        });
      },
    });
    t.field('createUser', {
      type: 'User',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_, { email, password }, ctx) => {
        const hashedPass = await hash(password, 10);
        const user = await ctx.photon.users.create({
          data: { email, password: hashedPass },
        });
        pubsub.publish(USER_ADDED, user);
        return user;
      },
    });
  },
});

const userAdded = subscriptionField('userAdded', {
  type: 'User',
  subscribe: () => {
    return pubsub.asyncIterator([USER_ADDED]);
  },
  resolve: payload => {
    return payload;
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, userAdded, User],
  plugins: [nexusPrismaPlugin(), fieldAuthorizePlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
