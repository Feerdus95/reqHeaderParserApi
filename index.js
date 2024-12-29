const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));
app.set('trust proxy', true);

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  // Get IP address by checking headers in order of reliability
  let ipaddress = '127.0.0.1';

  if (req.headers['x-forwarded-for']) {
    // Get the first IP from x-forwarded-for as it's the client's IP
    ipaddress = req.headers['x-forwarded-for'].split(',')[0].trim();
  } else if (req.headers['cf-connecting-ip']) {
    // Cloudflare specific
    ipaddress = req.headers['cf-connecting-ip'];
  } else if (req.headers['x-real-ip']) {
    // Nginx proxy
    ipaddress = req.headers['x-real-ip'];
  } else if (req.socket) {
    // Direct connection
    ipaddress = req.socket.remoteAddress;
  }

  // Remove IPv6 prefix if present and clean up the IP
  ipaddress = ipaddress.replace(/^::ffff:/, '');
  
  // If we still have ::1, replace it with a proper localhost address
  if (ipaddress === '::1') {
    ipaddress = '127.0.0.1';
  }

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