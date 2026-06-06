import mongoose, {
  Schema,
  Document,
} from 'mongoose';

export interface IHeroSlider
  extends Document {
  name: string;
  imageUrl: string;
  fileId: string;
}

const HeroSliderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    fileId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models
  .HeroSlider ||
  mongoose.model(
    'HeroSlider',
    HeroSliderSchema
  );