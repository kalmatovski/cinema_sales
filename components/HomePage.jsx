"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/icons/cinema.png";
import { userCheck } from "@/service/helpers";

const movies = [
  {
    id: 1,
    name: "Tom and Jerry",
    description:
      "Tom and Jerry is a cartoon where cat is about to catching mouse, but never catches",
    showtime: "12:30",
    tickets: 60,
  },
  {
    id: 2,
    name: "The Lion King",
    description:
      "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    showtime: "14:00",
    tickets: 50,
  },
  {
    id: 3,
    name: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    showtime: "16:00",
    tickets: 45,
  },
  {
    id: 4,
    name: "Avengers: Endgame",
    description:
      "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to undo Thanos' actions and restore order to the universe.",
    showtime: "18:30",
    tickets: 80,
  },
  {
    id: 5,
    name: "The Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    showtime: "20:00",
    tickets: 70,
  },
  {
    id: 6,
    name: "Jurassic Park",
    description:
      "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
    showtime: "21:45",
    tickets: 55,
  },
  {
    id: 7,
    name: "Toy Story",
    description:
      "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    showtime: "10:00",
    tickets: 65,
  },
  {
    id: 8,
    name: "Finding Nemo",
    description:
      "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish sets out on a journey to bring him home.",
    showtime: "11:30",
    tickets: 40,
  },
  {
    id: 9,
    name: "Harry Potter and the Philosopher's Stone",
    description:
      "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    showtime: "13:00",
    tickets: 75,
  },
  {
    id: 10,
    name: "Star Wars: Episode IV - A New Hope",
    description:
      "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    showtime: "15:30",
    tickets: 85,
  },
  {
    id: 11,
    name: "The Dark Knight",
    description:
      "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    showtime: "17:00",
    tickets: 90,
  },
];

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
          <span className="ml-3 text-2xl font-semibold">Cinema</span>
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
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{movie.name}</h3>
            <p className="text-gray-700 mb-4">{movie.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showtime: {movie.showtime}
              </span>
              <span className="text-sm text-gray-600">
                Tickets: {movie.tickets}
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
