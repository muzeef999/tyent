'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  FiHome, FiUser, FiSettings, FiFileText, FiTool, FiDollarSign, FiChevronRight,
} from 'react-icons/fi';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <FiHome />,
    children: [
      { label: 'Admin Dashboard', href: '/dashboard/admin', icon: <></> },
      { label: 'Technician Dashboard', href: '/dashboard/technician', icon: <></> },
    ],
  },
  {
    label: 'Customer',
    icon: <FiUser />,
    children: [
      { label: 'Customer Registration', href: '/customers/register', icon: <></> },
      { label: 'Customer List', href: '/customers/list', icon: <></> },
      { label: 'Service History', href: '/customers/history', icon: <></> },
    ],
  },
  {
    label: 'Services',
    icon: <FiTool />,
    children: [
      { label: 'Create New Service', href: '/services/create', icon: <></> },
      { label: 'Upcoming Services', href: '/services/upcoming', icon: <></> },
      { label: 'Service Types', href: '/services/types', icon: <></> },
    ],
  },
  {
    label: 'Accounts',
    icon: <FiDollarSign />,
    children: [
      { label: 'Expenses', href: '/accounts/expenses', icon: <></> },
      { label: 'Payments Received/Pending', href: '/accounts/payments', icon: <></> },
      { label: 'Payment Mode', href: '/accounts/mode', icon: <></> },
    ],
  },
  {
    label: 'Reports',
    icon: <FiFileText />,
    children: [
      { label: 'Graph Reports', href: '/reports/graph', icon: <></> },
      { label: 'Shared Reports', href: '/reports/shared', icon: <></> },
    ],
  },
  {
    label: 'Quotations',
    icon: <FiFileText />,
    href: '/quotations',
  },
  {
    label: 'Settings',
    icon: <FiSettings />,
    children: [
      { label: 'User Access', href: '/settings/users', icon: <></> },
      { label: 'Notifications', href: '/settings/notifications', icon: <></> },
      { label: 'Geo Tagging', href: '/settings/geotagging', icon: <></> },
      { label: 'OTP Configuration', href: '/settings/otp', icon: <></> },
    ],
  },
];

const Sidebar = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="hidden lg:flex flex-col w-64  h-screen p-6 space-y-6 fixed overflow-y-auto">
      
        <ul className="space-y-2">
        {navItems.map((item, idx) => (
          <li key={idx}
              className="group relative"
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-secondary transition-colors cursor-pointer">
              <span className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </span>
              {item.children && <FiChevronRight className="transition-transform group-hover:rotate-90" />}
            </div>
            {item.children && hovered === item.label && (
              <ul className="pl-10 mt-1 space-y-1">
                {item.children.map((child, i) => (
                  <li key={i}>
                    <Link
                      href={child.href || '#'}
                      className="block text-sm hover:text-secondary transition-colors"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
