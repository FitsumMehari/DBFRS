const express = require("express");
const router = express.Router();

const Flight = require("../models/Flight");

// add flight
router.post("/", async(req, res, next) => {
    const flightId = req.body.flightId;
    const flightName = req.body.flightName;
    const price = req.body.price;
    const source = req.body.source;
    const destination = req.body.destination;
    const departureDate = req.body.departureDate;
    const arrivalTime = req.body.arrivalTime;
    const departureTime = req.body.departureTime;

    try {
        const newFlight = new Flight({
            flightId: flightId,
            flightName: flightName,
            price: price,
            source: source,
            destination: destination,
            departureDate: departureDate,
            arrivalTime: arrivalTime,
            departureTime: departureTime,
        });

        const addedFlight = await newFlight.save();
        res.status(201).json(addedFlight);
    } catch (error) {
        next(error);
    }
});


router.get("/", async(req, res, next) => {
    try {
        await Flight.find().then((allFlights) => {
            res.status(200).json(allFlights);
        });
    } catch (error) {
        next(error);
    }
});

// get single flight

router.post("/single", async(req, res, next) => {
    const source = req.body.source;
    const destination = req.body.destination;

    try {
        const flight = await Flight.find({
            source: source,
            destination: destination,
        });
        if (flight == null) {
            return res.status(404).json({ message: "No flight Found!" });
        } else {
            return res.status(200).json(flight);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;