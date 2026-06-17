import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import { getSessionUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getSessionUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized: No active session' },
        { status: 401 }
      );
    }

    if (user.role !== 'LECTURER') {
      return NextResponse.json(
        { error: 'Forbidden: Only lecturers can retrieve courses' },
        { status: 403 }
      );
    }

    await dbConnect();
    const courses = await Course.find({ lecturerId: user._id }).sort({ createdAt: -1 });

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error('Fetch courses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getSessionUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized: No active session' },
        { status: 401 }
      );
    }

    if (user.role !== 'LECTURER') {
      return NextResponse.json(
        { error: 'Forbidden: Only lecturers can create courses' },
        { status: 403 }
      );
    }

    await dbConnect();
    const { title, code, description } = await request.json();

    if (!title || !code) {
      return NextResponse.json(
        { error: 'Course title and code are required' },
        { status: 400 }
      );
    }

    const formattedCode = code.trim().toUpperCase();

    const existingCourse = await Course.findOne({ code: formattedCode });
    if (existingCourse) {
      return NextResponse.json(
        { error: `Course code ${formattedCode} already exists` },
        { status: 409 }
      );
    }

    const course = await Course.create({
      title: title.trim(),
      code: formattedCode,
      description: description ? description.trim() : '',
      lecturerId: user._id,
    });

    return NextResponse.json(
      { message: 'Course created successfully', course },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
