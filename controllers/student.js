const student = require('../models/student.js');
const group = require('../models/group.js');


module.exports = {
    show: async(req, res) => {
        const groups = await group.find();
        res.render('pages/addStudent', {groups});
    },

    
    addStudent: async(req, res) => {
        const {name, login, password, groupId} = req.body;
        new student({ name, login, password, groupId })
        .save()
        .then(() => {
            console.log('Студента додано')
            req.flash("success", "Студента додано");
            res.redirect('back');

        })
        .catch((error) => {
            console.log(error)
            req.flash("error", error.toString());
            res.redirect('back');
        })
    },
}
