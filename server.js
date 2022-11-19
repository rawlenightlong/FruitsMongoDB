///////////////////////
//Import Dependencies
///////////////////////

require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const PORT = process.env.PORT

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

//////////////////
// Middleware
//////////////////
app.use(morgan('tiny')) // logging
app.use(methodOverride("_method")) // override post requests for DELETE routes
app.use(express.urlencoded({extended: true})) // parses url encoded bodies (create route requests)
app.use(express.static("public")) // serve files from public folder


///////////////////
// ROUTES /////////
///////////////////

// LANDING ROUTE
app.get('/', (req, res) => {
    res.send(`your server is running...`)
})

// SEED ROUTE
app.get('/fruits/seed', (req, res) => {

    // define data going into the database
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
      ]

  // Delete all fruits
  Fruit.deleteMany({}, (err, data) => {
    // Seed Starter Fruits
    Fruit.create(startFruits,(err, data) => {
        // send created fruits as response to confirm creation
        res.json(data);
      }
    );
  });
}); 

// INDEX ROUTE - 3 Ways
// Callback Method (What we've been doing)
// app.get('/fruits', (req, res) => {
//     Fruit.find({}, (err, fruits) => {
//         res.render('index.ejs', {fruits})
//     })
// })

//.then Method
app.get('/fruits', (req, res) => {
    Fruit.find({})
    .then((fruits) => {
        res.render('fruits/index.ejs', {fruits})
    })
})

// Async/Await Method
// app.get("/fruits", async (req, res) => {
//     const fruits = await Fruits.find({});
//     res.render("index.ejs", { fruits });
//   });

// NEW ROUTE
app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs')
})

// CREATE ROUTE
app.post('/fruits', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    Fruit.create(req.body, (err, fruit) => {
        res.redirect('/fruits')
    })
})

// EDIT ROUTE
app.get('/fruits/:id/edit', (req, res) => {
    const id = req.params.id
    Fruit.findById(id, (err, fruit) => {
        res.render('fruits/edit.ejs', {fruit})
    })
})

// DESTROY ROUTE
app.delete('/fruits/:id', (req, res) => {
    const id = req.params.id
    Fruit.findByIdAndRemove(id, (err, fruit) => {
        res.redirect('/fruits')
    })
})

// UPDATE ROUTE
app.put('/fruits/:id', (req, res) => {
    const id = req.params.id
    req.body.readyToEat = req.body.readyToEat === "on" ? true: false
    Fruit.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        res.redirect('/fruits')
    })
})

// SHOW ROUTE
app.get('/fruits/:id', (req, res) => {
    const id = req.params.id
    Fruit.findById(id, (err, fruit) => {
        res.render('fruits/show.ejs', {fruit})
    })
})
/////////////////
//App Listener
app.listen(PORT, (req, res) => {
    console.log(`Hey there Delilah, what's it like in Port ${PORT}`)
})