import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import "../index.css";
import toast from "react-hot-toast";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignin = async () => {
    try {
      setLoading(true); // Set loading to true during signin
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/login`,
        {
          sellername: email,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("sellerId", data.sellerId);
      localStorage.setItem("sellerEmail", email);

      setUser({
        userEmail: email,
        isLoading: false,
      });
      navigate("/products");
    } catch (error) {
      console.error("Error during signin:", error);
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false); // Reset loading state after signin, whether success or error
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center mb-4">
        <h1 className="text-lg font-semibold font-cursive">
          Welcome to Gridkart Admin. Sign in Below..
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="bg-white text-black p-6 rounded-lg shadow-md w-80">
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Conditionally render CircularProgress while loading */}
          {loading ? (
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
              onClick={handleSignin}
              disabled={loading}
            >
              Sign In
            </button>
          )}
          <div className="mt-6 text-center">
            <h3 className="font-semibold">
              New here? Click below to register a new account.
            </h3>
            <button
              className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
