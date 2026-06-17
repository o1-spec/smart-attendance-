import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import AttendanceSession from '@/models/AttendanceSession';
import AttendanceRecord from '@/models/AttendanceRecord';
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

    if (user.role !== 'STUDENT') {
      return NextResponse.json(
        { error: 'Forbidden: Only students can mark attendance' },
        { status: 403 }
      );
    }

    await dbConnect();
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Bad Request: Attendance code is required' },
        { status: 400 }
      );
    }

    const session = await AttendanceSession.findOne({ code: code.trim() });
    if (!session) {
      return NextResponse.json(
        { error: 'Not Found: Invalid attendance code' },
        { status: 404 }
      );
    }

    if (!session.active) {
      return NextResponse.json(
        { error: 'Bad Request: Attendance session is inactive' },
        { status: 400 }
      );
    }

    if (new Date(session.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Bad Request: Attendance session has expired' },
        { status: 400 }
      );
    }

    const course = await Course.findById(session.courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Not Found: Connected course was not found' },
        { status: 404 }
      );
    }

    const existingRecord = await AttendanceRecord.findOne({
      studentId: user._id,
      sessionId: session._id,
    });

    if (existingRecord) {
      return NextResponse.json(
        { error: 'Attendance already marked for this session' },
        { status: 409 }
      );
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existingDayRecord = await AttendanceRecord.findOne({
      studentId: user._id,
      courseId: session.courseId,
      markedAt: { $gte: todayStart, $lte: todayEnd },
    });

    if (existingDayRecord) {
      return NextResponse.json(
        { error: 'Bad Request: You have already marked attendance for this course today' },
        { status: 400 }
      );
    }

    const record = await AttendanceRecord.create({
      studentId: user._id,
      courseId: session.courseId,
      sessionId: session._id,
      markedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: 'Attendance marked successfully',
        courseTitle: course.title,
        courseCode: course.code,
        markedAt: record.markedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Mark attendance error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
