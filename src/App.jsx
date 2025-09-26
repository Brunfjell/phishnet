import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useUIStore } from "./stores/uiStore";
import "./index.css";

export default function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <AppRoutes />;
}
