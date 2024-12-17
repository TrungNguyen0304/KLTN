const Location = require('../models/location'); // Import model
const Destination = require('../models/destination'); 

const create = async (req, res) => {
    try {
        const { firstname } = req.body;
        console.log('Dữ liệu nhận được:', req.body);  // Ghi log dữ liệu trong body của yêu cầu

        // Kiểm tra dữ liệu
        if (!firstname) {
            return res.status(400).json({ message: 'Firstname là bắt buộc' });
        }

        // Tạo vị trí mới
        const newLocation = new Location({ firstname });
        await newLocation.save();

        // Trả lại vị trí mới được tạo
        res.status(201).json(newLocation);
    } catch (error) {
        console.error('Lỗi khi tạo vị trí:', error);
        res.status(400).json({ message: 'Tạo vị trí không thành công', error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
      // Lấy tất cả Location
      const locations = await Location.find();
  
      // Đếm số lượng Destination cho mỗi Location
      const locationsWithDestinationsCount = await Promise.all(
        locations.map(async (location) => {
          // Đếm số lượng Destination liên kết với Location
          const destinationsCount = await Destination.countDocuments({
            locationId: location._id, // locationId của Destination phải khớp với _id của Location
          });
  
          return {
            ...location.toObject(), // Chuyển đổi Location thành object
            destinationsCount, // Thêm trường destinationsCount
          };
        })
      );
  
      // Trả về danh sách Locations kèm số lượng Destination
      res.status(200).json(locationsWithDestinationsCount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách Locations", error: error.message });
    }
};

const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request parameters
        const deletedLocation = await Location.findByIdAndDelete(id); // Delete the location

        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname } = req.body;

        const updatedLocation = await Location.findByIdAndUpdate(id, { firstname }, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchLocation = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    // Modify the filter to use firstname (you can change this to another field if needed)
    const filter = searchQuery
      ? {
          firstname: { $regex: searchQuery, $options: "i" }, // Search by firstname (or any other field)
        }
      : {};

    // Lấy danh sách locations đã lọc
    const locations = await Location.find(filter);

    // Tính toán số lượng destinations cho mỗi location
    const locationsWithDestinationsCount = await Promise.all(
      locations.map(async (location) => {
        // Tính số lượng destinations liên quan đến location này
        const destinationsCount = await Destination.countDocuments({ locationId: location._id });
        return {
          ...location.toObject(),
          destinationsCount,  // Thêm trường destinationsCount vào mỗi location
        };
      })
    );

    // Trả về danh sách locations với destinationsCount
    res.status(200).json(locationsWithDestinationsCount);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Error fetching locations" });
  }
};
module.exports = {
    create,
    getAll,
    deleteLocation,
    updateLocation,
    getLocationById,
    searchLocation
};
