"use client";

import React, { useState, useEffect } from "react";

import Table from "@/app/components/table";

interface TableProps {
  api: string; //mandatory
  IsRefresh: boolean; //mandatory
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
  const [columnNames, setcolumnNames] = useState<string[]>([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };

      const accessToken = getCookie("accesstoken");

      const result = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
          Authorization: `Bearer ${accessToken}`, // Use the token from the cookie
        },
      });
      console.log(result);
      if (!result.ok) {
        console.error(result.json());
      }

      const json: { [key: string]: unknown }[] = await result.json();
      console.log(json);

      const maxColumnsItem = json.reduce(
        (prev, current) => {
          return Object.keys(current).length > Object.keys(prev).length
            ? current
            : prev;
        },
        [IsRefresh]
      );
      setcolumnNames(Object.keys(maxColumnsItem));

      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);

      // Handle error state here if needed
    }
  };
  // fetchData();

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
