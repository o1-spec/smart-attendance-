import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Course from '@/models/Course';
import AttendanceRecord from '@/models/AttendanceRecord';
import User from '@/models/User';
import { getSessionUser } from '@/lib/auth';

export async function GET(request, { params }) {
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
        { error: 'Forbidden: Only lecturers can retrieve attendance reports' },
        { status: 403 }
      );
    }

    await dbConnect();

    const { courseId } = await params;

    if (!courseId) {
      return NextResponse.json(
        { error: 'Bad Request: Course ID is required' },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { error: 'Not Found: Course does not exist' },
        { status: 404 }
      );
    }

    if (course.lecturerId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: 'Forbidden: You are not authorized to view reports for this course' },
        { status: 403 }
      );
    }

    const records = await AttendanceRecord.find({ courseId })
      .populate({
        path: 'studentId',
        model: User,
        select: 'name email',
      })
      .sort({ markedAt: -1 });

    return NextResponse.json(
      {
        course: {
          id: course._id,
          title: course.title,
          code: course.code,
        },
        records,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch reports error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
