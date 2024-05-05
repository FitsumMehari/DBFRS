const router = require("express").Router();
const User = require("../models/User");



// Get login
router.post('/login', async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json("Please fill the required inputs!")
    } else {
        try {
            const user = await User.findOne({ email: req.body.email });

            // !user && res.status(401).json("Wrong Credientials!");
            if (!user) {
                return res.status(401).json("Wrong Credientials!");
            }

            // const hashedPassword = md5(req.body.password);
            // const userPassword = user.password

            // userPassword !== req.body.password && res.status(401).json("Wrong Credientials!");
            // if (userPassword !== hashedPassword) {
            //     return res.status(401).json("Wrong Credientials!");
            // }
            if (user.password !== req.body.password) {
                return res.status(401).json("Wrong Credientials!");
            }

            // const accessToken = jwt.sign({
            //     id: user._id
            // }, process.env.JWTKEY, { expiresIn: '7d' });

            // const { password, ...userDetails } = user._doc;

            // res.status(200).json({ message: "Log In Successful!", userDetails, accessToken });
            res.status(200).json({ message: "Log In Successful!" });
        } catch (err) {
            return next(err);
        }
    }
})


// // Add flight
// router.post("/", async(req, res, next) => {
//     const newAvaialableFlight = new AvailableFlights({
//         source: req.body.source,
//         destination: req.body.destination,
//     });
//     try {
//         const addedFlight = newAvaialableFlight.save();
//         res.status(201).json(addedFlight);
//     } catch (error) {
//         return next(error);
//     }
// });

module.exports = router;