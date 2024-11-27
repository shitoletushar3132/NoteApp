const logoutController = (req, res) => {
    const token = ""
    res.cookie("authToken", "", { maxAge: 1 });
    res.status(200).json({ message: "logout successful" })
}

module.exports = logoutController