import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate, useParams } from "react-router";

import { resetPasswordSchema } from "../schemas/authSchema";

import { Loader2 } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { loading, resetPassword } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (data) => {
    await resetPassword({ ...data, token });

    const { success, error } = useAuthStore.getState();

    if (success) {
      toast.success(success);

      reset();

      navigate("/login");
    }

    if (error) {
      toast.error(error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your new password below to reset your password
        </CardDescription>
        <CardAction>
          <Link to="/login" variant="link">
            Sign In
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor="newPassword">New Password</label>
              <Input
                id="newPassword"
                type="password"
                placeholder="********"
                required
                autoFocus
                {...register("newPassword")}
                aria-invalid={errors.newPassword ? "true" : "false"}
              />
              {errors.newPassword && (
                <small className="text-red-500" role="alert">
                  {errors.newPassword.message}
                </small>
              )}
            </div>
            <div className="grid gap-2">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="********"
                required
                autoFocus
                {...register("confirmNewPassword")}
                aria-invalid={errors.confirmNewPassword ? "true" : "false"}
              />
              {errors.confirmNewPassword && (
                <small className="text-red-500" role="alert">
                  {errors.confirmNewPassword.message}
                </small>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          onClick={handleSubmit(handleResetPassword)}
          disabled={loading}
        >
          <span className={`${loading && "hidden"}`}> Reset Password</span>
          <Loader2
            className={`w-12 h-12 animate-spin ${!loading && "hidden"}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResetPassword;
