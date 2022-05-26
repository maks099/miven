const mongoose = require("mongoose"),
{Schema} = mongoose,
groupSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("group", groupSchema);