import React from "react";
import TableContent from "../../components/Table/TableContent";
import HandleRow from "./HandeRow";
import HandleRow2 from "./HandleRow2";

const PaginatedTable = ({
  headers,
  data,
  onEdit,
  onDelete,
  columns,
  allowEdit = true,
  role = "admin",
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + itemsPerPage);

  const onChangePage = (newPage) => {
    if (newPage >= 1 || newPage <= totalPages) {
      setCurrentPage(newPage);
      console.log("Changing to page", newPage);
    }
  };

  return (
    <TableContent
      headers={headers}
      data={currentPageData}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onChangePage}
      renderRow={(row, index) =>
        role === "teacher"
          ? HandleRow2(row, index, onEdit, columns, allowEdit)
          : HandleRow(row, index, onEdit, onDelete, columns, allowEdit)
      }
    />
  );
};

export default PaginatedTable;
