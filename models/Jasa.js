const mongoose = require('mongoose')

const JasaSchema = mongoose.Schema({
    slug: {
        type: String,
    },
    title: {
        type: String,
    },
    layanan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Layanan'
    },
    content: {
        type: String,
    },
    thumbnail: {
        type: String,
    },



})
JasaSchema.set('timestamps', true)
module.exports = mongoose.model('Jasa', JasaSchema)