var router = require("express").Router();
const conn=require('../dbconnect');
const mysql=require('mysql');
const bcrypt = require('bcryptjs');
const util = require('util');
var crypto = require('crypto');
const cookieSession = require('cookie-session');
const query = util.promisify(conn.query).bind(conn);
var secrateKey="secrateKey";
function decrypt(encrypted) {
    decryptalgo = crypto.createDecipher('aes192', secrateKey);
    let decrypted = decryptalgo.update(encrypted, 'hex', 'utf8');
    decrypted += decryptalgo.final('utf8');
    return decrypted;
}
//var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'); 
router.get("/sites/user/:id", async function (req, res) {
  var userid=req.params.id;
  if(req.session.userid!=userid){
    return res.json({ status: "Please Login" });
  }
    try{
        var data={
            userid:userid
        }
      let sql='Select * from passwordtable where userid=?';
      const check=await query(sql,data);
      for(let i=0;i<check.length;i+=1){
          check[i].password=decrypt(check[i].password); 
          console.log(check[i].password);
      }
      
      return res.json(check);
    }
    catch(error){
      console.log(error);
    }

});
module.exports = router;