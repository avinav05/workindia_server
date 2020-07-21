var router = require("express").Router();
const conn=require('../dbconnect');
const mysql=require('mysql');
const bcrypt = require('bcryptjs');
const util = require('util');
const userExists =require('../methods/userexists');
const query = util.promisify(conn.query).bind(conn);
router.post("/user", async function (req, res) {
  console.log(req.body);
  var username = req.body.username;
  var pass = bcrypt.hashSync(req.body.password, 10);
  const userAvailable = await userExists(username);
	if (userAvailable) {
    res.send(JSON.stringify({"status":"User already exists"}));
  }
  else{
    var data = {
      username,
      password: pass,
    };
    try{
      let sql='INSERT INTO REGISTER SET ?';
      const check=await conn.query(sql,data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": "account created"}));
      });
    }
    catch(error){
      console.log(error);
    }
  }
  

});
module.exports = router;