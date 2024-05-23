// PACKAGES
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

// COMPONENTS
import ColorPicker from "./ColorPicker";
import PreviewedMovieGrid from "./PreviewedMovieGrid";
import LoadingSpinner from "./LoadingSpinner";

// ASSETS
import { ArrowDownIcon2, CloseIcon } from "../assets/Icons";

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
  const [isLoading, setIsLoading] = useState(false);
  const [is16to9, setIs16to9] = useState(false);

  const handleBorderRadiusChange = (e) => {
    const { value } = e.target;
    setCardStyle((prevStyle) => ({
      ...prevStyle,
      borderRadius: value + "px",
    }));
  };

  const handleExportImage = () => {
    setIsLoading(true);

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
      setIsLoading(false);
      link.click();
    });
  };

  const handleAspectRatioChange = () => {
    setIs16to9(!is16to9);
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-40">
      <div className="w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl overflow-y-auto sm:rounded-lg bg-white dark:bg-dark-200 p-4 relative">
        <div className="flex justify-end w-[800px] md:w-full">
          <div
            onClick={() => { setPreviewOpen(false) }}
            className="bg-dark-600/20 dark:bg-dark-300/80 hover:bg-dark-600/30 hover:dark:bg-dark-300 cursor-pointer text-dark-500 w-8 h-8 flex items-center justify-center rounded-full relative"
          >
            <CloseIcon className="w-4 h-4 fill-current" />
          </div>
        </div>

        <div className="flex flex-col md:items-center mb-4 px-4">
          <div className="flex justify-between w-[800px] md:w-full">
            <ColorPicker cardStyle={cardStyle} setCardStyle={setCardStyle} />

            <div className="flex items-center">
              <input
                value={parseInt(cardStyle.borderRadius)}
                max={30}
                onChange={handleBorderRadiusChange}
                id="default-range"
                type="range"
                className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer"
              />
              <label htmlFor="default-range" className="ml-4 text-sm font-medium text-dark-200 dark:text-white">
                Border
              </label>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={is16to9 ? false : isSwitchOn}
                onChange={() => !is16to9 && setIsSwitchOn(!isSwitchOn)}
                className="sr-only peer"
              />
              <div className="w-[41px] h-6 bg-dark-600 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ADD8E6]"></div>
              <p className="ml-3 text-sm font-medium text-dark-300 dark:text-white">
                Card Style <br />
                {is16to9 && <span className="text-dark-600">(Unavailable for 16:9 ratio)</span>}
              </p>
            </label>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isThemeSwitchOn}
                onChange={() => setIsThemeSwitchOn(!isThemeSwitchOn)}
                className="sr-only peer"
              />
              <div className="w-[41px] h-6 bg-dark-600 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ADD8E6]"></div>
              <span className="ml-3 text-sm font-medium text-dark-300 dark:text-white">
                Card Theme
              </span>
            </label>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={is16to9}
                onChange={handleAspectRatioChange}
                className="sr-only peer"
              />
              <div className="w-[41px] h-6 bg-dark-600 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ADD8E6]"></div>
              <span className="ml-3 text-sm font-medium text-dark-300 dark:text-white">
                16:9 Ratio
              </span>
            </label>
          </div>

          <div
            className="w-full selected-movies rounded mt-4 bg-dark-100 border border-dark-600/50 flex flex-col justify-around items-center relative dark:bg-dark-700"
            style={{
              ...cardStyle,
              height: is16to9 ? '640px' : '450px',
              width: is16to9 ? '360px' : '60rem',
              minWidth: is16to9 ? 'unset' : '60rem',
            }}
            ref={cardContainerRef}
          >
            <PreviewedMovieGrid
              movies={selectedMovies}
              onSelect={handleMovieSelect}
              ref={previewRef}
              isSwitchOn={isSwitchOn}
              isThemeSwitchOn={isThemeSwitchOn}
              is16to9={is16to9}
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

        <div className="flex justify-end w-full px-4">
          <button onClick={handleExportImage} className="group rounded-md py-1 px-2 shadow bg-primary-400 text-white cursor-pointer flex space-x-2 items-center overflow-hidden">
            <div className="text-white flex justify-center items-center">
              <ArrowDownIcon2 className="w-4 h-4 transition-all group-hover:-translate-y-1" />
            </div>
            <p>Download Image</p>
          </button>
        </div>

        {isLoading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default PreviewModal;
