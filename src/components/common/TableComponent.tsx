import React from 'react';
import Pagination from './Pagination';
import ActionButtonComponent from './ActionButtonComponent';
import { useLocation } from 'react-router-dom';

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  currentPage: number; 
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;  
  itemsPerPage: number;
  onViewDetails: () => void;
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
                        <span className="font-medium text-gray-900">{item[col.accessor]}</span>
                        )}
                    </td>
                    ))}

                    <ActionButtonComponent
                        currentPage={location.pathname}
                        onViewDetails={onViewDetails}
                        onEdit={onEdit}
                        onDelete={onDelete} 
                    />

                    {/* <td className="flex lg:justify-start sm:justify-center space-x-2">
                        <button
                            className="btn btn-sm btn-info w-10 h-10 p-0"
                            title="View Details"
                            aria-label="View Details"
                        >
                            <svg
                                className="w-6 h-6" 
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ffffff"
                            >
                            <path
                                id="Vector"
                                d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            </svg>
                        </button>

                        <button
                            className="btn btn-sm btn-primary w-10 h-10 p-0"
                            title="Edit"
                            aria-label="Edit"
                        >
                            <svg
                                className="size-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                                fill="#ffffff"
                            ></path>
                            </svg>
                        </button>

                        <button
                            className="btn btn-sm btn-error text-white w-10 h-10 p-0" // Adjusted padding and set width and height
                            title="Delete"
                            aria-label="Delete"
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            </svg>
                        </button>
                    </td> */}
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
