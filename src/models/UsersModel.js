const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    email: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: String},
    password: {type: String}
},
{versionKey:false, timestamps: true});

const UsersModel = mongoose.model('userProfiles',DataSchema);
module.exports = UsersModel;