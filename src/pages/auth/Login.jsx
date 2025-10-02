import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../../services/authService";
import { useAuthStore } from "../../stores/authStore";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await signIn({ email, password });
      if (error) throw error;

      if (!data.user) {
        throw new Error("Login failed. Please try again.");
      }

      if (!data.user.confirmed_at) {
        throw new Error("Please confirm your email before logging in.");
      }

      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="card-title justify-center">Login</h2>
      <div className="flex items-center justify-center gap-3">
        <button className="btn btn-sm bg-white text-black w-40 h-10 border-[#e5e5e5] tooltip tooltip-bottom" data-tip="wala di to gumagana. bat niyo kasi nilagyan huhu">
          <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
          Login with Google
        </button>
        <p className="text-base-content/50">|</p>
        <button className="btn btn-sm bg-[#1A77F2] text-white w-40 h-10 border-[#005fd8] tooltip tooltip-bottom" data-tip="wala di to gumagana. bat niyo kasi nilagyan huhu">
          <svg aria-label="Facebook logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
          Login with Facebook
        </button>
      </div>
      <div className="divider text-base-content/50">OR</div>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-error text-sm">{error}</p>}

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-sm text-center mt-4 space-y-2">
        <p>
          Don’t have an account?{" "}
          <Link to="/auth/register" className="link link-primary">
            Register
          </Link>
        </p>
        <p>
          <Link to="/auth/forgot-password" className="link link-primary">
            Forgot Password?
          </Link>
        </p>
      </div>
    </>
  );
}
