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

// ✅ ENV URL
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// ✅ AXIOS INSTANCE (BEST PRACTICE)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ⚠️ agar cookies use kar raha hai tabhi rakho
});

// ✅ LOGIN API CALL
const loginUser = async (userData) => {
  const res = await api.post("/api/v1/user/login", userData);
  return res.data;
};

// ✅ VALIDATION
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // ✅ MUTATION
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      queryClient.setQueryData(["user"], data);
      toast.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      console.log("LOGIN ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      toast.error(message);
    },
  });

  const login = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl p-10">
        <h2 className="text-2xl font-bold m-2 text-blue-600">Login</h2>

        <div className="border border-blue-600 rounded-md">
          <form onSubmit={handleSubmit(login)}>
            <div className="space-y-4 p-4">
              
              {/* EMAIL */}
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <Button
                textColor="text-white"
                type="submit"
                className="w-full"
                disabled={isSubmitting || mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </div>

            <p className="text-center text-black my-4">
              Dont have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>

            <OAuth title={"Login with Google"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;