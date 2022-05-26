const group = require('../../models/group.js');
const student = require('../../models/student.js');


module.exports = {

    createInventory: async(req, res) => {
        const groups = await group.find();
        const students = await student.find();
        res.render('pages/admin/create-inventory', {groups, students})
    }

}