import React from 'react';
import {
  X,
} from 'lucide-react'; // Icons from lucide-react

export type SidebarProps = {
  title: string;
  isOpen: boolean;
  toggleSidebar: () => void;
  children?: React.ReactNode;
};

export const Sidebar = ({
  title,
  isOpen,
  toggleSidebar,
  children,
}: SidebarProps) => (
  <div
    className={`fixed inset-0 z-40 md:z-50 transition-all duration-300 ${isOpen ? 'bg-gray-900 bg-opacity-50' : 'bg-transparent'}`}
  >
    <div
      className={`md:w-64 w-full md:relative h-full transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex flex-col bg-white shadow-lg`}
    >
      <div className="flex justify-between items-center p-4 md:p-6">
        <div className="text-xl font-bold text-blue-600">{title}</div>
        <button onClick={toggleSidebar} className="md:hidden">
          <X className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {children}
    </div>
  </div>
);
