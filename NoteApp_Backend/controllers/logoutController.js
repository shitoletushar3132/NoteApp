const logoutController = (req, res) => {
    const token = ""
    res.cookie("authToken", "", { maxAge: 1 });
}

module.exports = logoutController