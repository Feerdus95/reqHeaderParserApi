const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.get("/api/whoami", function (req, res) {
  res.json({
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

// Root route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Listen on port set by environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});