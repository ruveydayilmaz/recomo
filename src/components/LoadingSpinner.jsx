// ASSETS
import { LoadingIcon } from "../assets/Icons";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-1 text-md text-dark-700 dark:text-dark-300">
      <LoadingIcon className="w-12 h-12 animate-spin" />
      <p>Loading ...</p>
    </div>
  );
};

export default LoadingSpinner;
