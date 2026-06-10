import { Navigate, Outlet, Link, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import {
  LogOut,
  Users,
  Briefcase,
  FolderOpen,
  LayoutDashboard,
} from "lucide-react";

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  const navItems = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Boshqaruv paneli" },
    { path: "/admin/team", icon: Users, label: "Jamoa" },
    { path: "/admin/projects", icon: FolderOpen, label: "Loyihalar" },
    { path: "/admin/services", icon: Briefcase, label: "Xizmatlar" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">Azat Studio Admin</h1>
              <nav className="hidden md:flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                      location.pathname === item.path
                        ? "bg-pink-100 text-pink-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                Saytni ko‘rish
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut size={16} className="mr-2" />
                Chiqish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}