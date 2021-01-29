const { model, Schema } = require('mongoose');

const ProductSchema = Schema({
    descriptionEN: {
        type: String,
        required: true
    },
    descriptionES: {
        type: String,
        required: true
    },
    longDescriptionEN: {
        type: String
    },
    longDescriptionES: {
        type: String
    },
    image: {
        type: String
    },
    brand: {
        type: String
    },
    country: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = model('Product', ProductSchema);
