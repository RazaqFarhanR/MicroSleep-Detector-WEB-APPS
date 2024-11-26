import React from 'react';
import Pagination from './Pagination';
import ActionButtonComponent from './ActionButtonComponent';
import { useLocation } from 'react-router-dom';

interface Column {
  header: string;
  accessor: string | ((row: Record<string, any>) => any);
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  currentPage: number; 
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;  
  itemsPerPage: number;
  onViewDetails: (item: any) => void;
  onEdit: () => void; 
  onDelete: () => void;
}

const TableComponent: React.FC<TableProps> = ({ columns, data, currentPage, setPage, totalPages, itemsPerPage,  onViewDetails,
    onEdit,
    onDelete}) => {
  const location = useLocation();

  return (
    <div className="rounded-md h-full">
      <div className='relative overflow-x-auto overflow-y-auto max-h-[68vh]'>
        <table className="table min-w-full">
          <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
            <tr>
              <th className="bg-gray-100 text-gray-700">No</th>
              {columns.map((col, index) => (
                <th key={index} className="bg-gray-100 text-gray-700">
                  {col.header}
                </th>
              ))}
              <th className="bg-gray-100 text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => {
              const rowNumber = (currentPage - 1) * itemsPerPage + (rowIndex + 1);
              return (
                <tr key={rowIndex} className="hover">
                  <td className="whitespace-nowrap">{rowNumber}</td>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="whitespace-nowrap">
                        {col.accessor === 'location' ? (
                        <span className="font-medium text-gray-900">
                            {JSON.stringify(item[col.accessor])}
                        </span>
                        ) : col.accessor === 'timestamp' ? (
                        <span className="font-medium text-gray-900">
                            {new Date(item[col.accessor]).toLocaleString()} 
                        </span>
                        ) : col.accessor === 'status' ? (
                        <span
                            className={`font-medium ${
                            item[col.accessor] === 'active'
                                ? 'text-green-600 bg-green-100 p-2'
                                : item[col.accessor] === 'inactive'
                                ? 'text-red-600 bg-red-100 p-2'
                                : item[col.accessor] === 'pending activation'
                                ? 'text-yellow-600 bg-yellow-100 p-2'
                                : 'text-gray-600 bg-gray-100 p-2'
                            }`}
                        >
                            {item[col.accessor]}
                        </span>
                        ) : (
                        <span className="font-medium text-gray-900">
                          {typeof col.accessor === 'function'
                          ? col.accessor(item)
                          : item[col.accessor]}
                        </span>
                        )}
                    </td>
                    ))}

                    <ActionButtonComponent
                        currentPage={location.pathname}
                        item={item}
                        onViewDetails={onViewDetails}
                        onEdit={onEdit}
                        onDelete={onDelete} 
                    />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setPage={setPage} 
      />
    </div>
  );
};

export default TableComponent;
