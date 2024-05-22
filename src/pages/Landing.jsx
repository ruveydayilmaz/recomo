import React, { useEffect, useState } from "react";

import { searchMovie } from "../api/movies";

import MovieCard from "../components/MovieCard";
import PreviewModal from "../components/PreviewModal";
import Footer from "../components/Footer";
import TutorialModal from "../components/TutorialModal";
import ThemeToggle from "../components/ThemeToggle";

const Landing = () => {
  const tourStatus = JSON.parse(localStorage.getItem('recomo_tour_status'));

  const [dialog, setDialog] = useState(6);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(true);
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

  useEffect(() => {
    if (!tourStatus) {
      setDialog(1)
    }
  }, [])

  // Function to handle movie selection
  const handleMovieSelect = (movie) => {
    setDialog(4);

    if (selectedMovies.includes(movie)) {
      setSelectedMovies(selectedMovies.filter((selectedMovie) => selectedMovie !== movie));
    } else {
      if (selectedMovies.length < 4) {
        setSelectedMovies([...selectedMovies, movie]);
        if (!isFirstMovieSelected) {
          setIsFirstMovieSelected(true);
        }
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false); // Clear the alert after 3 seconds
        }, 3000);
      }
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setDialog(3);

    if (searchQuery.trim() !== "") {
      setLoading(true);
      try {
        const response = await searchMovie(searchQuery, 1);
        setMovies(response.data.results);
        if (response.data.total_pages > 1) setDisabled(false);
        setLoading(false);
        setPage(1);
      } catch (error) {
        console.error("Error searching movies:", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await searchMovie(searchQuery, page);
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);

        if (response.data.total_pages > page) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="flex flex-col items-center relative justify-between dark:bg-dark-100 dark:text-white min-h-screen">
      {dialog != 6 && !tourStatus && <TutorialModal />}

      {/* Render the preview button if movies are selected */}
      {selectedMovies.length !== 0 && (
        <div
          className={`fixed top-8 right-3 md:right-12 z-30 ${isFirstMovieSelected ? "animate-shake" : ""} ${dialog == 4 ? 'z-[2001]' : ''}`}
          onClick={() => { setPreviewOpen(!previewOpen); setDialog(5); }}
        >
          <button className="flex p-2.5 bg-primary-500 rounded-xl hover:rounded-3xl transition-all duration-300 text-white dark:text-dark-600 border-2 border-white dark:border-dark-600">
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

      {/* Render the alert if maximum movie selection limit is reached */}
      {showAlert && (
        <div className="flex bg-[#ADD8E6] rounded-lg py-4 px-8 text-sm text-dark-700 fixed border-2 border-white top-8 z-40">
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
            <span className="font-medium">Info alert!</span> You can select a maximum of 4 movies.
          </div>
        </div>
      )}

      <ThemeToggle />

      <div className="text-center sm:mb-12 px-2 mt-52 flex flex-col items-center">
        <h1 className="text-xl sm:text-xl md:text-3xl lg:text-5xl font-bold">
          Recomo, a new way to share movies
        </h1>
        <div className="flex items-center space-x-1 lg:pt-4 dark:text-white">
          <p className="text-center lg:text-xl">
            Pick your top movies, design a personalized card, and spread the joy with your friends.
          </p>
          <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <path d="M208.8584,144a15.85626,15.85626,0,0,1-10.46778,15.01367l-52.16015,19.2168-19.2168,52.16015a16.00075,16.00075,0,0,1-30.02734,0l-19.2168-52.16015-52.16015-19.2168a16.00075,16.00075,0,0,1,0-30.02734l52.16015-19.2168,19.2168-52.16015a16.00075,16.00075,0,0,1,30.02734,0l19.2168,52.16015,52.16015,19.2168A15.85626,15.85626,0,0,1,208.8584,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z" />
          </svg>
        </div>

        <form onSubmit={handleSearchSubmit} className={`flex mt-14 relative ${dialog == 2 ? 'z-[2001]' : ''}`}>
          <input
            type="text"
            placeholder="Search movies"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="rounded-l-lg p-4 text-dark-800 bg-white dark:bg-dark-200 dark:text-white focus:outline-none focus:ring-0 border-none"
          />
          <button
            type="submit"
            className="px-8 rounded-r-lg bg-primary-500 text-dark-300 font-bold p-4 uppercase"
          >
            Search
          </button>
        </form>

        {
          !tourStatus && (
            <div className="mt-4 z-[2001]">
              {
                dialog == 1 ? (
                  <div className="flex items-center space-x-2">
                    <p className="text-white text-left">Welcome! Recomo is a website that helps you recommend movies to your friends easier.</p>
                    <button onClick={() => setDialog(2)} className="px-2 py-1 rounded-md bg-primary-500">Next</button>
                  </div>
                ) : dialog == 2 ? (
                  <p className="text-white text-left">First, search for a movie.</p>
                ) : dialog == 3 ? (
                  <p className="text-white text-left">Choose a movie.</p>
                ) : dialog == 4 ? (
                  <p className="text-white absolute right-4 top-20">Open the card modal.</p>
                ) : dialog == 5 ? (
                  <div className="flex items-center space-x-2">
                    <p className="text-white text-left">Choose more movies or design your card and download it to share.</p>
                    <button onClick={() => { setDialog(6); localStorage.setItem('recomo_tour_status', true); }} className="px-2 py-1 rounded-md bg-primary-500">Finish Tour</button>
                  </div>
                ) : null
              }
            </div>
          )
        }
      </div>

      {/* Render the preview modal if it's open */}
      {previewOpen && (
        <PreviewModal
          cardStyle={cardStyle}
          setCardStyle={setCardStyle}
          selectedMovies={selectedMovies}
          handleMovieSelect={handleMovieSelect}
          setPreviewOpen={setPreviewOpen}
        />
      )}

      {/* Render loading spinner or movie cards */}
      {loading ? (
        <div className="flex justify-center items-center space-x-1 text-md text-dark-700 dark:text-dark-300">
          <svg fill='none' className="w-12 h-12 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
            <path clip-rule='evenodd'
              d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
              fill='currentColor' fill-rule='evenodd' />
          </svg>

          <p>Loading ...</p>
        </div>
      ) : (
        <div className={`flex flex-col mb-12 items-center ${dialog == 3 ? 'z-[2001]' : ''}`}>
          <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:p-12 xl:grid-cols-4 py-12 px-3">
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

          {
            movies.length > 0 && (
              <button type="button"
                disabled={disabled}
                onClick={() => setPage(page + 1)}
                className="flex items-center rounded-full border border-dark-500 px-3 py-2 text-center text-sm font-medium text-dark-500 hover:bg-dark-600/5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-4 w-4">
                  <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clip-rule="evenodd" />
                </svg>
                View More
              </button>
            )
          }
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Landing;
