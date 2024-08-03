import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <div className="flex gap-2">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
