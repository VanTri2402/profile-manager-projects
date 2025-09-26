const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController.js");

const initWebProductRouter = (app) => {
  router.post("/create-product", ProductController.createProduct);
  router.get("/get-products", ProductController.getProducts);
  router.delete("/delete-product/:id", ProductController.deleteProduct);
  router.put("/update-product/:id", ProductController.updateProduct);
  router.get("/test", (req, res) => {
    res.json({ message: "Router product hoạt động!" });
  });
  // ...existing code...
  return app.use("/api", router);
};
module.exports = initWebProductRouter;
