import express from 'express'
import db from '../config/db.js'

const router = express.Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing credentials' })
  }

  const query = 'SELECT * FROM admin WHERE username = ? AND password = ?'
  db.query(query, [username, password], (err, data) => {
    if (err) return res.status(500).json({ message: 'DB error' })
    if (data.length === 0) return res.status(401).json({ message: 'Invalid credentials' })

    res.json({ message: 'Login successful' })
  })
})

export default router
