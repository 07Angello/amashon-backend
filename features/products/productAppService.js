const { response } = require('express');
const Product = require('./product');

// POST: api/products/
const createProduct = async( req, res = response ) => {
    const product = new Product(req.body);

    try {
        product.user = req.uid;
        const newProduct = await product.save();

        res.status(201).json({
            Data: newProduct,
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

// GET: api/products/
const getProducts = async( req, res = response ) => {
    const { pageNumber } = req.body;
    const searchedProduct = req.params.searchedProduct;

    const resultsPerPage = 10;

    const pgNumber = pageNumber == 0 ? 0 : Number(pageNumber);
    const srchProduct = searchedProduct == null || searchedProduct == '' || searchedProduct == 'ALL' ? '' : searchedProduct;

    const regex = new RegExp(srchProduct, 'i');
    const from = resultsPerPage * pgNumber;

    await Product.find( {"descriptionEN": regex} )
                //.skip( from )
                //.limit( resultsPerPage )
                //.sort( 'description' )
                .populate( 'Category' )
                .exec(( err, products ) => {
                    if (err) {
                        return res.status(400).json({
                            Data: "",
                            Message: err.message
                        });
                    }

                    if (!products || products.length === 0) {
                        return res.status(404).json({
                            Data: "",
                            Message: "No se encontraron productos."
                        });
                    }

                    return res.status(201).json({
                        Data: products,
                        Message: ""
                    });
                });
}

// PUT: api/products/:id
const updateProduct = async(req, res = response) => {
    const productId = req.params.id;
    const uid = req.uid;

    const product = await Product.findById( productId );

    try {
        if ( !product ) {
            return res.status(404).json({
                Data: null,
                Message: 'No se encontró el producto que quiere actualizar.'
            });
        }

        const newProduct = {
            ...req.body,
            user: uid
        }

        const productUpated = await Product.findByIdAndUpdate(productId, newProduct, { new: true });
            
        return res.status(201).json({
            Data: productUpated,
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

// Delete: api/products/:id
const deleteProduct = async(req, res = response) => {
    const productId = req.params.id;

    const product = await Product.findById( productId );

    try {
        if ( !product ) {
            return res.status(404).json({
                Data: null,
                Message: 'No se encontró el producto que quiere eliminar.'
            });
        }

        await Product.findByIdAndDelete( productId );
            console.log('deleting');
        return res.status(201).json({
            Data: product,
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

// GET: api/products/:id
const getProduct = async(req, res = response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById( productId );

        if ( !product ) {
            return res.status(404).json({
                Data: null,
                Message: 'No se encontró el producto que quiere buscar.'
            });
        }
            
        return res.status(201).json({
            Data: product,
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
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProduct
};
