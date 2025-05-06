"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


import {
  FiHome,
  FiUser,
  FiSettings,
  FiFileText,
  FiTool,
  FiDollarSign,
  FiChevronRight,
} from "react-icons/fi";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <FiHome />, href: "/" },
  { label: "Customer", icon: <FiUser />, href: "/customers" },
  { label: "Services", icon: <FiTool />, href: "/services" },
  { label: "Accounts", icon: <FiDollarSign />, href: "/accounts" },
  { label: "Reports", icon: <FiFileText />, href: "/reports" },
  { label: "Quotations", icon: <FiFileText />, href: "/quotations" },
  { label: "Settings", icon: <FiSettings />, href: "/settings" },
];

const Sidebar = () => {
  
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex flex-col w-64 h-screen p-6 space-y-6 fixed overflow-y-auto">
      <ul className="space-y-2">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href;

          return (
            <li
              key={idx}
              className="group relative"
            >
              <Link
                href={item.href || "#"}
                className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors cursor-pointer 
                  ${isActive ? "bg-card font-medium border-l-[2px] border-primary" : "hover-bg"}`}
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </span>
                {item.children && (
                  <FiChevronRight className={`transition-transform group-hover:rotate-90 ${isActive ? "text-primary" : ""}`} />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
