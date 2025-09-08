import jwt from 'jsonwebtoken';
import User from './models/User';
import dbConnect from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function verifyToken(token) {
  try {
    await dbConnect();
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch (error) {
    return null;
  }
}

export function generateToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
}