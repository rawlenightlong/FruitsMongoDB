const mongoose = require('./connection')
const Fruit = require('./fruit')

// SEED CODE

mongoose.connection.on('open', () => {

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
        console.log('--------FRUITS CREATED-------');
        console.log(data)
        console.log('--------FRUITS CREATED-------');
        mongoose.connection.close()
      }
    )
  })
})