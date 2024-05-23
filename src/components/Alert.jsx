// ASSETS
import { InfoIcon } from "../assets/Icons";

const Alert = () => {
  return (
    <div className="flex bg-primary-600 rounded-lg py-4 px-8 text-sm text-dark-700 fixed border-2 border-white top-8 z-40">
      <InfoIcon className="w-5 h-5 inline mr-3" />
      <p><span className="font-medium">Info alert!</span> You can select a maximum of 4 movies.</p>
    </div>
  );
};

export default Alert;
