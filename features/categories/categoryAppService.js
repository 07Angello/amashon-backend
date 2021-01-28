const { response } = require('express');
const Category = require('./category');

// POST: api/categories/
const createCategory = async( req, res = response ) => {
    const category = new Category(req.body);
    

    try {
        const newCategory = await category.save();
        console.log(newCategory);
        res.status(201).json({
            Data: newCategory,
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

// GET: api/categories/
const getCategories = async( req, res = response ) => {
    const searchedCategory = req.params.searchedCategory;

    const srchdCategory = searchedCategory == null || searchedCategory == '' || searchedCategory == 'ALL' ? '' : searchedCategory;

    console.log(srchdCategory);

    const regex = new RegExp(srchdCategory, 'i');
    //const from = resultsPerPage * pgNumber;

    await Category.find( {"descriptionEN": regex} )
                //.skip( from )
                //.limit( resultsPerPage )
                //.sort( 'descriptionEN' )
                .populate( 'product' )
                .exec(( err, categories ) => {
                    if (err) {
                        return res.status(400).json({
                            Data: "",
                            Message: err.message
                        });
                    }

                    if (!categories || categories.length === 0) {
                        return res.status(404).json({
                            Data: "",
                            Message: "Could not found categorias."
                        });
                    }

                    return res.status(201).json({
                        Data: categories,
                        Message: ""
                    });
                });
}


// GET: api/categories/:id
const getCategory = async(req, res = response) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findById( categoryId );

        if ( !category ) {
            return res.status(404).json({
                Data: null,
                Message: 'No se encontró el category que quiere buscar.'
            });
        }
            
        return res.status(201).json({
            Data: category,
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
    createCategory,
    getCategories,
    getCategory
};