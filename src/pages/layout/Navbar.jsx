import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { signOut } from "../../services/authService";
import ThemeToggle from "../../components/ThemeToggle";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    logout();
    navigate("/auth/login"); 
  };

  const isActive = (path) => {
    const current = location.pathname.replace(/^\/phishnet/, "");
    return current.startsWith(path)
      ? "active text-white bg-primary font-semibold"
      : "";
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              <Link to="/dashboard" className={isActive("/dashboard")}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/campaigns" className={isActive("/campaigns")}>
                Campaigns
              </Link>
            </li>
            <li>
              <Link to="/templates" className={isActive("/templates")}>
                Templates
              </Link>
            </li>
            <li>
              <Link to="/employees" className={isActive("/employees")}>
                Employees
              </Link>
            </li>
            <li>
              <Link to="/quiz" className={isActive("/quiz")}>
                Quiz
              </Link>
            </li>
            {user && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>

        <Link
          to="/dashboard"
          className="btn btn-ghost text-xl flex items-center gap-0"
        >
          Ph
          <img
            src="/phishnet/phishnet.png"
            alt="i"
            className="inline-block w-4.5 h-5 align-middle mx-[-2px]"
          />
          shNet
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          <li>
            <Link to="/dashboard" className={isActive("/dashboard")}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/campaigns" className={isActive("/campaigns")}>
              Campaigns
            </Link>
          </li>
          <li>
            <Link to="/templates" className={isActive("/templates")}>
              Templates
            </Link>
          </li>
          <li>
            <Link to="/employees" className={isActive("/employees")}>
              Employees
            </Link>
          </li>
          <li>
            <Link to="/quiz" className={isActive("/quiz")}>
              Quiz
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2 pr-4">
        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={user?.avatar || "/phishnet/avatar.png"}
                alt="User Avatar"
                className="shadow-md"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <button className="flex justify-between items-center w-full">
                <span>Theme</span>
                <ThemeToggle />
              </button>
            </li>
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 hover:text-white hover:bg-red-500"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
