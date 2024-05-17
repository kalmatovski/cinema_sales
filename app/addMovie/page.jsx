"use client";
import { addMovie } from "@/service/service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddStudent = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await addMovie(data);
      if (res.success) {
        router.refresh();
        reset();
      } else {
        console.log("Failed to add movie", res);
      }
    } catch (error) {
      console.error("Error adding movie:", error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/1 m-auto bg-white  rounded-md p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Movie</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            {...register("name", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? "border-red-500" : ""
            }`}
            id="name"
            type="text"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">Name is required</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            {...register("description", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description ? "border-red-500" : ""
            }`}
            id="description"
            type="text"
            placeholder="description"
          />
          {errors.lastname && (
            <p className="text-red-500 text-xs italic">Lastname is required</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="showtime"
          >
            Show time
          </label>
          <input
            {...register("showtime", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.showtime ? "border-red-500" : ""
            }`}
            id="showtime"
            type="text"
            placeholder="showtime"
          />
          {errors.showtime && (
            <p className="text-red-500 text-xs italic">Username is required</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ticket_available"
          >
            Ticket Available
          </label>
          <input
            {...register("ticket_available", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : ""
            }`}
            id="ticket_available"
            type="number"
            placeholder="ticket_available"
          />
          {errors.ticket_available && (
            <p className="text-red-500 text-xs italic">Password is required</p>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddStudent;
