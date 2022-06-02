const express = require('express')
const app = express()
app.set("port", process.env.PORT || 3000);
const flash = require('connect-flash')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session');

// controllers
const loginController = require('./controllers/login');
const profileController = require('./controllers/profile');
const adminCreateInventoryController = require('./controllers/admin/createInventory');
const adminMainController = require('./controllers/admin/main');
const groupController = require('./controllers/group');
const studentController = require('./controllers/student');
const checkStudent = require('./controllers/checkStudent');
const checkTeacher = require('./controllers/checkTeacher');

// special server settings (PASHA dont touch!!!)
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser("GTD 5"));
app.use(session({
  secret: 'GTD 5',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.flash = req.flash();
    next();
});

app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://new_user:HoCL8QaFWeNOom8g@cluster0.b4gvv.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

db.once("open", () => {
  console.log("database connected");
});


// routes
app.get('/', loginController.loginPage);
app.get('/loginTeacher', loginController.teacherLoginPage)
app.post('/loginStudent', loginController.loginStudent);
app.post('/loginTeacher', loginController.loginTeacher);
app.get('/profile', checkStudent, profileController.profilePage);
app.get('/admin/create-inventory', checkTeacher, adminCreateInventoryController.createInventory);
app.get('/admin', checkTeacher, adminMainController.viewAllInventory);

// groups and student management
app.get('/addGroup', checkTeacher, groupController.show)
app.post('/addGroup', checkTeacher, groupController.addGroup)
app.get('/addStudent', checkTeacher, studentController.show)
app.post('/addStudent',  checkTeacher,studentController.addStudent)
app.get('/getStudentById/:student_id', studentController.getById)
app.post('/updateStudentForm', studentController.updateForm)
app.post('/showAllStudentsInGroup', checkTeacher, studentController.getByGroupId)
app.post('/clearFormStudents', checkTeacher, studentController.clearFormStudents)
app.get('/admin/editStudent/:student_id', checkTeacher, studentController.showEditPage)
app.post('/updateStudentData', studentController.updateStudentData)

app.get('/admin/allStudents', checkTeacher, studentController.getAll)
app.post('/deleteStudents', checkTeacher, studentController.deleteOne)

/* new */
app.post('/addArchive', checkTeacher, studentController.addArchive)
app.post('/searchStudents', checkTeacher, studentController.search)

// forms work
app.post('/saveAdminForm', checkTeacher, studentController.saveForm)


/* just for test (DELETE BEFORE ZDACHA) */ 
app.get('/addTeacher', loginController.addTeacher)
app.get('/setAllNonArchived', studentController.setAllNonArchived)


app.listen(app.get("port"), () => {
    console.log(`server running`)
})