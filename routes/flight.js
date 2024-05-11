const express = require("express");
const router = express.Router();

const Flight = require("../models/Flight");

// add customer
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

// update customer

router.put("/", async(req, res, next) => {
    const customerId = req.body.customerId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const passportId = req.body.passportId;
    const address = req.body.address;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const phoneNumber = req.body.phoneNumber;

    try {
        await Customer.findOneAndUpdate({ customerId: customerId }, {
            $set: {
                customerId: customerId,
                firstName: firstName,
                lastName: lastName,
                passportId: passportId,
                address: address,
                dateOfBirth: dateOfBirth,
                gender: gender,
                phoneNumber: phoneNumber,
            },
        });

        res.status(200).json({ message: "update successful" });
    } catch (error) {
        next(error);
    }
});

// search customer

router.get("/:id", async(req, res, next) => {
    const customerId = req.params.id.split(":")[1];
    console.log(customerId);
    try {
        const customer = await Customer.find({ customerId: customerId });
        if (customer == null) {
            return res.status(404).json({ message: "No Customer Found!" });
        } else {
            return res.status(200).json(customer[0]);
        }
    } catch (error) {}
});

module.exports = router;