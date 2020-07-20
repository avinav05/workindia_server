var router = require("express").Router();
const User = require("../models/userdata");
router.post("/signup", async function (req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  console.log(email);
  var data = {
    email: email,
    password: pass,
  };
  try{
    await User(data)
    .save()
    .then((data) => console.log("Data Saved"));

    return res.json(data);
  }
  catch(error){
    console.log(error);
  }

});
module.exports = router;