import { makeSchema, objectType, fieldAuthorizePlugin, stringArg } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { hash, compare } from 'bcryptjs';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.name();
    t.model.password();
  },
});

const Query = objectType({
  name: 'Query',
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

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
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

        return ctx.photon.users.create({
          data: { email, password: hashedPass },
        });
      },
    });
  },
});

export const schema = makeSchema({
  types: [Query, Mutation, User],
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
