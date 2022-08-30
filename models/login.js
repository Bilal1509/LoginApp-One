const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLogin = new Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }, 
}, {timestamps: true}
);

const Login = mongoose.model('Login', userLogin);

module.exports = Login;