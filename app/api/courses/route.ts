import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import ComputerCourse from '@/models/ComputerCourses';
import EnglishCourse from '@/models/EnglishCourses';
import CodingCourse from '@/models/CodingCourses';

export async function GET(req: NextRequest) {
  try {
    // 1. Database Connection initialize karein
    await connectDB();

    // 2. Teeno collections se data fetch karein (Parallel fetching for speed)
    const [computerData, englishData, codingData] = await Promise.all([
      ComputerCourse.find({ isActive: true }).lean(),
      EnglishCourse.find({ isActive: true }).lean(),
      CodingCourse.find({ isActive: true }).lean(),
    ]);

    // 3. Data Formatting (Frontend components ko 'type' field chahiye filtering ke liye)
    const formattedComputer = computerData.map((course: any) => ({
      ...course,
      type: 'computer',
    }));

    const formattedEnglish = englishData.map((course: any) => ({
      ...course,
      type: 'english',
    }));

    const formattedCoding = codingData.map((course: any) => ({
      ...course,
      type: 'coding',
    }));

    // 4. Merge all lists into one Master Array
    const allCourses = [
      ...formattedComputer,
      ...formattedEnglish,
      ...formattedCoding,
    ];

    // 5. MASTER SORTING LOGIC
    // Pehle sortOrder ke hisaab se (0, 1, 2...), fir newest first (createdAt)
    allCourses.sort((a: any, b: any) => {
      if (a.sortOrder === b.sortOrder) {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // Latest pehle dikhega agar order same hai
      }
      return a.sortOrder - b.sortOrder;
    });

    // 6. JSON Response send karein
    return NextResponse.json({
      success: true,
      count: allCourses.length,
      data: allCourses,
    });

  } catch (error: any) {
    console.error('USER API FETCH ERROR =>', error);
    return NextResponse.json(
      { success: false, message: 'Database se courses load nahi ho paye.' },
      { status: 500 }
    );
  }
}