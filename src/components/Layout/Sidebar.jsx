import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Target, BookOpenText } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Hedef Listesi', path: '/goals', icon: <Target size={20} /> },
    { name: 'Başarı Hikayeleri', path: '/stories', icon: <BookOpenText size={20} /> }
  ];

  return (
    <aside className="w-64 bg-[#0A97D9] text-white hidden md:flex flex-col shadow-lg h-full">
      <div className="h-16 flex items-center justify-center border-b border-white/20">
        <h1 className="text-xl font-bold tracking-wider"> Sürdürülebilir Kalkınma Hedefleri Portalı</h1>
      </div>
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-white text-[#0A97D9] font-semibold' : 'hover:bg-white/10'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
