// components/admin/AdminProjects.tsx
import { useState } from "react";
import { useData, Project } from "../../contexts/DataContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Plus, Edit2, Trash2, X, RefreshCw, Play, Loader2 } from "lucide-react";
import { axiosInstance } from "../../api/api";
export function AdminProjects() {
  const {
    projects,
    loading,
    error,
    refreshData,
    addProject,
    updateProject,
    deleteProject,
  } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState(0);
  const [formats, setFormats] = useState<{ id: string; quality: string }[]>([]);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState("");
  const fetchFormats = async (videoId: string) => {
    try {
      const { data } = await axiosInstance.get("/yt/formats", {
        params: {
          url: videoId,
        },
      });
      setFormats(data.formats || []);
      if (data.formats?.length > 0) {
        setSelectedFormat(data.formats[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const resetForm = () => {
    setUrl("");
    setTitle("");
    setThumbnail("");
    setDuration(0);
    setFormats([]);
    setSelectedFormat("");
    setEditingProject(null);
    setIsModalOpen(false);
  };
  const handleEdit = (project: Project) => {
    if (!project.video_id) return;
    setEditingProject(project);
    setUrl(project.url || "");
    setTitle(project.title || "");
    setThumbnail(project.thumbnail || "");
    setDuration(project.duration || 0);
    fetchFormats(project.video_id);
    setIsModalOpen(true);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingProject && editingProject.video_id) {
        await updateProject(editingProject.video_id, {
          title,
          thumbnail,
          duration,
        });
      } else if (!editingProject) {
        await addProject({ url });
      } else {
        throw new Error("video_id aniqlanmadi!");
      }
      resetForm();
    } catch (err) {
      console.error("Loyihani saqlashda xatolik:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = async (video_id: string) => {
    if (confirm("Haqiqatan ham bu loyihani o‘chirmoqchimisiz?")) {
      try {
        await deleteProject(video_id);
      } catch (err) {
        console.error("O‘chirishda xatolik:", err);
      }
    }
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loyihalar yuklanmoqda...</p>
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} />
          Qayta urinib ko‘rish
        </button>
      </div>
    );
  }
  const handleDownload = async (videoId: string, formatId: string) => {
    try {
      setDownloadingId(videoId);

      const response = await axiosInstance.get(
        `/yt/download/${videoId}/${formatId}`,
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data]);

      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${videoId}.mp4`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error(err);
      alert("Video yuklab bo'lmadi");
    } finally {
      setDownloadingId(null);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Loyihalarni boshqarish</h2>
          <p className="text-sm text-gray-600 mt-1">
            Jami: {projects?.length || 0} ta loyiha
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="mr-2" />
          Loyiha qo‘shish
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card
            key={project.id}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48 w-full bg-gray-200 overflow-hidden group">
              {editingProject?.video_id === project.video_id ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${project.video_id}`}
                  title={project.title}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=Rasm+yo‘q")
                    }
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <button
                      onClick={() => {
                        if (project.video_id) {
                          setEditingProject(project);
                          fetchFormats(project.video_id);
                        }
                      }}
                      className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all bg-white/90 backdrop-blur p-3 rounded-full hover:bg-white"
                    >
                      <Play size={24} fill="currentColor" />
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="mt-4 space-y-1">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500">
                📅 {new Date(project.created_at).toLocaleDateString()}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2">
                {project.description}
              </p>
              <p className="text-xs text-gray-500">
                Davomiyligi: {project.duration}
              </p>
            </div>
            {editingProject?.video_id === project.video_id && (
              <div className="w-[100%]">
                <label className="block text-sm font-medium mb-1">
                  Video sifati
                </label>

                <select
                  className="w-full border rounded-md p-2"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  {formats.map((format) => (
                    <option key={format.id} value={format.id}>
                      {format.quality}
                    </option>
                  ))}
                </select>
              </div>
            )}
             <div className="mt-4 flex gap-2">
  <Button
    size="sm"
    variant="outline"
    onClick={() => handleEdit(project)}
    className="flex-1 rounded-xl"
  >
    <Edit2 size={14} className="mr-1" />
    Tahrirlash
  </Button>

  <Button
    size="sm"
    variant="outline"
    onClick={() => handleDelete(project.video_id)}
    className="flex-1 rounded-xl text-red-600 hover:text-red-700"
  >
    <Trash2 size={14} className="mr-1" />
    O‘chirish
  </Button>
</div>
            <div className="flex space-x-2">
              {editingProject?.video_id === project.video_id && (
                <Button
                    className="flex-1 rounded-xl text-green-600 hover:text-green-700"
                  type="button"
                  variant="outline"
                  disabled={downloadingId === project.video_id}
                  onClick={() => {
                    if (!selectedFormat) return;

                    handleDownload(project.video_id, selectedFormat);
                  }}
                >
                  {downloadingId === project.video_id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Yuklanmoqda...
                    </>
                  ) : (
                    "Yuklab olish"
                  )}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="p-5 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Loyihani tahrirlash</h3>
              <button onClick={resetForm} disabled={isSubmitting}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Sarlavha *
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Thumbnail URL *
                </label>
                <Input
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Davomiyligi (soat) *
                </label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saqlanmoqda..." : "Yangilash"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  Bekor qilish
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
