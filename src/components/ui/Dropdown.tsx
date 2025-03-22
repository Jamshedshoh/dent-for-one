import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Dropdown = ({ title = "Untitled", children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="text-gray-700 hover:text-blue-600 font-medium flex items-center"
      >
        <span className="mr-2">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-700" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-700" />
        )}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-5 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          {children}
        </div>
      )}
    </div>
  );
};
