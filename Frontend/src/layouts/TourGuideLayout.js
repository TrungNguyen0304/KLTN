import React from 'react';
import SidebarGuide from '../pages/tourGuide/siderBarGuide/Sidebar';
import { Outlet } from 'react-router-dom';
import NavbarGuide from '../pages/tourGuide/NavbarGuide/Navbar';

const TourGuideLayout = () => {
    return (
        <>
            <NavbarGuide />
            <div className="App">
                <div className="AppGlass">
                    <SidebarGuide />

                    <Outlet />
                </div>
            </div>
        </>
    );

};

export default TourGuideLayout;
