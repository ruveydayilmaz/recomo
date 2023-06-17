import { useRef, useState } from "react";
import html2canvas from "html2canvas";

import { uploadCard } from "../api/cards";
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
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(imageUrl)
      .then(() => setIsCopied(true))
      .catch((error) => console.error("Copy failed:", error));

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

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

  const handleShareImage = async () => {
    setIsLoading(true);
    cardContainerRef.current.style.border = "none";
    const canvas = await html2canvas(cardContainerRef.current, {
      backgroundColor: null,
      scale: 2,
      allowTaint: true,
      useCors: true,
    });
    const imageUrl = canvas.toDataURL();
    const response = await uploadCard(imageUrl);

    let imageName = response.data.url.split("recomo/")[1];
    imageName = imageName.split(".png")[0];
    const domainUrl = window.location.origin;
    const resultUrl = `${domainUrl}/card/${imageName}`;
    setImageUrl(resultUrl);
    setIsLoading(false);

    return resultUrl;
  };

  const handleShare = async () => {
    setIsLoading(true);

    const resultUrl = await handleShareImage();

    const title = "Looking for movie recommendations? Look no further!";
    const hashtags = ["recomo", "movie"];
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(resultUrl)}&hashtags=${encodeURIComponent(
      hashtags
    )}`;
    window.open(twitterUrl, "_blank");

    setIsLoading(false);
  };

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-40">
      <div className="w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl overflow-y-auto sm:rounded-lg bg-white p-4 relative">
        <div className="flex justify-end w-[800px] md:w-full">
          <div
            onClick={() => {
              setPreviewOpen(false);
              setImageUrl("");
            }}
            className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full relative"
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
        <div className="flex flex-col md:items-center mb-4">
          <div className="flex bg-white justify-around w-[800px] md:w-full">
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
                htmlFor="default-range"
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
        <div className="flex justify-between items-center">
          <div className="w-1/4 sm:w-1/2 md:w-2/3 lg:w-3/4 xl:w-1/12">
            <p className="font-medium text-sm text-gray-900 select-none pl-1 pb-2">
              Share
            </p>
            <div className="flex justify-between items-center">
              <button
                onClick={handleExportImage}
                className="rounded-full w-9 transition-transform transform hover:scale-110"
              >
                <img className="hover:" src={DownloadIcon} alt="download" />
              </button>

              <button
                className="transition-transform transform hover:scale-125"
                onClick={handleShare}
              >
                <span className="sr-only">Twitter</span>
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.633,7.997c0.013,0.175,0.013,0.349,0.013,0.523c0,5.325-4.053,11.461-11.46,11.461c-2.282,0-4.402-0.661-6.186-1.809 c0.324,0.037,0.636,0.05,0.973,0.05c1.883,0,3.616-0.636,5.001-1.721c-1.771-0.037-3.255-1.197-3.767-2.793 c0.249,0.037,0.499,0.062,0.761,0.062c0.361,0,0.724-0.05,1.061-0.137c-1.847-0.374-3.23-1.995-3.23-3.953v-0.05 c0.537,0.299,1.16,0.486,1.82,0.511C3.534,9.419,2.823,8.184,2.823,6.787c0-0.748,0.199-1.434,0.548-2.032 c1.983,2.443,4.964,4.04,8.306,4.215c-0.062-0.3-0.1-0.611-0.1-0.923c0-2.22,1.796-4.028,4.028-4.028 c1.16,0,2.207,0.486,2.943,1.272c0.91-0.175,1.782-0.512,2.556-0.973c-0.299,0.935-0.936,1.721-1.771,2.22 c0.811-0.088,1.597-0.312,2.319-0.624C21.104,6.712,20.419,7.423,19.633,7.997z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4">
            <button
              className="font-medium text-[11px] md:text-sm text-gray-900 hover:text-yellow-500"
              onClick={handleShareImage}
            >
              Or click <span className="text-yellow-500">here</span> to generate
              a link
            </button>
            <div onClick={handleCopy} className="flex justify-between items-center border-2 border-gray-200 pl-1 relative hover:bg-gray-100 cursor-pointer h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-gray-500 mr-1"
              >
                <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
              </svg>
              {!isCopied && (
                <input
                  defaultValue={imageUrl}
                  title="copy"
                  className="py-2 focus:outline-none w-full text-gray-500 text-sm cursor-pointer hover:bg-gray-100"
                />
              )}
              {isCopied && (
                <div className="text-yellow-500 font-medium text-sm absolute left-24">
                  Copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="absolute bg-gray-100 bg-opacity-50 w-full h-full flex items-center justify-center top-0 left-0">
            <div className="w-8 h-8 border-4 border-yellow-200 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewModal;
