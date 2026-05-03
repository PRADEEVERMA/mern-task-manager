import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// ✅ FIXED API
const createUser = async (userData) => {
  const { data } = await axios.post(
    `${baseURL}/api/v1/user/signup`,
    userData,
    {
      withCredentials: true, // 🔥 MUST
    }
  );
  return data;
};

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      queryClient.setQueryData(["user"], data);
      toast.success("Signup successful");
      navigate("/");
    },
    onError: (error) => {
      console.log("SIGNUP ERROR:", error);
      toast.error(
        error.response?.data?.message || "Signup failed"
      );
    },
  });

  const signup = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutation.mutate({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-xl p-10">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Signup</h2>

        <form
          onSubmit={handleSubmit(signup)}
          className="border p-5 rounded-md border-blue-600"
        >
          <input
            placeholder="First Name"
            {...register("firstname", { required: true })}
            className="w-full p-2 mb-2 border"
          />
          {errors.firstname && (
            <p className="text-red-500">First name required</p>
          )}

          <input
            placeholder="Last Name"
            {...register("lastname", { required: true })}
            className="w-full p-2 mb-2 border"
          />
          {errors.lastname && (
            <p className="text-red-500">Last name required</p>
          )}

          <input
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full p-2 mb-2 border"
          />
          {errors.email && (
            <p className="text-red-500">Email required</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full p-2 mb-2 border"
          />
          {errors.password && (
            <p className="text-red-500">Password required</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true })}
            className="w-full p-2 mb-2 border"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">Confirm password required</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 mt-3 rounded"
          >
            Signup
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;