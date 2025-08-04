import React from 'react'
import TableContent from '../../components/Table/TableContent'
import HandleRow from './HandeRow';

const PaginatedTable = ({headers, data, onEdit, onDelete}) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const onChangePage = (newPage) => {
        setCurrentPage(newPage);
        console.log("Changing to page", newPage);
    }
  return (
    <TableContent
    headers={headers}
    data={data}
    currentPage={1}
    totalPages={100}
    onPageChange={(page) => console.log("Go to page", page)}
    renderRow = {(row, index) => HandleRow(row, index, onEdit, onDelete)}
  />
  )
}

export default PaginatedTable