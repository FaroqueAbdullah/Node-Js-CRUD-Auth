const express     = require('express');
const Joi         = require('joi');
const config = require('config');

const movies      = require('./routes/movies');
const users      = require('./routes/users');
const auth      = require('./routes/auth');
const connectDB   = require('./DB/Connection');

const app         = express();

if (!config.get('jwtPrivateKey')) {
	console.error('Jwtprivate key is not defined');
	process.exit(1);
}

connectDB()

app.use(express.json());
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(function(err, req, res, next) {
	res.status(500).send('Something failed');
})

const Port = process.env.Port || 3000;
app.listen(Port, () => console.log(`Server started at ${Port}`))