const express = require('express');
const { sql } = require('@vercel/postgres');
const bodyParser = require('body-parser');
const path = require('path');
const { SQL_STATEMENTS } = require('./database');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// const initializeDb = async () => {
//   let result = await sql`${SQL_STATEMENTS}`;
//   console.log(`数据库初始化成功！${result}`);
// }
// initializeDb();

app.get('/', function (req, res) {
  res.status(200).send('home');
});

app.post('/login', urlencodedParser, async (req, res) => {
  res.status(200).send(`login ${req.body}`);
});

app.post('/register', urlencodedParser, async (req, res) => {
  res.status(200).send(`register ${req.body}`);
});

app.post('/passwordreset', urlencodedParser, async (req, res) => {
  res.status(200).send(`passwordreset ${req.body}`);
});

app.get('/listusers', urlencodedParser, async (req, res) => {
  res.status(200).send(`listusers`);
});

// app.post('/register', urlencodedParser, async (req, res) => {
// 	try {
// 		await sql`INSERT INTO Users (Id, Name, Email) VALUES (${req.body.user_id}, ${req.body.name}, ${req.body.email});`;
// 		res.status(200).send('<h1>User added successfully</h1>');
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).send('Error adding user');
// 	}
// });


app.listen(3000, () => console.log('Server ready on port 3000.'));
module.exports = app;
