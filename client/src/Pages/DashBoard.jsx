import React from "react";
import Sidebar from "../Components/core/DashBoard/Sidebar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="flex w-full h-[calc(100vh-3.6rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="w-11/12 py-10 px-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
