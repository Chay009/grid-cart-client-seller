import {
  Card,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { productState } from "../store/atoms/course"; 
import {
  productDescription,
  productImage,
  productPrice,
  productTitle,
  productStock,
  isproductLoading,
} from "../store/selectors/course";
import { Loading } from "./Loading";

function Course() {
  const sellerId=localStorage.getItem("sellerId");
  const {productId}=useParams()
  const setProduct = useSetRecoilState(productState);
  const productLoading = useRecoilValue(isproductLoading);

  useEffect(() => {
    axios
      .get(`http://localhost:2424/admin/products/${productId}/${sellerId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data)
        setProduct({ isLoading: false, product: res.data.product });
      });
  }, []);
  if (productLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(productTitle);
  return (
    <div>
      <Typography
        style={{
          color: "white",
          fontWeight: 600,
          margin: "20px",
          marginBottom: "40px",
        }}
        variant="h4"
        textAlign={"center"}
      >
        {title}
      </Typography>
    </div>
  );
}
function UpdateCard() {
  const [courseDetails, setProductDetails] = useRecoilState(productState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (courseDetails) {
      setTitle(courseDetails.product.title || "");
      setDescription(courseDetails.product.description || "");
      setImage(courseDetails.isLoading.imageLink || "");
      setPrice(courseDetails.product.price || "");
    }
  }, [courseDetails]);

  return (
    <div>
      <div className="card-div">
        <Card
          className="cardstyle"
          variant="outlined"
          sx={{ minWidth: 350, minHeight: 385 }}
          style={{
            display: "flex",
            zIndex: 1,
            marginBottom: "40px",
            flexDirection: "column",
            fontFamily: "Arial, sans-serif",
            boxShadow: isMouseOver ? "0 0 50px #601b99" : "0 0 10px #601b99",
          }}
          onMouseOver={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
        >
          <Typography variant="h6" sx={{fontSize:"18px"}}>Update course details</Typography>
          <br></br>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth
            label="title"
            variant="outlined"
          />
          <br />

          <TextField
            value={description}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth
            label="Description"
            variant="outlined"
          />
          <br />

          <TextField
            value={image}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth
            label="Image link"
            variant="outlined"
          />
          <br />

          <TextField
            value={price}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth
            label="price"
            variant="outlined"
          />
          <div>
            <button
              className="button-nav"
              variant="contained"
              style={{ width: "150px" }}
              onClick={async () => {
                axios.put(
                  "http://localhost:2424/admin/courses/" +
                    courseDetails.course._id,
                  {
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                    price,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                let updatedCourse = {
                  _id: courseDetails.course._id,
                  title: title,
                  description: description,
                  imageLink: image,
                  price,
                };
                setProductDetails({ course: updatedCourse, isLoading: false });
              }}
            >
              Update course
            </button>
            <Delcourse />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Delcourse() {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useRecoilState(productState);

  return (
    <button
      className="button-nav"
      style={{ marginLeft: "10px", width: "150px" }}
      variant={"contained"}
      onClick={async () => {
        try {
          const response = await axios.delete(
            "http://localhost:2424/admin/courses/" +
            productDetails.product._id,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          await Promise.all([
            navigate("/product"), // Redirect to the courses page
            setProductDetails({ course: null, isLoading: true }),
          ]);

          if (response.status === 200) {
            alert("Course deleted successfully");
          } else {
            console.error("Course deletion failed");
          }
        } catch (error) {
          console.error("Error deleting course:", error);
        }
      }}
    >
      Delete product
    </button>
  );
}

function CourseCard() {
  const title = useRecoilValue(productTitle);
  const imageLink = useRecoilValue(productImage);
  const description = useRecoilValue(productDescription);
  const price = useRecoilValue(productPrice);
  const stock = useRecoilValue(productStock);

  // console.log('Title:', title);
  // console.log('Image Link:', imageLink);
  // console.log('Description:', description);
  // console.log('Price:', price);
  return (
    <div style={{ display: "flex" ,marginLeft:"-80px"}}>
      
      <Card className="cardstyle" sx={{height:"100px"}}>
        <div style={{ marginLeft: 10, zIndex: 2 }}>
          <Typography textAlign={"center"} variant="h6">
            {title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle2">
            {description}
          </Typography>

          {/* <img src={imageLink} alt="course Image" style={{ width: 350 }} /> */}
          <Typography variant="subtitle2" style={{ color: "grey" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b> Rs {price}</b>
          </Typography>
          <Typography variant="subtitle2" style={{ color: "grey" }}>
           Stock
          </Typography>
          <Typography variant="subtitle1">
            <b> Rs {stock}</b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

export default Course;
