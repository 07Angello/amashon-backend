const { model, Schema } = require('mongoose');

const ProductSchema = Schema({
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    buyingPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Product', ProductSchema);
