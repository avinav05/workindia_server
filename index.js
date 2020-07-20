// var express = require("express");
// var bodyParser = require("body-parser");
// var signup = require("./routes/signup");
// var login = require("./routes/login");
// const mongoose = require("mongoose");
// const mysql = require('mysql');
// mongoose.connect(
//   "mongodb+srv://avinav:apicluster@apicluster.crslx.mongodb.net/apicluster?retryWrites=true&w=majority",
//   { useNewUrlParser: true,useUnifiedTopology: true }
// ).then(() => console.log('DB connected!'))
// .catch(err => console.error('DB connection failed', err));

// var app = express();

// app.use(bodyParser.json());
// app.use(express.static("public"));
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
// // app.use(signup);
// // app.use(login);
// app
//   .get("/", function (req, res) {
//     return res.json({ fo: 42 });
//   })
//   .listen(5000);

// console.log("server listening at port 5000");
const express = require("express");
const app = express();
const mysql = require('mysql');
var bodyParser = require("body-parser");


const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'avinav',
  database : 'apisetup',
  port:'3307'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
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

app.get('/api/products',(req, res) => {
  let sql = "SELECT * FROM product";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//show single product
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new product
app.post('/api/products',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//update product
app.put('/api/products/:id',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete product
app.delete('/api/products/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

app.listen(5000, () => {
    console.log('Server is running at port 5000');
});

