import mongoose, {
  Schema,
  Document,
} from 'mongoose';

export interface IInstallment {
  title: string;
  amount: number;
}

export interface IComputerCourse
  extends Document {
  title: string;
  duration: string;
  actualPrice: number;
  discountPrice: number;
  topics: string[];
  installments: IInstallment[];
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

const ComputerCourseSchema =
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
  .ComputerCourse ||
  mongoose.model<IComputerCourse>(
    'ComputerCourse',
    ComputerCourseSchema
  );