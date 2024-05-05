const router = require("express").Router();
const Flight = require("../models/Flight");
const AvailableFlights = require("../models/AvailableFlight");

// Get available flights
router.get("/available", async(req, res, next) => {
    try {
        await AvailableFlights.find().then((availableFlights) => {
            console.log(availableFlights);
            res.status(200).json(availableFlights);
        });
    } catch (error) {
        return next(error);
    }
});

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

// Get single flight
router.get("/:id", getFlight, async(req, res, next) => {
    try {
        await res.status(200).json(res.flight);
    } catch (error) {
        return next(error);
    }
});



// Add Locations
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

// Remove a reserved flight
router.delete("/:id", getFlight, async(req, res, next) => {
    try {
        console.log(res.flight);
        await res.flight.deleteOne();
        res.json({ message: "Deleted flight" });
    } catch (error) {
        return next(error);
    }
});

// Edit a single reserved flight
router.put("/:id", async(req, res, next) => {
    const id = req.params.id;
    try {
        await Flight.findByIdAndUpdate({ "_id": id }, {

            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            source: req.body.lastName,
            destination: req.body.destination,
            departureDate: req.body.departureDate,
            departureTime: req.body.destination,
        });
        res.status(200).json({ "message": "update successful" });
    } catch (error) {
        return next(error);
    }
});

async function getFlight(req, res, next) {
    let flight;
    try {
        flight = await Flight.findById(req.params.id);
        if (flight == null) {
            return res.status(404).json({ message: "Can not find flight" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.flight = flight;
    next();
}

module.exports = router;