const express = require('express')
const Fruit = require('../models/fruit')


// Create Router variable to attach server.js routes
const router = express.Router()

///////////////////////////////////
// IMPORTED ROUTES from server.js
///////////////////////////////////

// LANDING ROUTE



// INDEX ROUTE - 3 Ways
// Callback Method (What we've been doing)
// router.get('/fruits', (req, res) => {
//     Fruit.find({}, (err, fruits) => {
//         res.render('index.ejs', {fruits})
//     })
// })

//.then Method
router.get('/', (req, res) => {
    Fruit.find({})
    .then((fruits) => {
        res.render('fruits/index.ejs', {fruits})
    })
})

// Async/Await Method
// router.get("/fruits", async (req, res) => {
//     const fruits = await Fruits.find({});
//     res.render("index.ejs", { fruits });
//   });

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('fruits/new.ejs')
})

// CREATE ROUTE
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === "on" ? true : false
    Fruit.create(req.body, (err, fruit) => {
        res.redirect('/fruits')
    })
})

// EDIT ROUTE
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Fruit.findById(id, (err, fruit) => {
        res.render('fruits/edit.ejs', {fruit})
    })
})

// DESTROY ROUTE
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Fruit.findByIdAndRemove(id, (err, fruit) => {
        res.redirect('/fruits')
    })
})

// UPDATE ROUTE
router.put('/:id', (req, res) => {
    const id = req.params.id
    req.body.readyToEat = req.body.readyToEat === "on" ? true: false
    Fruit.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        res.redirect('/fruits')
    })
})

// SHOW ROUTE
router.get('/:id', (req, res) => {
    const id = req.params.id
    Fruit.findById(id, (err, fruit) => {
        res.render('fruits/show.ejs', {fruit})
    })
})



//////////////////
// EXPORT ROUTER
//////////////////

module.exports = router