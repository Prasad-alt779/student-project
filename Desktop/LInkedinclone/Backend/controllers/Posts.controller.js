const activecheck = (req, res) => {
    return res.status(200).json({ message: "Post route working" });
};

module.exports = { activecheck };