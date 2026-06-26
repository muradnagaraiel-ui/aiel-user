import { NextResponse } from "next/server";
import { connectDB} from '@/lib/db';  // ⚠️ Apne mongoose connection utility ka path sahi kar lena
import LmcAndCertificate from "@/models/LmcAndCertificate"; // ⚠️ Model file ka correct path check kar lena

export async function POST(request: Request) {
  try {
    // 1. Database connection check/establish karein
    await connectDB();

    // 2. Request body se parameters extract karein
    const body = await request.json();
    const { studentName, selectedBatch, cardType } = body;

    // Safety validation
    if (!studentName || !studentName.trim()) {
      return NextResponse.json(
        { success: false, error: "Student name is required" },
        { status: 400 }
      );
    }

    const cleanName = studentName.trim();

    // 3. Database Query: Exact Match across Name, Batch, and Document Type
    // Regex use kiya hai taaki Case-Insensitive (Chhota/Bada letter) search kaam kare
    const record = await LmcAndCertificate.findOne({
      name: { $regex: new RegExp(`^${cleanName}$`, "i") },
      batchTime: selectedBatch,
      cardType: cardType,
    });

    // 4. Status Alignment Logic
    let status: "COLLECTED" | "UNCOLLECTED" | "NOT_FOUND" = "NOT_FOUND";

    if (record) {
      // Model schemas ke format ("Collected", "Uncollected", "Not Issued") ko 
      // Frontend Component ke strict uppercase types ke sath map kiya hai
      if (record.status === "Collected") {
        status = "COLLECTED";
      } else if (record.status === "Uncollected") {
        status = "UNCOLLECTED";
      } else {
        status = "NOT_FOUND";
      }
    }

    // 5. Response payload send karein
    return NextResponse.json({
      success: true,
      status,
      meta: {
        studentName: cleanName,
        selectedBatch,
        cardType,
        verifiedAt: new Date().toISOString(),
      },
    });

  } catch (error: any) {
    console.error("Database Pipeline Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server System Error Matrix" },
      { status: 500 }
    );
  }
}