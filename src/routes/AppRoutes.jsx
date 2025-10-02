import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

import MainLayout from "../pages/layout/MainLayout";
import AuthLayout from "../pages/auth/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/Dashboard";
import Campaigns from "../pages/Campaigns";
import Templates from "../pages/Templates";
import Employees from "../pages/Employees";
import Quiz from "../pages/Quiz";

export default function AppRoutes() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter basename="/phishnet">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          path="/"
          element={user ? <MainLayout /> : <Navigate to="/auth/login" replace />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="templates" element={<Templates />} />
          <Route path="employees" element={<Employees />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>

        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
