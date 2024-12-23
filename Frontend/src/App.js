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

import CreateGallery from "./pages/Admin/gallery/CreateGallery";
import IndexGallery from "./pages/Admin/gallery/IndexGallery"

import CreateTourGuide from "./pages/Admin/TourGuide/CreateTourGuide";
import IndexTourGuide from "./pages/Admin/TourGuide/IndexTourGuide";
import EditTourGuide from "./pages/Admin/TourGuide/EditTourGuide";

import IndexDuration from "./pages/Admin/duration/IndexDuration";
import CreateDuration from "./pages/Admin/duration/CreateDuration";
import EditDuration from "./pages/Admin/duration/EditDuration";

import IndexBooking from "./pages/Admin/Booking/indexBooking";
import BookingDetail from "./pages/Admin/Booking/BookingDetail";

import Indexmessage from "./pages/Admin/messages/Indexmessage";

/* huong dan vienn */
import AdminTourGuide from "./pages/tourGuide/AdminTourGuide";
import IndexShowall from "./pages/tourGuide/showtour/IndexShowall";
import PaymentDetail from "./pages/tourGuide/showtour/PaymentDetail";
import ProfileGuide from "./pages/tourGuide/ProfileGuide/Profile";


// </>
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import NoFooterLayout from "./layouts/NoFooterLayout";
import TourGuideLayout from "./layouts/TourGuideLayout";
//

import ProtectedRoute from "./components/ProtectedRoute"
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
          {/* Sử dụng ProtectedRoute để bảo vệ các tuyến admin */}
          <Route
            path="admin"
            element={
              <ProtectedRoute roleRequired="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Indexmessage"
            element={
              <ProtectedRoute roleRequired="admin">
                <Indexmessage />
              </ProtectedRoute>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/create"
            element={
              <ProtectedRoute roleRequired="admin">
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/update/:id"
            element={
              <ProtectedRoute roleRequired="admin">
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="destination"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexDestination />
              </ProtectedRoute>
            }
          />
          <Route
            path="destination/create"
            element={
              <ProtectedRoute roleRequired="admin">
                <CreateDestination />
              </ProtectedRoute>
            }
          />
          {/* thu vien anh */}
          <Route
            path="gallerys/create"
            element={
              <ProtectedRoute roleRequired="admin">
                <CreateGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="gallerys"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexGallery />
              </ProtectedRoute>
            }
          />

          {/* ket thuc */}
          <Route
            path="/destination/update/:id"
            element={
              <ProtectedRoute roleRequired="admin">
                <UpdateDestination />
              </ProtectedRoute>
            }
          />
          <Route
            path="location"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="location/create"
            element={
              <ProtectedRoute roleRequired="admin">
                <CreateLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/location/update/:id"
            element={
              <ProtectedRoute roleRequired="admin">
                <EditLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="tour"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexTour />
              </ProtectedRoute>
            }
          />
          <Route
            path="tour/create"
            element={
              <ProtectedRoute roleRequired="admin">
                <CreateTour />
              </ProtectedRoute>
            }
          />
          <Route
            path="tour/update/:id"
            element={
              <ProtectedRoute roleRequired="admin">
                <EditTour />
              </ProtectedRoute>
            }
          />
          <Route
            path="tourGuide"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexTourGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="tourGuide/create"
            element={
              <ProtectedRoute roleRequired="admin">
                <CreateTourGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="tourGuide/update/:id"
            element={
              <ProtectedRoute roleRequired="admin">
                <EditTourGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="duration"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexDuration />
              </ProtectedRoute>
            }
          />
          <Route
            path="duration/create"
            element={
              <ProtectedRoute roleRequired="admin">
                <CreateDuration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/duration/update/:id"
            element={
              <ProtectedRoute roleRequired="admin">
                <EditDuration />
              </ProtectedRoute>
            }
          />
          <Route
            path="booking"
            element={
              <ProtectedRoute roleRequired="admin">
                <IndexBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/detail/:code"
            element={
              <ProtectedRoute roleRequired="admin">
                <BookingDetail />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="Indextourguide"
            element={
              <ProtectedRoute roleRequired="tourguide">
                <AdminTourGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="profiletourguide"
            element={
              <ProtectedRoute roleRequired="tourguide">
                <ProfileGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="IndexShowall"
            element={
              <ProtectedRoute roleRequired="tourguide">
                <IndexShowall />
              </ProtectedRoute>
            }
          />
          <Route
            path="/IndexShowall/:paymentId"
            element={
              <ProtectedRoute roleRequired="tourguide">
                <PaymentDetail />
              </ProtectedRoute>
            }
          />
        
        </Route>
      </Routes>
    </>
  );
}

export default App;
