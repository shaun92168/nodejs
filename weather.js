const axios = require('axios');

const gkey = 'AIzaSyBfhCxgdoBmVosqqi-gehm9Q9fAOdmXjlY'
const dkey = '0c6fe864912f57966cb01804be3801b8';

const getLocation = async (address) => {
	const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json?key=' + gkey + '&address=' + encodeURIComponent(address));
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    return [lat, lng];
}

const getWeather = async (lat, lng) => {
    const response = await axios.get('https://api.darksky.net/forecast/' + dkey + '/' + lat + ',' + lng);
    const summary = response.data.currently.summary;
    const temperature = response.data.currently.temperature;
    return [summary, temperature];
};

const parseWeather = (weather) => {
	if (weather.search('Rain') != -1 || weather.search('rain') != -1) {
		return 'rain.png'
	} else if (weather.search('Sun') != -1 || weather.search('sun') != -1 || weather.search('Clear') != 1) {
		return 'sunny.png'
	} else if (weather.search('Cloud') != -1 || weather.search('cloud') != -1) {
		return 'cloudy.png'
	} else {
		return 'notFound.png'
	}
}

module.exports = {
    getLocation,
    getWeather,
    parseWeather
}