import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
        }

        const { name, address, contact, city } = req.body;
        const owner = req.user._id;

        // Basic input validation
        if (!name || !address || !contact || !city) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if hotel already exists for this owner
        const hotel = await Hotel.findOne({ owner });
        if (hotel) {
            return res.status(400).json({ success: false, message: "Hotel Already Registered" });
        }

        // Create new hotel
        await Hotel.create({ name, address, contact, city, owner });

        // Update user role
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

        res.status(201).json({ success: true, message: "Hotel Registered Successfully" });

    } catch (error) {
        console.error("Register hotel error:", error);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};
