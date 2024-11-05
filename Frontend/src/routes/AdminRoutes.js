import { Route, Routes } from "react-router-dom";
import Admin from "../admin/dashboard";
import ProtectedRoute from "../components/hooks/ProtectedRoute";
import AllCustomers from "../admin/Customers/allCustomers"; 


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/Admin" element={<ProtectedRoute element={<Admin />} />} />
      <Route path="/admin/all-customers" element={<ProtectedRoute element={<AllCustomers />} />} />
    </Routes>
  );
};

export default AdminRoutes;
