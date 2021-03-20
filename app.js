const express = require('express');
const app = express();
const PORT = 3000;
const colors = require('colors');
const path = require('path');

app.use(express.urlencoded({extended: false}))
app.use(get_weather)
app.use(express.static(path.join(__dirname, 'static')))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "templates"))

function get_weather(req, res, next) {

	req.visitor_weather = false

	if (req.visitor_weather) {
		res.send('Come back later')
	} else {
		next()
	}
}

app.get('/', (req, res) => {
	res.render("home", {
		is_raining: req.visitor_weather,
		pets:[
			{name: 'The dog', species: 'dog'},
			{name: 'The bird', species: 'bird'}
		]
	})
});
// method GET
app.get('/input', (req, res) => {
	res.sendFile(path.join(__dirname, 'templates/form.html'))
})
// method POST
app.post('/post-input', (req, res) => {
	let operators = ['-', '+', '*', '/']
	let number_a = parseInt(req.body.number_one)
	let number_b = parseInt(req.body.number_two)
	let operator = req.body.operator

	function suma(a, b) {
		let opt = operator.trim()
		if (operators.includes(opt) && opt === '+') {
			return a + b
		}
	}

	function rest(a, b) {
		let opt = operator.trim()
		if (operators.includes(opt) && opt === '-') {
			return a - b
		}
	}

	function mult(a, b) {
		let opt = operator.trim()
		if (operators.includes(opt) && opt === '*') {
			return a * b
		}
	}

	function divi(a, b) {
		let opt = operator.trim()
		if (operators.includes(opt) && opt === '/') {
			if (b == 0) {
				return 0
			} else {
				return a / b
			}
		}
	}

	res.send(`
		<div style="color: purple; text-align: center;">
			<h1>Resultado</h1>
			<h2>${number_a} + ${number_b} = ${suma(number_a, number_b)}</h2>
			<h2>${number_a} - ${number_b} = ${rest(number_a, number_b)}</h2>
			<h2>${number_a} * ${number_b} = ${mult(number_a, number_b)}</h2>
			<h2>${number_a} / ${number_b} = ${divi(number_a, number_b)}</h2>
		</div>
	`)
});
// end POST

app.get('/num/:number', (req, res) => {
	let number = req.params.number
	let result = number * 10
	res.send(`
		<h2 style="color: orange; font-size: 40px; text-align: center">
		${number} x 10 = ${result}
		</h2>`
	)
})

app.get('/coulor', (req, res) => {
	res.send(`<h2>Nothing received!</h2>`)
})

app.post('/coulor', (req, res) => {
	if (req.body.colores.trim().toUpperCase() === 'RED') {
		res.send(`<h2>Congrats, that is correct!</h2>`)
	} else {
		res.send(`<h2>Incorrect, please try again.</h2>`)
	}
});

app.get('/api/pets', (req, res) => {
	res.json([
			{name: 'The dog', species: 'dog'},
			{name: 'The bird', species: 'bird'}
		]);
});

app.listen(PORT, (req, res) => {

	console.log('Directorio:', path.join(__dirname).blue);
	console.log('Directorio completo:', path.join(__dirname, '/templates/index.html').blue);
	
	console.log(`Server on port: ${PORT}`.yellow);
});

/*
app.get('/', (req, res) => {
	res.send(`
		<h1 style="color: orange;">Your favorite color!</h1>
		<form action="/send" method="POST">
			<input type="text" name="colores" id="">
			<button>Send Question</buton>
		</form>
		<h2>${req.visitorWeather ? "It's raining" : "It's not raining."}</h2>`
	);	
});
*/
