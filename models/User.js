const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },

})
UserSchema.set('timestamps', true)
module.exports = mongoose.model('User', UserSchema)