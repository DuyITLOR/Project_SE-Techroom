import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import APIRoute from './routes/api.js'
import db from './models/index.js'

// Initialize with express
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api', APIRoute)

// Sync database and start server
async function startServer() {
    try {
        await db.sequelize.sync({ force: false })
        console.log('Database synchronized successfully.')
        
        app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to sync database: ', error);
        process.exit(1);
    }
}

startServer();