"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/icons/cinema.png";
import { adminCheck, signOut, userCheck } from "@/service/helpers";
import axios from "axios";
import { main_url } from "@/api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteMovie } from "@/service/service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddStudent from "@/app/addMovie/page";

const HomePage = () => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getData();
    if (userCheck() || adminCheck()) {
      setIsLogged(true);
    }
    if (adminCheck()) {
      setIsAdmin(true);
    }
  }, []);

  const getData = async () => {
    const m = await axios.get(`${main_url}/get_movies`);
    setMovies(m.data);
  };

  const logOut = () => {
    signOut();
    setIsLogged(false);
    setIsAdmin(false);
  };

  const deletemovie = async (id) => {
    await deleteMovie(id);
    getData();
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
          <div className="flex">
            {isAdmin ? (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 ">
                    Add Movie
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <AddStudent />
                </DialogContent>
              </Dialog>
            ) : null}
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
              onClick={logOut}
            >
              Log out
            </button>
          </div>
        )}
      </header>
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg p-4 w-11/12 h-full"
          >
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
            {isLogged && !isAdmin ? (
              <button className="mt-4 bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
                Book Now
              </button>
            ) : null}
            {isAdmin ? (
              <button
                className="mt-4 bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => deletemovie(movie.id)}
              >
                Delete movie
              </button>
            ) : null}
          </div>
        ))}
      </main>
    </>
  );
};

export default HomePage;
