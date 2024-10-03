import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function ProductCard({product}) {
        // Render attributes dynamically
        const renderAttributes = () => {
            if (!product.attributes) return null;
        
            return (
              <div className="mt-2">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <p key={key} className="text-sm text-gray-600">
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            );
          };
    
    const navigate = useNavigate();
    const [isMouseOver, setIsMouseOver] = useState(false);
  
    return (
      <div
        className={` bg-white border w-80  border-gray-200 rounded-lg overflow-hidden shadow-md m-4 p-6 transform transition-transform duration-300 ease-out ${
          isMouseOver ? "shadow-2xl scale-105" : "shadow-md scale-100"
        } cursor-pointer hover:border-purple-500`}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        onClick={() => localStorage.getItem('email')&&navigate(`/products/${product.productId}`)}
      >
        {/* Product Image */}
        <div className="relative mb-5 h-64 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 rounded-lg overflow-hidden">
          <img
            src={product.imageLink}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
        </div>
  
        {/* Product Details */}
        <div className="flex flex-col space-y-4">
          {/* Product Title */}
          <h2 className="text-xl font-bold text-gray-900 leading-tight hover:text-purple-600 transition-colors duration-300 ease-in-out">
            {product.title?.length > 50
              ? `${product.title.slice(0, 47)}...`
              : product.title}
          </h2>
  
          {/* Product Price */}
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-lg font-medium text-red-600">
                Save {product.discount}% 
              </span>
            )}
          </div>
  
          {/* Product Description */}
          <p className="text-gray-700 text-md leading-relaxed">
            {product.description.length > 140
              ? `${product.description.slice(0, 137)}...`
              : product.description}
          </p>

          <div className="mb-4">
<p className="font-semibold text-gray-900 mb-1">Price: ${product.price}</p>
<p className="text-gray-600 text-sm mb-1">Category: {product.category}</p>
<p className="text-gray-600 text-sm mb-2">Brand: {product.brand}</p>
<div className="flex flex-wrap gap-1 mt-2">
  {renderAttributes()}
</div>
</div>

<button
className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
onClick={() => navigate(`/products/${product.productId}`)}
>
Edit
</button>
  
    
        </div>
      </div>
    );
  }

  export default ProductCard