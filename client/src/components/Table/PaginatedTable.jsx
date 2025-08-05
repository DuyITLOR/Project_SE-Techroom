import React from 'react'
import TableContent from '../../components/Table/TableContent'
import HandleRow from './HandeRow';

const PaginatedTable = ({headers, data, onEdit, onDelete}) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const  currentPageData = data.slice(startIndex, startIndex + itemsPerPage);

    const onChangePage = (newPage) => {

      if (newPage >= 1 || newPage <= totalPages) {

        setCurrentPage(newPage);
        console.log("Changing to page", newPage);
      }
    }
  
  return (
      <TableContent
      headers={headers}
      data={currentPageData}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onChangePage}
      renderRow = {(row, index) => HandleRow(row, index, onEdit, onDelete)}
      />
  )
}

export default PaginatedTable