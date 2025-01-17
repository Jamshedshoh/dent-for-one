import { ShoppingCart, Search, User, Heart } from "lucide-react";

// Navbar Component
export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          <a href="/">Dent</a>
        </div>
        <div className="space-x-6 flex items-center">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/shop" className="text-gray-700 hover:text-blue-600">
            Shop
          </a>
          <a href="/community" className="text-gray-700 hover:text-blue-600">
            Community
          </a>
          <a href="/blog" className="text-gray-700 hover:text-blue-600">
            Blog
          </a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-blue-600">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600">
              <User className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
