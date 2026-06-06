import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; // Apne db connection file ka sahi path check kar lena
import Gallery from '@/models/Gallery';  // Apne Gallery model ka sahi path check kar lena

export const dynamic = 'force-dynamic'; // Taaki har baar fresh data aaye, Next.js cache na kare

export async function GET() {
  try {
    // 1. Database se connect karo
    await connectDB();

    // 2. Saare gallery items nikalen (Newest first ke liye sort lagaya hai)
    const galleryItems = await Gallery.find({}).sort({ createdAt: -1 });

    // 3. Agar data mil jata hai toh successful response bhejo
    return NextResponse.json(
      {
        success: true,
        data: galleryItems,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("Gallery Fetch API Error:", error);
    
    // 4. Error state response
    return NextResponse.json(
      {
        success: false,
        message: 'Database se data laane mein galti hui.',
        error: error?.message || error,
      },
      { status: 500 }
    );
  }
}