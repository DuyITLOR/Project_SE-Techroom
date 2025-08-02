import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import APIRoute from './routes/api.js'

// Initialize with express
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', APIRoute)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
