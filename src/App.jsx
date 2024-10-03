import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Appbar from "./components/Appbar";
import AddNewProduct from "./components/AddNewProduct";
import Products from "./components/Products";

import Landing from "./components/Landing";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";

import backgroundImg from "../public/Background.svg"

function App() {
  return (
    <RecoilRoot> 
      <div 
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          alignItems: "center",
          backgroundColor: "black",
          overflow: "auto"
        }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path="/products" element={<Products />} />
          
            <Route path="/addproducts" element={<AddNewProduct />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.sellername) {
        setUser({
          isLoading: false,
          userEmail: response.data.sellername,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
