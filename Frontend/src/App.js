import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Home/Index/Index"
import Profile from "./components/Profile/Profile";
import About from "./pages/Home/About/About";
import Contact from "./pages/Home/Contact/Contact";
import Tours from "./pages/Home/Tours/Tours";
import TourDetails from "./pages/Home/Tours/TourDetails";
import Booking from "./pages/Home/Booking/Booking";
import Destinations from "./pages/Home/Destinations/Destinations";
import PhotoGallery from "./pages/Home/PhotoGallery/PhotoGallery";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
// admin
import IndexUser from "./pages/Admin/User/IndexUser";
import IndexDestination from "./pages/Admin/Destinations/IndexDestination";
import CreateDestination from "./pages/Admin/Destinations/CreateDestination";
import UpdateDestination from "./pages/Admin/Destinations/UpdateDestination";
import CreateUser from "./pages/Admin/User/CreateUser";
import EditUser from "./pages/Admin/User/EditUser";
import IndexLocation from "./pages/Admin/Location/IndexLocation"
import CreateLocation from "./pages/Admin/Location/CreateLocation";
import EditLocation from "./pages/Admin/Location/EditLocation";


// </>
import MainLayout from "./layouts/MainLayout"; // Import MainLayout
import AdminLayout from "./layouts/AdminLayout"; // Import AdminLayout
import Dashboard from "./pages/Admin/Dashboard"
import NoFooterLayout from "./layouts/NoFooterLayout"; // Import NoFooterLayout
function App() {

  return (
    <>
      <Routes>
        {/* Các route cho layout chính */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="about-us" element={<About />} />
          <Route path="contact-us" element={<Contact />} />
          <Route path="tours" element={<Tours />} />
          <Route path="tour-details" element={<TourDetails />} />
          <Route path="booking" element={<Booking />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="gallery" element={<PhotoGallery />} />
        </Route>
        {/* Các route cho layout admin */}
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<Dashboard />} />
          <Route path="user" element={<IndexUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/update" element={<EditUser />} />
          <Route path="destination" element={<IndexDestination />} />
          <Route path="destination/create" element={<CreateDestination />} />
          <Route path="destination/update" element={<UpdateDestination />} />
          <Route path="location" element={<IndexLocation />} />
          <Route path="location/create" element={<CreateLocation />} />
          <Route path="/location/update/:id" element={<EditLocation />} />
         
          {/* Thêm các route admin khác nếu cần */}
        </Route>


        {/* Routes for NoFooterLayout (for login, register, and profile) */}
        <Route element={<NoFooterLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
