const Location = require('../models/location'); // Import model

const create = async (req, res) => {
    try {
        const { firstname } = req.body;
        const newLocation = new Location({ firstname });
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAll = async (req, res) => {

    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

module.exports = {
    create,
    getAll,
    deleteLocation,
    updateLocation,
    getLocationById
};