const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors({optionsSuccessStatus: 200}));
// Update the static file serving to use absolute path
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/api/whoami", (req, res) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ipaddress = forwarded ? forwarded.split(',')[0] : req.ip;

  res.json({
    ipaddress: ipaddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"]
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});