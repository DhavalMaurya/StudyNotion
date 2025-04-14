// import React from "react";
// import Sidebar from "../Components/core/DashBoard/Sidebar";
// import { Outlet } from "react-router-dom";

// const DashBoard = () => {
//   return (
//     <div className="flex w-full h-[calc(100vh-3.6rem)]">
//       <Sidebar />
//       <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//         <div className="w-11/12 py-10 px-10">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;


import React, { useState } from "react";
import Sidebar from "../Components/core/DashBoard/Sidebar";
import { Outlet } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-[calc(100vh-3.6rem)] relative">
      {/* Hamburger for small screens */}
      <button
        className="absolute top-4 left-4 z-50 text-white text-2xl lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <RxHamburgerMenu />
      </button>

      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto ">
        <div className="w-full md:w-11/12 md:py-10 md:px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
