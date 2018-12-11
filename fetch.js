const axios = require('axios');

const api_key = '10969224-09a6d8dead7cbb3f12617f638';

const getResults = async (search) => {
    const response = await axios.get('https://pixabay.com/api/?key=10969224-09a6d8dead7cbb3f12617f638&q=' + encodeURIComponent(search));
    const images = response.data.hits;
    return images;
};

// const getCountries = async (currencyCode) => {
//     const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
//     return response.data.map((country) => country.name);
// };

// const convertCurrency = async (from, to, amount) => {
//     const rate = await getExchangeRate(from, to);
//     const countries = await getCountries(to);
//     var toAmount = Math.round(rate * amount * 100) / 100;

//     var result = `${amount} ${from} is worth ${toAmount} ${to}. You can spend it in the following countries:\n`;
//     for (var i = 0; i < countries.length; i++) {
//     	result += countries[i];
//     	if (i+1 < countries.length) {
//     		result += ', ';
//     	}
//     }

//     return result;
// };

// convertCurrency('CAD', 'PLN', 20).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

module.exports = {
    getResults
}