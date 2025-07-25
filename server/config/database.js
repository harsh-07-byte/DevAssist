const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch( (error) => {
        console.log("Failed to Connect to DB");
        console.error(error);
        process.exit(1);
    } )
};