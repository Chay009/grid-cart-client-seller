import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const attributesByCategory = {
  furniture: {
    materials: ['Wood', 'Metal', 'Glass', 'Plastic', 'Fabric'],
    dimensions: ['Small (e.g., 40x40 cm)', 'Medium (e.g., 60x60 cm)', 'Large (e.g., 80x80 cm)', 'Extra Large (e.g., 100x100 cm)'],
    colors: ['Black', 'White', 'Brown', 'Gray', 'Beige'],
  },
  electronics: {
    screenSizes: ['5 inches', '5.5 inches', '6 inches', '6.5 inches', '7 inches'],
    storageCapacities: ['32GB', '64GB', '128GB', '256GB', '512GB'],
    batteryLives: ['3000mAh', '4000mAh', '5000mAh', '6000mAh'],
    connectivityOptions: ['4G', '5G', 'Wi-Fi', 'Bluetooth', 'NFC'],
    processorTypes: ['Snapdragon 888', 'Snapdragon 870', 'Exynos 2100', 'Apple A14 Bionic'],
    RAMOptions: ['4GB', '6GB', '8GB', '12GB', '16GB'],
  },
  clothes: {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  books: {
    genres: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Biography', 'Mystery', 'Thriller', 'Romance', 'Historical', 'Self-Help'],
    formats: ['Hardcover', 'Paperback', 'Ebook', 'Audiobook'],
    publicationYears: ['2020', '2021', '2022', '2023', '2024'],
    languages: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Portuguese'],
  },
};

function AddNewProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    brand: '',
    stock: '',
    imageLink: '',
    price: '',
    category: '',
  });
  const [attributes, setAttributes] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'category') {
      setAttributes({});
    }
  };

  const handleAttributeChange = (e) => {
    const { name, value } = e.target;
    setAttributes({ ...attributes, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const sellerId = localStorage.getItem('sellerId');
    try {
     

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/create-products/${sellerId}`,
        {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          attributes,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

     

      alert('Product added successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error?.response?.data?.message)
      setIsLoading(false);
      alert('An error occurred while adding the product.');
    }
  };

  const renderAttributes = () => {
    const attributesList = attributesByCategory[formData.category];
    if (!attributesList) return null;

    return Object.entries(attributesList).map(([key, options]) => (
      <div key={key} className="mb-4">
        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </label>
        <select
          name={key}
          value={attributes[key] || ''}
          onChange={handleAttributeChange}
          id={key}
          required
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 p-2"
        >
          <option value="">Select {key}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    ));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 px-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 relative  ">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-14 w-14 bg-purple-200 rounded-full flex items-center justify-center">
              <PlusCircle size={30} className="text-purple-500" />
            </div>
            <h1 className="text-3xl font-semibold text-gray-900">Add New Product</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
            {/* Title Field */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-md border-gray-300 bg-gray-400/10 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 p-2"
              />
            </div>
            
            {/* Description Field */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full rounded-md border-gray-300  bg-gray-400/10 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 p-2"
              ></textarea>
            </div>

            {/* Other Input Fields */}
            {['brand', 'imageLink', 'price', 'stock'].map((field, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300  bg-gray-400/10 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 p-2"
                />
              </div>
            ))}

            {/* Category Field */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-md border-gray-300  bg-gray-400/10  shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:ring-opacity-50 p-2"
              >
                <option value="">Select Category</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="books">Books</option>
              </select>
            </div>

            {renderAttributes()}

            {/* Submit Button */}
            <div>
            <button
            type="submit"
            className="w-full  py-3 px-4 flex items-center justify-center border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
           
          
            
            {isLoading ? (
             <p className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin">
             </p>
             ): <div className='flex items-center justify-center'>
             <Tag className="w-5 h-5 mr-2" />
             Add Product
             </div>}

          </button>
</div>
              
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewProduct;
