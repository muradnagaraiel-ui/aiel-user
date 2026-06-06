import { Buffer } from 'buffer';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Testimonial from '@/models/Testimonial';
import imagekit from '@/lib/imagekit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // 1. Connect database line setup
    await connectDB();

    const formData = await request.formData();

    // 2. Extract explicit keys matching frontend component structure & model schema
    const name = formData.get('name') as string;
    const ratingStr = formData.get('rating') as string;
    const feedback = formData.get('feedback') as string;
    const file = formData.get('profileImage') as File | null; // Match profileImage key from client template

    // 3. Validation loops
    if (!name || !feedback || !ratingStr) {
      return NextResponse.json(
        {
          success: false,
          message: 'All text inputs (name, rating, feedback) are explicitly required.',
        },
        { status: 400 }
      );
    }

    const rating = Number(ratingStr);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'Rating must scale strictly within a numeric bounds of 1 to 5.',
        },
        { status: 400 }
      );
    }

    if (!file || file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Profile image asset structure is strictly required.',
        },
        { status: 400 }
      );
    }

    // 4. Transform file streaming chunks to base64 string matching your architecture blueprint
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 5. Cloud deployment stream execution to ImageKit storage instances
    const uploadResult = await imagekit.upload({
      file: buffer.toString('base64'),
      fileName: `student-avatar-${Date.now()}-${file.name.replace(/\s+/g, '-')}`,
      folder: '/testimonials', // Segment data safely under structured folder paths
    });

    // 6. Write final entry documents onto Mongoose collections mapping active statuses
    const testimonialRecord = await Testimonial.create({
      name,
      profileImage: uploadResult.url,
      fileId: uploadResult.fileId,
      rating,
      feedback,
    });

    return NextResponse.json({
      success: true,
      message: 'Your validation testimonial uploaded and captured inside records successfully.',
      data: testimonialRecord,
    }, { status: 201 });

  } catch (error: any) {
    console.error('TESTIMONIAL SUBMIT ENGINE ERROR =>', error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Internal pipeline processing fault occurred.',
      },
      {
        status: 500,
      }
    );
  }
}