import { NextResponse } from 'next/server';
import crypto from 'crypto';
import qrcode from 'qrcode';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import AttendanceSession from '@/models/AttendanceSession';
import { getSessionUser } from '@/lib/auth';

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
        { error: 'Forbidden: Only lecturers can generate attendance QR codes' },
        { status: 403 }
      );
    }

    await dbConnect();
    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    if (course.lecturerId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Forbidden: You are not authorized to generate attendance for this course' },
        { status: 403 }
      );
    }

    const code = crypto.randomBytes(12).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const session = await AttendanceSession.create({
      courseId,
      code,
      expiresAt,
      active: true,
    });

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;
    const attendanceUrl = `${appUrl}/attendance/mark?code=${code}`;

    const qrImage = await qrcode.toDataURL(attendanceUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    return NextResponse.json(
      {
        message: 'Attendance session generated successfully',
        sessionId: session._id,
        courseId,
        code,
        expiresAt,
        qrImage,
        attendanceUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Generate attendance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
