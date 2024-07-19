// Import dot-env file
require("dotenv").config({ path: "../.env" });
// Connect Database
require("./Config/db");

// Import express & cors
const express = require("express");
const cors = require("cors");

// Import User Routes
const userRoutes = require("./Routes/User/userRoutes");
// Import TimeSheet Routes
const timeSheetRoutes = require("./Routes/TimeSheet/timeSheetRoutes");

// Creating app from express
const app = express();

// Backend Port
const port = process.env.PORT || 8000;

// Origin is Frontend Server URL
const options = { origin: `*` };
// Attaching cors with Frontend Server URL
app.use(cors(options));

// Set up express middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Users API
app.use("/api/v1/users", userRoutes);
// TimeSheet API
app.use("/api/v1/users", timeSheetRoutes);

// Not Routing Pages
app.all("*", (req, res) => {
  return res.status(404).send("<h1>Invalid API</h1>");
});

// Listening Port
app.listen(port, () => {
  console.log(`Server Listening on : ${port} PORT....`);
  console.log(`Backend Server URL : ${process.env.BACKEND_SERVER}`);
});
