import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SmallSidebar from "./SmallSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showSmallSizeBar, setShowSmallSizeBar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-neutral-300 md:pt-2 md:px-2 text-black">
      <div className="flex gap-2">
        {showSideBar && <Sidebar />}
        <div className="w-full overflow-x-scroll">
          <Header
            toggle={showSideBar}
            toggleFunction={setShowSideBar}
            small={showSmallSizeBar}
            setSmall={setShowSmallSizeBar}
          />
          {showSmallSizeBar && <SmallSidebar setSmall={setShowSmallSizeBar} />}
          <div className="py-3  min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
