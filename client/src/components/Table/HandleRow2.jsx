import React from "react";
import FeedBackIcon from "../../assets/star.svg?react";

const HandleRow2 = (row, index, onFeedBack, columns, allowEdit) => {
  return (
    <>
      {columns.map((col, index) => (
        <td key={index} className="px-4 py-2 text-sm">
          {row[col] || "N/A"}
        </td>
      ))}

      {allowEdit && (
        <td className="pl-10 py-2 text-sm">
          <button
            className="cursor-pointer text-blue-500 hover:text-blue-700"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
              onFeedBack(row[columns[0]]);
            }}>
            <FeedBackIcon className="w-5 h-5" />
          </button>
        </td>
      )}
    </>
  );
};

export default HandleRow2;
