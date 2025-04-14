"use client";

import React, { useState, useEffect } from "react";
import Table from "@/app/components/tableprocurex";

interface TableProps {
  api: string; // Mandatory
  IsRefresh: boolean; // Mandatory
  IsDetail?: boolean;
  IsEdit?: boolean;
  IsDelete?: boolean;
  onDetailClick?: (
    row: { [key: string]: unknown },
    actionType: { [key: string]: unknown }
  ) => void;
}

const TableInstan: React.FC<TableProps> = ({
  api,
  IsDetail,
  IsEdit,
  IsDelete,
  onDetailClick,
  IsRefresh,
}) => {
  const [data, setData] = useState<{ [key: string]: unknown }[]>([]);
  const [columnNames, setColumnNames] = useState<string[]>([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const result = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        console.error("Failed to fetch data", await result.json());
        return;
      }

      const json: { [key: string]: unknown }[] = await result.json();

      // Determine columns from the object with the most keys
      const maxColumnsItem = json.reduce((prev, current) => {
        return Object.keys(current).length > Object.keys(prev).length
          ? current
          : prev;
      }, {});

      setColumnNames(Object.keys(maxColumnsItem));
      setData(json as { [key: string]: unknown }[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [IsRefresh]);

  return (
    <div>
      <Table
        columns={columnNames}
        data={data}
        onDetailClick={(row, actionType) =>
          onDetailClick && onDetailClick(row, { type: actionType })
        }
        IsDetail={IsDetail}
        IsEdit={IsEdit}
        IsDelete={IsDelete}
      />
    </div>
  );
};

export default TableInstan;
