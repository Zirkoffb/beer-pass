
import React from 'react';
import { HomeIcon, SearchIcon, MailIcon, SettingsIcon } from '../constants';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive }) => {
  const baseClasses = "flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ease-in-out";
  const activeClasses = "bg-violet-600 text-white shadow-md";
  const inactiveClasses = "text-slate-500 hover:bg-violet-100 hover:text-violet-600";
  
  return (
    <button className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      {isActive && <span className="font-semibold">{label}</span>}
    </button>
  );
};

interface NavigationBarProps {
  activeItem: 'Home' | 'Search' | 'Message' | 'Setting';
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ activeItem }) => {
  const items = [
    { label: 'Home', icon: <HomeIcon className="w-6 h-6" /> },
    { label: 'Search', icon: <SearchIcon className="w-6 h-6" /> },
    { label: 'Message', icon: <MailIcon className="w-6 h-6" /> },
    { label: 'Setting', icon: <SettingsIcon className="w-6 h-6" /> },
  ];

  return (
    <nav className="bg-white p-2 rounded-full shadow-lg border border-slate-100 w-full max-w-sm mx-auto">
      <div className="flex justify-around items-center">
        {items.map(item => (
          <NavItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            isActive={activeItem === item.label}
          />
        ))}
      </div>
    </nav>
  );
};
