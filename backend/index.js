const express = require('express')
const cors = require('cors');
const app = express()
const port = 5000
const mongoDB = require("./db")
mongoDB();

app.use(cors({
  origin: [
    'https://food-delivery-website-black-three.vercel.app',
    'https://food-delivery-website-nu-three.vercel.app'
  ],
  credentials: true
}));

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