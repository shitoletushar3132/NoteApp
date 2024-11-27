const mongoose = require('mongoose');
const UserModel = require('../models/userModel'); // Import the UserModel

const addNoteController = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    const notes = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        user.notes.push(notes)

        await user.save()

        return res.status(200).json({
            message: "Note added successfully.",
            notes: user.notes, // Return the updated notes list
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while adding the note." });
    }
};

module.exports = addNoteController;
