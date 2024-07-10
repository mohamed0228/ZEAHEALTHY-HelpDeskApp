// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api", ticketRoutes);

module.exports = app;
