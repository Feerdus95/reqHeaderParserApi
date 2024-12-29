const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  // Get the real IP address
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