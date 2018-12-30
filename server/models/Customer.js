import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    firstName: String,
    lastName: String,
    numbers: Number,
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    removed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;