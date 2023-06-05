import { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import ColorPicker from "./ColorPicker";
import PreviewedMovieGrid from "./PreviewedMovieGrid";
import SocialMediaButtons from "./SocialMediaButtons";

const PreviewModal = ({
  cardStyle,
  setCardStyle,
  selectedMovies,
  handleMovieSelect,
  setPreviewOpen,
}) => {
  const cardContainerRef = useRef(null);
  const previewRef = useRef(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isThemeSwitchOn, setIsThemeSwitchOn] = useState(false);

  const handleBorderRadiusChange = (e) => {
    const { value } = e.target;
    setCardStyle((prevStyle) => ({
      ...prevStyle,
      borderRadius: value + "px",
    }));
  };
  
  const handleExportImage = () => {
  
    domtoimage
      .toPng(cardContainerRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "selected_movies.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error exporting image:", error);
      });
  };
  
  const handleShareImage = () => {
    domtoimage
      .toBlob(cardContainerRef.current)
      .then((blob) => {
        const filesArray = [
          new File([blob], "selected_movies.png", { type: blob.type }),
        ];
        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
          navigator.share({ files: filesArray });
        } else {
          console.error("Web Share API not supported.");
        }
      })
      .catch((error) => {
        console.error("Error sharing image:", error);
      });
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-40">
      <div className="w-full h-3/4 max-w-5xl overflow-y-auto sm:rounded-lg bg-white p-4">
        <div className="flex justify-end">
          <div
            onClick={() => setPreviewOpen(false)}
            className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
          >
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M6.364 5.464l-1.414 1.414 4.95 4.95-4.95 4.95 1.414 1.414 4.95-4.95 4.95 4.95 1.414-1.414-4.95-4.95 4.95-4.95-1.414-1.414-4.95 4.95-4.95-4.95z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="flex bg-white w-full justify-around">
            <ColorPicker cardStyle={cardStyle} setCardStyle={setCardStyle} />

            <div className="flex items-center">
              <input
                value={parseInt(cardStyle.borderRadius)}
                onChange={handleBorderRadiusChange}
                id="default-range"
                type="range"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <label
                for="default-range"
                className="ml-4 text-sm font-medium text-gray-900 dark:text-white"
              >
                Border
              </label>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isSwitchOn}
                onChange={() => setIsSwitchOn(!isSwitchOn)}
                className="sr-only peer"
              />
              <div className="w-[41px] h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#ADD8E6] dark:peer-focus:ring-[#ADD8E6] dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ADD8E6]"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Card Style
              </span>
            </label>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isThemeSwitchOn}
                onChange={() => setIsThemeSwitchOn(!isThemeSwitchOn)}
                className="sr-only peer"
              />
              <div className="w-[41px] h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#ADD8E6] dark:peer-focus:ring-[#ADD8E6] dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px]  after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ADD8E6]"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Card Theme
              </span>
            </label>
          </div>

          <div
            className="w-full h-[450px] min-w-[60rem] selected-movies rounded mt-4 bg-gray-100 border border-gray-300 flex flex-col justify-around"
            style={cardStyle}
            ref={cardContainerRef}
          >
            <p
              className="text-md font-medium text-gray-800 text-center z-10"
              style={{
                color: isThemeSwitchOn ? "black" : "white",
                textShadow: isThemeSwitchOn
                  ? "1px 0 #fff, -1px 0 #fff, 0 1px #fff, 0 -1px #fff"
                  : "1px 0 gray, -1px 0 gray, 0 1px gray, 0 -1px gray",
              }}
            >
              just for you 👻🎞️
            </p>

            <PreviewedMovieGrid
              movies={selectedMovies}
              onSelect={handleMovieSelect}
              ref={previewRef}
              isSwitchOn={isSwitchOn}
              isThemeSwitchOn={isThemeSwitchOn}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleExportImage}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded w-1/4"
          >
            Export
          </button>
          <div className="w-3/4">
            <SocialMediaButtons onShareImage={handleShareImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
