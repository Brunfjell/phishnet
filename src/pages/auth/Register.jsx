import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    firstname: "",
    lastname: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;

      if (!data.user) {
        throw new Error("Registration failed. Please try again.");
      }

      setSuccess(
        "Registration successful! Please check your email and confirm your account before logging in."
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="card-title justify-center">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4 mt-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="input input-bordered w-full"
          value={form.username}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            className="input input-bordered w-1/2"
            value={form.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="input input-bordered w-1/2"
            value={form.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="input input-bordered w-full"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        {error && <p className="text-error text-sm">{error}</p>}
        {success && <p className="text-success text-sm">{success}</p>}

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/auth/login" className="link link-primary">
          Login
        </Link>
      </p>
    </>
  );
}
