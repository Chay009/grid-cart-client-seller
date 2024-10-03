import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import toast from "react-hot-toast";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const handleSignup = async () => {
    try {
      setLoading(true); // Set loading to true during signup
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/signup`,
        {
          sellername: email,
          password: password,
        }
      );

      const data = res.data;
      localStorage.setItem("token", data.token);
      localStorage.setItem("sellerEmail", email);
      localStorage.setItem("sellerId", data.sellerId);
      localStorage.setItem("isLoading", true);
      setUser({ userEmail: email, isLoading: true });
      navigate(`/products/`);
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false); // Reset loading state after signup, whether success or error
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center mb-4">
        <h1 className="text-lg font-semibold font-cursive">
          Welcome to GridKart Admin. Sign up Below..
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
          {/* Conditionally render loading spinner */}
          {loading ? (
            <div className="flex justify-center mb-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
              onClick={handleSignup}
              disabled={loading}
            >
              Sign Up
            </button>
          )}
          <div className="mt-6 text-center">
            <h3 className="font-semibold">Already a user? Login here..</h3>
            <button
              className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 disabled:opacity-50"
              onClick={() => navigate("/signin")}
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
