const Image = require('../models/Image')

exports.add_image = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            res.send({
                status: false,
                message: 'No file uploaded, also make sure to name the field as "image"'
            });
        } else {
            const image = new Image({
                data: req.files.image.data,
                contentType: req.files.image.mimetype,
                name: req.files.image.name,
            });
            image.save((err, image) => {
                if (err) throw err;
                console.error('saved img to mongo')
                res.json(image._id)
            })
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
}

exports.get_image = (req, res, next) => {
    Image.findById(req.params.id, function (err, doc) {
        if (err) return next(err);
        res.contentType(doc.contentType);
        res.send(doc.data);
    });
}