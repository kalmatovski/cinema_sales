"use client";

import React from "react";
import { useForm } from "react-hook-form";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle admin login logic here
    reset(); // Reset the form after submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="adminKeyword"
              className="block text-gray-700 font-medium mb-2"
            >
              Admin Keyword
            </label>
            <input
              id="adminKeyword"
              type="text"
              className={`w-full p-2 border rounded ${
                errors.adminKeyword ? "border-red-500" : "border-gray-300"
              }`}
              {...register("adminKeyword", {
                required: "Admin keyword is required",
              })}
            />
            {errors.adminKeyword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adminKeyword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
