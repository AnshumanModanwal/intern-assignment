import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'Anshuman'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    res.status(200).json({ user: decoded })
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}