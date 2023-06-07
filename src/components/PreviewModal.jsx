import { useRef, useState } from "react";
import html2canvas from "html2canvas";

import ColorPicker from "./ColorPicker";
import PreviewedMovieGrid from "./PreviewedMovieGrid";
import DownloadIcon from "../assets/download.png";

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
    cardContainerRef.current.style.border = "none";
    html2canvas(cardContainerRef.current, {
      backgroundColor: null,
      scale: 2,
      allowTaint: true,
      useCors: true,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "recomo.png";
      link.click();
    });
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-40">
      <div className="w-full max-w-5xl overflow-y-auto sm:rounded-lg bg-white p-4">
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
                max={30}
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
            className="w-full h-[450px] min-w-[60rem] selected-movies rounded mt-4 bg-gray-100 border border-gray-300 flex flex-col justify-around relative"
            style={cardStyle}
            ref={cardContainerRef}
          >
            <PreviewedMovieGrid
              movies={selectedMovies}
              onSelect={handleMovieSelect}
              ref={previewRef}
              isSwitchOn={isSwitchOn}
              isThemeSwitchOn={isThemeSwitchOn}
            />
            <p
              className="text-[10px] absolute bottom-2 left-1/2 transform -translate-x-1/2"
              style={{
                textAlign: "center",
                width: "100%",
                color: isThemeSwitchOn ? "#4b5563" : "#9ca3af",
              }}
            >
              Generated by recomo.vercel.app
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={handleExportImage} className="rounded-full w-12">
            <img className="hover:" src={DownloadIcon} alt="download" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
