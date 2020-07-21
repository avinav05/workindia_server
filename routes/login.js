var router = require("express").Router();
const conn=require('../dbconnect');
const mysql=require('mysql');
const bcrypt = require('bcryptjs');
const util = require('util');
const cookieSession = require('cookie-session');
const query = util.promisify(conn.query).bind(conn);
router.post("/user/auth", async function (req, res) {
  var username=req.body.username;
  var pass=req.body.password;
  let sql='select userid,password from register where username='+mysql.escape(username);
  const user = await query(sql);
  if (user.length==0) {
    res.send(JSON.stringify({"status": "Invalid Username"}));
  }
  else{
    const check=user[0].password;
  const id=user[0].userid;
  const match = await bcrypt.compare(pass, check);
  if (match) {
    req.session.userid=id;
    res.send(JSON.stringify({"status": "success","response":id}));
  }
  else
  res.send(JSON.stringify({"status": "Invalid Password"}));
  }
});
module.exports = router;
