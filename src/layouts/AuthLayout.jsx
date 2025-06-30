import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
