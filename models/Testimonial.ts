import mongoose, {
  Schema,
  Document,
} from 'mongoose';

export interface ITestimonial
  extends Document {
  name: string;
  profileImage: string;
  fileId: string;
  rating: number;
  feedback: string;
  isActive: boolean;
}

const TestimonialSchema =
  new Schema<ITestimonial>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      profileImage: {
        type: String,
        required: true,
      },

      fileId: {
        type: String,
        required: true,
      },

      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },

      feedback: {
        type: String,
        required: true,
        trim: true,
      },

      isActive: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>(
    'Testimonial',
    TestimonialSchema
  );

export default Testimonial;