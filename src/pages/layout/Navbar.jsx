import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { signOut } from "../../services/authService";
import ThemeToggle from "../../components/ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/campaigns">Campaigns</Link>
            </li>
            <li>
              <Link to="/simulations">Simulations</Link>
            </li>
            <li>
              <Link to="/employee">Employees</Link>
            </li>
            {user && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>

        <Link to="/dashboard" className="btn btn-ghost text-xl">
          PhishNet
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/campaigns">Campaigns</Link>
          </li>
          <li>
            <Link to="/simulations">Simulations</Link>
          </li>
          <li>
            <Link to="/employee">Employees</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <ThemeToggle/>
        {user ? (
          <button onClick={handleLogout} className="btn btn-error btn-sm text-white">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
