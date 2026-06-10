import { useState } from "react";
import { useData, Service } from "../../contexts/DataContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export function AdminServices() {
  const { services, addService, updateService, deleteService } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
    duration_hours: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceData = {
      title: formData.title,
      description: formData.description,
      features: formData.features.split("\n").filter((f) => f.trim()),
      duration_hours: Number(formData.duration_hours) || 0,
    };

    if (editingService) {
      updateService(editingService.id, serviceData);
    } else {
      addService(serviceData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      features: "",
      duration_hours: 0,
    });
    setEditingService(null);
    setIsModalOpen(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features.join("\n"),
      duration_hours: service.duration_hours || 0,
    });
    setIsModalOpen(true);
  };
  const handleDelete = (id: string) => {
    if (confirm("Haqiqatan ham bu xizmatni o‘chirmoqchimisiz?")) {
      deleteService(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Xizmatlarni boshqarish</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="mr-2" />
          Xizmat qo‘shish
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="p-6">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{service.description}</p>
            <p className="text-lg font-bold text-pink-600 mb-3">
              {service.duration_hours} soat
            </p>
            <ul className="space-y-2 mb-4">
              {service.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-700 flex items-start"
                >
                  <span className="text-pink-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(service)}
              >
                <Edit2 size={14} className="mr-1" />
                Tahrirlash
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(service.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={14} className="mr-1" />
                O‘chirish
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {editingService ? "Xizmatni tahrirlash" : "Xizmat qo‘shish"}
              </h3>
              <button onClick={resetForm}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Sarlavha</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Premium Paket"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Davomiyligi (soat)
                </label>
                <Input
                  type="number"
                  value={formData.duration_hours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration_hours: Number(e.target.value),
                    })
                  }
                  placeholder="8"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Tavsif
                </label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Eng mashhur paketimiz"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Xususiyatlar (har biri yangi qatorda)
                </label>
                <textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md"
                  rows={6}
                  placeholder="8 soat xizmat&#10;2 videograf&#10;Highlight + To‘liq marosim&#10;Drone footage&#10;Kunning o‘zida tahrir"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  {editingService ? "Yangilash" : "Qo‘shish"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
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