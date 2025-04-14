import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSort } from "react-icons/fa";

interface TableProps {
  columns: string[];
  data: { [key: string]: unknown }[];
  onDetailClick?: (
    row: { [key: string]: unknown },
    actionType: "detail" | "edit" | "delete"
  ) => void;
  IsDetail?: boolean;
  IsEdit?: boolean;
  IsDelete?: boolean;
  search?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onDetailClick,
  IsDetail,
  IsEdit,
  IsDelete,
  search,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  // const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const sortedData = React.useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = React.useMemo(() => {
    return sortedData.filter((row) =>
      columns.some((column) =>
        (row[column] ?? "")
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [sortedData, search, columns]); //[sortedData, searchQuery, columns]);

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const toggleRowSelection = (rowIndex: number) => {
    setSelectedRows((prev) =>
      prev.includes(rowIndex)
        ? prev.filter((index) => index !== rowIndex)
        : [...prev, rowIndex]
    );
  };
  // console.log(search);
  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex gap-4">
          {/* <input
            type="text"
            placeholder="Search..."
            value={searchQuery}//
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded w-1/4"
          />
           */}
        </div>
      </div>

      {/* WRAPPER UNTUK SCROLLABLE */}
      <div
        className="overflow-x-auto w-full"
        style={{
          scrollbarColor: "#D9454C transparent",
          scrollbarWidth: "thin",
        }}
      >
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(paginatedData.map((_, index) => index));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={
                    selectedRows.length === paginatedData.length &&
                    paginatedData.length > 0
                  }
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>

              {columns
                .filter((column) => column.toLowerCase() !== "id")
                .map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort(column)}
                  >
                    <div className="flex items-center gap-2">
                      {column}
                      {sortConfig?.key === column ? (
                        sortConfig.direction === "ascending" ? (
                          <FaSort className="transform rotate-180" />
                        ) : (
                          <FaSort />
                        )
                      ) : (
                        <FaSort className="text-gray-300" />
                      )}
                    </div>
                  </th>
                ))}

              {/* {(IsDetail || IsEdit || IsDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )} */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: rowIndex * 0.1,
                }}
                onClick={() => onDetailClick && onDetailClick(row, "detail")}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowIndex)}
                    onChange={() => toggleRowSelection(rowIndex)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(currentPage - 1) * rowsPerPage + rowIndex + 1}
                </td>

                {columns
                  .filter((column) => column.toLowerCase() !== "id")
                  .map((column) => (
                    <td key={column} className="px-6 py-4 whitespace-nowrap">
                      {column.toLowerCase() === "status" ? (
                        <div className="bg-[#FEF0C7] text-[#F79009]  py-1 rounded-md text-center">
                          {row[column] as React.ReactNode}
                        </div>
                      ) : (
                        (row[column] as React.ReactNode)
                      )}
                    </td>
                    // {(IsDetail || IsEdit || IsDelete) && (
                    //   <td className="px-6 py-4 whitespace-nowrap">
                    //     {IsDetail && (
                    //       <button
                    //         onClick={() =>
                    //           onDetailClick && onDetailClick(row, "detail")
                    //         }
                    //         className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded mr-2"
                    //       >
                    //         Detail
                    //       </button>
                    //     )}
                    //     {IsEdit && (
                    //       <button
                    //         onClick={() =>
                    //           onDetailClick && onDetailClick(row, "edit")
                    //         }
                    //         className="bg-green-500 text-white hover:bg-green-700 px-4 py-2 rounded mr-2"
                    //       >
                    //         Edit
                    //       </button>
                    //     )}
                    //     {IsDelete && (
                    //       <button
                    //         onClick={() =>
                    //           onDetailClick && onDetailClick(row, "delete")
                    //         }
                    //         className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded mr-2"
                    //       >
                    //         Delete
                    //       </button>
                    //     )}
                    //   </td>
                    // )}
                  ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        {/* Show Entries */}
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <span>Show</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
          >
            {[10, 25, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>
            <span className="text-[#D9454C] font-semibold">
              {(currentPage - 1) * rowsPerPage + 1} to{" "}
              {Math.min(currentPage * rowsPerPage, filteredData.length)}
            </span>{" "}
            of {filteredData.length} entries
          </span>
        </div>

        {/* Pagination */}
        <div className="flex items-center gap-1 text-sm">
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-gray-500 hover:text-black px-2"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            // Show only first, last, current, and neighbors
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-[#D9454C] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            }

            // Show ellipsis
            if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="px-2">
                  ...
                </span>
              );
            }

            return null;
          })}

          {/* Next button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-gray-500 hover:text-black px-2"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
