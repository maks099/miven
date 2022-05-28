const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = async(req, res, next) => {
  const token = req.cookies["id"];
  if (!token) {
    req.flash("error", "Авторизуйтесь будь ласка");
    return res.redirect(`/`);
  }
  try {
    req.user = jwt.verify(token, config.JWT_KEY);
  
  } catch (err) {
    req.flash("error", "Авторизуйтесь будь ласка");
    return res.redirect(`/`);
  }
  return next();
};

module.exports = verifyToken;