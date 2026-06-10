import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../../public/image.png";
export function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Bosh sahifa" },
    { path: "/about", label: "Biz haqimizda" },
    { path: "/services", label: "Xizmatlar" },
    { path: "/team", label: "Jamoa" },
    { path: "/projects", label: "Loyihalar" },
    { path: "/contact", label: "Bog‘lanish" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-semibold text-gray-900"
          >
            <img src={logo} alt="Azat Studio" className="h-10 w-auto" />
            <span>Azat Studio</span>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
            >
              Admin
            </Link>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="block px-3 py-2 mt-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}