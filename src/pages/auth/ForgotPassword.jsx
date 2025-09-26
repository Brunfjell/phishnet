import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/authService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="card-title justify-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {message && <p className="text-success text-sm">{message}</p>}
        {error && <p className="text-error text-sm">{error}</p>}

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Remembered your password?{" "}
        <Link to="/auth/login" className="link link-primary">
          Back to Login
        </Link>
      </p>
    </>
  );
}
