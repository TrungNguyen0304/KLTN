import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Tours from "../pages/Tours/Tours";
import TourDetails from "../pages/Tours/TourDetails";
import Booking from "../pages/Booking/Booking";
import Destinations from "../pages/Destinations/Destinations";
import PhotoGallery from "../pages/PhotoGallery/PhotoGallery";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about-us" element={<About />} />
      <Route path="contact-us" element={<Contact />} />
      <Route path="tours" element={<Tours />} />
      <Route path="tour-details" element={<TourDetails />} />
      <Route path="booking" element={<Booking />} />
      <Route path="destinations" element={<Destinations />} />
      <Route path="gallery" element={<PhotoGallery />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default HomeRoutes;
