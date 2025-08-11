import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Baitaphtml = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[400px] rounded-2xl shadow-lg bg-white p-6">
        <h2 className="text-2xl font-semibold text-center text-primary-600 mb-6">
          Đăng nhập
        </h2>

        {/* Tên đăng nhập */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Tên đăng nhập
          </label>
          <input
            type="text"
            id="username"
            placeholder="Nhập 6-20 ký tự"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>

        {/* Mật khẩu */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="w-full border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
              <FontAwesomeIcon icon={faEye} />
            </span>
          </div>
        </div>

        {/* Nút đăng nhập */}
        <button className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition duration-300">
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Baitaphtml;
