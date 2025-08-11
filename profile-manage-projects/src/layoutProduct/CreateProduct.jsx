import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../api/productApi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const themes = useSelector((state) => state.theme.themes);
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = themes[themeMode];
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (product.name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    if (!product.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(product.price) || parseFloat(product.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }

    if (!product.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(product.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await addNewProduct(dispatch, {
        name: product.name,
        price: product.price,
        image: product.image,
      });
      await fetchAllProducts(dispatch); 
      setProduct({ name: "", price: "", image: "" });
      navigate("/product");
    } catch (error) {
      // Toast đã hiển thị trong productApi.js
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center p-4`}
    >
      <ToastContainer />
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main form */}
        <div
          className={`${theme.card} backdrop-blur-xl border ${theme.border} p-8 rounded-2xl shadow-2xl`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h2
              className={`text-2xl font-bold ${theme.text} bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}
            >
              Create New Product
            </h2>
            <p className={`${theme.textSecondary} mt-2`}>
              Add your product to the catalog
            </p>
          </div>

          {/* Form fields */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label
                className={`block ${theme.textSecondary} mb-2 font-medium`}
              >
                Product Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className={`w-full p-4 ${theme.card} ${
                    theme.text
                  } rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-400"
                      : `${theme.border} focus:border-blue-500/50`
                  }`}
                  placeholder="Enter product name"
                />
                <div className="absolute right-4 top-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                    />
                  </svg>
                </div>
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                className={`block ${theme.textSecondary} mb-2 font-medium`}
              >
                Price
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 text-gray-400 font-semibold">
                  $
                </div>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full p-4 pl-8 ${theme.card} ${
                    theme.text
                  } rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                    errors.price
                      ? "border-red-500 focus:border-red-400"
                      : `${theme.border} focus:border-blue-500/50`
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.price && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.price}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label
                className={`block ${theme.textSecondary} mb-2 font-medium`}
              >
                Image URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  className={`w-full p-4 ${theme.card} ${
                    theme.text
                  } rounded-xl border-2 transition-all duration-200 focus:outline-none ${
                    errors.image
                      ? "border-red-500 focus:border-red-400"
                      : `${theme.border} focus:border-blue-500/50`
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
                <div className="absolute right-4 top-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              {errors.image && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.image}
                </p>
              )}

              {/* Image Preview */}
              {product.image && isValidUrl(product.image) && (
                <div className="mt-3 p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">Preview:</p>
                  <img
                    src={product.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-8 p-4 rounded-xl font-semibold text-white transition-all duration-200 transform cursor-pointer ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Product...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Product
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
