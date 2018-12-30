import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const TupperwareSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    name: String,
    price: Number,
    quantity: Number,
    img: String,
    sold: {
        type: Number,
        default: 0
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

const Tupperware = mongoose.model('Tupperware', TupperwareSchema);
module.exports = Tupperware;