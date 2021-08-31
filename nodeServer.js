/**
 * server.js
 *
 * Express app is created here with all the configrations
 *
 * @Nabeekh
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Initialize the app.
const server = app.listen(process.env.PORT || 3001, () => {
  const port = server.address().port;
  console.log("App now running on port", port);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create link to Angular build directory
app.use(express.static(path.join(__dirname, "dist")));

// Catch all other routes and return the index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/taskpane.html"));
});
