const { oauth2client } = require("../utils/googleConfig");
const axios = require("axios");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({
                message: "Authorization code is required",
            });
        }

        // Exchange authorization code for tokens
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        // Fetch user info from Google
        const { access_token } = googleRes.tokens;
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${encodeURIComponent(access_token)}`
        );

        const { email, name, picture } = userRes.data;

        // Check if user exists in the database
        let user = await UserModel.findOne({ email });
        if (!user) {
            user = await UserModel.create({ name, email, image: picture });
        }

        const { _id } = user;

        // Generate JWT token
        if (!process.env.JWT_SECRET || !process.env.JWT_TIMEOUT) {
            throw new Error("JWT_SECRET or JWT_TIMEOUT is not defined in environment variables");
        }

        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: "1d", // Default to 1 hour if not defined
        });

        // Set token in cookies
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "lax", // Use 'lax' for local development
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });


        // Respond with user data
        return res.status(200).json({
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error("Error during Google Login:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = googleLogin;
