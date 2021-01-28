const { model, Schema } = require('mongoose');

const CategorySchema = Schema({
    descriptionEN: {
        type: String,
        required: true
    },
    descriptionES: {
        type: String
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
}, {
    timestamps: true
});

module.exports = model('Category', CategorySchema);
