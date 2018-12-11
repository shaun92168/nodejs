const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const fetch = require('./fetch.js')
const weather = require('./weather.js')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', (req, res) => {
	res.render('index.hbs', {
		menu:[
		{name:'Home', link:'/'},
		{name:'Fetch', link:'/fetch'},
		{name:'Weather', link:'/weather'}
		]
	});
});

app.get('/fetch', (req, res) => {
	res.render('fetch.hbs', {
		menu:[
		{name:'Home', link:'/'},
		{name:'Fetch', link:'/fetch'},
		{name:'Weather', link:'/weather'}
		],
	});
});

app.post('/fetchSearch', (req, res) => {
	fetch.getResults(req.body.search).then((result) => {
		res.render('fetch.hbs', {
			menu:[
			{name:'Home', link:'/'},
			{name:'Fetch', link:'/fetch'},
			{name:'Weather', link:'/weather'}
			],
			image: result.slice(0,19)
		});
	}).catch((e) => {
	    console.log(e);
 	});
});

app.get('/weather', (req, res) => {
	weather.getLocation('BCIT').then((result) => {
		console.log(result);
		weather.getWeather(result[0], result[1]).then((result) => {
			console.log(result);
		}).catch((e) => {
		    console.log(e);
	 	});
	}).catch((e) => {
	    console.log(e);
 	});
	res.render('weather.hbs', {
		menu:[
		{name:'Home', link:'/'},
		{name:'Fetch', link:'/fetch'},
		{name:'Weather', link:'/weather'}
		]
	});
});

app.post('/getWeather', (req, res) => {
	weather.getLocation(req.body.search).then((result) => {
		weather.getWeather(result[0], result[1]).then((result) => {
			var a = weather.parseWeather(result[0]);
			res.render('weather.hbs', {
				menu:[
				{name:'Home', link:'/'},
				{name:'Fetch', link:'/fetch'},
				{name:'Weather', link:'/weather'}
				],
				location: 'Weather for ' + req.body.search,
				weather: result[0],
				temperature: `Temperature: ${result[1]}\u00B0F`,
				image: '<img src="' + a + '" width="50px" height="50px">'
			});
		}).catch((e) => {
		    console.log(e);
	 	});
	}).catch((e) => {
	    console.log(e);
 	});
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Server is up on the port ${8080}`);
});
