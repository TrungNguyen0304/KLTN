import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user || (roleRequired && user.role !== roleRequired)) {
    // Nếu không có token hoặc user, hoặc vai trò không khớp, chuyển hướng về trang login
    return <Navigate to="/login" />;
  }

  // Nếu đủ điều kiện, render nội dung của children
  return children;
}

export default ProtectedRoute;
