# CORS Proxy

This repo holds a CORS proxy for making network request to to cors-disabled servers during development. It intended useis to support students at the Turing School of Software and Devlopment.

## Usage 

The server is live at https://fe-cors-proxy.herokuapp.com

To proxy a requst:

| Method | URL | Headers |
|:-------|:----|:--------|
| Any    | https://fe-cors-proxy.herokuapp.com | {"Target-URL": "<Your Target Url as a String >"}

### Example:

Say you want to make a request to a non-CORS API, like [Random Fox API](https://randomfox.ca/floof/).

```js
fetch('https://randomfox.ca/floof/')
  .then(response => response.json())
  .then(foxData => console.log(foxData))
  .catch(error => console.error(error))
```

But you get an error like this:

```
Access to fetch at 'https://randomfox.ca/floof/' from origin 'https://duckduckgo.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

Using this proxy, your request would look like this:

```js
fetch('https://fe-cors-proxy.herokuapp.com', {
  headers: {
    "Target-URL": "https://randomfox.ca/floof"
  }
})
  .then(response => response.json())
  .then(foxData => console.log(foxData))
  .catch(error => console.error(error))
```

And your wonderful fox data will be logged to the console!

## Issues / Bugs?

If you run into problem with the proxy, please file an [issue](https://github.com/turingschool-examples/cors-proxy/issues) and tag @khalidwilliams.
