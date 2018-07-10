/**
 * HTTP Reverse proxy for caching data from NOAA TGFTP servers
 */
const stream = require('stream'),
  express = require('express'),
  proxy = require('http-proxy-middleware'),
  NodeCache = require( "node-cache" ),
  cache = new NodeCache( { stdTTL: 300, checkperiod: 120 } ),
  HOST = `localhost`,
  PORT = `3001`,
  TGFTP_DOMAIN = `tgftp.nws.noaa.gov`,
  RADAR_PREFIX = `SL.us008001/DF.of/DC.radar`;

const cors = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

const cacheMiddleware = (req, res, next) => {
  const url = req.url;

  cache.get(url, (err, val) => {
    if (!err) {
      if (val !== undefined) {
        console.log('responding from cache');
        res.send(val);
      }
      else {
        console.log('cache miss');
        next();
      }
    }
  });
};


const app = express();
app.use(cors);
app.use(cacheMiddleware);
app.use(proxy(`http://${TGFTP_DOMAIN}/`, {
  changeOrigin: true,

  // write a dump of the response stream for the cache
  // there may be a faster way to do this, but the mix of the third party libs'
  // api usage makes the decision complicated; it seems like `Readable().wrap`
  // and `on('readabe')` is at least not slow?
  selfHandleResponse: true,
  onProxyRes: (proxyRes, req, res) => {
    const proxyResStream = new stream.Readable().wrap(proxyRes);
    let response = '';
    proxyResStream.on('readable', function() {
      while (chunk = this.read()) {
        response += chunk;
      }
    });

    proxyRes.on('end', function (...args) {
      const responseBuffer = Buffer.from(response, 'binary');
      cache.set(req.url, responseBuffer);
      res.end(responseBuffer);
    });
  }
}));

app.listen(PORT, HOST);
