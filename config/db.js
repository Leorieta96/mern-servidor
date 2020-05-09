const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
try {
    await mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('DB connect');
} catch (error) {
    console.error(error);
    process.exit(1); // detener la app
}
}

module.exports = connectDB;