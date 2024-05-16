"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/icons/cinema.png";
import { signOut, userCheck } from "@/service/helpers";
import axios from "axios";
import { main_url } from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getData();
    if (userCheck()) {
      setIsLogged(true);
    }
  }, []);

  const getData = async () => {
    const m = await axios.get(`${main_url}/get_movies`);
    setMovies(m.data);
  };

  const logOut = () => {
    signOut();
    setIsLogged(false);
  };

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
          <span className="ml-3 text-2xl font-semibold">Cinema</span>
        </div>
        {!isLogged ? (
          <div>
            <Link href="/login">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={logOut}
          >
            Log out
          </button>
        )}
      </header>
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies?.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
            <p className="text-gray-700 mb-4">{movie.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showtime: {movie.showtime}
              </span>
              <span className="text-sm text-gray-600">
                Tickets: {movie.ticket_available}
              </span>
            </div>
            <button className="mt-4 bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
              Book Now
            </button>
          </div>
        ))}
      </main>
    </>
  );
};

export default HomePage;
