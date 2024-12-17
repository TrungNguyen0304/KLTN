require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./configs/db");
const authRoutes = require("./routes/userRoute");
const DestinationRoutes = require("./routes/destinationRoute");
const BookingRoutes = require("./routes/bookingRoute");
const TourPackageRoutes = require("./routes/tourPackageRoute");
const locationRoutes = require("./routes/locationRoute");
const tourGuideRoutes = require("./routes/tourGuideRoute");
const notificationRouter = require("./routes/notificationRoute");
const durationRoutes = require("./routes/durationRoute");
const reviewRoute = require("./routes/reviewRoute");
const filterRoute = require("./routes/filterRoute")
const searchdestinationRoute = require("./routes/searchdestinationRoute")

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());
// Middleware để parse body theo JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Connect to MongoDB
connectDB();

// API routes
app.use("/api/user", authRoutes);
app.use("/api/destination", DestinationRoutes);
app.use("/api/booking", BookingRoutes);
app.use("/api/tourPackage", TourPackageRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/tourGuide",tourGuideRoutes );
app.use("/api/notifications", notificationRouter);
app.use("/api/duration",durationRoutes );
app.use("/api/review",reviewRoute );
app.use("/api/filter",filterRoute );
app.use("/api/searchdestination",searchdestinationRoute);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
