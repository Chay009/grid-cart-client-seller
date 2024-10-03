import axios from "axios";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

// Fetch and display products
function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const navigate=useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const sellerId = localStorage.getItem('sellerId');
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/admin/get-products/${sellerId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(error?.response?.data)
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <h1 className="text-2xl font-bold text-center text-gray-800  mb-8">
     
      <button
            className=" flex bg-green-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
            onClick={() => {
              navigate("/addproducts");
            }}
          >  <PlusCircle size={30} className="text-white-500 animate-pulse" />
            Add Product
          </button>
      </h1>
      
      <h1 className="text-white">{products.length==0 && "No products sold start selleing"}</h1>
      <div className="flex flex-wrap justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          products?.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        )}
      </div>
     
    </div>
  );
}



export default Products;
