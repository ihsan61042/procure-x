"use client";

import React, { useState, useEffect } from "react";
import useFetch from "@/../../hooks/useFetch"; // Custom hook for fetching data

import Table from "@/app/components/table";
import { stringify } from "querystring";

interface TableProps {
  api: string; //mandatory

  RefreshKey: number; //mandatory
  IsDetail?: boolean;
  IsEdit?: boolean;
  IsDelete?: boolean;
  search?: string;
  onDetailClick?: (
    row: { [key: string]: unknown },
    actionType: { [key: string]: unknown }
  ) => void;
}

const TableInstan: React.FC<TableProps> = ({
  api,

  IsDelete,
  onDetailClick,
  search,
  RefreshKey,
}) => {
  const [dataa, setData] = useState<{ [key: string]: unknown }[]>([]);
  const [columnNames, setcolumnNames] = useState<string[]>([]);
  const [apii, setApii] = useState<string>("");

  useEffect(() => {
    if (api === "API SEKOLAH") {
      setApii(process.env.NEXT_PUBLIC_API_SEKOLAH || "");
    } else if (api === "API MENU") {
      setApii(process.env.NEXT_PUBLIC_API_MENU || "");
    } else if (api === "API GURU") {
      setApii(process.env.NEXT_PUBLIC_API_GURU || "");
    } else if (api === "API AGENCY") {
      setApii(process.env.NEXT_PUBLIC_API_AGENCYRELATIONSHIP || "");
    }
  }, [RefreshKey, api]);

  // Fetch data from API;
  // const fetchData = async () => {

  // };
  // fetchData();

  const { data } = useFetch(apii, RefreshKey);

  useEffect(() => {
    if (data) {
      const json: { [key: string]: unknown }[] = data as {
        [key: string]: unknown;
      }[];
      console.log(json);

      const maxColumnsItem = json.reduce(
        (
          prev: { [key: string]: unknown },
          current: { [key: string]: unknown }
        ) => {
          return Object.keys(current).length > Object.keys(prev).length
            ? current
            : prev;
        },
        {}
      );
      setcolumnNames(Object.keys(maxColumnsItem));

      setData(json);
      // console.log(dataa);
    }
  }, [data, RefreshKey]);

  return (
    <div>
      <Table
        columns={columnNames}
        data={dataa}
        onDetailClick={(row, actionType) =>
          onDetailClick && onDetailClick(row, { type: actionType })
        }
        IsDelete={IsDelete}
        IsDetail={true}
        IsEdit={true}
        search={search}
      />
    </div>
  );
};

export default TableInstan;
