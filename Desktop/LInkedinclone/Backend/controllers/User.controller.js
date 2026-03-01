const User = require("../model/User.model");
const Profile = require("../model/Profile.model");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// 🔹 Register
const register = async(req, res) => {
    console.log(req.body);
    try {
        const { name, email, password, username } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        });
        await newUser.save();

        const newProfile = new Profile({ user: newUser._id });
        await newProfile.save();

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// 🔹 Login with crypto.randomBytes token
const login = async(req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a secure random token
        const token = crypto.randomBytes(32).toString("hex");

        // Save token to user in DB (for session management)
        user.token = token; // Make sure `token` field exists in User model
        await user.save();

        // ✅ Return token in JSON response
        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
const uploadProfilePic = async(req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    try {
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePicture = req.file.path;
        await user.save();

        return res.status(200).json({
            message: "Profile picture uploaded successfully",
            file: req.file
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

// 🔹 Update user profile
// 🔹 Update user profile
const uploadUserProfile = async(req, res) => {
    try {
        const { token, ...newUserData } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // Find the user by token
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if username or email already exists for a different user
        if (newUserData.username || newUserData.email) {
            const existingUser = await User.findOne({
                $or: [
                    { username: newUserData.username },
                    { email: newUserData.email }
                ]
            });

            if (existingUser && String(existingUser._id) !== String(user._id)) {
                return res.status(409).json({ message: "Username or email already exists" });
            }
        }

        // Update only allowed fields
        const allowedFields = ["name", "username", "email"];
        allowedFields.forEach(field => {
            if (newUserData[field] !== undefined) {
                user[field] = newUserData[field];
            }
        });

        await user.save();

        return res.status(200).json({
            message: "User profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture || null
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const getUserAndProfile = async(req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // Find user by token
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find profile by user ID
        const userProfile = await Profile.findOne({ user: user._id })
            .populate("user", "name email username profilePicture"); // populate user details

        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        return res.status(200).json({
            userProfile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login, uploadProfilePic, uploadUserProfile };