import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/" className="text-lg hover:text-blue-300 transition-colors duration-200">
              Home
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/dashboard" className="text-lg hover:text-blue-300 transition-colors duration-200">
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/settings" className="text-lg hover:text-blue-300 transition-colors duration-200">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;