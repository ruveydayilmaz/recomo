import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Card = () => {
  const { name } = useParams();
  const imageUrl = `${import.meta.env.VITE_CLOUDINARY_URL}/recomo/${name}.png`;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;

    const handleMouseMove = (event) => {
      const { offsetX, offsetY } = event;
      const x = (offsetX / img.offsetWidth - 0.5) * 20;
      const y = (offsetY / img.offsetHeight - 0.5) * 20;

      img.style.transform = `perspective(100rem) rotateX(${y}deg) rotateY(${x}deg)`;
    };

    const handleMouseEnter = () => {
      img.style.transition = "transform 0.3s";
    };

    const handleMouseLeave = () => {
      img.style.transition = "transform 0.6s";
      img.style.transform = "perspective(100rem) rotateX(0) rotateY(0)";
    };

    img.addEventListener("mousemove", handleMouseMove);
    img.addEventListener("mouseenter", handleMouseEnter);
    img.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      img.removeEventListener("mousemove", handleMouseMove);
      img.removeEventListener("mouseenter", handleMouseEnter);
      img.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center select-none relative">
      <a
        href="/"
        className="absolute left-4 top-2 flex items-center font-medium text-gray-600 hover:text-yellow-400 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          {" "}
          <path
            fillRule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />{" "}
        </svg>
        Return to website
      </a>
      <h4
        style={{
          textShadow: "1px 0 #000, -1px 0 #000, 0 1px #000, 0 -1px #000",
        }}
        className="font-medium text-xl text-yellow-400 select-none"
      >
        Hey, I've got movie recommendations for you!
      </h4>
      <div className="mt-4 max-w-4xl js-tilt-glare select-none">
        <div className="container select-none">
          {!isImageLoaded && (
            <div className="bg-gray-200 rounded h-[420px] w-[896px] flex items-center justify-center ">
              <div className="w-8 h-8 border-4 border-yellow-400 rounded-full hidden"></div>
            </div>
          )}
          <img
            className={`shadow-2xl ${!isImageLoaded ? "hidden" : ""}`}
            ref={imgRef}
            src={imageUrl}
            alt="card"
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
