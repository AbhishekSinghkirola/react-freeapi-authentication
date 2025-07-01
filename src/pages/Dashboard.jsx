import { UserRound, CalendarDays, AtSign, Loader2 } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changPasswordSchema } from "../schemas/authSchema";
import { useState } from "react";

const Dashboard = () => {
  const {
    user,
    logoutUser,
    loading,
    verificationLoading,
    changePassword,
    resendEmailVerficationLink,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changPasswordSchema),
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return <UserRound size={40} />;
    const names = name.split(" ");
    if (names.length > 1) {
      return (
        names[0].charAt(0).toUpperCase() +
        names[names.length - 1].charAt(0).toUpperCase()
      );
    }
    return name.charAt(0).toUpperCase();
  };

  const handleLogout = async () => {
    await logoutUser();

    const { success, error } = useAuthStore.getState();

    if (success) {
      toast.success(success);
    }

    if (error) {
      toast.error(error);
    }
  };

  const handleChangePassword = async (data) => {
    await changePassword(data);

    const { success, error } = useAuthStore.getState();

    if (success) {
      toast.success(success);

      reset({
        old_password: "",
        new_password: "",
      });

      setDialogOpen(false);
    }

    if (error) {
      toast.error(error);
    }
  };

  const handleResendEmailVerificationLink = async () => {
    await resendEmailVerficationLink();

    const { success, error } = useAuthStore.getState();

    if (success) {
      toast.success(success);
    }

    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-white rounded-3xl blur-xl opacity-0 group-hover:opacity-10 transition duration-1000"></div>
          <div className="relative bg-black border border-gray-800 rounded-3xl shadow-2xl shadow-gray-900/50">
            <div className="relative h-48 rounded-t-3xl flex items-center justify-center border-b border-gray-800 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-90"></div>

              <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-black z-10 ring-4 ring-gray-900">
                <span className="text-white text-6xl font-black tracking-tighter">
                  {getInitials(user?.username ?? "johndoe")}
                </span>
              </div>
            </div>

            <div className="p-8 text-center">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {user.username?.toUpperCase() || "JOHNDOE"}
              </h1>
              <p className="mt-2 text-base text-gray-500">{user?.email}</p>
            </div>

            <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-4 bg-gray-900/70 p-4 rounded-xl border border-gray-800">
                <AtSign className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-base font-semibold text-white">
                    {user?.username}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-900/70 p-4 rounded-xl border border-gray-800">
                <CalendarDays className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-base font-semibold text-white">
                    {new Date(user?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-gray-800">
              <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (!open) {
                    reset(
                      {
                        old_password: "",
                        new_password: "",
                      },
                      {
                        keepErrors: false,
                        keepDirty: false,
                        keepTouched: false,
                      }
                    );
                  }
                }}
              >
                <form>
                  <DialogTrigger asChild>
                    <button className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-white text-black font-bold hover:bg-gray-200 active:scale-95 transition-all duration-200 group cursor-pointer">
                      Update Profile
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-center">
                        Change Password
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="old-password">Old Password</Label>
                        <Input
                          type="password"
                          id="old-password"
                          name="old_password"
                          {...register("old_password")}
                          aria-invalid={errors.old_password ? "true" : "false"}
                        />
                        {errors.old_password && (
                          <small className="text-red-500" role="alert">
                            {errors.old_password.message}
                          </small>
                        )}
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          type="password"
                          id="new-password"
                          name="new_password"
                          {...register("new_password")}
                          aria-invalid={errors.new_password ? "true" : "false"}
                        />
                        {errors.new_password && (
                          <small className="text-red-500" role="alert">
                            {errors.new_password.message}
                          </small>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" className="cursor-pointer">
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="cursor-pointer"
                        onClick={handleSubmit(handleChangePassword)}
                      >
                        <span className={`${loading && "hidden"}`}>
                          Update Password
                        </span>

                        <Loader2
                          className={`w-12 h-12 animate-spin ${
                            !loading && "hidden"
                          }`}
                        />
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>
              {!user?.isEmailVerified && (
                <button
                  className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-gray-200 active:scale-95 transition-all duration-200 group mt-4 hover:text-black cursor-pointer"
                  onClick={handleResendEmailVerificationLink}
                  disabled={verificationLoading}
                >
                  <span className={`${verificationLoading && "hidden"}`}>
                    Resend Verification Email
                  </span>
                  <Loader2
                    className={`w-10 h-10 animate-spin ${
                      !verificationLoading && "hidden"
                    }`}
                  />
                </button>
              )}

              <button
                className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-gray-200 active:scale-95 transition-all duration-200 group mt-4 hover:text-black cursor-pointer"
                onClick={handleLogout}
                disabled={loading}
              >
                <span className={`${loading && "hidden"}`}> Logout</span>
                <Loader2
                  className={`w-10 h-10 animate-spin ${!loading && "hidden"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
