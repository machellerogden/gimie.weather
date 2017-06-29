'use strict';

const weatherJs = require('weather-js');
const Promise = require('bluebird');
const _ = require('lodash');
const Table = require('easy-table');

let weatherPromise;

function getWeatherPromise(answers) {
    const options = {
        search: answers.location,
        degreeType: 'F'
    };
    weatherPromise = weatherPromise || Promise.promisify(weatherJs.find)(options);
    return weatherPromise;
}

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
    return getWeatherPromise(answers)
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

function getCurrent(results) {
    if (results.length) {
        return Table.print(_.result(results, '[0].current'));
    } else {
        return 'Location not found';
    }
}

function getForecast(results) {
    if (results.length) {
        return Table.print(_.result(results, '[0].forecast'));
    } else {
        return 'Location not found';
    }
}

function weatherTemp(answers) {
    const options = {
        search: answers.location,
        degreeType: 'F'
    };
    return getWeatherPromise(answers)
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

function weatherCurrent(answers) {
    const options = {
        search: answers.location,
        degreeType: 'F'
    };
    return getWeatherPromise(answers)
        .then(getCurrent);
}

weatherCurrent.label = "Current Weather";

weatherCurrent.prompts = [
    {
        type: "input",
        name: "location",
        message: "Enter your location",
        default: "Chicago"
    }
];

function weatherForecast(answers) {
    const options = {
        search: answers.location,
        degreeType: 'F'
    };
    return getWeatherPromise(answers)
        .then(getForecast);
}

weatherForecast.label = "Weather Forecast";

weatherForecast.prompts = [
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
    'weather.current': weatherCurrent,
    'weather.forecast': weatherForecast,
    'weather': [ 'weather.sky', 'weather.temp' ]
};
