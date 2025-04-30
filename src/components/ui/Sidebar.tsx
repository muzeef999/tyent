// src/components/Sidebar.tsx
'use client';
import Link from 'next/link';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // Type annotation for state

  const toggleSidebar = (): void => setIsOpen(!isOpen); // Type annotation for the function

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 flex lg:hidden z-40 ${isOpen ? 'bg-black bg-opacity-50' : ''}`}>
        <div
          className={`transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-primary dark:bg-darkPrimary h-full`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleSidebar} className="text-white">
              &times;
            </button>
          </div>
          <ul className="text-white p-4 space-y-4">
            <li><Link href="/" className="hover:text-secondary">Dashboard</Link></li>
            <li><Link href="/settings" className="hover:text-secondary">Settings</Link></li>
            <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
          </ul>
        </div>
        {isOpen && (
          <div className="flex-1" onClick={toggleSidebar}></div>
        )}
      </div>
    
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-primary dark:bg-darkPrimary h-full">
        <div className="p-6 text-white">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </div>
        <ul className="space-y-4 text-white p-6">
          <li><Link href="/" className="hover:text-secondary">Dashboard</Link></li>
          <li><Link href="/settings" className="hover:text-secondary">Settings</Link></li>
          <li><Link href="/profile" className="hover:text-secondary">Profile</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
