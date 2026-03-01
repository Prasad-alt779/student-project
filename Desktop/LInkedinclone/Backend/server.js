const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PostRoutes = require('./routes/Post.routes');
const userRoutes = require('./routes/User.routes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(PostRoutes);
app.use(userRoutes);

const start = async() => {
    const connectDB = await mongoose.connect("mongodb://localhost:27017/LinkedinClone", );
    console.log('Connected to MongoDB');
    app.listen(9000, () => {
        console.log('Server is running on port 9000');
    });
};
start();