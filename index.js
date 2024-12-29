// index.js
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Static files middleware
app.use(express.static('public'));

// API endpoint
app.get("/api/whoami", function (req, res) {
  res.json({
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

// Root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Listen on port set by environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});