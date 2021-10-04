const express = require('express');
const axios = require('axios');
const joi = require('joi');
const publicIp = require('public-ip');
const app = express();

const { config } = require('./config');

app.get('/', function(req,res) {
    res.send('hello world');
});

app.get('/candidate', (req, res) => {
    res.json({ name: 'test', phone: 'test' });
});

app.get('/Location', async (req, res) => {

    const ip = await publicIp.v4();

    axios.get(`http://api.ipstack.com/${ip}?access_key=${config.apiKeyIpstack}`)
        .then((response) => {
            res.json({
                city: response.data.city,
            });
        })
        .catch((error) => {
            res.status(500).send({ error: 'An error internal has ocurred in the server' });
        });
});

app.get('/Listings/:numberPassengers', (req,res, next) => {
const schema = joi.number().integer().positive();

const { error } = schema.validate(req.params.numberPassengers);

if( !error )
    next();
else {
    res.status(400).send({ error: 'The number of passengers must be an integer positive' });
}

}, (req, res) => {
    const numberPassengers = req.params.numberPassengers;
    axios.get('https://jayridechallengeapi.azurewebsites.net/api/QuoteRequest')
        .then((response) => {
            const listingsArray = response.data.listings;

            const listingsArrayFilter = listingsArray.filter( (elemList) => {
                return ( numberPassengers <= elemList.vehicleType.maxPassengers );
            });

            const listingsWithTotalPrices = listingsArrayFilter.map((elemList) => {
                return {
                    ...elemList,
                    totalPrice: elemList.pricePerPassenger * numberPassengers,
                };
            });

            const listSort = listingsWithTotalPrices.sort(( elemA, elemB ) => {
                if( elemA.totalPrice > elemB.totalPrice )
                    return 1;
                if( elemA.totalPrice < elemB.totalPrice )
                    return -1;

                return 0;
            });

            res.json({ results: listSort });
        })
        .catch((error) => {
            res.status(500).send({error: 'An error internal has ocurred in the server'});
        });
});

app.listen(config.port, () => {
    console.log('server running...');
});
