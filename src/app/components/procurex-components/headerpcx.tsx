import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";

const Header: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 ml-64 w-[calc(100%-16rem)] flex justify-end items-center px-6 py-3 border-b bg-white shadow-sm">
      {/* Notifikasi */}
      <div className="flex items-center gap-4">
        <CiBellOn className="w-5 h-5 text-gray-400 cursor-pointer" />
        <div className="h-5 border-r border-gray-300" />

        {/* Profile */}
        <div className="flex items-center gap-2">
          <FaRegUserCircle className="w-6 h-6 text-gray-600" />
          <div className="flex flex-col text-sm leading-tight">
            <span className="font-semibold text-gray-900">
              Noviani Wiandari
            </span>
            <span className="text-gray-400 text-xs">20024022</span>
          </div>
          <img
            src="/Procurex/DownIcon.png"
            alt="Icon"
            className="w-auto h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
