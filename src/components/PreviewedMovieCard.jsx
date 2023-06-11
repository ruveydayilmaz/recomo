import React, { useState, useRef, useEffect } from "react";
import noImage from "../assets/no-image.png";

const PreviewedMovieCard = ({
  movie,
  onSelect,
  rotation,
  elevation,
  cardColor,
  titleColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef(null);

  const posterUrl = movie.poster_path ? `/img/${movie.poster_path}` : noImage;

  const handleCardClick = () => {
    onSelect(movie);
  };

  const cardStyle = {
    transform: `rotate(${rotation}deg) translateY(${elevation}px)`,
    backgroundColor: cardColor,
    color: titleColor,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const maxTitleHeight = 60;
      const maxFontSize = 14;

      titleElement.style.fontSize = "";

      const titleHeight = titleElement.offsetHeight;

      if (titleHeight > maxTitleHeight) {
        const fontSizeMultiplier = maxTitleHeight / titleHeight;
        const newFontSize = Math.floor(fontSizeMultiplier * maxFontSize);
        titleElement.style.fontSize = `${newFontSize}px`;
      }
    }
  }, [movie.title]);

  return (
    <div
      className="bg-white w-48 h-94 shadow-md rounded m-3 flex flex-col items-center relative"
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <span
          onClick={handleCardClick}
          className="absolute p-2 -right-2 -top-2 rounded-full bg-gray-300 dark:bg-gray-900 hover:bg-gray-500 cursor-pointer hover:text-gray-300 text-gray-500 w-8 h-8 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M6.364 5.464l-1.414 1.414 4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.414-4.95-4.95 4.95-4.95-1.414-1.414-4.95 4.95-4.95-4.95z" />
          </svg>
        </span>
      )}
      <img
        className="w-40 mt-4 min-w-[10rem] h-full"
        src={posterUrl}
        alt={movie.title}
      />

      <div className="m-4 mb-2">
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          className="hover:text-yellow-600"
        >
          <span ref={titleRef} className="text-sm font-semibold break-words">
            {movie.title}
          </span>
        </a>
      </div>
    </div>
  );
};

export default PreviewedMovieCard;
