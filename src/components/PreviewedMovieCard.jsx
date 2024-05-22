import React, { useState, useRef, useEffect } from "react";
import noImage from "../assets/no-image.png";

const PreviewedMovieCard = ({
  movie,
  onSelect,
  rotation,
  elevation,
  cardColor,
  titleColor,
  is16to9,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef(null);

  const posterUrl = movie.poster_path ? `/img/${movie.poster_path}` : noImage;

  const cardStyle = {
    transform: `rotate(${rotation}deg) translateY(${elevation}px)`,
    backgroundColor: cardColor,
    color: titleColor,
  };

  const handleCardClick = () => {
    onSelect(movie);
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
      className={`bg-white shadow-md rounded flex flex-col items-center relative ${is16to9? "w-36" : "w-48 h-94 m-3"}`}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <span
          onClick={handleCardClick}
          className="absolute p-2 -right-2 -top-2 bg-dark-600/20 dark:bg-dark-300/80 hover:bg-dark-600/30 hover:dark:bg-dark-300 cursor-pointer text-dark-500 w-8 h-8 flex items-center justify-center rounded-full"
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
        className={`mt-4 object-cover ${is16to9? "w-28" : "w-40 min-w-[10rem]"}`}
        src={posterUrl}
        alt={movie.title}
      />

      <div className={`${is16to9? "m-2" : "m-4 mb-2"} h-full flex items-center`}>
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          className="hover:text-primary-500"
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
