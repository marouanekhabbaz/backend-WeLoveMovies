if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const movies = require("./movies/movies.router")
const theaters = require("./theaters/theaters.router")
const reviews = require("./reviews/reviews.router")

app.use(cors());
app.use(express.json());


app.use("/reviews", reviews);
app.use("/movies", movies);
app.use("/theaters", theaters);

// Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
  });
  
  // Error handler
  app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
  });
  
module.exports = app;
