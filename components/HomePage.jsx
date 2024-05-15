"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/icons/cinema.png";
import { userCheck } from "@/service/helpers";

const HomePage = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (userCheck()) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Cinema Logo"
            width={70}
            height={70}
            className="ml-7"
          />
        </div>
        {!isLogged ? (
          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
              Sign In
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </button>
          </div>
        ) : null}
      </header>
    </>
  );
};

export default HomePage;
