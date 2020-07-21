const mysql=require('mysql');
const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'avinav',
    database : 'passkeeper',
    port:'3307'
    });
conn.connect((err) => {
if(err) throw err;
console.log('Connected to MySQL Server!');
});
module.exports=conn;