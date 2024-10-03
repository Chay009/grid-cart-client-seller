import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";
import { motion } from "framer-motion";
import { useEffect } from "react";

function Landing() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  useEffect(() => {

    if (localStorage.getItem('sellerId')) {
      navigate('/products');
    }
  }, [ navigate]);
  return (
    <div className="bg-gray-900 text-white">
      {/* Header Section */}
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-7xl">
          {/* Left Column: Text Section */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <h1 className="text-5xl font-bold mb-4 leading-tight text-yellow-400">
                Gridkart Admin Dashboard
              </h1>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="text-xl mb-6 text-gray-300">
                Streamline your product management with powerful features and a
                modern UI, designed for simplicity and efficiency.
              </p>
            </motion.div>

            {!userLoading && !userEmail && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex space-x-4 mt-8">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 font-semibold"
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 font-semibold"
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Image Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: 80 },
              visible: { opacity: 1, x: 0 },
            }}
            className="flex justify-center items-center"
          >
            <img
              className="rounded-lg shadow-lg w-3/4 md:w-full"
              src="https://www.creativefabrica.com/wp-content/uploads/2023/05/12/Man-Sitting-On-Chair-In-Front-Of-Computer-Side-Portrait-69523548-1.png"
              alt="Man sitting on chair in front of a computer"
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-12">
            Why Choose Gridkart Admin?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Manage Products</h3>
              <p className="text-gray-300">
                Effortlessly add, update, or delete products, with an intuitive
                and user-friendly interface.
              </p>
            </div>
        
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Easy to Use Interface
              </h3>
              <p className="text-gray-300">
                A clean, responsive, and easy-to-use dashboard to manage your
                entire product inventory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-12">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">
                "Gridkart Admin has made managing my products so easy! I can
                update prices and descriptions in just a few clicks."
              </p>
              <h3 className="font-bold text-yellow-400">- John Doe</h3>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">
                "The interface is so clean and easy to navigate. It has saved me
                countless hours on product management!"
              </p>
              <h3 className="font-bold text-yellow-400">- Jane Smith</h3>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      
      )

     }
export default Landing;