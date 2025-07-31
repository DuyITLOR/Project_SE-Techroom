import React from 'react';

const TableContent = ({ headers, data, renderRow, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="overflow-x-auto border rounded-md shadow-sm">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-200">
          <tr className="text-center">
            {headers.map((header, idx) => (
              <th key={idx} className="px-3 py-2 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => renderRow(row, index))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-4 text-gray-400">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center py-2 text-sm text-gray-600">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 disabled:text-gray-300"
        >
          &lt;
        </button>
        <span>
          &lt; {currentPage} ... {totalPages} &gt;
        </span>
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 disabled:text-gray-300"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TableContent;
