"use client"
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='container mx-auto p-4'>
      <nav className='bg-gray-800 p-4 rounded-lg shadow-md'>
        <ul className='flex space-x-4'>
          <li>
            <Link href="/" className='text-white hover:text-gray-300'>Home</Link>
          </li>
          <li>
            <Link href="/role" className='text-white hover:text-gray-300'>Roles</Link>
          </li>
          <li>
            <Link href="/permission" className='text-white hover:text-gray-300'>Permissions</Link>
          </li>
          <li>
            <Link href="/user" className='text-white hover:text-gray-300'>Users</Link>
          </li>
        </ul>
      </nav>
      <h1 className='text-3xl font-bold mt-6'>Welcome to the Home Page</h1>
    </div>
  );
}