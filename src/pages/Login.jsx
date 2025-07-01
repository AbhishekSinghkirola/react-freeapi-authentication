import { Button } from "@/components/ui/button";
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

import { Link } from "react-router";

import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { loginUser, loading } = useAuthStore();

  const handleLogin = async (userdata) => {
    await loginUser(userdata);

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
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your credentials below to sign in to your account
        </CardDescription>
        <CardAction>
          <Link to="/register" variant="link">
            Sign Up
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="text"
                type="email"
                placeholder="johndoe"
                required
                autoFocus
                {...register("username")}
                aria-invalid={errors.username ? "true" : "false"}
              />
              {errors.username && (
                <small className="text-red-500" role="alert">
                  {errors.username.message}
                </small>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <small className="text-red-500" role="alert">
                  {errors.password.message}
                </small>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit(handleLogin)}
          disabled={loading}
        >
          <span className={`${loading && "hidden"}`}> Sign In</span>
          <Loader2
            className={`w-12 h-12 animate-spin ${!loading && "hidden"}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
