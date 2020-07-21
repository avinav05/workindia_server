const express = require("express");
const app = express();
const mysql = require('mysql');
var bodyParser = require("body-parser");
const conn=require('./dbconnect');
const user=require('./routes/signup');
const login=require('./routes/login');
const addpass=require('./routes/addpass');
const existsdata=require('./routes/existsdata');
const cookieSession = require('cookie-session');


app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieSession({
	name: 'session',
	secret: 'workindia 123',
	maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(user);
app.use(login);
app.use(addpass);
app.use(existsdata);


app.listen(5000, () => {
    console.log('Server is running at port 5000');
});

