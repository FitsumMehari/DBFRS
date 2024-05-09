const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
    flightId: {
        type: String,
        required: true,
    },
    flightName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureDate: {
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("flight", FlightSchema);