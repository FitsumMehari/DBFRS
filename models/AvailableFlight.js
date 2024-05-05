const mongoose = require("mongoose");

const AvailableFlightsSchema = new mongoose.Schema({
    source: {
        type: String,
        reuired: true
    },
    destination: {
        type: String,
        reuired: true
    }
})

module.exports = mongoose.model("availableFlights", AvailableFlightsSchema)