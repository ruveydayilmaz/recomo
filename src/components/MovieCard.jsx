import React, { useEffect, useState } from "react";

import noImage from "../assets/no-image.png";

const MovieCard = ({ movie, selected, onSelect }) => {
  var posterUrl, bannerUrl;

  // Determine the poster URL based on the availability of the poster path
  if (movie.poster_path) {
    posterUrl = `/img${movie.poster_path}`;
  } else {
    posterUrl = noImage;
  }

  if (movie.backdrop_path) {
    bannerUrl = `/img${movie.backdrop_path}`
  } else {
    bannerUrl = noImage;
  }

  /**
   * Handles the click event on the card.
   */
  const handleCardClick = () => {
    onSelect(movie);
  };

  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [flagUrl, setFlagUrl] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json')
      .then(response => response.json())
      .then(data => {
        const flagData = data.find(item => {
          return item.code == movie.original_language.toUpperCase()
        });
        if (flagData) {
          setFlagUrl(flagData.image);
        }
      })
      .catch(error => console.error('Error fetching flags:', error));
  }, [movie.original_language]);

  const handleToggleOverview = (e) => {
    e.stopPropagation();
    setIsOverviewExpanded(!isOverviewExpanded);
    setOpen(!open);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleCardClick}>
      <div className="sm:max-w-xl sm:mx-auto">
        <div
          className={`rounded sm:rounded-xl p-4 flex space-x-8 ${selected ? "bg-primary-500 text-black" : "bg-white dark:bg-dark-200 dark:text-white"}`}
        >
          <div className="h-32 overflow-visible">
            <img
              className="rounded-md shadow-lg h-32 w-22"
              src={posterUrl}
              alt={movie.title}
            />
          </div>
          <div className="flex-1 flex-col">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">{movie.title.slice(0, 25)}{movie.title.length > 25 ? '...' : ''}</h2>
              <span className={`font-bold rounded-md py-1 px-2 absolute top-2 left-2 ${selected? "bg-dark-300 text-white" : "bg-primary-500 text-dark-200"}`}>
                {movie.vote_average.toFixed(1)}
              </span>
              <p className=""><span className="font-semibold">Release Date:</span> {movie.release_date == "" ? "-" : movie.release_date.slice(0, 4)}</p>
              <p className="">
                <span className="font-semibold">Original Language:</span>{" "}
                {flagUrl ?
                  <img src={flagUrl} alt={`${movie.original_language} flag`} className="inline-block ml-2" style={{ width: '20px', height: '20px' }} />
                  : movie.original_language.toUpperCase()}
              </p>
              <p className="">
                {movie.overview.slice(0, 55)}...
                <span
                  onClick={handleToggleOverview}
                  className={`cursor-pointer font-semibold ${selected? "text-white" : "text-primary-300"}`}
                >
                  {" "}more
                </span>
              </p>

              {
                open && (
                  <div className={`absolute ${selected ? "bg-primary-500" : "bg-white dark:bg-dark-200 dark:text-white"} -top-2 -left-2 z-[1000] rounded-md shadow-lg min-w-[440px]`}>
                    <div className="relative">
                      <img
                        className="w-full h-24 object-cover rounded-t-md brightness-75"
                        src={bannerUrl}
                        alt={movie.title}
                      />

                      <h2 className="text-lg text-white font-bold absolute bottom-1 left-2">{movie.title}</h2>
                    </div>

                    <span className="bg-primary-500 text-black font-bold rounded-md py-1 px-2 absolute top-2 left-2">
                      {movie.vote_average.toFixed(1)}
                    </span>

                    <p className="pt-2 px-2"><span className="font-semibold">Release Date:</span> {movie.release_date == "" ? "-" : movie.release_date.slice(0, 4)}</p>
                    <p className="px-2">
                      <span className="font-semibold">Original Language:</span>{" "}
                      {flagUrl ?
                        <img src={flagUrl} alt={`${movie.original_language} flag`} className="inline-block ml-2" style={{ width: '20px', height: '20px' }} />
                        : movie.original_language.toUpperCase()}
                    </p>

                    <p className="p-2">
                      {movie.overview}
                      <span
                        onClick={handleToggleOverview}
                        className={`cursor-pointer font-semibold ${selected? "text-white" : "text-primary-300"}`}
                      >
                        {" "}less
                      </span>
                    </p>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
