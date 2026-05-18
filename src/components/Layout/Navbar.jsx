import React from 'react';
import { Menu, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-10 relative">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 hover:text-gray-700">
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Hoş Geldiniz</h2>
      </div>
      <div className="flex items-center gap-3">
        <UserCircle size={32} className="text-gray-400" />
      </div>
    </header>
  );
};

export default Navbar;
