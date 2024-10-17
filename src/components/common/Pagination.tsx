import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setPage }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 mx-2">
      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <div className="join">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium bg-white text-gray-500 border border-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">Page {currentPage}</button>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-lg shadow-md text-sm font-medium bg-white text-gray-500 border border-gray-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
