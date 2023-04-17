const mongoose = require('mongoose')

const ProdukSchema = mongoose.Schema({
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
    desc: {
        type: String,
    },
    ekatalog: {
        type: String,
    },
    thumbnail: {
        type: String,
    },


})
ProdukSchema.set('timestamps', true)
module.exports = mongoose.model('Produk', ProdukSchema)