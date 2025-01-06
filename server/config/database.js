const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family:4
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Error in connecting to database", error);
    }
};
connectDB();
module.exports = mongoose.connection;