import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { updatePassword } from "../../services/authService";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      navigate("/auth/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="card-title justify-center">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-error text-sm">{error}</p>}

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      <p className="text-sm text-center mt-4">
        Back to{" "}
        <Link to="/auth/login" className="link link-primary">
          Login
        </Link>
      </p>
    </>
  );
}
