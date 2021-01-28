const { model, Schema } = require('mongoose');

const PriceSchema = Schema({
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
}, {
    timestamps: true
});

module.exports = model('Price', PriceSchema);
