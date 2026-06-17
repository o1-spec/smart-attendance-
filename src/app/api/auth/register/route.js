import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password, role, matricNo, staffId } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'All fields (name, email, password, role) are required' },
        { status: 400 }
      );
    }

    if (role !== 'LECTURER' && role !== 'STUDENT') {
      return NextResponse.json(
        { error: 'Role must be either LECTURER or STUDENT' },
        { status: 400 }
      );
    }

    if (role === 'STUDENT' && !matricNo) {
      return NextResponse.json(
        { error: 'Matriculation Number is required for students' },
        { status: 400 }
      );
    }

    if (role === 'LECTURER' && !staffId) {
      return NextResponse.json(
        { error: 'Staff ID is required for lecturers' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    if (role === 'STUDENT') {
      const existingMatric = await User.findOne({ matricNo: matricNo.trim() });
      if (existingMatric) {
        return NextResponse.json(
          { error: 'Student with this Matriculation Number already exists' },
          { status: 409 }
        );
      }
    } else if (role === 'LECTURER') {
      const existingStaff = await User.findOne({ staffId: staffId.trim() });
      if (existingStaff) {
        return NextResponse.json(
          { error: 'Lecturer with this Staff ID already exists' },
          { status: 409 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      matricNo: role === 'STUDENT' ? matricNo.trim() : undefined,
      staffId: role === 'LECTURER' ? staffId.trim() : undefined,
    });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role, matricNo: user.matricNo, staffId: user.staffId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });

    return NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
