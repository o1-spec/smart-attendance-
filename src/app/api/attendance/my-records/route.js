import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AttendanceRecord from '@/models/AttendanceRecord';
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

    if (user.role !== 'STUDENT') {
      return NextResponse.json(
        { error: 'Forbidden: Only students can view their attendance logs' },
        { status: 403 }
      );
    }

    await dbConnect();

    const records = await AttendanceRecord.find({ studentId: user._id })
      .populate({
        path: 'courseId',
        model: Course,
        select: 'title code',
      })
      .sort({ markedAt: -1 });

    return NextResponse.json({ records }, { status: 200 });
  } catch (error) {
    console.error('Fetch student records error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
