import React, { useState } from "react";
import { motion } from "framer-motion";
import Alert from "./alert";
import { formatCurrency } from "@/utils/FormatCurrency";

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
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onDetailClick,
  IsDetail,
  IsEdit,
  IsDelete,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(data);
  const [IsAlertSuccess, setIsAlert] = useState(false);

  React.useEffect(() => {
    setTableData(data);
  }, [data]);
  const rowsPerPage = 10;

  const sortedData = React.useMemo(() => {
    const sortableData = [...tableData];
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
  }, [tableData, sortConfig]);

  const filteredData = React.useMemo(() => {
    return sortedData.filter((row) =>
      columns.some((column) =>
        (row[column] ?? "")
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [sortedData, searchQuery, columns]);

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

  const handleInputChange = async (
    rowIndex: number,
    column: string,
    value: string
  ) => {
    setIsAlert(false);
    const updatedData = [...tableData];
    updatedData[rowIndex][column] = value;

    // Calculate the total
    const variable1 =
      parseFloat(updatedData[rowIndex].Variable1 as string) || 0;
    const variable2 =
      parseFloat(updatedData[rowIndex].Variable2 as string) || 0;
    updatedData[rowIndex].Total = variable1 + variable2;

    setTableData(updatedData);

    const formData = updatedData[rowIndex];
    try {
      const response = await fetch(
        "https://samaktamitrapt-dev.outsystemsenterprise.com/MakanGratis/rest/RAB/UpdateRAB",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsAlert(true);
    } catch (error) {
      alert("Error updating data: " + error);
    }
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div>
      {IsAlertSuccess && (
        <Alert type="success" message="Data berhasil diubah" />
      )}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="ml-3 mb-4 p-2 border border-gray-300 rounded"
      />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(column)}
              >
                {column}
                {sortConfig?.key === column
                  ? sortConfig.direction === "ascending"
                    ? " 🔼"
                    : " 🔽"
                  : null}
              </th>
            ))}
            {(IsDetail || IsEdit || IsDelete) && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
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
            >
              {columns.map((column) => (
                <td key={column} className="px-6 py-4 whitespace-nowrap">
                  {column === "Id" ? (
                    <span>{row[column] as React.ReactNode}</span>
                  ) : column === "Total" ? (
                    <span>{formatCurrency(row[column] as number)}</span>
                  ) : (
                    <input
                      type="number"
                      value={
                        (row[column] as string | number | readonly string[]) ??
                        ""
                      }
                      onChange={(e) => {
                        const updatedData = [...tableData];
                        updatedData[rowIndex][column] = e.target.value;
                        setTableData(updatedData);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleInputChange(
                            rowIndex,
                            column,
                            e.currentTarget.value
                          );
                          e.currentTarget.blur();
                        }
                      }}
                      className="border border-gray-300 rounded p-1"
                    />
                  )}
                </td>
              ))}
              {(IsDetail || IsEdit || IsDelete) && (
                <td className="px-6 py-4 whitespace-nowrap">
                  {IsDetail && (
                    <button
                      onClick={() =>
                        onDetailClick && onDetailClick(row, "detail")
                      }
                      className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded mr-2"
                    >
                      Detail
                    </button>
                  )}
                  {IsEdit && (
                    <button
                      onClick={() =>
                        onDetailClick && onDetailClick(row, "edit")
                      }
                      className="bg-green-500 text-white hover:bg-green-700 px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  {IsDelete && (
                    <button
                      onClick={() =>
                        onDetailClick && onDetailClick(row, "delete")
                      }
                      className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded mr-2"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="join">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`join-item btn btn-lg ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
