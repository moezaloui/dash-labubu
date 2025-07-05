import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

function Header({ toggleSidebar }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Menu Mobile */}
        <button onClick={toggleSidebar} className="md:hidden">
          <Menu size={24} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          <Link to="/" className="hover:underline">
            FOREVER<span className="text-pink-500">.</span>
          </Link>
        </h1>
        <p className="text-sm text-gray-500 uppercase tracking-wider pt-1 hidden sm:block">
          Admin Panel
        </p>
      </div>

      <button className="bg-black text-white font-bold py-2 px-4 rounded-full">
        Logout
      </button>
    </header>
  );
}

export default Header;
