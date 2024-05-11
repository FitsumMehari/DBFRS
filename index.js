const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const path = require("path");


const authRoute = require("./routes/auth");
// const flightsRoute = require("./routes/flights");
const flight = require("./routes/flight");
const customer = require("./routes/customer");
const ticket = require("./routes/ticket");


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('app'));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve('./app/landingpage/landingpage.html'))
// });
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./app/page_ticket_report/index.html'))
});

// The following segment has been commented temprarily
mongoose.connect(
    process.env.MONGODB_URL

).then(
    () => {
        console.log("DB connected successfully!");
    }
).catch(
    (error) => {
        console.log(error);
    }
)




app.use("/auth", authRoute);
// app.use("/flights", flightsRoute);
app.use("/flight", flight);
app.use("/customer", customer);
app.use("/ticket", ticket);


//ROUTE NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("Sorry, route could not be located!");
});

//ERROR
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
});

module.exports = app;