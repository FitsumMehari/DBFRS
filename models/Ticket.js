const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    passportId: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
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

module.exports = mongoose.model("ticket", TicketSchema);