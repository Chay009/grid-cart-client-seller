import React, { useState } from "react";
import { TextField, Button, Card, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Attributes schemas for different categories
const attributesByCategory = {
  furniture: {
    materials: ["Wood", "Metal", "Glass", "Plastic", "Fabric"],
    dimensions: ["Small (e.g., 40x40 cm)", "Medium (e.g., 60x60 cm)", "Large (e.g., 80x80 cm)", "Extra Large (e.g., 100x100 cm)"],
    colors: ["Black", "White", "Brown", "Gray", "Beige"],
  },
  electronics: {
    screenSizes: ["5 inches", "5.5 inches", "6 inches", "6.5 inches", "7 inches"],
    storageCapacities: ["32GB", "64GB", "128GB", "256GB", "512GB"],
    batteryLives: ["3000mAh", "4000mAh", "5000mAh", "6000mAh"],
    connectivityOptions: ["4G", "5G", "Wi-Fi", "Bluetooth", "NFC"],
    processorTypes: ["Snapdragon 888", "Snapdragon 870", "Exynos 2100", "Apple A14 Bionic"],
    RAMOptions: ["4GB", "6GB", "8GB", "12GB", "16GB"],
  },
  clothes: {
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  books: {
    genres: ["Fiction", "Non-Fiction", "Science Fiction", "Fantasy", "Biography", "Mystery", "Thriller", "Romance", "Historical", "Self-Help"],
    formats: ["Hardcover", "Paperback", "Ebook", "Audiobook"],
    publicationYears: ["2020", "2021", "2022", "2023", "2024"],
    languages: ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Russian", "Portuguese"],
  },
};

function AddCourse() {
  // State variables for form inputs
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [attributes, setAttributes] = useState({}); // Dynamic attributes state
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Handle category change and set corresponding attributes
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setAttributes({}); // Clear attributes when changing category
  };

  // Handle attribute changes
  const handleAttributeChange = (event) => {
    setAttributes({
      ...attributes,
      [event.target.name]: event.target.value,
    });
  };

  // Prepare data for API call
  const handleAddCourse = async () => {
    const sellerId=localStorage.getItem('sellerId');
    try {
      console.log({
        title,
        description,
        brand,
        imageLink,
        price: parseFloat(price),
        stock,
        category,
        ...attributes,
      })
      await axios.post(
        `http://localhost:2424/admin/create-products/${sellerId}`,
        {
          title,
        description,
        brand,
        imageLink,
        price: parseFloat(price),
        stock:parseInt(stock),
        category,
        attributes,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alert("Course added successfully!");
      navigate('/products')
    } catch (error) {
      console.error("Error adding course:", error);
      alert("An error occurred while adding the course.");
    }
  };

  // Render input fields based on selected category
  const renderAttributes = () => {
    const attributesList = attributesByCategory[category];
    if (!attributesList) return null;

   
    return Object.entries(attributesList).map(([key, options]) => (
      <FormControl key={key} fullWidth style={{ marginBottom: 10 }}>
        <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
        <Select
          name={key}
          value={attributes[key] || ""}
          onChange={handleAttributeChange}
          variant="outlined"
          >
        
          {options.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    ));
  
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: 50,
        paddingTop: 50,
        minWidth: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card
          className="cardstyle"
          variant="outlined"
          sx={{ minWidth: 600, height: 700 }} // Increased height for more fields
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "Arial, sans-serif",
            overflow:"scroll",
            boxShadow: isMouseOver ? "0 0 50px #601b99" : "0 0 10px #601b99",
          }}
          onMouseOver={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            label="Title"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            label="Description"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setBrand(e.target.value)}
            fullWidth
            label="Brand"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 20 }}
            onChange={(e) => setImageLink(e.target.value)}
            fullWidth
            label="Image Link"
            variant="outlined"
          />INR
          <TextField
            style={{ marginBottom: 10,marginTop: 10 }}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            fullWidth
            label="Price"
            variant="outlined"
          /> 
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            fullWidth
            label="Stock"
            variant="outlined"
          />
         
          <FormControl fullWidth style={{ marginBottom: 10 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              variant="outlined"
            >
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothes">Clothes</MenuItem>
              <MenuItem value="books">Books</MenuItem>
            </Select>
          </FormControl>
          
         
          {renderAttributes()}
          
          <Button
            variant="contained"
            color="primary"
            style={{
              display: "flex",
              justifyContent: "center",
             
              width: "400px",
            }}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
