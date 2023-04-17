const mongoose = require('mongoose')

const LayananSchema = mongoose.Schema({
    slug: {
        type: String,
    },
    title: {
        type: String,
    },


})
LayananSchema.set('timestamps', true)
module.exports = mongoose.model('Layanan', LayananSchema)