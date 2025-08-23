import React from "react";
import FeedBack from "../../assets/star.svg?react";

const HandleRow2 = (row, index, onFeedBack, columns, allowEdit) => {
  <>
    {columns.map((col, index) => (
      <td key={index} className="px-4 py-2 text-sm">
        {row[col] || "N/A"}
      </td>
    ))}

    {allowEdit && (
      <td className="px-4 py-2 text-sm">
        <div className="flex justify-start gap-5">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event
              onFeedBack(row[columns[0]]);
            }}>
            <FeedBack className="w-5 h-5" />
          </button>
        </div>
      </td>
    )}
  </>;
};

export default HandleRow2;
