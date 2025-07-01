import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router";

import { forgotPasswordSchema } from "../schemas/authSchema";

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

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const { loading, forgotPassword } = useAuthStore();

  const handleForgotPassword = async (data) => {
    await forgotPassword(data);

    const { success, error } = useAuthStore.getState();

    if (success) {
      toast.success(success);

      reset();
    }

    if (error) {
      toast.error(error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email address to reset your password
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
              <label htmlFor="email">Email</label>
              <Input
                id="text"
                type="email"
                placeholder="johndoe@gmail.com"
                required
                autoFocus
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <small className="text-red-500" role="alert">
                  {errors.email.message}
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
          onClick={handleSubmit(handleForgotPassword)}
          disabled={loading}
        >
          <span className={`${loading && "hidden"}`}> Forgot Password</span>
          <Loader2
            className={`w-12 h-12 animate-spin ${!loading && "hidden"}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
