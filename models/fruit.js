const mongoose = require('./connection')

///////////////////////
// Models
///////////////////////
const {Schema, model} = mongoose
const fruitsSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

const Fruit = model("Fruit", fruitsSchema)

module.exports = Fruit