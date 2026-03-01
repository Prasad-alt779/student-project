const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    body: {
        type: String,
        default: ""
    },

    media: {
        type: String,
        default: ""
    },

    fileType: {
        type: String,
        enum: ["image", "video", "pdf", ""],
        default: ""
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);