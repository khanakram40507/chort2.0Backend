const mongoose = require("mongoose")

function connecttoDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connect to Database")
        })
        .catch((err) => {
            console.error("Error connecting to Database", err)
        })
}

module.exports = connecttoDb