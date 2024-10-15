const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

const bodyParser = require('body-parser');

app.use(bodyParser.json());

let users = {};

let id = 0;
app.post('/users', (req, res) => {
	let user = req.body;
	user.id = id;
	users[id] = user;
	res.status(201);
	res.send(user);
	id += 1;
});

app.get('/users/:id', (req, res) => {
	let user = users[req.params.id];
	if(user) {
		res.status(200);
		res.send(user);
	} else {
		res.sendStatus(404);
	}
});

app.put('/users/:id', (req, res) => {
	let id = req.params.id;
	let user = users[id];
	if(user) {
		user.name = req.body.name;
		user.email = req.body.email;
		res.status(200);
		res.send(user);
	} else {
		res.sendStatus(404);
	}
});

app.delete('/users/:id', (req, res) => {
	let id = req.params.id
	if(users[id]) {	
		delete users[id];
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`);
	});
}

module.exports = app; // Export the app for testing
