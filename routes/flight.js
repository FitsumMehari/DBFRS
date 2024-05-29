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

// Get flights

router.get("/:id", async(req, res, next) => {
    if (req.params.id == "all") {
        try {
            await Flight.find().then((allFlights) => {
                res.status(200).json(allFlights);
            });
        } catch (error) {
            next(error);
        }
    }
    const flightId = req.params.id.split(":")[1];

    try {
        const flight = await Flight.find({ flightId: flightId });
        if (flight == null) {
            return res.status(404).json({ message: "No flights found!" })
        } else {
            return res.status(200).json(flight[0]);
        }
    } catch (error) {
        next(error);
    }
});

// add single flight
// not sure if this ever gets called
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

// update flight

router.put("/", async(req, res, next) => {
    const flightId = req.body.flightId;
    const flightName = req.body.flightName;
    const price = req.body.price;
    const source = req.body.source;
    const destination = req.body.destination;
    const departureDate = req.body.departureDate;
    const arrivalTime = req.body.arrivalTime;
    const departureTime = req.body.departureTime;

    try {
        let foundFlight = await Flight.findOneAndUpdate({ flightId: flightId }, {
            $set: {
                flightId: flightId,
                flightName: flightName,
                price: price,
                source: source,
                destination: destination,
                departureDate: departureDate,
                arrivalTime: arrivalTime,
                departureTime: departureTime,
            },
        });
        res.status(202).json({ message: "update successful" });
    } catch (error) {
        next(error);
    }
});


// delete flight

router.delete("/:id", async(req, res, next) => {
    const flightId = req.params.id.split(":")[1];
    try {
        const result = await Flight.findOneAndDelete({ flightId: flightId })
        res.status(200);
    } catch (error) {
        next(error);
    }
})
module.exports = router;