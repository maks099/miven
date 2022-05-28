const student = require('../models/student.js');
const group = require('../models/group.js');

module.exports = {

    profilePage: async(req, res) => {
        const aStudent = await student.findById(req.user.id).populate({ path: 'groupId', model: group });
        res.render('pages/index', {student: aStudent})
    }

}