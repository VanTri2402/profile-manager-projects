import axios from "axios";
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailed,
  createProductStart,
  createProductSuccess,
  createProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailed,
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
} from "../redux/productSlice";

const API_URL = "http://localhost:3000/api";

// Lấy danh sách sản phẩm
export const fetchAllProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await axios.get(`${API_URL}/get-products`);
    // BE trả về { products: [...] }
    dispatch(getProductsSuccess(res.data.products || []));
    return res.data.products;
  } catch (error) {
    dispatch(getProductsFailed(error.response?.data?.message || error.message));
  }
};

// Tạo sản phẩm mới
export const addNewProduct = async (dispatch, productData) => {
  dispatch(createProductStart());
  try {
    const res = await axios.post(`${API_URL}/create-product`, productData);
    dispatch(createProductSuccess(res.data.product));
    return res.data.product;
  } catch (error) {
    dispatch(
      createProductFailed(error.response?.data?.message || error.message)
    );
  }
};

// Xóa sản phẩm
export const removeProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`${API_URL}/delete-product/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(
      deleteProductFailed(error.response?.data?.message || error.message)
    );
  }
};

// Cập nhật sản phẩm
export const editProduct = async (dispatch, id, productData) => {
  dispatch(updateProductStart());
  try {
    const res = await axios.put(`${API_URL}/update-product/${id}`, productData);
    dispatch(updateProductSuccess(res.data.product));
    return res.data.product;
  } catch (error) {
    dispatch(
      updateProductFailed(error.response?.data?.message || error.message)
    );
  }
};
