const mongoose = require('mongoose');
const UserModel = require('../models/userModel'); // Import the UserModel

const addNoteController = async (req, res) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    const notes = req.body;

    try {
        if (Array.isArray(notes)) {
            // Adding multiple notes
            await UserModel.findByIdAndUpdate(
                userId,
                { $push: { notes: { $each: notes } } },
                { new: true } // Return updated document
            );
            return res.status(200).json({ message: "Notes added successfully." });
        } else if (typeof notes === "object" && notes.content && notes.date && notes.time) {
            // Adding a single note
            await UserModel.findByIdAndUpdate(
                userId,
                { $push: { notes: notes } },
                { new: true } // Return updated document
            );
            return res.status(200).json({ message: "Note added successfully." });
        } else {
            return res.status(400).json({ error: "Invalid note format." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while adding the note." });
    }
};

module.exports = addNoteController;
