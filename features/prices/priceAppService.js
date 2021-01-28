const { response } = require('express');
const Price = require('./price');

// POST: api/countries/
const createPrice = async( req, res = response ) => {
    const price = new Price(req.body);
    

    try {
        const newPrice = await price.save();
        console.log(newPrice);
        res.status(201).json({
            Data: newPrice,
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
const getPrices = async( req, res = response ) => {
    const searchedPrice = req.params.searchedPrice;

    const srchdPrice = searchedPrice == null || searchedPrice == '' || searchedPrice == 'ALL' ? '' : searchedPrice;

    const regex = new RegExp(srchdPrice, 'i');
    //const from = resultsPerPage * pgNumber;

    await Price.find( {"status": regex} )
                //.skip( from )
                //.limit( resultsPerPage )
                //.sort( 'descriptionEN' )
                //.populate( 'product' )
                .exec(( err, prices ) => {
                    if (err) {
                        return res.status(400).json({
                            Data: "",
                            Message: err.message
                        });
                    }

                    if (!prices || prices.length === 0) {
                        return res.status(404).json({
                            Data: "",
                            Message: "Could not found countries."
                        });
                    }

                    return res.status(201).json({
                        Data: prices,
                        Message: ""
                    });
                });
}


// GET: api/countries/:id
const getPrice = async(req, res = response) => {
    const priceId = req.params.id;

    try {
        const price = await Price.findById( priceId );

        if ( !price ) {
            return res.status(404).json({
                Data: null,
                Message: 'No se encontró el price que quiere buscar.'
            });
        }
            
        return res.status(201).json({
            Data: price,
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
    createPrice,
    getPrices,
    getPrice
};