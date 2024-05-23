// PACKAGES
import React, { useEffect, useState } from "react";

// API
import { searchMovie } from "../api/movies";

// COMPONENTS
import MovieCard from "../components/MovieCard";
import PreviewModal from "../components/PreviewModal";
import Footer from "../components/Footer";
import TutorialModal from "../components/TutorialModal";
import ThemeToggle from "../components/ThemeToggle";
import Alert from "../components/Alert";
import PreviewButton from "../components/PreviewButton";
import LoadingSpinner from "../components/LoadingSpinner";

// ASSETS
import { ArrowDownIcon, SparkleIcon } from "../assets/Icons";

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

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
      {dialog != 6 && !tourStatus && <TutorialModal dialog={dialog} setDialog={setDialog} tourStatus={tourStatus} />}

      {/* Render the preview button if movies are selected */}
      {selectedMovies.length !== 0 && (
        <PreviewButton
          dialog={dialog}
          setDialog={setDialog}
          previewOpen={previewOpen}
          setPreviewOpen={setPreviewOpen}
          isFirstMovieSelected={isFirstMovieSelected}
        />
      )}

      {/* Render the alert if maximum movie selection limit is reached */}
      {showAlert && <Alert />}

      <ThemeToggle />

      <div className="text-center sm:mb-12 px-2 mt-52 flex flex-col items-center">
        <h1 className="text-xl sm:text-xl md:text-3xl lg:text-5xl font-bold">
          Recomo, a new way to share movies
        </h1>
        <div className="flex items-center space-x-1 lg:pt-4 dark:text-white">
          <p className="text-center lg:text-xl">
            Pick your top movies, design a personalized card, and spread the joy with your friends.
          </p>
          <SparkleIcon />
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
        <LoadingSpinner />
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
                className="flex items-center rounded-full border border-dark-500 px-3 py-2 text-center text-sm font-medium text-dark-500 hover:bg-dark-600/5"
              >
                <ArrowDownIcon className="mr-1 h-4 w-4" />
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
