import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Testimonial from '@/models/Testimonial';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Database Connection initialize karna
    await connectDB();

    // 2. Fetching logic: 
    // - isActive: true (Sirf approved reviews)
    // - sort({ createdAt: -1 }) (Taki fresh reviews top par aayein)
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean(); // .lean() performance boost karta hai fetch operations mein

    // 3. Response validation
    if (!testimonials || testimonials.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: 'No active testimonials found in the record.',
          data: [],
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });

  } catch (error: any) {
    console.error('TESTIMONIAL GET ERROR =>', error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Failed to fetch the testimonial stream.',
      },
      {
        status: 500,
      }
    );
  }
}