// var requestify = require('requestify');
var express = require('express');
var router = express.Router();
var rp = require('request-promise');


//NEED INPUT FOR URL

// requestify.get('http://example.com').then(function(response) {
//     // Get the response body
//     response.getBody();
// });


var options = {
    uri: "https://ws.homeaway.com/public/search?q=",
    qs: {
        access_token: 'NmU3ODBmYjgtOGExNS00ZDc1LWIzODYtOGUzMjY3N2JjY2Zi' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: req.body.headers,
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (repos) {
        console.log('User has %d repos', repos.length);
    })
    .catch(function (err) {
        // API call failed...
    });
