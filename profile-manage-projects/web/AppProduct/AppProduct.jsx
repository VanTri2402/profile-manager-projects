import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateProduct from "../../src/layoutProduct/createProduct";
import HomeProduct from "../../src/layoutProduct/HomeProduct";
import NavbarProduct from "../../src/layoutProduct/NavbarProduct";
const AppProduct = () => {
  return (
    <>
      <Routes>
        <Route path="create" element={<CreateProduct />} />
        <Route index element={<HomeProduct />} />
      </Routes>
    </>
  );
};

export default AppProduct;
