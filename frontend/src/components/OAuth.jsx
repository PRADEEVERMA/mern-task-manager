import Button from "./Button";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const OAuth = ({ title }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${baseUrl}/api/v1/user/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 IMPORTANT FIX
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          googlePhotoUrl: result.user.photoURL,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Google login failed");
      }

      dispatch(setCredentials(data));
      toast.success("Google login successful");
      navigate("/");

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google login failed");
    }
  };

  return (
    <Button
      type="button"
      className="bg-blue-600 text-white mx-auto block rounded-md p-2 m-4"
      onClick={handleGoogleClick}
    >
      {title}
    </Button>
  );
};

export default OAuth;