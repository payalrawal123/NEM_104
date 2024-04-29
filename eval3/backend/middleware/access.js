const access = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.role)) {
      next();
    } else {
      res.json({ msg: "you have no access...." });
    }
  };
};

module.exports = {
    access
}