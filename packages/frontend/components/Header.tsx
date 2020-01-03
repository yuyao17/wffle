import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { AllUserQuery } from '../gen-types';

const ALL_USER = gql`
  query ALL_USER {
    users {
      email
      id
    }
  }
`;

const links = [
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' },
  { href: 'https://nextjs.org/docs', label: 'Docs' },
];

export default function Nav() {
  const { data, loading } = useQuery<AllUserQuery>(ALL_USER);
  if (loading) return <div>Loading..</div>;

  return (
    <nav>
      <ul className="flex items-center p-8 justify-between">
        {data.users.map(user => (
          <div key={user.id}>
            <h1>{user.email}</h1>
          </div>
        ))}
        <li>
          <Link href="/about">
            <a className="text-blue-500 no-underline">About</a>
          </Link>
        </li>
        <ul className="flex justify-between items-center">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`} className="ml-4">
              <a href={href} className="btn-blue no-underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}
