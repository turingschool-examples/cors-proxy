import dotenv from 'dotenv'; dotenv.config();
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
import express = require('express');

const port: number | string = process.env.PORT || 8080;
const app = express();
const requestLimit: string = process.env.LIMIT || '100kb';

app.use(bodyParser.json({limit: requestLimit}));
app.use(cors());

app.all('*', (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, PATCH, DELETE, POST",
    "Access-Control-Allow-Headers": req.get("Access-Control-Request-Headers")
  });

  if (req.method === "OPTIONS") {
    res.send();
  }  else {
    const headersList = Object.entries(req.headers);
    const allHeaders:HeadersInit= new HeadersInit();
    for (let [key, value] of headersList) {
      console.log(key);
      console.log(value);
      allHeaders.append(key,<any> value);

    };
    const targetURL: string = req.get('Target-URL');
    if ( !targetURL ) {
      res.status(500).json({"message": "No 'Target-URL' Request Header specified"});
      return;
    } 
        fetch(targetURL, {
      headers: allHeaders
    })
      .then((serverResponse: any ) => {
       serverResponse.body.pipe(res);
      })
     .catch(err => {
      res.status(500).json(err);
     })
  }
});

app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
})
