// const User = require("../../models/user.model");
const conn=require('../dbconnect');
const mysql=require('mysql');
const util = require('util');
const query = util.promisify(conn.query).bind(conn);
const userExists = async (username) => {
  try {
    let sql='select * from register where username='+mysql.escape(username);
    const rows = await query(sql);
    if(rows.length==0){
      return false;
    }
    else{
      return true;
    }
  }
 catch(err){
   console.log(err);
 }
  
};
module.exports = userExists;