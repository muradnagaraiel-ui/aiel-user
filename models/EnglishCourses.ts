import mongoose, {
  Schema,
  Document,
} from 'mongoose';

export interface IInstallment {
  title: string;
  amount: number;
}

export interface IEnglishCourse
  extends Document {
  title: string;
  duration: string;
  actualPrice: number;
  discountPrice: number;
  lmcCharge: number;
  topics: string[];
  installments: IInstallment[];
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

const EnglishCourseSchema =
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },

      duration: {
        type: String,
        required: true,
      },

      actualPrice: {
        type: Number,
        required: true,
      },

      discountPrice: {
        type: Number,
        required: true,
      },

      lmcCharge: {
        type: Number,
        default: 0,
      },

      topics: [
        {
          type: String,
        },
      ],

      installments: [
        {
          title: {
            type: String,
            required: true,
          },

          amount: {
            type: Number,
            required: true,
          },
        },
      ],

      imageUrl: String,

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

export default mongoose.models
  .EnglishCourse ||
  mongoose.model<IEnglishCourse>(
    'EnglishCourse',
    EnglishCourseSchema
  );