require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 3000;
// Implementing CORS
app.use(cors());
app.use("/api/v1/uploads", express.static("uploads"));
// Database configuration
require("./startup/db")();

// Passport JS configurations; This will initialize the passport object on every request
require("./config/passport")(passport);
app.use(passport.initialize());

// Mouting Routes;
require("./startup/routes")(app);

// Server Configuration and listening to requests
const server = http.createServer(app);
server.listen(port, () =>
  console.log(`Server has started listening at port: ${port}`)
);
