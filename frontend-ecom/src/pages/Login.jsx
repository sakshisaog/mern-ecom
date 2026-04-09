import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);

      setMsg("Login Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ecebe6] px-4">

      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 border border-gray-200">

        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Welcome back
        </h2>

        <p className="text-sm text-gray-500 mb-5">
          Login to continue your journey
        </p>

        {msg && (
          <div className="mb-4 text-sm text-[#6b705c] font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#f8f8f5] focus:outline-none focus:ring-2 focus:ring-[#a3b18a] transition"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-[#f8f8f5] focus:outline-none focus:ring-2 focus:ring-[#a3b18a] transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#3a5a40] text-white py-2 rounded-md font-medium hover:bg-[#344e41] transition"
          >
            Login
          </button>
        </form>

        <div className="my-5 border-t"></div>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#3a5a40] cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}