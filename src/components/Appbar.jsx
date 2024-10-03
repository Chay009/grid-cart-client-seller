import { useNavigate } from "react-router-dom";



import "/src/App.css";
import { useEffect, useRef, useState } from "react";

function Appbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const avatarRef = useRef(null);
  const handleAvatarClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sellerId");
    localStorage.removeItem("sellerEmail");
   
    setShowDropdown(false);
    navigate("/");
  };
  // Get user email from localStorage if it's available
  const sellerEmail = localStorage.getItem("sellerEmail") 

  if (sellerEmail) {
    return (
      <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
        {/* Logo / Brand Name */}
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            navigate("/products");
          }}
        >
          <h3 className="text-xl font-kaushan">GridKart Admin</h3>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
         
          <button
            className="bg-teal-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            onClick={() => {
              navigate("/products");
            }}
          >
            Inventory
          </button>
        

          {/* Avatar with Tooltip */}
          <div className="relative" ref={avatarRef}>
              <div
                className="w-10 h-10 bg-gradient-to-tr from-orange-300 to-red-500 rounded-full flex items-center justify-center text-white text-lg font-semibold cursor-pointer"
                onClick={handleAvatarClick}
              >
                {localStorage.getItem("sellerEmail")[0]?.toUpperCase()}
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-gray-800 font-medium">
                    {localStorage.getItem("sellerEmail")}
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      {/* Logo / Brand Name */}
      <div>
        <h3
          className="text-xl font-kaushan cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
         GridKart Admin
        </h3>
      </div>

      {/* Sign In / Sign Up Buttons */}
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          onClick={() => {
            navigate("/signin");
          }}
        >
          Signin
        </button>
      </div>
    </div>
  );
}

export default Appbar;
