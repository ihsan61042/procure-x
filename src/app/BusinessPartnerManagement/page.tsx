"use client";
import React, { useState } from "react";

const menu = () => {
  const [DataObject, setDataObject] = useState<unknown>([]);
  const [IsPopUpEdit, setIsPopUpEdit] = useState(false);
  //const [IsPopUpDelete, setIsPopUpDelete] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleDetailClick = (
    row: { [key: string]: unknown },
    actionType: { [key: string]: unknown }
  ) => {
    setDataObject(row);
    if (actionType.type === "edit") {
      setIsPopUpEdit(true);
    } else if (actionType.type === "delete") {
      //setIsPopUpDelete(true);
    } else if (actionType.type === "detail") {
      // Handle detail action if needed
    }
  };
  return <div className="ml-64 p-4">test</div>;
};

export default menu;
