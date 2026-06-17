import mongoose from 'mongoose';

const AttendanceSessionSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Please provide a course ID'],
    },
    code: {
      type: String,
      required: [true, 'Please provide a session code'],
      unique: true,
      trim: true,
    },
    expiresAt: {
      type: Date,
      required: [true, 'Please provide an expiration date and time'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AttendanceSession || mongoose.model('AttendanceSession', AttendanceSessionSchema);
