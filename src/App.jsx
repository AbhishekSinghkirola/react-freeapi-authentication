import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";

import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import Dashboard from "./pages/Dashboard";

import NotFound from "./pages/NotFound";

const App = () => {
  const { getLoggedInUser } = useAuthStore();

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  return (
    <>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password/:token" element={<ResetPassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
