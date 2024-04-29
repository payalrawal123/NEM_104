const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");

require("dotenv").config();

const auth = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (accessToken) {
    jwt.verify(accessToken, process.env.SECRET_KEY, async (err, decoded) => {
      if (decoded) {
        req.body.user = decoded
        const { userID } = decoded;
        const user = await userModel.findOne({ _id: userID });
        const role = user.role;
        req.role = role;
        
        next();
      }else{
        res.json(err);
      }
    });
  } else {
    res.status(401).json({ msg: "Please login" });
  }
};

module.exports = {
  auth,
};
