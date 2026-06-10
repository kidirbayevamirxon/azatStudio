// components/Projects.tsx
import { useState } from "react";
import { Download, Play, Loader } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useData } from "../contexts/DataContext";
import { axiosInstance } from "../api/api";
import { Helmet } from "react-helmet-async";

export function Projects() {
  const { projects, loading, error, refreshData } = useData();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [formatsMap, setFormatsMap] = useState<Record<string, any[]>>({});
  const [selectedFormat, setSelectedFormat] = useState<Record<string, string>>(
    {},
  );
  const [loadingFormats, setLoadingFormats] = useState<string | null>(null);
  const handleDownload = async (videoId: string, title: string) => {
    try {
      const formatId = selectedFormat[videoId];

      if (!formatId) {
        alert("Format tanlanmagan");
        return;
      }

      setDownloadingId(videoId);

      const response = await axiosInstance.get(
        `/yt/download/${videoId}/${formatId}`,
        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title}.mp4`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Yuklab olishda xatolik");
    } finally {
      setDownloadingId(null);
    }
  };
  const handlePlayVideo = (projectId: string) => {
    console.log("Video ijro qilish:", projectId);

    setPlayingId((prev) => (prev === projectId ? null : projectId));

    if (!formatsMap[projectId]) {
      fetchFormats(projectId);
    }
  };
  const formatDuration = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  const fetchFormats = async (videoId: string) => {
    try {
      setLoadingFormats(videoId);

      const { data } = await axiosInstance.get("/yt/formats", {
        params: { url: videoId },
      });

      const formats = data.formats || [];

      setFormatsMap((prev) => ({
        ...prev,
        [videoId]: formats,
      }));

      if (formats.length > 0) {
        setSelectedFormat((prev) => ({
          ...prev,
          [videoId]: formats[0].id,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFormats(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loyihalar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Qayta urinib ko‘rish
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Projects | Azat Studio</title>
        <meta
          name="description"
          content="Azat Studio tomonidan yaratilgan loyihalar va portfolio. Web ilovalar va biznes yechimlar."
        />
      </Helmet>
      <div className="min-h-screen">
        <section className="bg-linear-to-r from-pink-600 to-purple-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-6">Loyihalarimiz</h1>
            <p className="text-xl">
              Chiroyli to‘y videolarimiz portfolyosini ko‘ring
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl mb-2">So‘nggi ishlar</h2>
            <p className="text-gray-600">
              Bu yerda bizning eng so‘nggi loyihalarimiz. Har biri o‘ziga xos
              hikoya.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Hozircha loyihalar mavjud emas. Tez orada qo‘shiladi!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.video_id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64 bg-gray-200 overflow-hidden group">
                    {playingId === project.video_id ? (
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
                        <ImageWithFallback
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                          <button
                            onClick={() => handlePlayVideo(project.video_id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-blue-600 rounded-full p-4 hover:bg-blue-600 hover:text-white"
                          >
                            <Play size={32} fill="currentColor" />
                          </button>
                        </div>
                        <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                          {formatDuration(project.duration)}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-1">
                      {new Date(project.created_at).toLocaleDateString()} •
                      Noma’lum
                    </div>
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {project.description || "Tavsif mavjud emas"}
                    </p>
                    {formatsMap[project.video_id] && (
                      <div className="mb-3">
                        <label className="text-sm font-medium">
                          Video sifati
                        </label>

                        <select
                          className="w-full border rounded p-2 mt-1"
                          value={selectedFormat[project.video_id] || ""}
                          onChange={(e) =>
                            setSelectedFormat((prev) => ({
                              ...prev,
                              [project.video_id]: e.target.value,
                            }))
                          }
                        >
                          {formatsMap[project.video_id].map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.quality}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleDownload(project.video_id, project.title)
                        }
                        disabled={downloadingId === project.video_id}
                        className="bg-gray-200 text-gray-700 px-[34%] py-2 rounded hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloadingId === project.video_id ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <Download size={16} />
                        )}
                        Yuklab olish
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
