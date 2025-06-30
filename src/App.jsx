import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
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
