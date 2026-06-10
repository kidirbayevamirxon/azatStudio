// routes.tsx
import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { AboutUs } from "./components/AboutUs";
import { Services } from "./components/Services";
import { Team } from "./components/Team";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminTeam } from "./components/admin/AdminTeam";
import { AdminProjects } from "./components/admin/AdminProjects";
import { AdminServices } from "./components/admin/AdminServices";

function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-4">There was an error loading this page.</p>
        <button
          onClick={() => window.location.href = "/"}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: AboutUs },
      { path: "services", Component: Services },
      { path: "team", Component: Team },
      { path: "projects", Component: Projects },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "team", Component: AdminTeam },
      { path: "projects", Component: AdminProjects },
      { path: "services", Component: AdminServices },
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },
]);