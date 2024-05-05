const router = require("express").Router();
const Flight = require("../models/Flight");
const AvailableFlights = require("../models/AvailableFlight");

// Get all flights
router.get("/", async(req, res, next) => {
    try {
        await Flight.find().then((flights) => {
            res.status(200).json(flights);
        });
    } catch (error) {
        return next(error);
    }
});

// Get available flights
router.get("/available", async(req, res, next) => {
    try {
        await AvailableFlights.find().then((flights) => {
            console.log(flights);
            res.status(200).json(flights);
        });
    } catch (error) {
        return next(error);
    }
});

// Add flight
router.post("/", async(req, res, next) => {
    const newAvaialableFlight = new AvailableFlights({
        source: req.body.source,
        destination: req.body.destination,
    });
    try {
        const addedFlight = newAvaialableFlight.save();
        res.status(201).json(addedFlight);
    } catch (error) {
        return next(error);
    }
});

// Reserve flight
router.post("/reserve", async(req, res, next) => {
    const flightToReserve = new Flight({
        firstName: req.body.firstName,
        middleName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.firstName,
        phone: req.body.middleName,
        address: req.body.lastName,
        source: req.body.source,
        destination: req.body.destination,
        departureDate: req.body.departureDate,
        departureTime: req.body.departureTime,
    });
    try {
        const reservedFlight = flightToReserve.save();
        res.status(201).json(reservedFlight);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;