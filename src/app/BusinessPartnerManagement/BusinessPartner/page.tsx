"use client";
import React, { useState } from "react";
import TableInstan from "@/app/components/tableinstans";
// import FormInstans from "@/app/components/updateinstan";

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
      // Handle detail action if needed s
    }
  };

  return (
    <div className="ml-64 p-4">
      {/* {IsPopUpEdit && (
        <div>
          <FormInstans
            api={
              "https://samaktamitrapt-dev.outsystemsenterprise.com/MakanGratis/rest/Sekolah/UpdateSekolah"
            }
            data={DataObject}
            onCancel={() => setIsPopUpEdit(false)}
            onSave={() => (setIsPopUpEdit(false), setRefresh(refresh + 1))}
          />
        </div>
      )} */}
      <TableInstan
        api={"API MENU"}
        IsDelete
        IsEdit
        IsDetail
        RefreshKey={refresh}
        onDetailClick={handleDetailClick}
      />
    </div>
  );
};

export default menu;
