
const student = require('../models/student.js');



module.exports = {

    profilePage: (req, res) => {
       // const students = await student.find();
        res.render('pages/index')
    }

}