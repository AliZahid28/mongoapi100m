const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const signInSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

signInSchema.methods.generateToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
    } catch (e) {
        res.send(e)
    }

}

signInSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10)
    next()
})


const signInModel = new mongoose.model('User', signInSchema)

module.exports = signInModel