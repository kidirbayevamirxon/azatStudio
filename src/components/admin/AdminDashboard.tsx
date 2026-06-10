// components/admin/AdminDashboard.tsx
import { useData } from "../../contexts/DataContext";
import { Card } from "../ui/card";
import { Users, FolderOpen, Briefcase, TrendingUp } from "lucide-react";

export function AdminDashboard() {
  const { teamMembers, projects, services, loading, error, refreshData } =
    useData();
  const safeTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];
  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeServices = Array.isArray(services) ? services : [];

  const stats = [
    {
      label: "Jamoa a’zolari",
      value: safeTeamMembers.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Loyihalar",
      value: safeProjects.length,
      icon: FolderOpen,
      color: "bg-purple-500",
    },
    {
      label: "Xizmatlar",
      value: safeServices.length,
      icon: Briefcase,
      color: "bg-pink-500",
    },
    {
      label: "Umumiy ko‘rishlar",
      value: "12.5K",
      icon: TrendingUp,
      color: "bg-green-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Dashboard ma’lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Qayta urinib ko‘rish
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Boshqaruv paneli</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">So‘nggi loyihalar</h3>
          <div className="space-y-3">
            {safeProjects.length > 0 ? (
              safeProjects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded"
                >
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/64x64?text=No+Image";
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(project.created_at).toLocaleDateString(
                        "uz-UZ",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Hozircha loyihalar yo‘q
              </p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Jamoa ko‘rinishi</h3>
          <div className="space-y-3">
            {safeTeamMembers.length > 0 ? (
              safeTeamMembers.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded"
                >
                  <div className="flex-1">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                Hozircha jamoa a’zolari yo‘q
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}