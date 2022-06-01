const student = require('../models/student.js');
const group = require('../models/group.js');
const bcrypt = require('bcrypt');


module.exports = {
    show: async (req, res) => {
        const groups = await group.find();
        res.render('pages/addStudent', { groups });
    },


    addStudent: async (req, res) => {
        const { name, login, password, groupId } = req.body;
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

    saveForm: async (req, res) => {
        student.findOneAndUpdate({ _id: req.body.student_id }, { form: (req.body.form_data).toString() })
            .then(async () => {
                const aStudent = await student.findById(req.body.student_id);
                res.send(aStudent)
            })
            .catch((err) => {
                console.log(err)
                req.flash("error", err.toString());
                res.sendStatus(500);
            })
    },

    getById: async (req, res) => {
        const student_id = req.query.student_id;
        student.findById(student_id)
            .then((aStudent) => {
                res.status(200).json(aStudent)
            })
            .catch((error) => {
                res.status(500).json(error)
            })
    },

    updateForm: async (req, res) => {
        const { student_id, form_data } = req.body;
        student.findByIdAndUpdate(student_id, { form: form_data })
            .then(() => {
                res.status(200).send('blm is false')
            })
            .catch((error) => {
                res.status(500).json(error)
            })
    },

    getByGroupId: (req, res) => {
        student.find({ groupId: req.body.group_id })
            .then((students) => {
                res.status(200).json(students)
            })
            .catch((error) => {
                res.status(500).json(error)
            })

    },

    clearFormStudents: (req, res) => {
        const student_id = req.body.student_id;
        student.findOneAndUpdate({ _id: student_id }, { form: '' })
            .then(() => res.status(200).send('р. воєнний карабль'))
            .catch((error) => res.status(500).json(error))
    },

    showEditPage: (req, res,) => {
        const student_id = req.query.student_id;
        student.findById(student_id)
            .then((student) => res.render('pages/admin/editStudent', { student }))
            .catch((error) => res.status(500).json(error))
    },

    updateStudentData: async (req, res) => {
            const {
                student_id,
                login,
                password,
                name
            } = req.body;
            console.log(student_id)
            console.log(login)
            console.log(password)
            console.log(name)
            const newPass = await bcrypt.hash(password, 10);
            student.findByIdAndUpdate(student_id,
                {
                    name: name,
                    login: login,
                    password: newPass
                })
            .then(() => {
                res.status(200).send('catch me')
            })
            .catch((error) => {
                res.status(500).json(error)
            })
          
   
    }
}
