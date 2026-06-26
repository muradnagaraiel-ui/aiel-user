import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  studentName: string;
  fatherName?: string;
  mobile: string;
  whatsapp?: string;
  dob: Date; // Ab yeh required field ki tarah type-safe hai
  gender?: string;
  qualification: string;
  courseType: 'computer' | 'english' | 'coding';
  course: string;
  address?: string;
  query?: string;
  whyDoYouWantThis?: string;
  status: 'Pending' | 'Joined';
  remarks?: string;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherName: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    // ─── DOB UPDATED HERE ───
    dob: {
      type: Date,
      required: [true, 'Date of Birth is required.'], // Ab bina DOB ke document save nahi hoga
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
    },
    qualification: {
      type: String,
      required: true,
    },
    courseType: {
      type: String,
      enum: ['computer', 'english', 'coding'],
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    query: {
      type: String,
    },
    whyDoYouWantThis: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Pending', 'Joined'],
      default: 'Pending',
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true, // Isse createdAt aur updatedAt automatic mil jayenge
  }
);
if (
  mongoose.models.Enquiry
) {
  delete mongoose.models
    .Enquiry;
}

const Enquiry =
  mongoose.models.Enquiry ||
  mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export default Enquiry;