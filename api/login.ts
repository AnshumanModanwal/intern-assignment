import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'Anshuman'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, password } = req.body

  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' })
    res.status(200).json({ token })
  } else {
    res.status(401).json({ message: 'Invalid credentials' })
  }
}