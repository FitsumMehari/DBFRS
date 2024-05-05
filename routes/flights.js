const router = require("express").Router();
const Flight = require("../models/Flight");

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

module.exports = router;