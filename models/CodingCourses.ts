import mongoose, {
  Schema,
  Document,
} from 'mongoose';

export interface ICodingCourse
  extends Document {
  language: string;
  duration: string;
  actualPrice: number;
  discountPrice: number;
  topics: string[];
  projects: string[];
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

const CodingCourseSchema =
  new Schema<ICodingCourse>(
    {
      language: {
        type: String,
        required: true,
        trim: true,
      },

      duration: {
        type: String,
        required: true,
        trim: true,
      },

      actualPrice: {
        type: Number,
        required: true,
      },

      discountPrice: {
        type: Number,
        required: true,
      },

      topics: [
        {
          type: String,
          trim: true,
        },
      ],

      projects: [
        {
          type: String,
          trim: true,
        },
      ],

      imageUrl: {
        type: String,
      },

      isActive: {
        type: Boolean,
        default: true,
      },

      sortOrder: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

const CodingCourse =
  mongoose.models.CodingCourse ||
  mongoose.model<ICodingCourse>(
    'CodingCourse',
    CodingCourseSchema
  );

export default CodingCourse;