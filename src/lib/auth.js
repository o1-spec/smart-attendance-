import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from './mongodb';
import User from '@/models/User';

export async function getSessionUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    await dbConnect();
    const user = await User.findById(decoded.id).select('-password');
    return user;
  } catch (err) {
    return null;
  }
}
