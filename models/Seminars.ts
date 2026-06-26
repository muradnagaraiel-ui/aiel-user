import mongoose, { Schema, Document } from "mongoose";

export interface IStudent {
  name: string;
  topicName: string;
  grammar: number;
  pronunciation: number;
  confidence: number;
  dress: number;
  phonetics: number;
  content: number;
  performance: number;
  questions: number;
  total: number;
}

export interface ITopic {
  name: string;
}

export interface ISeminar extends Document {
  batchTime: string;
  batchShift: "Morning" | "Noon" | "Afternoon" | "Evening";
  batchStartDate: Date;
  batchEndDate: Date;
  scoreImageUrl?: string; // Scoreboard attachment reference URL
  fileId?: string; // ImageKit file ID for tracking uploaded files
  students: IStudent[];
}

// ─── STUDENT SUB-SCHEMA ───
const StudentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    topicName: { type: String, required: true },
    grammar: { type: Number, default: 0 },
    pronunciation: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
    dress: { type: Number, default: 0 },
    phonetics: { type: Number, default: 0 },
    content: { type: Number, default: 0 },
    performance: { type: Number, default: 0 },
    questions: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── TOPIC SUB-SCHEMA ───
const TopicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true, trim: true },
  },
  { _id: true } // MongoDB auto-generate karega individual id block har topic ke liye
);

// ─── MAIN SEMINAR SCHEMA ───
const SeminarSchema = new Schema<ISeminar>(
  {
    batchTime: {
      type: String,
      required: true,
    },
    batchShift: {
      type: String,
      enum: ["Morning", "Noon", "Afternoon", "Evening"],
      required: true,
    },
    batchStartDate: {
      type: Date,
      required: true,
    },
    batchEndDate: {
      type: Date,
      required: true,
    },
    scoreImageUrl: {
      type: String,
      default: "", // Shuruat mein empty string rahega jab tak dashboard se upload na ho
    },
    fileId: {
      type: String,
      default: "", // Shuruat mein empty string rahega jab tak dashboard se upload na ho
    },

    students: {
      type: [StudentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
if (
  mongoose.models.Seminar 
) {
  delete mongoose.models
    .Seminar;
}


export default mongoose.models.Seminar ||
  mongoose.model<ISeminar>("Seminar", SeminarSchema);