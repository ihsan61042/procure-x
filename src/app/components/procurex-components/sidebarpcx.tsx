"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logout from "@/app/components/buttonlogout";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [expandedMenu, setExpandedMenu] = useState(
    "Business Partner Management"
  );

  useEffect(() => {
    const isLogin = localStorage.getItem("IsLogin");
    const Role = localStorage.getItem("Role");
    // if (!isLogin || isLogin === "False" || Role !== "Admin") {
    //   router.push("../");
    // }
  }, [router]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleMenu = (menuName: string) => {
    setExpandedMenu((prev) => (prev === menuName ? "" : menuName));
  };

  const menuItemClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-100 text-sm font-medium cursor-pointer";
  const subItemClass = "block px-4 py-2 rounded-lg text-sm hover:bg-red-100";
  const activeSubItemClass = "bg-[#FFEAED] font-semibold text-black";

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <img
            src="/Procurex/Logo ProcureX.png"
            alt="Logo"
            className="w-44 h-auto"
          />
        </div>
        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-2 text-sm">
            {/* RAB Management */}
            <li>
              <div
                onClick={() => toggleMenu("RAB Management")}
                className={menuItemClass}
              >
                <img
                  src="/Procurex/RABIcon.png"
                  alt="Logo"
                  className="w-auto h-auto"
                />
                RAB Management
                <span className="ml-auto">
                  {expandedMenu === "RAB Management" ? (
                    <img
                      src="/Procurex/UpIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  ) : (
                    <img
                      src="/Procurex/DownIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  )}
                </span>
              </div>
              {expandedMenu === "RAB Management" && (
                <ul className="pl-6 space-y-1 mt-1">
                  <li>
                    <Link href="#" className={subItemClass}>
                      RAB Item
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Business Partner Management */}
            <li>
              <div
                onClick={() => toggleMenu("Business Partner Management")}
                className={`${menuItemClass} text-red-600`}
              >
                <img
                  src="/Procurex/BusinessPartnerManagementIcon.png"
                  alt="Logo"
                  className="w-auto h-auto"
                />{" "}
                Business Partner Management
                <span className="ml-auto">
                  {expandedMenu === "Business Partner Management" ? (
                    <img
                      src="/Procurex/UpIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  ) : (
                    <img
                      src="/Procurex/DownIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  )}
                </span>
              </div>
              {expandedMenu === "Business Partner Management" && (
                <ul className="pl-6 space-y-1 mt-1">
                  <li>
                    <Link
                      href="/BusinessPartnerManagement/BusinessPartner"
                      className={subItemClass}
                    >
                      Business Partner
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/BusinessPartnerManagement/BusinessPartnerRegistration"
                      className={subItemClass}
                    >
                      Business Partner Registration
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/BusinessPartnerManagement/AgencyRelationship"
                      className={`${subItemClass} ${activeSubItemClass}`}
                    >
                      Agency Relationship
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* eTender */}
            <li>
              <Link href="#" className={menuItemClass}>
                <img
                  src="/Procurex/EtenderIcon.png"
                  alt="Logo"
                  className="w-auto h-auto"
                />{" "}
                eTender
              </Link>
            </li>

            {/* User Role Management */}
            <li>
              <div
                onClick={() => toggleMenu("User Role Management")}
                className={menuItemClass}
              >
                <img
                  src="/Procurex/UserRoleManagement.png"
                  alt="Logo"
                  className="w-auto h-auto"
                />{" "}
                User Role Management
                <span className="ml-auto">
                  {expandedMenu === "User Role Management" ? (
                    <img
                      src="/Procurex/UpIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  ) : (
                    <img
                      src="/Procurex/DownIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  )}
                </span>
              </div>
              {expandedMenu === "User Role Management" && (
                <ul className="pl-6 space-y-1 mt-1">
                  <li>
                    <Link href="#" className={subItemClass}>
                      Role List
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Master Data */}
            <li>
              <div
                onClick={() => toggleMenu("Master Data")}
                className={menuItemClass}
              >
                <img
                  src="/Procurex/MasterDataIcon.png"
                  alt="Logo"
                  className="w-auto h-auto"
                />{" "}
                Master Data
                <span className="ml-auto">
                  {expandedMenu === "Master Data" ? (
                    <img
                      src="/Procurex/UpIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  ) : (
                    <img
                      src="/Procurex/DownIcon.png"
                      alt="Icon"
                      className="w-auto h-auto"
                    />
                  )}
                </span>
              </div>
              {expandedMenu === "Master Data" && (
                <ul className="pl-6 space-y-1 mt-1">
                  <li>
                    <Link href="#" className={subItemClass}>
                      Data List
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <Logout />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
