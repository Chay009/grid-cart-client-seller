import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Fetch and display products
function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const sellerId = localStorage.getItem('sellerId');
        const response = await axios.get(
          `http://localhost:2424/admin/get-products/${sellerId}`,
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
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Typography
        variant="h4"
        style={{
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "whitesmoke",
          textAlign: "center",
          marginTop: "70px",
          fontSize: "25px",
        }}
      >
       Entire Collection
      </Typography>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Render attributes dynamically
  const renderAttributes = () => {
    if (!product.attributes) return null;

    return (
      <div>
        {Object.entries(product.attributes).map(([key, value]) => (
          <Typography key={key} variant="body2" component="div">
            <strong>{key}:</strong> {value}
          </Typography>
        ))}
      </div>
    );
  };

  return (
    <Card
      variant="outlined"
      sx={{ minWidth: 280, width: 300, height: 380 }}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        margin: "15px",
        boxShadow: isMouseOver ? "0 0 20px #601b99" : "0 0 5px #601b99",
        transition: "box-shadow 0.3s ease-in-out",
      }}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >

      {/* // fic ui here image not show */}
      <CardMedia
        sx={{
          height: "25%",
          width: "100%",
          borderRadius: "8px",
        }}
        image={product.imageLink}
        title={product.title}
      />
      <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: isMouseOver ? "#601b99" : "black",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          style={{
            fontSize: "14px",
            color: "gray",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Price: ${product.price}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          Stock: {product.stock}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          Category: {product.category}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          Brand: {product.brand}
        </Typography>
        {renderAttributes()}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <button
            className="button-btn"
            style={{
              padding: "10px 20px",
              backgroundColor: "#601b99",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "none",
            }}
            onClick={() => {
              navigate("/products/" + product.productId);
            }}
          >
            Edit
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Products;
