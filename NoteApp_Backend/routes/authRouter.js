const express = require("express");
const googleLogin = require("../controllers/authController");
const verify = require("../middleware/verifyToken");
const noteController = require("../controllers/noteController");
const logoutController = require("../controllers/logoutController");
const addNoteController = require("../controllers/addNoteController");
const userData = require("../controllers/userData");

const router = express.Router();

router.get("/test", verify, (req, res) => {
    const id = req.userId; // Extract 'authToken' cookie
    console.log("Extracted Cookie:", id)
    res.send("helol")
})

router.get("/google", googleLogin);
router.get("/notes", verify, noteController);
router.get("/logout", verify, logoutController);
router.post("/addNotes", verify, addNoteController)
router.get("/userData", verify, userData)

module.exports = router