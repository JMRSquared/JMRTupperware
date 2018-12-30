import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const AdminSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: String,
    numbers: Number,
    profilePic: String,
    date: {
        type: Date,
        default: Date.now()
    },
    removed: {
        type: Boolean,
        default: false
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;