const express = require('express')
const cors = require('cors')
const mongoDB = require('./db')

const app = express()

// Allowed origins: any *.vercel.app, localhost, plus optional FRONTEND_URL (custom domain)
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // non-browser requests
    if (
      origin.endsWith('.vercel.app') ||
      origin === 'http://localhost:3000' ||
      origin === 'http://localhost:5000' ||
      (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL)
    ) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Make sure the DB is connected before any /api route runs (needed on serverless)
app.use('/api', async (req, res, next) => {
  try {
    await mongoDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err.message);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

app.use('/api', require('./Routes/CreatUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

// Local development only. On Vercel the app is exported instead.
if (require.main === module) {
  const port = process.env.PORT || 5000
  app.listen(port, () => console.log(`Server listening on port ${port}`))
}

module.exports = app
