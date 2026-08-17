// Minimal Express + Mongoose backend for The Frame House
// Fill in MONGO_URI in .env when you're ready to connect a real database.

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/frame-house'

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection skipped (no DB running yet):', err.message))

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    purpose: { type: String, required: true },
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', bookingSchema)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Create a booking enquiry
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = await Booking.create(req.body)
    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// List booking enquiries (for an admin view later)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
