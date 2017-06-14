'use strict';

const weatherJs = require('weather-js');
const Promise = require('bluebird');
const _ = require('lodash');

function getSkytext(results) {
    if (results.length) {
        return _.result(results, '[0].current.skytext');
    } else {
        return 'Location not found';
    }
}

function weatherSky(answers) {
    const options = {
        search: answers.location,
        degreeType: 'F'
    };
    return Promise.promisify(weatherJs.find)(options)
        .then(getSkytext);
}

weatherSky.label = "Current Weather";

weatherSky.prompts = [
    {
        type: "input",
        name: "location",
        message: "Enter your location",
        default: "Chicago"
    }
];

function getTemp(results) {
    if (results.length) {
        return _.result(results, '[0].current.temperature');
    } else {
        return 'Location not found';
    }
}

function weatherTemp(answers) {
    const options = {
        search: answers.location,
        degreeType: 'F'
    };
    return Promise.promisify(weatherJs.find)(options)
        .then(getTemp);
}

weatherTemp.label = "Current Temperature";

weatherTemp.prompts = [
    {
        type: "input",
        name: "location",
        message: "Enter your location",
        default: "Chicago"
    }
];

module.exports = {
    'weather.sky': weatherSky,
    'weather.temp': weatherTemp,
    'weather': [ 'weather.sky', 'weather.temp' ]
};
