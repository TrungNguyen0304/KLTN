import React from 'react';
import Sidebar from '../pages/Admin/siderBar/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Admin/Navbar/Navbar';

const AdminLayout = () => {
  return (
    <>
    <Navbar/>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />

          <Outlet />
        </div>
      </div>
    </>
  );

};

export default AdminLayout;
