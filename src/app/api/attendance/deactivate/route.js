import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AttendanceSession from '@/models/AttendanceSession';
import Course from '@/models/Course';
import { getSessionUser } from '@/lib/auth';

export async function POST(request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized: No active session' }, { status: 401 });
    }

    if (user.role !== 'LECTURER') {
      return NextResponse.json({ error: 'Forbidden: Only lecturers can manage sessions' }, { status: 403 });
    }

    await dbConnect();
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const session = await AttendanceSession.findById(sessionId);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    const course = await Course.findById(session.courseId);
    if (!course || course.lecturerId.toString() !== user._id.toString()) {
      return NextResponse.json({ error: 'Forbidden: You do not own this course session' }, { status: 403 });
    }

    session.active = false;
    await session.save();

    return NextResponse.json({ message: 'Session deactivated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Deactivate session error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
