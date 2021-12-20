const express = require('express');
const router = express.Router();
const User = require('../models/users')

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
    console.log("Probhav garg");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
