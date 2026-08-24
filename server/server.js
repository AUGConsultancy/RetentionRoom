import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import bookingRoutes from './routes/booking.js'

dotenv.config()
connectDB()

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  })
)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'retention-room-api' })
})

app.use('/api', bookingRoutes)

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' })
})

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Server error.' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Retention Room API running on port ${PORT}`)
})
