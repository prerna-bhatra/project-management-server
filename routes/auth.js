const express = require("express");
const mongoose = require("mongoose");
const users = require("../models/user");
const router = express.Router();

//create user 

const signup = (req, res) => {
  console.log("----signup---", req.body);
  const { name, email, password } = req.body;
  const user = new users(req.body);
  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }

    // console.log("---saved", user);

    res.json({
      data,
    });
  });
};

router.post("/signup", signup);

module.exports = router;
