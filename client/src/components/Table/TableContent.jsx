import React from 'react';
import ArrowRight from "../../assets/chevron-right.svg?react";
import ArrowLeft from "../../assets/chevron-left.svg?react";




const TableContent = ({ headers, data, renderRow, currentPage, totalPages, onPageChange, }) => {

    const handlePageChange = (page) => {
        console.log(`Changing to page ${page}`);
    }

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {/* Setup header */}
                    <thead className="">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="bg-blue-100 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Setup the body */}
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-50 transition-colors duration-200 group"
                            >
                                {
                                    renderRow ? renderRow(row, index) :
                                        (
                                            <td colSpan={headers.length} className="px-6 py-4 text-sm text-gray-900">
                                                Default row content
                                            </td>
                                        )
                                }
                            </tr>
                        ))}
                    </tbody>

                    {
                        totalPages > 1 && (
                            <tfoot>
                                <tr>
                                    <td colSpan={headers.length}>
                                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                                            <div className="flex items-center justify-between">

                                                {/* Content of footer table */}
                                                <div className="flex items-center text-sm text-gray-700">
                                                    <span>
                                                        Page {currentPage} of {totalPages}
                                                    </span>
                                                </div>



                                                {/* Content of page navigation */}
                                                <div className="flex items-center gap-2">
                                                    <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-colors duration-200'
                                                        onClick={() => onPageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}

                                                    >
                                                        <ArrowLeft />
                                                        Previous
                                                    </button>

                                                    <div className='flex items-center space-x-1'>
                                                        {
                                                            Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                                let pageNumber;
                                                                if (totalPages <= 5) {
                                                                    pageNumber = i + 1;
                                                                } else if (currentPage <= 3) {
                                                                    pageNumber = i + 1;
                                                                } else if (currentPage >= totalPages - 2) {
                                                                    pageNumber = totalPages - 4 + i;
                                                                } else {
                                                                    pageNumber = currentPage - 2 + i;
                                                                }

                                                                return (
                                                                    <button
                                                                        key = {pageNumber}
                                                                        onClick={() => onPageChange(pageNumber)}
                                                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                                                            currentPage === pageNumber
                                                                              ? 'bg-blue-600 text-white shadow-sm'
                                                                              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                                        }`}
                                                                    >
                                                                        {pageNumber}
                                                                    </button>
                                                                )
                                                            }
                                                            )}
                                                    </div>


                                                    <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 transition-colors duration-200'
                                                        onClick={() => onPageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                    >
                                                        Next
                                                        <ArrowRight/>
                                                    </button>
                                                </div>


                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        )
                    }

                </table>
            </div>
        </div>

    );
};



export default TableContent

