import React from 'react';

interface TableRowProps {
  item: Record<string, any>;
  columns: { accessor: string }[];
  rowIndex: number;
  page: number;
}

const TableRow: React.FC<TableRowProps> = ({ item, columns, rowIndex, page }) => {
  const rowNumber = (page - 1) * 10 + (rowIndex + 1); 

  return (
    <tr className="hover">
      <td className="whitespace-nowrap">{rowNumber}</td>
      {columns.map((col, colIndex) => (
        <td key={colIndex} className="whitespace-nowrap">
          {col.accessor === 'status' ? (
            <span
              className={`font-semibold uppercase text-xs ${
                item[col.accessor] === 'active'
                  ? 'bg-green-200 text-green-900 p-2 rounded'
                  : item[col.accessor] === 'inactive'
                  ? 'bg-red-200 text-red-900 p-2 rounded'
                  : item[col.accessor] === 'new'
                  ? 'bg-blue-200 text-blue-900 p-2 rounded'
                  : 'text-gray-900'
              }`}
            >
              {item[col.accessor]}
            </span>
          ) : (
            <span className="font-medium text-gray-900">{item[col.accessor]}</span>
          )}
        </td>
      ))}
      <td className="flex lg:justify-start sm:justify-center space-x-2">
        <button className="btn btn-sm btn-primary">Edit</button>
        <button className="btn btn-sm btn-error text-white">Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
