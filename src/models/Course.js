import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Please provide a course code'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    lecturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a lecturer ID'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
