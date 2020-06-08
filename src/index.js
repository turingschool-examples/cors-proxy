const dotenv = require('dotenv');
dotenv.config();

const app  = require( 'express')();
const cors  = require( 'cors');
const bodyParser  = require( 'body-parser');
const https = require('https');

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.all('*', (req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, PATCH, DELETE, POST",
    "Access-Control-Allow-Headers": req.get("Access-Control-Request-Headers")
  });
  if (req.method === "OPTIONS") {
    res.send();
  } else {
    const targetURL = req.get('Target-URL');
    if ( !targetURL ) {
      res.status(500).json({"message": "No 'Target-URL' Request Header specified"});
      return;
    }
    // get headers from the OG request
    // make a new request object
    // pass that new request object to the https request
    // in the http request callback, pipe the body response back to the original res
    const requestOptions = {
      method: req.method,
      headers: req.headers,
      body: req.body,
      hostname: targetURL
    }

    const proxiedRequest = https.request(targetURL, requestOptions, (proxyResponse) => {
      console.log(res);
      proxiedResponse.on('data', (data) => {
        console.log(data);
        data.pipe(res);
      });
    });

    

    proxiedRequest.on('error', (error) => {
      //res.status(proxiedRequest.statusCode);
      res.status(500).json({error: error.reason });
      //console.log(error)
      //error.pipe(res);
    });
  }

});



app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
