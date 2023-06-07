import React from "react";
import PreviewedMovieCard from "./PreviewedMovieCard";

const MovieGrid = ({ movies, onSelect, isSwitchOn, isThemeSwitchOn }) => {
  const angleStep = 14; // Difference in rotation angle between cards
  const initialRotation = -23; // Starting rotation angle
  const elevationStep = 50; // Difference in elevation between cards
  const initialElevation = -60; // Starting elevation

  const cardColor = isThemeSwitchOn ? "#18181b" : "white";
  const titleColor = isThemeSwitchOn ? "white" : "#374151";

  return (
    <div className="flex justify-center">
      {movies.map((movie, index) => {
        const rotation = isSwitchOn ? initialRotation + index * angleStep : 0;
        const elevation = isSwitchOn
          ? initialElevation + Math.abs(index - 2) * elevationStep
          : 0;

        return (
          <PreviewedMovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelect}
            rotation={rotation}
            elevation={elevation}
            cardColor={cardColor}
            titleColor={titleColor}
          />
        );
      })}
    </div>
  );
};

export default MovieGrid;
