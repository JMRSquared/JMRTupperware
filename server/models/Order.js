import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    tupperwares: [{
        type: Schema.Types.ObjectId,
        ref: 'Tupperware'
    }],
    message: String,
    status: {
        type: String,
        enum: ['ORDERED', 'PAID', 'CANCELED', 'DONE'],
        default: 'ORDERED'
    },
    removed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;