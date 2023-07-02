import React from "react";

const Pagination = ({
  currentPage,
  visiblePages,
  goToPreviousPages,
  handlePageChange,
  goToNextPages,
}) => {
  return (
    <div>
      <button onClick={goToPreviousPages}>&lt;</button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={currentPage === page}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button onClick={goToNextPages}>&gt;</button>
    </div>
  );
};

export default Pagination;
