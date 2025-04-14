"use client";
import React, { useState } from "react";
import TableInstan from "@/app/components/tableinstans";

const menu = () => {
  const [DataObject, setDataObject] = useState<unknown>([]);
  const [IsPopUpEdit, setIsPopUpEdit] = useState(false);
  //const [IsPopUpDelete, setIsPopUpDelete] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [activeTab, setActiveTab] = useState("waiting");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];

  const tabs = [
    { label: "All", value: "all" },
    { label: "Waiting For Approval", value: "waiting" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];
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
      window.location.href =
        "/BusinessPartnerManagement/AgencyRelationship/PartnerDetail";
    }
  };
  return (
    <div className="ml-64 p-4">
      <h3 className="text-3xl mb-5 font-bold">Agency Relationship</h3>
      <div className="flex space-x-6 border-b border-gray-200 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`pb-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.value
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
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
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex gap-4 items-center">
          {/* Search Bar */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-md text-sm"
            />
            <img
              src="/ProcureX/SearchIcon.png"
              alt="Search"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
            />
          </div>

          {/* Dropdown */}
          <div className="relative w-64">
            <button
              onClick={() => setOpen(!open)}
              className="w-full px-6 py-4 border border-gray-300 rounded-md bg-white flex justify-between items-center text-sm"
            >
              <span className={selected ? "text-black" : "text-gray-400"}>
                {selected || "Choose Something"}
              </span>
              <img
                src="/Procurex/DownIcon.png"
                alt="Dropdown"
                className="w-4 h-4 ml-2"
              />
            </button>
            {open && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 shadow-md">
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className="px-6 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter Icon */}
          <div className="rounded-md bg-[#F4F5F7] w-14 h-14 flex items-center justify-center cursor-pointer opacity-40 hover:bg-[#DFE1E6]">
            <img src="/Procurex/FilterIcon.png" alt="Filter" />
          </div>
        </div>

        {/* Buttons on the right */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <button className="px-6 py-4 bg-[#D9454C] hover:bg-[#c53d43] text-white rounded-md text-sm font-medium">
              Primary Action
            </button>

            <button className="px-6 py-4 bg-[#F4F5F7] text-[#253858] rounded-md text-sm font-medium hover:bg-[#DFE1E6]">
              Default
            </button>

            <button className="w-14 h-14 bg-[#F4F5F7] rounded-md flex items-center justify-center hover:bg-[#DFE1E6]">
              <span className="text-[#172B4D] text-xl font-bold">•••</span>
            </button>
          </div>
        </div>
      </div>

      <TableInstan
        api={"API AGENCY"}
        IsDelete
        IsEdit
        IsDetail
        RefreshKey={refresh}
        onDetailClick={handleDetailClick}
        search={searchQuery}
      />
    </div>
  );
};

export default menu;
