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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
}, {
    timestamps: true
});

module.exports = model('Product', ProductSchema);
