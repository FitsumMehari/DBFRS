const express = require("express");
const router = express.Router();

const Customer = require("../models/Customer");
const Ticket = require("../models/Ticket");
const Flight = require("../models/Flight");


// add customer
router.post("/", async(req, res, next) => {
    const flightId = req.body.flightId;
    const customerId = req.body.customerId;
    console.log(flightId, customerId);


    let flightDetails, customerDetails


    try {
        const flight = await Flight.find({
            flightId: flightId,
        });
        if (flight == null) {
            return res.status(404).json({ message: "No flight Found!" });
        } else {
            flightDetails = flight
        }
    } catch (error) {
        next(error);
    }

    try {
        const customer = await Customer.find({
            customerId: customerId,
        });
        if (customer == null) {
            return res.status(404).json({ message: "No customer Found!" });
        } else {
            customerDetails = customer
        }
    } catch (error) {
        next(error);
    }

    console.log(customerDetails, flightDetails);


    try {
        const newTicket = new Ticket({
            customerId: customerDetails[0].customerId,
            firstName: customerDetails[0].firstName,
            lastName: customerDetails[0].lastName,
            passportId: customerDetails[0].passportId,
            address: customerDetails[0].address,
            dateOfBirth: customerDetails[0].dateOfBirth,
            gender: customerDetails[0].gender,
            phoneNumber: customerDetails[0].phoneNumber,
            flightId: flightDetails[0].flightId,
            flightName: flightDetails[0].flightName,
            price: flightDetails[0].price,
            source: flightDetails[0].source,
            destination: flightDetails[0].destination,
            departureDate: flightDetails[0].departureDate,
            arrivalTime: flightDetails[0].arrivalTime,
            departureTime: flightDetails[0].departureTime,
        });

        const addedTicket = await newTicket.save();
        res.status(201).json(addedTicket);
    } catch (error) {
        next(error);
    }


});

router.get("/", async(req, res, next) => {
    try {
        await Ticket.find().then((allTickets) => {
            res.status(200).json(allTickets);
        });
    } catch (error) {
        next(error);
    }
});



module.exports = router;