import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'bodyParser';
import fetch from 'node-fetch';
import cors from 'cors';
import express = require('express');

const port: number | string = process.env.PORT || 8080;
const app = express();
const requestLimit: string = process.env.LIMIT || '100kb';

app.use(
app.use(bodyParser.json({limit: requestLimit}));

app.all('*', (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, PATCH, DELETE, POST",
    "Access-Control-Allow-Headers": req.get("Access-Control-Request-Headers")
  });

  if (req.method === "OPTIONS") {
    res.send();
  }  else {
    const targetURL: string = req.get('Target-URL');
    if ( !targetUrl ) {
      res.status(500).json({"message": "No 'Target-URL' Request Header specified"});
      return;
    } 
    fetch(targetURL)
      .then(serverResponse => {
        serverResponse.body.pipe(res);
        res.send();
      })
  }
});

app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
})
