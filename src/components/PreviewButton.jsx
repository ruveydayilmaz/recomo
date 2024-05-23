// ASSETS
import { EditIcon } from "../assets/Icons";

const PreviewButton = ({ isFirstMovieSelected, dialog, setDialog, previewOpen, setPreviewOpen }) => {
  return (
    <div
      className={`fixed top-8 right-3 md:right-12 z-30 ${isFirstMovieSelected ? "animate-shake" : ""} ${dialog == 4 ? 'z-[2001]' : ''}`}
      onClick={() => { setPreviewOpen(!previewOpen); setDialog(5); }}
    >
      <button className="flex p-2.5 bg-primary-500 rounded-xl hover:rounded-3xl transition-all duration-300 text-white dark:text-dark-600 border-2 border-white dark:border-dark-600">
        <EditIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default PreviewButton;
