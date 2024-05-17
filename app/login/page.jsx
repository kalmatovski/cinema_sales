"use client";
import { setItem, userCheck } from "@/service/helpers";
import { signIn } from "@/service/service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const router = useRouter();
  const [err, setErr] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (userCheck()) {
      router.push("/");
    }
  });

  const onSubmit = async (data) => {
    try {
      const res = await signIn(data);
      if (res.success) {
        router.push("/");
      } else {
        alert(res.error.error);
      }
    } catch (error) {
      console.log("Error signing in:", error.message);
    } finally {
      reset();
      setItem(data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`w-full p-2 border rounded ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full p-2 border rounded ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
            <Link href="/login/admin" className="w-1/3">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Admin
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
