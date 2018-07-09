/**
 * HTTP Reverse proxy for caching data from NOAA TGFTP servers
 */
const express = require('express'),
  proxy = require('http-proxy-middleware'),
  LOCALHOST = `localhost:3001`,
  TGFTP_DOMAIN = `tgftp.nws.noaa.gov`,
  RADAR_PREFIX = `SL.us008001/DF.of/DC.radar`;

const cors = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

const etag = function (req, res, next) {
  
};

const app = express();
app.use(cors);

app.use(proxy(`http://tgftp.nws.noaa.gov/`, {changeOrigin:true}));

app.listen(3001);