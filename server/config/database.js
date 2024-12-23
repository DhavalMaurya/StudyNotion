const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,  // To avoid deprecation warnings
        useUnifiedTopology: true, // To use the latest MongoDB driver
    })
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((error) => {
        console.log('DB connection failed');
        console.error(error);
        process.exit(1); // Exit the process if MongoDB connection fails
    });
};
