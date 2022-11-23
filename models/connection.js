require('dotenv').config()
const mongoose = require('mongoose')

///////////////////////////////
//Database Connection
///////////////////////////////

//Inputs for our connection function
const data_url=process.env.DATA_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Establish connection
mongoose.connect(data_url, CONFIG)

//Connection log events
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


//exports mongoose for use in other files (specifically Models folder)
module.exports = mongoose