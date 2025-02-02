const express = require('express')
const app = express()
require("dotenv").config(); // Load environment variables
const connectDB = require('./config/connection');
const PORT = process.env.PORT
const mailRoute = require('./routes/mail');
const cors = require('cors')

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

//connect to database
connectDB()

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the server!' })
})
app.use('/api', mailRoute)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})

