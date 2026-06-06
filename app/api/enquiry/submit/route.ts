import { NextResponse } from 'next/server';
import {connectDB} from '@/lib/db'; 
import Enquiry from '@/models/Enquiry'; // Aapka updated model

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Model ke hisaab se data mapping (Frontend names -> Model names)
    const enquiryData = {
      studentName: body.studentName,
      fatherName: body.fatherName,
      mobile: body.mobileNumber,      // Mapping mobileNumber to mobile
      whatsapp: body.whatsappNumber,  // Mapping whatsappNumber to whatsapp
      dob: body.enquiryDate ? new Date(body.enquiryDate) : undefined, // Date object conversion
      gender: body.gender,
      qualification: body.qualification,
      courseType: body.courseType,
      course: body.courseName,        // Mapping courseName to course
      address: body.address,
      query: body.query,
      whyDoYouWantThis: body.reason,  // Mapping reason to whyDoYouWantThis
      status: 'Pending',              // Default as per your enum
    };

    // Server-side validation based on your Model's 'required: true' fields
    if (!enquiryData.studentName || !enquiryData.mobile || !enquiryData.course || !enquiryData.courseType || !enquiryData.qualification) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing in the request.' },
        { status: 400 }
      );
    }

    // Database mein save karo
    const savedEnquiry = await Enquiry.create(enquiryData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Enquiry saved to database successfully!', 
        data: savedEnquiry 
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("MONGO_SAVE_ERROR:", error);

    // Agar enum value galat ho (like gender or courseType)
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: 'Data validation failed. Please check field formats.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}