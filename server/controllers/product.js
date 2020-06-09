const { Product } = require("../models/Product");

exports.get_all_categories = async (req, res) => {
    try {
        res.status(200).json(Product.schema.path('category').caster.enumValues);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.get_all_products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.get_filtered_products = async (req, res) => {
    try {
        const category = await Product.find({ category: req.params.category });
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.get_specific_product = async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id });
        if(!product){
            res.status(404).json('Product not found')
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.post_new_product = async (req, res) => {
    try {
        console.log("BODY", req.body)
        const newProduct = new Product(req.body);
        const newResult = await newProduct.save();
        res.status(200).json(newResult);
    } catch (err) {
        res.status(400).json(err);
        console.log("ERROR", err)
    }
}
exports.update_product = async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id });

        Product.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false }, (err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(result)
        })
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.delete_product = async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).send("Product deleted");
    } catch (err) {
        res.status(400).json(err);
    }
}

exports.update_inventory = async (req, res) => {

    try {
        const product = await Product.findOne({ _id: req.params.id });
        const sizes = product.inventory
        console.log(req.body.quantity);

        for (const size of sizes) {
            if (size.size == req.params.size) {
                size.quantity = req.body.quantity
                console.log("match!")
            }
        }

        await product.save();

        res.json(product);
    } catch (err) {
        res.status(400).json(err);
    }
}