import React from "react";
import "../adminApp.css";
import MainDash from "../admin/MainDash/MainDash";
// import RightSide from "../admin/RigtSide/RightSide";
import Sidebar from "../admin/siderBar/Sidebar";
export default function dashboard() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash />
        {/* <RightSide /> */}
      </div>
    </div>
  );
}
