import { useLocation } from "react-router-dom";
import "./App.css";
import "./adminApp.css";
import Header from "./components/Common/Header/Header";
import Footer from "./components/Common/Footer/Footer";
import UserRoutes from "./routes/HomeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLoginRoute = location.pathname === "/login";

  useEffect(() => {
    const user = localStorage.getItem("user");
  }, []);

  return (
    <>
      {!isAdminRoute && (
        <Header className={isLoginRoute ? "header-login" : ""} />
      )}
      <UserRoutes />
      <AdminRoutes />
      {!isAdminRoute && !isLoginRoute && location.pathname !== "/register" && (
        <Footer />
      )}
    </>
  );
}

export default App;
