import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function OAuth({ title }) {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(
        `${BASE_URL}/api/v1/user/google`,
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      );

      dispatch(setCredentials(res.data));
      toast.success("Google login success");
      navigate("/");

    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex justify-center pb-4">
      <button
        onClick={handleGoogle}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {title}
      </button>
    </div>
  );
}

export default OAuth;