const Products = require('../models/products');

async function get (req, res, next) {
    try {
        const products = await Products.findAll();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: 'Error listing products.', error: error.message })
    }
}

async function post(req, res, next) {
    try {
        const { name, price, mrp, stock, isPublished } = req.body;

        const products = await Products.create({
            name,
            price: parseFloat(price),
            mrp: parseFloat(mrp),
            stock: parseInt(stock),
            isPublished: false
        });
        
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product.', error: error.message })
    }
}

async function patch(req, res, next) {
    const { id } = req.params;
    try {
        const { isPublished } = req.body;

        if (!id) {
            return res.status(405).json({ message: "id not defined" })
        }

        const product = await Products.findByPk(+id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const erros = [];
        if (product.mrp < product.price) {
            erros.push("MRP should not be less than equal to the Price");
        }
        if (product.stock <= 0) {
            erros.push("Stock count is 0")
        }

        if (erros.length > 0) {
            return res.status(422).json(erros);
        }

        product.isPublished = isPublished ? isPublished : true;

        await product.save();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error updated product.', error: error.message })
    }
}

async function remove(req, res, next) {
    const { id } = req.params;
    try {
        const { isPublished } = req.body;

        if (!id) {
            return res.status(405).json({ message: "id not defined" })
        }

        const product = await Products.findByPk(+id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const destroyProducts = await Products.destroy({ where: { id } });
        if (destroyProducts === 0) {
            return res.status(404).json({ message: 'Error remove product' })
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error updated product.', error: error.message })
    }
}

module.exports = {
    get,
    post,
    patch,
    remove
}