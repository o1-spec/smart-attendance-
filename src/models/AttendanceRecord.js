import mongoose from 'mongoose';

const AttendanceRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a student ID'],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Please provide a course ID'],
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AttendanceSession',
      required: [true, 'Please provide a session ID'],
    },
    markedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

AttendanceRecordSchema.index({ studentId: 1, sessionId: 1 }, { unique: true });

export default mongoose.models.AttendanceRecord || mongoose.model('AttendanceRecord', AttendanceRecordSchema);
