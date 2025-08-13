import React from 'react';
import Edit from "../../assets/edit.svg?react"
import Trash from "../../assets/trash-2.svg?react"


const HandleRow = (row, index, onEdit, onDelete, columns) => (
    <>
      {/* <td className="px-4 py-2 text-sm">{row.id}</td>
      <td className="px-4 py-2 text-sm">{row.name}</td>
      <td className="px-4 py-2 text-sm">{row.dob}</td>
      <td className='px-4 py-2 text-sm'>{row.password}</td>
      */}

      {columns.map((col, index) => (
        <td key = {index} className="px-4 py-2 text-sm">
            {row[col] || 'N/A'}
        </td>
      ))}

      <td className="px-4 py-2 text-sm">
        <div className='flex justify-start gap-5'>
          <button onClick={(e) => {
            e.stopPropagation(); // Prevent row click event
            onEdit(row[columns[0]]);
          }} >
            <Edit className="w-5 h-5" />
          </button>

          <button onClick={(e) => {
            e.stopPropagation(); // Prevent row click event
            onDelete(row[columns[0]]);
          }}>
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </td>
    </>
  )

export default HandleRow;