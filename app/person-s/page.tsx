// pages/person-s/page.tsx
'use server';

import { Person } from '../models/person'; // Adjust the import path as necessary

const PeoplePage = async () => {
  const apiHostname = process.env.NEXT_PUBLIC_API_HOSTNAME; // This will work if used in getServerSideProps or API routes
  const bearerToken = process.env.API_BEARER_TOKEN; // Ensure this is set in your .env (not .env.local since it's a server component)

  // Fetch people data
  const response = await fetch(`https://87vt6n099c.execute-api.us-east-1.amazonaws.com/default/dbdemofunction`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.error('Failed to fetch people');
    return <div>Failed to load data.</div>;
  }

  const people: Person[] = await response.json();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">People</h1>
      <table className="table-auto w-full">
        <thead className="text-left">
          <tr>
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={index} className="odd:bg-gray-100">
              <td className="p-2">{person.firstName}</td>
              <td className="p-2">{person.lastName}</td>
              <td className="p-2">{person.phone}</td>
              <td className="p-2">{person.dob}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeoplePage;
