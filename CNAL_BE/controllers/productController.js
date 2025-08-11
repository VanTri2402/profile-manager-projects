const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ message: "name , price , image is require" });
    }

    const newProduct = await Product.create({ name, price, image });
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "create product is success !", product: newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Interval in Sever" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res
      .status(200)
      .json({ message: "get products in success !", products: products });
  } catch (error) {
    return res.status(500).json({ message: "Interval in Sever" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ message: "Product not found !" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete Product is Success !" });
  } catch (error) {
    return res.status(500).json({ message: "Interval in Sever" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    if (!id) {
      return res.status(404).json({ message: "Product not found in update !" });
    }
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ message: "name , price , image is require" });
    }
    const productAfterUpdate = await Product.findOneAndUpdate(
      { _id: id },
      { name, price, image },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "update Product success", product: productAfterUpdate });
  } catch (error) {
    return res.status(500).json({ message: "Interval in Sever" });
  }
};
module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
