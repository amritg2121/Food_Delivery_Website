const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoDB = require("./db")
mongoDB();

// Use the cors package for better CORS handling
const cors = require('cors')

// Allow requests from your local frontend and deployed Vercel frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://food-delivery-website-woad.vercel.app/" // <-- Replace with your actual Vercel URL
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

app.use(express.json())
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})