import { useEffect, useState } from "react";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      return;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form
        className="w-80 p-4 bg-white shadow-md rounded"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export const RegisterPage = () => {
  return (
    <div>
      <Navbar />
      <Register />
      <Footer />
    </div>
  );
};
