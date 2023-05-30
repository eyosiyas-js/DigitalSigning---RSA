const { Schema, model } = require("mongoose")

const signatureSchema = Schema({
    version: Number,
    signatureFile:String


})

const Signature = model('Signature',signatureSchema)
module.exports = Signature
