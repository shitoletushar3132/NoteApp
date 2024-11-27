const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded._id;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = verify;