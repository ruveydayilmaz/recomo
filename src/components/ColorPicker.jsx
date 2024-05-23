// PACKAGES
import React, { useState, useRef, useEffect } from "react";

// ASSETS
import { ColorPickerIcon } from "../assets/Icons";

const ColorPicker = ({ cardStyle, setCardStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFirstRender = useRef(true);

  const handleBackgroundColorChange = (color) => {
    setCardStyle({ ...cardStyle, backgroundColor: color });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setIsOpen(true);
      isFirstRender.current = false;
    }
  }, []);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleColorInputChange = (e) => {
    handleBackgroundColorChange(e.target.value);
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        className="w-10 h-10 rounded-full focus:outline-none inline-flex p-2 border border-dark-600"
        style={{ background: cardStyle.backgroundColor, color: "dark" }}
        onClick={handleButtonClick}
      >
        <ColorPickerIcon className="w-6 h-6 fill-current" />
      </button>
      
      <label
        htmlFor="default-range"
        className="block text-sm font-medium text-dark-300 dark:text-white ml-4"
      >
        Background Color
      </label>

      {isOpen && (
        <input
          id="colorSelected"
          type="color"
          className="bg-white rounded-md w-10 h-10 rounded-full opacity-0 absolute cursor-pointer"
          readOnly
          value={cardStyle.backgroundColor}
          onChange={handleColorInputChange}
        />
      )}
    </div>
  );
};

export default ColorPicker;
