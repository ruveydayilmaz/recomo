import React, { useState } from "react";
import { searchMovie } from "../api/movies";
import MovieCard from "../components/MovieCard";

import PreviewModal from "../components/PreviewModal";
import Footer from "../components/Footer";

const Landing = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isFirstMovieSelected, setIsFirstMovieSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [cardStyle, setCardStyle] = useState({
    borderRadius: "5px",
    backgroundColor: "#f3f4f6",
  });

  const handleMovieSelect = (movie) => {
    if (selectedMovies.includes(movie)) {
      setShowAlert(false);
      setSelectedMovies(
        selectedMovies.filter((selectedMovie) => selectedMovie !== movie)
      );
    } else {
      if (selectedMovies.length < 4) {
        setSelectedMovies([...selectedMovies, movie]);
        if (!isFirstMovieSelected) {
          setIsFirstMovieSelected(true);
        }
      } else {
        setShowAlert(true);
      }
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      setLoading(true);
      try {
        const response = await searchMovie(searchQuery);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error searching movies:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center relative h-screen justify-between">
      {selectedMovies.length != 0 && (
        <div
          className={`fixed top-8 right-12 z-30 ${
            isFirstMovieSelected ? "animate-shake" : ""
          }`}
          onClick={() => setPreviewOpen(!previewOpen)}
        >
          <button className="flex p-2.5 bg-[#ADD8E6] rounded-xl hover:rounded-3xl transition-all duration-300 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>
      )}
      {showAlert && (
        <div className="flex bg-[#ADD8E6] rounded-lg p-4 text-sm text-gray-700 absolute top-8">
          <svg
            className="w-5 h-5 inline mr-3"
            fill="white"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">Info alert!</span> You can select max 4 movies
          </div>
        </div>
      )}
      <h1 className="text-6xl font-bold mt-48">Share movies with friends</h1>
      <span className="mt-2 mb-12">
        Select your favorite movies, create a card and share it with your friends✨
      </span>

      {previewOpen && (
        <PreviewModal
          cardStyle={cardStyle}
          setCardStyle={setCardStyle}
          selectedMovies={selectedMovies}
          handleMovieSelect={handleMovieSelect}
          setPreviewOpen={setPreviewOpen}
        />
      )}

      <form onSubmit={handleSearchSubmit} className="flex">
        <input
          type="text"
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="rounded-l-lg p-4 border-t border-b border-l text-gray-800 border-gray-200 bg-white focus:outline-none"
        />
        <button
          type="submit"
          className="px-8 rounded-r-lg bg-yellow-400 text-gray-800 font-bold p-4 uppercase border-yellow-500"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="">
          <div className="w-8 h-8 border-4 border-yellow-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col mb-12">
          <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-12">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                selected={selectedMovies.includes(movie)}
                onSelect={handleMovieSelect}
                cardStyle={cardStyle}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Landing;
