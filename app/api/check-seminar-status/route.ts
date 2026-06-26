import { NextRequest, NextResponse } from "next/server";
import {connectDB} from '@/lib/db';
import Seminar from "@/models/Seminars";

const monthMap: Record<string, number> = {
  January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
  July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
};

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { batchTime, batchStartDate: startMonthName } = body;
    console.log("Received Request Body:", body);

    if (!batchTime || !startMonthName) {
      return NextResponse.json({ success: false, error: "Missing parameters." }, { status: 400 });
    }

    const targetMonthNumber = monthMap[startMonthName]; // March -> 3
    if (!targetMonthNumber) {
      return NextResponse.json({ success: false, error: "Invalid Month." }, { status: 400 });
    }

    // Standardize time strictly
    const formattedTime = batchTime
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/^0/, "")
      .replace(/-0/, "-")
      .replace("-", " - ");
      console.log("Formatted Batch Time:", formattedTime);

    // ─── THE POWER QUERY ───
    // Yeh query database ki date se direct Month aur Year nikal kar match karegi.
    // Isme timezone aage-piche hone par bhi match fail nahi hoga!
    const seminarRecord = await Seminar.findOne({
      batchTime: formattedTime,
      $expr: {
        $and: [
          { $eq: [{ $month: "$batchStartDate" }, targetMonthNumber] }, // Database month == 3
          { $eq: [{ $year: "$batchStartDate" }, 2026] }               // Database year == 2026
        ]
      }
    });
    console.log("Database Query Result:", seminarRecord);

    if (!seminarRecord) {
      return NextResponse.json({ success: false, message: "No matching seminar found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      scoreImageUrl: seminarRecord.scoreImageUrl || null,
      fileId: seminarRecord.fileId || null
    });

  } catch (error) {
    console.error("Status check crash:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}