const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");


const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password , role} = req.body;
  const saltRound = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const isUser = new userModel({ name, email, password: hashedPassword , role});
    await isUser.save();
    return res.status(200).send({ error: false, item: isUser });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExit = await userModel.findOne({ email });
    const checkPassword = bcrypt.compare(password, isUserExit.password);
    if (checkPassword) {
      const accessToken = jwt.sign(
        { userID: isUserExit._id ,userName:isUserExit.name},
       "masai",
        { expiresIn: "2h" }
    );
    return res.status(200).send({ error: false, item: accessToken });
    }else{
        return res.status(500).send({ error: false, msg:"password wrong" });
    }
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
});

module.exports = {
  userRouter
};
