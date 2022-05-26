const mongoose = require("mongoose"),
{Schema} = mongoose,
bcrypt = require('bcrypt'),
studentSchema = new Schema({
    login: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    form: {
       type: String
    }
});

studentSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("student", studentSchema);