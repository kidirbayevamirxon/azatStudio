// contexts/DataContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { axiosInstance } from "../api/api";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  role: string;
  specialties: string; 
  telegram: string;
}
export interface Project {
  id: number;
  title: string;
  thumbnail: string;
  embed_url: string;
  description: string;
  duration: number;
  created_at: string;
  location?: string;
  video_id: string;
  url: string;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  duration_hours: number;
}

type CreateProjectPayload = {
  url: string;
};

type UpdateProjectPayload = {
  title: string;
  thumbnail: string;
  duration: number;
};

interface DataContextType {
  teamMembers: TeamMember[];
  projects: Project[];
  services: Service[];
  loading: boolean;
  error: string | null;

  addTeamMember: (member: Omit<TeamMember, "id">) => Promise<void>;
  updateTeamMember: (
    id: string,
    member: Omit<TeamMember, "id">,
  ) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  addProject: (project: CreateProjectPayload) => Promise<void>;
  updateProject: (id: string, project: UpdateProjectPayload) => Promise<void>; // <-- bu o‘zgardi
  deleteProject: (id: string) => Promise<void>;

  addService: (service: Omit<Service, "id">) => Promise<void>;
  updateService: (id: string, service: Omit<Service, "id">) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [teamRes, projectsRes, servicesRes] = await Promise.all([
        axiosInstance.get("/team/"),
        axiosInstance.get("/yt/"),
        axiosInstance.get("/services/"),
      ]);
      const extractData = (response: any): any[] => {
        if (Array.isArray(response)) return response;
        if (response?.data && Array.isArray(response.data))
          return response.data;
        if (response?.items && Array.isArray(response.items))
          return response.items;
        return [];
      };

      const teamData = extractData(teamRes.data);
      const projectsData = extractData(projectsRes.data);
      const servicesData = extractData(servicesRes.data);

      setTeamMembers(teamData);
      setProjects(projectsData);
      setServices(servicesData);
    } catch (err: any) {
      console.error("API Error Details:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load data from server",
      );
      setTeamMembers([]);
      setProjects([]);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const addTeamMember = async (member: Omit<TeamMember, "id">) => {
    try {
      const response = await axiosInstance.post("/team/", member);
      setTeamMembers((prev) => [...prev, response.data]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add team member");
      throw err;
    }
  };

  const updateTeamMember = async (
    id: string,
    member: Omit<TeamMember, "id">,
  ) => {
    try {
      const response = await axiosInstance.patch(`/team/${id}`, member);
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === id ? response.data : m)),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update team member");
      throw err;
    }
  };

  const deleteTeamMember = async (id: string) => {
    try {
      await axiosInstance.delete(`/team/${id}`);
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete team member");
      throw err;
    }
  };
  function getVideoIdUrl(url: string): string {
    try {
      const parsed = new URL(url);
      const videoId = parsed.searchParams.get("v");
      if (!videoId) return url;
      return `https://www.youtube.com/watch?v=${videoId}`;
    } catch {
      return url;
    }
  }
  const addProject = async ({ url }: { url: string }) => {
    const cleanUrl = getVideoIdUrl(url);
    const response = await axiosInstance.post(
      `/yt/?url=${encodeURIComponent(cleanUrl)}`,
    );
    setProjects((prev) => [...prev, response.data]);
  };

  const updateProject = async (
    video_id: string,
    payload: UpdateProjectPayload,
  ) => {
    try {
      const response = await axiosInstance.patch(`/yt/${video_id}`, payload);
      const updatedProject = response.data;
      setProjects((prev) =>
        prev.map((p) => (p.video_id === video_id ? updatedProject : p)),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update project");
      throw err;
    }
  };
  const deleteProject = async (video_id: string) => {
    try {
      await axiosInstance.delete(`/yt/${video_id}`);
      setProjects((prev) => prev.filter((p) => p.video_id !== video_id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete project");
      throw err;
    }
  };
  const addService = async (service: Omit<Service, "id">) => {
    try {
      const response = await axiosInstance.post("/services/", service);
      setServices((prev) => [...prev, response.data]);
      await refreshData();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add service");
      throw err;
    }
  };

  const updateService = async (id: string, service: Omit<Service, "id">) => {
    try {
      const response = await axiosInstance.patch(`/services/${id}`, service);
      setServices((prev) => prev.map((s) => (s.id === id ? response.data : s)));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update service");
      throw err;
    }
  };

  const deleteService = async (id: string) => {
    try {
      await axiosInstance.delete(`/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete service");
      throw err;
    }
  };

  return (
    <DataContext.Provider
      value={{
        teamMembers,
        projects,
        services,
        loading,
        error,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
}
