require("dotenv").config();
const mongoose = require('mongoose');


exports.connect = () => {

    mongoose.connect(process.env.MONGODB_URL, {

        useNewUrlParser: true,
        useUnifiedTopology: true

    })

    .then(() => { console.log("Connected to DB Successfully") })
    .catch((err) => {
            console.log("Connection to DB Failed");
            console.error(err);
            process.exit(1);
    })
};