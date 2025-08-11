import React from "react";
import HomeUser from "../../src/layoutManagerUsers/homeUsers";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import ManageUserLogin from "../../src/layoutManagerUsers/ManageUserLogin";
import ManagerUserRegister from "../../src/layoutManagerUsers/ManagerUserRegister";
const AppMangerUser = () => {
  return (
    <Routes>
      <Route index element={<HomeUser />} />
      <Route path="login" element={<ManageUserLogin />} />
      <Route path="register" element={<ManagerUserRegister />} />
    </Routes>
  );
};

export default AppMangerUser;
