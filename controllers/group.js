const student = require('../models/student.js');
const group = require('../models/group.js');


module.exports = {
    show: async(req, res) => {
        res.render('pages/allOperation');
    },

    addGroup: async(req, res) => {
        const {name} = req.body;
        new group({ name })
        .save()
        .then(() => {
            req.flash("success", "Групу додано");
            res.redirect('back');

        })
        .catch((error) => {
            req.flash("error", error.toString());
            res.redirect('back');
        })
    },
}
