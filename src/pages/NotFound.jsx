// ASSETS
import { InfoIcon } from "../assets/Icons";

const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center p-5 bg-white w-full">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-primary-500 p-4">
          <div className="rounded-full stroke-white bg-primary-500 p-4">
            <InfoIcon className="w-16 h-16" />
          </div>
        </div>
        <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
          Page not found
        </h1>
        <p className="text-slate-600 mt-5 lg:text-lg">
          The page you are looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
