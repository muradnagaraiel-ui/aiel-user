import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; 
import Enquiry from '@/models/Enquiry'; 

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Model ke hisaab se data mapping (Frontend names -> Model names)
    const enquiryData = {
      studentName: body.studentName,
      fatherName: body.fatherName,
      mobile: body.mobile,              // Frontend se apiPayload mein ab direct 'mobile' aa raha hai
      whatsapp: body.whatsapp,          // Frontend se apiPayload mein ab direct 'whatsapp' aa raha hai
      dob: body.dob ? new Date(body.dob) : undefined, // ─── FIXED: body.dob se map kiya ───
      gender: body.gender,
      qualification: body.qualification,
      courseType: body.courseType,
      course: body.course,              // Frontend se apiPayload mein ab direct 'course' aa raha hai
      address: body.address,
      query: body.query,
      whyDoYouWantThis: body.whyDoYouWantThis, // Frontend se apiPayload mein ab direct 'whyDoYouWantThis' aa raha hai
      status: 'Pending',                // Default state assignment
    };

    // ─── UPDATED SERVER VALIDATION ───
    // Model ke mandatory fields (studentName, mobile, qualification, courseType, course, aur dob) ko check kar rahe hain
    if (
      !enquiryData.studentName || 
      !enquiryData.mobile || 
      !enquiryData.qualification || 
      !enquiryData.courseType || 
      !enquiryData.course ||
      !enquiryData.dob
    ) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing or empty (Name, Mobile, DOB, Qualification, Course Data).' },
        { status: 400 }
      );
    }

    // Database mein entry create karein
    const savedEnquiry = await Enquiry.create(enquiryData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Enquiry saved to database successfully! 🚀', 
        data: savedEnquiry 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("MONGO_SAVE_ERROR:", error);

    // Mongoose Validation Failures (Enum constraints or type mismatch)
    if (error && error.name === 'ValidationError') {
      const errs = (error as { errors?: Record<string, { message?: string }> }).errors;
      const firstErr = errs && Object.values(errs)[0] as { message?: string } | undefined;
      const firstErrorMessage = firstErr?.message ?? 'Data validation failed.';
      return NextResponse.json(
        { success: false, message: firstErrorMessage },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal Server Error occurred during ingestion pipeline.' },
      { status: 500 }
    );
  }
}