var router = require("express").Router();
const conn=require('../dbconnect');
const mysql=require('mysql');
const bcrypt = require('bcryptjs');
const util = require('util');
var crypto = require('crypto');
const cookieSession = require('cookie-session');
const query = util.promisify(conn.query).bind(conn);
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'workindia';
var decipher = crypto.createDecipher(algorithm, key);
//var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'); 
router.get("/sites/user/:id", async function (req, res) {
  var userid=req.params.id;
  if(req.session.userid!=userid){
    return res.json({ status: "Please Login" });
  }
    try{
      let sql='Select * from passwordtable where userid=7';
      const check=await query(sql);
      for(let i=0;i<check.length;i+=1){
          check[i].password=decipher.update(check[i].password, 'hex', 'utf8') + decipher.final('utf8'); 
      }
      return res.json(check);
    }
    catch(error){
      console.log(error);
    }

});
module.exports = router;