const { model, Schema } = require('mongoose');

const CountrySchema = Schema({
    descriptionEN: {
        type: String,
        required: true
    },
    descriptionES: {
        type: String,
        required: true
    },
    flagLogo: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = model('Country', CountrySchema);
