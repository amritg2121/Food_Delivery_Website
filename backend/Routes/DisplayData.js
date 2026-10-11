const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.post('/foodData', async (req, res) => {
    try {
        const db = mongoose.connection.db
        const foodItems = await db.collection('food_items').find({}).toArray()
        const foodCategory = await db.collection('foodCategory').find({}).toArray()
        res.send([foodItems, foodCategory])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;
