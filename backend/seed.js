// One-time script: loads food items and categories into MongoDB Atlas.
// Run from the backend folder:  node seed.js
// Needs MONGO_URI in backend/.env (or set in your terminal).
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')

const foodItems = require(path.join(__dirname, '../frontend/src/foodData2.json'))
const foodCategory = require(path.join(__dirname, '../frontend/src/foodCategory.json'))

;(async () => {
  await mongoose.connect(process.env.MONGO_URI)
  const db = mongoose.connection.db
  await db.collection('food_items').deleteMany({})
  await db.collection('foodCategory').deleteMany({})
  await db.collection('food_items').insertMany(foodItems)
  await db.collection('foodCategory').insertMany(foodCategory)
  console.log(`Inserted ${foodItems.length} food items and ${foodCategory.length} categories`)
  await mongoose.disconnect()
})().catch(e => { console.error(e); process.exit(1) })
