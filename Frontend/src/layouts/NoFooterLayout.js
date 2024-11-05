// src/layouts/NoFooterLayout.js
import React from "react";
import Header from "../components/Common/Header/Header"; // Adjust the path if needed
import { Outlet } from "react-router-dom";

const NoFooterLayout = () => {
    return (
        <div>
            <Header />
            <main><Outlet /></main>
        </div>
    );
};

export default NoFooterLayout;
