"use client"
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className='container'>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/role">Roles</Link>
          </li>
          <li>
            <Link href="/permission">Permissions</Link>
          </li>
          <li>
            <Link href="/user">Users</Link>
          </li>
        </ul>
      </nav>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}