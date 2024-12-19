import { Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages/Home/Index/Index";
import Profile from "./components/Profile/Profile";
import OrderStatus from "./components/OrderDetails/OrderStatus";
import About from "./pages/Home/About/About";
import Contact from "./pages/Home/Contact/Contact";
import Tours from "./pages/Home/Tours/Tours";
import TourDetails from "./pages/Home/Tours/TourDetails";
import Booking from "./pages/Home/Booking/Booking";
import Destinations from "./pages/Home/Destinations/Destinations";
import DestinationDetails from "./pages/Home/Destinations/DestinationDetails";
import PhotoGallery from "./pages/Home/PhotoGallery/PhotoGallery";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Notifications from "./components/notifications/notifications";
import NotificationDetail from "./components/notifications/NotificationDetail";
import CustomerReviews from './pages/Home/Tours/CustomerReviews';
import Dashboard from "./pages/Admin/Dashboard";
// admin
import IndexUser from "./pages/Admin/User/IndexUser";
import IndexDestination from "./pages/Admin/Destinations/IndexDestination";
import CreateDestination from "./pages/Admin/Destinations/CreateDestination";
import UpdateDestination from "./pages/Admin/Destinations/UpdateDestination";
import CreateUser from "./pages/Admin/User/CreateUser";
import EditUser from "./pages/Admin/User/EditUser";
import IndexLocation from "./pages/Admin/Location/IndexLocation";
import CreateLocation from "./pages/Admin/Location/CreateLocation";
import EditLocation from "./pages/Admin/Location/EditLocation";

import IndexTour from "./pages/Admin/Tour/IndexTour";
import CreateTour from "./pages/Admin/Tour/CreateTour";
import EditTour from "./pages/Admin/Tour/EditTour";

import CreateTourGuide from "./pages/Admin/TourGuide/CreateTourGuide";
import IndexTourGuide from "./pages/Admin/TourGuide/IndexTourGuide";
import EditTourGuide from "./pages/Admin/TourGuide/EditTourGuide";

import IndexDuration from "./pages/Admin/duration/IndexDuration";
import CreateDuration from "./pages/Admin/duration/CreateDuration";
import EditDuration from "./pages/Admin/duration/EditDuration";

import IndexBooking from "./pages/Admin/Booking/indexBooking";
import BookingDetail from "./pages/Admin/Booking/BookingDetail";

/* huong dan vienn */
import AdminTourGuide from "./pages/tourGuide/AdminTourGuide";
import TourGuide from "./pages/tourGuide/TourGuide/TourGuide";
import IndexShowall from "./pages/tourGuide/showtour/IndexShowall";

// </>
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import NoFooterLayout from "./layouts/NoFooterLayout";
import TourGuideLayout from "./layouts/TourGuideLayout";
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
          <Route path="/tour-details/:id" element={<TourDetails />} />
          <Route path="/tour-details/:tourPackageId" element={<CustomerReviews />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="booking/:id" element={<Booking />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />

          <Route path="gallery" element={<PhotoGallery />} />
        </Route>
        {/* Các route cho layout admin */}
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<Dashboard />} />
          <Route path="user" element={<IndexUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/update/:id" element={<EditUser />} />
          <Route path="destination" element={<IndexDestination />} />
          <Route path="destination/create" element={<CreateDestination />} />
          <Route
            path="/destination/update/:id"
            element={<UpdateDestination />}
          />
          <Route path="location" element={<IndexLocation />} />
          <Route path="location/create" element={<CreateLocation />} />
          <Route path="/location/update/:id" element={<EditLocation />} />

          <Route path="tour" element={<IndexTour />} />
          <Route path="tour/create" element={<CreateTour />} />
          <Route path="tour/update/:id" element={<EditTour />} />
          <Route path="tourGuide" element={<IndexTourGuide />} />
          <Route path="tourGuide/create" element={<CreateTourGuide />} />
          <Route path="tourGuide/update/:id" element={<EditTourGuide />} />
          <Route path="duration" element={<IndexDuration />} />
          <Route path="duration/create" element={<CreateDuration />} />
          <Route path="/duration/update/:id" element={<EditDuration />} />
          <Route path="booking" element={<IndexBooking />} />
          <Route path="/booking/detail/:code" element={<BookingDetail />} />

        </Route>

        {/* Routes for NoFooterLayout (for login, register, and profile) */}
        <Route element={<NoFooterLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="OrderStatus" element={<OrderStatus />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="/notifications/:id" element={<NotificationDetail />} />
        </Route>
        {/* huong dan vien*/}
        <Route element={<TourGuideLayout />}>
          <Route path="Indextourguide" element={<AdminTourGuide />} />
          <Route path="login" element={<Login />} />
          <Route path="TourGuide" element={<TourGuide />} />
          <Route path="IndexShowall" element={<TourGuide />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
