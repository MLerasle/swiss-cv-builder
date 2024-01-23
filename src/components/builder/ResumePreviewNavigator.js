import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const ResumePreviewNavigator = ({
  currentPage,
  numPages,
  onPreviousPage,
  onNextPage,
}) => {
  if (numPages <= 1) return null;

  return (
    <section className="flex justify-center items-center h-16">
      {currentPage !== 1 && (
        <button onClick={onPreviousPage}>
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
      )}

      <span className="mx-3">{`Page ${currentPage} / ${numPages}`}</span>

      {currentPage < numPages && (
        <button onClick={onNextPage}>
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      )}
    </section>
  );
};
