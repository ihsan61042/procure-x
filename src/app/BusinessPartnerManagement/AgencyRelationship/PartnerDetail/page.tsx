"use client";
import React, { useState } from "react";

const BusinessPartnerDetail = () => {
  const tabs = [
    { label: "Basic Information", value: "BasicInfo" },
    { label: "Payment Information", value: "PaymentInfo" },
    { label: "Contact Information", value: "ContactInfo" },
    { label: "Documents", value: "Documents" },
  ];

  const [activeTab, setActiveTab] = useState("BasicInfo");

  return (
    <div className="ml-64 p-4 min-h-screen font-sans">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">Business Partner Detail</h2>

      {/* Status Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Status</p>
          <span className="bg-[#FEF0C7] text-[#F79009] px-3 py-2 rounded-md text-center font-bold">
            Waiting For Approval
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">State</p>
          <p className="text-gray-800 font-medium">Vendor Management Staff</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Submitted Date</p>
          <p className="text-gray-800 font-medium">28 May 2025 12:32</p>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Registration Email & Role */}
      <div className="p-4 border rounded mb-6">
        <p className="text-sm font-medium text-gray-500">
          Business Partner Role
        </p>
        <p className="text-gray-800 font-medium mb-2">Vendor</p>
        <p className="text-sm font-medium text-gray-500">Registration Email</p>
        <p className="text-gray-800 font-medium">Testvendor@company.com</p>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-3 gap-4 p-4 border rounded mb-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Country</p>
          <p>Indonesia</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Business Partner Level
          </p>
          <p>HO</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Business Partner Number
          </p>
          <p>REG202412013</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Title</p>
          <p>PT</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Business Partner Name
          </p>
          <p>PT Vendor Management</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Category</p>
          <p>Kontraktor</p>
        </div>
      </div>

      {/* Address */}
      <div className="grid grid-cols-3 gap-4 p-4 border rounded mb-6">
        <div className="col-span-3">
          <p className="text-sm font-medium text-gray-500">Address</p>
          <p>Jl. Tekno Bsd No.No.Kav A/5, RT.16/RW.4</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Region</p>
          <p>BSD City</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">City</p>
          <p>Tangerang Selatan</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">District</p>
          <p>Serpong</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Sub District</p>
          <p>Rawa Buntu</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Postal Code</p>
          <p>15326</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Business Email</p>
          <p>Vendor@company.com</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Company Phone Number
          </p>
          <p>021-55348923</p>
        </div>
      </div>

      {/* NPWP */}
      <div className="grid grid-cols-3 gap-4 p-4 border rounded mb-6">
        <div>
          <p className="text-sm font-medium text-gray-500">NPWP Number</p>
          <p>8239284794721974921</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">NPWP Name</p>
          <p>PT Vendor Management</p>
        </div>
        <div className="col-span-3">
          <p className="text-sm font-medium text-gray-500">NPWP Address</p>
          <p>Jl. Tekno Bsd No.No.Kav A/5, RT.16/RW.4</p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-4 bg-[#F4F5F7] text-[#253858] rounded-md text-sm font-medium hover:bg-[#DFE1E6]">
          Revise
        </button>
        <button className="px-6 py-4 bg-[#F4F5F7] text-[#253858] rounded-md text-sm font-medium hover:bg-[#DFE1E6]">
          Reject
        </button>
        <button className="px-6 py-4 bg-[#D9454C] hover:bg-[#c53d43] text-white rounded-md text-sm font-medium">
          Approve
        </button>
      </div>
    </div>
  );
};

export default BusinessPartnerDetail;
