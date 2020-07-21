var router = require("express").Router();
const conn=require('../dbconnect');
const mysql=require('mysql');
const bcrypt = require('bcryptjs');
const util = require('util');
var crypto = require('crypto');
var assert = require('assert');
const cookieSession = require('cookie-session');
const query = util.promisify(conn.query).bind(conn);
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'workindia';
var cipher = crypto.createCipher(algorithm, key);  
router.post("/sites/:id", async function (req, res) {
  var userid=req.params.id;
  var website = req.body.website;
  var username=req.body.username;
  var password=cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
  //console.log(typeof(password));
  if(req.session.userid!==userid){
    return res.json({ status: "Please Login" });
    
  }
  
    var data = {
      userid:userid,
      website:website,
      username:username,
      password:password

    };
    try{
      let sql='INSERT INTO passwordtable SET ?';
      const check=conn.query(sql,data,(err, results) => {
        if(err) throw err;
        return res.json({ status: "success" });
      });
    }
    catch(error){
      console.log(error);
    }

});
module.exports = router;