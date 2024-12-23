const Gallery = require("../models/gallery");

// API to add a new destination
const createGallery = async (req, res) => {
    try {
        // Extract the groupImages array from the request files
        const Images = req.files["image"] ? req.files["image"][0].path : "";
        // Use the Gallery model instead of Destination
        const newGallery = new Gallery({
            Images,
        });

        await newGallery.save();

        res.status(201).json({
            message: "Đã thêm gallery thành công!",
            gallery: newGallery, // Updated to 'gallery' to match the object name
        });
    } catch (error) {
        console.error("Lỗi khi thêm gallery:", error.message);
        res.status(500).json({ message: "Lỗi khi thêm gallery", error: error.message });
    }
};

const showAllGalleries = async (req, res) => {
    try {
        // Retrieve all gallery entries from the database
        const galleries = await Gallery.find();

        if (galleries.length === 0) {
            return res.status(404).json({ message: "Không có thư viện ảnh nào!" });
        }

        res.status(200).json({
            message: "Lấy tất cả thư viện ảnh thành công!",
            galleries: galleries,
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách gallery:", error.message);
        res.status(500).json({ message: "Lỗi khi lấy danh sách gallery", error: error.message });
    }
};


const deleteGallery = async (req, res) => {
    try {
        const galleryId = req.params.id; // Get the gallery ID from the URL parameters

        // Attempt to find and delete the gallery by its ID
        const gallery = await Gallery.findByIdAndDelete(galleryId);

        if (!gallery) {
            return res.status(404).json({ message: "Không tìm thấy thư viện ảnh với ID này!" });
        }

        res.status(200).json({
            message: "Thư viện ảnh đã được xóa thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi xóa gallery:", error.message);
        res.status(500).json({ message: "Lỗi khi xóa gallery", error: error.message });
    }
};

module.exports = {
    createGallery,
    showAllGalleries,
    deleteGallery

};
