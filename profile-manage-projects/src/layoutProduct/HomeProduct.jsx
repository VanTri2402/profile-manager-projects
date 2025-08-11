import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  removeProduct,
  editProduct,
} from "../api/productApi";
import { FaTrash, FaSearch, FaSync, FaStar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import NavbarProduct from "./NavbarProduct";
import { setTheme } from "../redux/themeSlice";

const HomeProduct = () => {
  const dispatch = useDispatch();
  const { products, isFetching, error } = useSelector((state) => state.product);
  const themes = useSelector((state) => state.theme.themes);
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = themes[themeMode];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [deleteLoading, setDeleteLoading] = useState({});
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [price, setPrice] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updateProductData, setUpdateProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProducts);
  }, [dispatch]);

  const handleDeleteProduct = async (id) => {
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    await removeProduct(dispatch, id);
    setDeleteLoading((prev) => ({ ...prev, [id]: false }));
    fetchAllProducts(dispatch);
    toast.success("Xóa sản phẩm thành công!");
  };

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const handleThemeChange = (themeName) => {
    dispatch(setTheme(themeName));
    setShowThemeModal(false);
  };

  const handleAddProduct = () => {
    navigate("/product/create");
  };

  const handleOpenUpdateModal = (product) => {
    setUpdateProductData(product);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setShowModalUpdate(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!updateProductData) return;
    await editProduct(dispatch, updateProductData._id, {
      name,
      price,
      image,
    });
    setShowModalUpdate(false);
    setUpdateProductData(null);
    toast.success("Cập nhật sản phẩm thành công!");
    fetchAllProducts(dispatch);
  };

  const SkeletonCard = () => (
    <div className={`${theme.card} animate-pulse`}>
      <div className="w-full h-48 bg-gray-700/50 rounded-xl mb-4"></div>
      <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700/50 rounded w-1/2 mb-4"></div>
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-700/50 rounded-xl"></div>
        <div className="flex-1 h-10 bg-gray-700/50 rounded-xl"></div>
      </div>
    </div>
  );

  const ProductCard = ({ product }) => (
    <div
      className={`${theme.card} group backdrop-blur-sm border ${theme.border} rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:scale-105 animate-fade-in`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300/374151/9CA3AF?text=No+Image";
          }}
        />
        <button
          onClick={() => handleDeleteProduct(product._id)}
          disabled={deleteLoading[product._id]}
          className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-sm transition-colors duration-200 disabled:opacity-50"
        >
          {deleteLoading[product._id] ? (
            <FaSync className="animate-spin w-4 h-4" />
          ) : (
            <FaTrash className="w-4 h-4" />
          )}
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <span className="text-2xl font-bold text-white">
            ${product.price}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className={`${theme.text} text-lg font-semibold mb-1 line-clamp-1`}>
          {product.name}
        </h3>
        <p className={`${theme.textSecondary} text-sm line-clamp-1 mb-2`}>
          {product.description || "Chưa có mô tả"}
        </p>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`w-4 h-4 ${
                i < (product.rating || 4) ? "text-yellow-400" : "text-gray-600"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl transition-colors duration-200 text-sm font-medium relative overflow-hidden group/button">
            <span className="relative z-10">Chi tiết</span>
            <span className="absolute inset-0 bg-blue-400/50 scale-0 group-hover/button:scale-100 transition-transform duration-200 rounded-full origin-center"></span>
          </button>
          <button
            onClick={() => handleOpenUpdateModal(product)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition-colors duration-200 text-sm font-medium relative overflow-hidden group/button"
          >
            <span className="relative z-10">Sửa</span>
            <span className="absolute inset-0 bg-green-400/50 scale-0 group-hover/button:scale-100 transition-transform duration-200 rounded-full origin-center"></span>
          </button>
        </div>
      </div>
    </div>
  );

  if (showModalUpdate === true && updateProductData) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div
          className={`${theme.card} rounded-2xl shadow-2xl overflow-hidden border ${theme.border}`}
        >
          <div className="p-8">
            <h2 className={`text-2xl font-bold ${theme.text}`}>
              Cập nhật sản phẩm
            </h2>
            <form className="mt-6 space-y-4" onSubmit={handleUpdateProduct}>
              <div>
                <label className={`block mb-1 font-medium ${theme.text}`}>
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:border-blue-500/50 focus:outline-none`}
                  placeholder="Nhập tên sản phẩm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={`block mb-1 font-medium ${theme.text}`}>
                  Giá
                </label>
                <input
                  type="number"
                  className={`w-full px-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:border-blue-500/50 focus:outline-none`}
                  placeholder="Nhập giá sản phẩm"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min={0}
                  required
                />
              </div>
              <div>
                <label className={`block mb-1 font-medium ${theme.text}`}>
                  Hình ảnh
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-xl border ${theme.border} ${theme.card} ${theme.text} focus:border-blue-500/50 focus:outline-none`}
                  placeholder="URL hình ảnh"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
              >
                Cập nhật
              </button>
            </form>
            <button
              onClick={() => {
                setShowModalUpdate(false);
                setUpdateProductData(null);
              }}
              className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (isFetching) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradient}`}>
        <NavbarProduct onAddProduct={handleAddProduct} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient}`}>
      <Toaster position="top-right" />
      <NavbarProduct onAddProduct={handleAddProduct} />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative container mx-auto px-4 py-8">
        <div
          className={`${theme.card} backdrop-blur-sm border ${theme.border} rounded-2xl p-6 mb-8`}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                onChange={(e) => debouncedSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className={`w-full pl-10 pr-4 py-3 ${theme.card} ${theme.text} rounded-xl border ${theme.border} focus:border-blue-500/50 focus:outline-none transition-colors`}
              />
              <FaSearch className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full md:w-auto px-4 py-3 ${theme.card} ${theme.text} rounded-xl border ${theme.border} focus:border-blue-500/50 focus:outline-none`}
              >
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp</option>
                <option value="price-high">Giá cao</option>
              </select>
              <button
                onClick={() => dispatch(fetchAllProducts)}
                className={`flex items-center gap-2 px-4 py-3 ${theme.card} rounded-xl hover:bg-gray-600/50 transition-colors ${theme.textSecondary} hover:${theme.text} w-full md:w-auto`}
              >
                <FaSync className="w-4 h-4" />
                Làm mới
              </button>
            </div>
          </div>
          <div className={`mt-4 text-sm ${theme.textSecondary}`}>
            Tổng cộng: {filteredProducts.length} sản phẩm
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-8 text-center">
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => dispatch(fetchAllProducts)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {filteredProducts.length === 0 && !isFetching ? (
          <div className="text-center py-16">
            <FaStar className="w-24 h-24 text-gray-600 mx-auto mb-4" />
            <h3 className={`text-xl font-semibold ${theme.textSecondary} mb-2`}>
              Không có sản phẩm nào
            </h3>
            <p className="text-gray-500">
              Chưa có sản phẩm nào được thêm vào cửa hàng.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
      {/* {/* Theme Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div
            className={`w-full max-w-lg ${theme.card} rounded-2xl shadow-2xl overflow-hidden border ${theme.border} animate-scaleIn`}
          >
            <div className={`p-8 pb-6 bg-gradient-to-r ${theme.button}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FaSun className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Chọn Theme Giao Diện
                    </h2>
                    <p className="text-white/80 text-sm">
                      Tùy chỉnh giao diện cho vibe của bạn!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <FaSync className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-8 pt-6">
              <div className="space-y-4">
                {Object.entries(themes).map(([key, themeOption]) => (
                  <div
                    key={key}
                    onClick={() => handleThemeChange(key)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                      themeMode === key
                        ? `border-blue-500 bg-blue-500/10`
                        : `border-gray-700 hover:border-gray-600 bg-gray-800/50`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-16 h-12 rounded-lg bg-gradient-to-br ${themeOption.gradient} border ${themeOption.border} flex items-center justify-center`}
                        >
                          <div
                            className={`w-6 h-6 bg-gradient-to-r ${themeOption.button} rounded-md flex items-center justify-center`}
                          >
                            <FaSun className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className={`font-semibold ${themeOption.text}`}>
                            {themeOption.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {themeOption.description}
                          </p>
                        </div>
                      </div>
                      {themeMode === key && (
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                          <FaStar className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowThemeModal(false)}
                className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      */
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
export default HomeProduct;
