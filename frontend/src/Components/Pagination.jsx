export function Pagination({ currentPage, totalPages, handleNextPage, handlePrevPage, handlePageChange }) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex flex-wrap justify-center space-x-1 p-6">
            {/* Prev button */}
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="rounded-full border border-white py-2 px-3 text-sm shadow-sm transition-all hover:shadow-md text-black hover:text-white hover:bg-orange-300 disabled:opacity-50"
            >
                Prev
            </button>

            {/* Page numbers */}
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`rounded-full py-2 px-3 text-sm transition-all shadow-sm ${
                        currentPage === pageNumber
                            ? "bg-violet900 text-white"
                            : "border border-white text-black hover:text-white hover:bg-orange-300 hover:border-orange-500"
                    }`}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Next button */}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="rounded-full border border-white py-2 px-3 text-sm shadow-sm transition-all hover:shadow-md text-black hover:text-white hover:bg-orange-300 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}
