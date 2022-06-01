const jwt = require("jsonwebtoken");
const teacher = require('../models/teacher.js');

const config = process.env;

const verifyToken = async(req, res, next) => {
  const token = req.cookies["id"];
  if (!token) {
    req.flash("error", "Авторизуйтесь будь ласка");
    return res.redirect(`/loginTeacher`);
  }
  try {
    req.user = jwt.verify(token, config.JWT_KEY);
    teacher.findById(req.user ._id)
    .then(() => {  })
    .catch((error) => {
        console.log(error)
        req.flash("error", "Виникла помилка - пройдіть авторизацію");
        return res.redirect(`/loginTeacher`);
    })
  } catch (err) {
      console.log(err)
    req.flash("error", "Авторизуйтесь будь ласка");
    return res.redirect(`/loginTeacher`);
  }
  return next();
};

module.exports = verifyToken;