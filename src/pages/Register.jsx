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
import { registerSchema } from "../schemas/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "../store/useAuthStore";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { registerUser, loading } = useAuthStore();

  const handleRegister = async (userdata) => {
    await registerUser(userdata);

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
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>
          Enter your details to create a new account
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
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="jondoe"
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <small className="text-red-500" role="alert">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
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
          onClick={handleSubmit(handleRegister)}
          disabled={loading}
        >
          <span className={`${loading && "hidden"}`}> Sign Up</span>
          <Loader2
            className={`w-12 h-12 animate-spin ${!loading && "hidden"}`}
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Register;
