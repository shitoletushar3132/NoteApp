const UserModel = require("../models/userModel");

const userData = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    try {
        const user = await UserModel.findById(userId).select("_id name email image");

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ error: "An error occurred while fetching user data." });
    }
};

module.exports = userData;
