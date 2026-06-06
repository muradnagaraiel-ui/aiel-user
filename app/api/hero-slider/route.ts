import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import HeroSlider from '@/models/HeroSlider';

export async function GET() {
  try {
    await connectDB();

    const slides = await HeroSlider.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: slides,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}