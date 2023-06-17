import React from "react";
import noImage from "../assets/no-image.png";

const MovieCard = ({ movie, selected, onSelect }) => {
  var posterUrl;

  // Determine the poster URL based on the availability of the poster path
  if (movie.poster_path) {
    posterUrl = `/img/${movie.poster_path}`;
  } else {
    posterUrl = noImage;
  }

  /**
   * Handles the click event on the card.
   */
  const handleCardClick = () => {
    onSelect(movie);
  };

  const cardStyle = {
    background: selected ? "lightblue" : "white",
  };

  return (
    <div className="relative cursor-pointer" onClick={handleCardClick}>
      <div className="sm:max-w-xl sm:mx-auto">
        <div
          style={cardStyle}
          className="bg-white max-h-80 rounded sm:rounded-xl p-4 flex space-x-8"
        >
          <div className="h-32 overflow-visible">
            <img
              className="rounded-md shadow-lg h-32 w-22"
              src={posterUrl}
              alt={movie.title}
            />
          </div>
          <div className="flex-1 flex-col">
            <div className="flex justify-between items-start">
              <h2 className="text-l font-bold">{movie.title}</h2>
              <span className="bg-yellow-400 font-bold rounded-md p-1 pl-2 pr-2 ml-1">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
