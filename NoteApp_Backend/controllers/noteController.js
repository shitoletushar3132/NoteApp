const UserModel = require("../models/userModel");

const noteController = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        const userData = await UserModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ error: "User not found." });
        }
        console.log(userData)

        return res.json({ notes: userData.notes });
    } catch (error) {
        console.error("Error in noteController:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = noteController;