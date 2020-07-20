var router = require("express").Router();
const User = require("../models/userdata");
router.get("/login", async function (req, res) {
  const user = await User.findOne({
    email: req.body.email.toLowerCase(),
  }).exec();
  if (!user) {
    return res.json({ msg: "Invalid email address" });
  }
  if (user.password == req.body.password) return res.json(user);
  else return res.json({ msg: "Invalid Password" });
});
module.exports = router;
