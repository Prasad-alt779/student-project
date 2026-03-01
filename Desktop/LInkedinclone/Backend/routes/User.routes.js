const express = require('express');
const router = express.Router();
const multer = require('multer');
const { register, login, uploadProfilePic, uploadUserProfile, getUserAndProfile } = require('../controllers/User.controller'); // fixed import

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // ensure this folder exists
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
router.post('/register', register);
router.post('/login', login);

// Update user profile
router.post('/user_update', uploadUserProfile);

// Get user profile
router.get("/get_user_and_profile", getUserAndProfile);

// Upload profile picture
router.post('/uploadProfilePic', upload.single('profilePic'), uploadProfilePic);

module.exports = router;