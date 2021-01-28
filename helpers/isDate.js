const moment = require('moment');

// Para validar si es una fecha se hacer uso del custom check que creamos
// import { isDate } = require('../helpers/isDate');
// check('campoFecha', 'La fecha es obligatoria').custom( isDate );
const isDate = ( value, { req, location, path } ) => {
    if (!value) {
        return false;
    }

    const fecha = moment( value );
    if ( fecha.isValid () ) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
};