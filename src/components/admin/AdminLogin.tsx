// components/admin/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { axiosInstance } from "../../api/api";
export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosInstance.post("/auth/login", {
        login: username,
        password: password,
      });

      const { access_token, refresh_token } = res.data;

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      login(access_token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Kirish muvaffaqiyatsiz yakunlandi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Azat Studio</h1>
        <p className="text-center text-gray-600 mb-8">Admin paneli</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Foydalanuvchi nomi</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Foydalanuvchi nomi"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Parol</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
}