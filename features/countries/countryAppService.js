const { response } = require('express');
const Country = require('./country');

// POST: api/countries/
const createCountry = async( req, res = response ) => {
    const country = new Country(req.body);
    

    try {
        const newCountry = await country.save();
        console.log(newCountry);
        res.status(201).json({
            Data: newCountry,
            Message: ''
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            Data: null,
            Message: 'Please contact IT Engineer'
        });

    }
}

// GET: api/countries/
const getCountries = async( req, res = response ) => {
    const searchedCountry = req.params.searchedCountry;

    const srchdCountry = searchedCountry == null || searchedCountry == '' || searchedCountry == 'ALL' ? '' : searchedCountry;

    const regex = new RegExp(srchdCountry, 'i');
    //const from = resultsPerPage * pgNumber;

    await Country.find( {"descriptionEN": regex} )
                //.skip( from )
                //.limit( resultsPerPage )
                //.sort( 'descriptionEN' )
                .populate( 'product' )
                .exec(( err, countries ) => {
                    if (err) {
                        return res.status(400).json({
                            Data: "",
                            Message: err.message
                        });
                    }

                    if (!countries || countries.length === 0) {
                        return res.status(404).json({
                            Data: "",
                            Message: "Could not found countries."
                        });
                    }

                    return res.status(201).json({
                        Data: countries,
                        Message: ""
                    });
                });
}


// GET: api/countries/:id
const getCountry = async(req, res = response) => {
    const countryId = req.params.id;

    try {
        const country = await Category.findById( countryId );

        if ( !country ) {
            return res.status(404).json({
                Data: null,
                Message: 'No se encontró el country que quiere buscar.'
            });
        }
            
        return res.status(201).json({
            Data: country,
            Message: ''
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Data: null,
            Message: 'Contacte al administrador'
        });
    }
}

module.exports = {
    createCountry,
    getCountries,
    getCountry
};