// ASSETS
import { GithubIcon } from "../assets/Icons";

const Footer = () => {
  return (
    <footer className="w-full bg-white h-full dark:bg-dark-200">
      <div className="py-12 mx-auto flex max-w-xl">
        <div className="flex items-center justify-center w-full rounded-xl md:flex-row">
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/ruveydayilmaz"
              target="_blank"
              className="transition-transform transform hover:scale-110"
            >
              <span className="sr-only">Github</span>
              <GithubIcon className="w-10 h-10 text-black dark:text-dark-600" />
            </a>
            <div className="flex flex-col md:items-start">
              <h6 className="text-m font-medium text-dark-600 dark:text-dark-600">Ruveyda</h6>
              <p className="text-base font-medium text-dark-500">
                Backend Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
