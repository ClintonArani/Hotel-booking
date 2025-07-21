import Hotel from "../models/Hotel.js";
import User  from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user?._id;             // defensive access

    // 1️⃣   Validate input up‑front
    if (!name || !address || !contact || !city) {
      return res.status(400).json({ success:false, message:"All fields are required" });
    }
    if (!owner) {                            // auth guard
      return res.status(401).json({ success:false, message:"Unauthenticated" });
    }

    // 2️⃣   Check duplicates
    const existing = await Hotel.findOne({ owner });
    if (existing) {
      return res.status(400).json({ success:false, message:"Hotel already registered" });
    }

    // 3️⃣   Create hotel  ➜ **now include `city`**
    await Hotel.create({ name, address, contact, city, owner });

    // 4️⃣   Bump user role
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    return res.status(201).json({ success:true, message:"Hotel registered successfully" });

  } catch (err) {
    console.error("registerHotel():", err.stack);   // full trace in logs
    return res.status(500).json({ success:false, message:err.message });
  }
};
