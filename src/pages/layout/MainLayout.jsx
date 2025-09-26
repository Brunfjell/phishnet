import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar />
      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
