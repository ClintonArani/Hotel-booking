import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = String(req.user._id); // Ensure string format

        // Check if all required fields are present
        if (!name || !address || !contact || !city) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if user already registered a hotel
        const hotel = await Hotel.findOne({ owner });
        if (hotel) {
            return res.status(400).json({ success: false, message: "Hotel already registered." });
        }

        // Create hotel
        await Hotel.create({ name, address, contact, city, owner });

        // Update user role
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

        return res.status(201).json({ success: true, message: "Hotel registered successfully." });

    } catch (error) {
        console.error("Register Hotel Error:", error);
        return res.status(500).json({ success: false, message: "Server error: " + error.message });
    }
};
  