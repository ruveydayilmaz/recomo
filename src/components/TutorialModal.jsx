// PACKAGES
import React from 'react';

const TutorialModal = ({ tourStatus, setDialog, dialog }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[2000]">
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="text-center sm:mb-12 flex justify-center items-center h-full">
        {
          !tourStatus && (
            <div className="z-[2001] h-1/3">
              {
                dialog == 1 ? (
                  <div className="flex items-center space-x-2">
                    <p className="text-white text-left">Welcome! Recomo is a website that helps you recommend movies to your friends easier.</p>
                    <button onClick={() => setDialog(2)} className="px-2 py-1 rounded-md bg-primary-500">Next</button>
                  </div>
                ) : dialog == 2 ? (
                  <p className="text-white text-left">First, search for a movie.</p>
                ) : dialog == 3 ? (
                  <p className="text-white text-left">Choose a movie.</p>
                ) : dialog == 4 ? (
                  <p className="text-white absolute right-4 top-20">Open the card modal.</p>
                ) : dialog == 5 ? (
                  <div className="flex items-center space-x-2">
                    <p className="text-white text-left">Choose more movies or design your card and download it to share.</p>
                    <button onClick={() => { setDialog(6); localStorage.setItem('recomo_tour_status', true); }} className="px-2 py-1 rounded-md bg-primary-500">Finish Tour</button>
                  </div>
                ) : null
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TutorialModal;
