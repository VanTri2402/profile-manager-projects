// D:\code\chinese_app_learning\CNAL_BE\config\viewsServer.js
const express = require("express");
const axios = require("axios");
const asyncHandler = require("express-async-handler");

const viewsServer = (app) => {
  app.get(
    "/",
    asyncHandler(async (req, res) => {
      try {
        // Gọi API /read
        const response = await axios({
          method: "get",
          url: "http://localhost:3000/read", // Sửa endpoint
          headers: {
            "Content-Type": "application/json",
            // Thêm Authorization nếu API yêu cầu JWT
            token: `Bearer ${process.env.JWT_ACCESS_TOKEN}`,
          },
        });
        const users = response.data.users || []; // Lấy users, mặc định mảng rỗng nếu không có
        res.render("home", { users });
      } catch (error) {
        console.error("Lỗi khi gọi API /read:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        res.render("home", { users: [] });
      }
    })
  );

  app.get("/loginServer", async (req, res) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        // Sửa endpoint
      });
      if(response.data) {
        res.render("loginServer", { message: response.data.message });
      }
    } catch (e) {}
  });
};

module.exports = viewsServer;
