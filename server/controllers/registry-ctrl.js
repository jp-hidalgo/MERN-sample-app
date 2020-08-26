const Registry = require('../models/registry-model')

createRegistry = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a registry',
        })
    }

    const movie = new Registry(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Registry created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Registry not created!',
            })
        })
}

updateRegistry = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Registry.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Registry not found!',
            })
        }
        movie.name = body.name
        movie.time = body.time
        movie.rating = body.rating
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Registry updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Registry not updated!',
                })
            })
    })
}

deleteRegistry = async (req, res) => {
    await Registry.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Registry not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getRegistryById = async (req, res) => {
    await Registry.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Registry not found` })
        }
        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getRegistries = async (req, res) => {
    await Registry.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ success: false, error: `Registry not found` })
        }
        return res.status(200).json({ success: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    createRegistry,
    updateRegistry,
    deleteRegistry,
    getRegistries,
    getRegistryById,
}