const student = require('../models/student.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports = {

    loginPage: (req, res) => res.render('pages/loginStudent'),

    loginStudent: async(req, res) => {
        try {
            const { login, password } = req.body;
            const aStudent = await student.findOne({ login });
            if (aStudent) {
                const validPassword = await bcrypt.compare(password, aStudent.password);
                if (validPassword) {
                    const token = jwt.sign({ id: aStudent._id },
                        process.env.JWT_KEY,
                        { expiresIn: "1h" });
                    aStudent.token = token;
                    res.cookie('id', token);
                    res.redirect('/profile');
                } else badCredentials(req, res);

            } else
                badCredentials(req, res);

        } catch (err) {
            req.flash("error", `Помилка ${err}.`);
            res.redirect('back');
        }
    }
    

}

function badCredentials(req, res) {
    req.flash("error", 'Перевірте логін та пароль');
    res.redirect('back');
}