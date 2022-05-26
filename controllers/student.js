const student = require('../models/student.js');
const group = require('../models/group.js');


module.exports = {
    show: async(req, res) => {
        const groups = await group.find();
        res.render('pages/addStudent', {groups});
    }
}
