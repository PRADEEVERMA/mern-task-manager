import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

// ✅ BASE URL
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// ✅ AXIOS INSTANCE
const api = axios.create({
  baseURL: BASE_URL,
});

// ✅ LOGIN API
const loginUser = async (userData) => {
  const res = await api.post("/api/v1/user/login", userData);
  return res.data;
};

// ✅ VALIDATION
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      queryClient.setQueryData(["user"], data);
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl p-10">
        <h2 className="text-2xl font-bold text-blue-600">Login</h2>

        <div className="border border-blue-600 rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 p-4">

              <Input
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <Button
                className="w-full"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging..." : "Login"}
              </Button>
            </div>

            <p className="text-center my-3">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign up
              </Link>
            </p>

            <OAuth title="Login with Google" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;