const express = require('express')
const app = express()
app.set("port", process.env.PORT || 3000);
const flash = require('connect-flash')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session');

const loginController = require('./controllers/login');
const adminCreateInventoryController = require('./controllers/admin/createInventory');


const groupController = require('./controllers/group');
const studentController = require('./controllers/student');


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


app.get('/', loginController.loginPage);

app.get('/admin/create-inventory', adminCreateInventoryController.createInventory);

// groups and student management
app.get('/addGroup', groupController.show)
app.post('/addGroup', groupController.addGroup)
app.get('/addStudent', studentController.show)
app.post('/addStudent', studentController.addStudent)

// forms work

app.post('/saveAdminForm', studentController.saveForm)


app.listen(app.get("port"), () => {
    console.log(`server running`)
})