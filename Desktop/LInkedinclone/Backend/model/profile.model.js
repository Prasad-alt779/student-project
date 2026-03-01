const mongoose = require("mongoose");

/* Education Schema */
const educationSchema = new mongoose.Schema({
    school: {
        type: String,
        default: ""
    },
    degree: {
        type: String,
        default: ""
    },
    fieldOfStudy: {
        type: String,
        default: ""
    }
});

/* Work Schema */
const workSchema = new mongoose.Schema({
    company: {
        type: String,
        default: ""
    },
    position: {
        type: String,
        default: ""
    },
    years: {
        type: String, // better than Date for "2021–2024"
        default: ""
    }
});

/* Profile Schema */
const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bio: {
        type: String,
        default: ""
    },
    currentpost: {
        type: String,
        default: ""
    },
    postwork: {
        type: [workSchema],
        default: []
    },
    posteducation: {
        type: [educationSchema],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);