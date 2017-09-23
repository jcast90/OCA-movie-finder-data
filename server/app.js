const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const url = 'http://www.omdbapi.com?apikey=8730e0e';

const app = express();
const cache = {};

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
// Research: 
// - Memoization in JavaScript
// - Hash tables in JavaScript
// - How to implement a cache in JavaScript


app.get('/', function(req, res) {
    if (cache[req.query.i]) return res.json(cache[req.query.i])
    if (cache[req.query.t]) return res.json(cache[req.query.t])

    let queryKey = null;
    if (req.query.i) queryKey = 'i';
    if (req.query.t) queryKey = 't';

    let hash = null;
    if (req.query.i) hash = req.query.i;
    if (req.query.t) hash = req.query.t;

    axios.get('http://www.omdbapi.com/', {
            params: {
                [queryKey]: req.query[queryKey],
                apiKey: '8730e0e'
            }
        }).then(function(response) {
            // var query = req.params.userQuery;
            cache[hash] = response.data;
            res.json(cache[hash]);
        })
        .catch(function(error) {
            console.log(error);
        });
});
// otherwise
// 



app.use(morgan('combined'));

module.exports = app;