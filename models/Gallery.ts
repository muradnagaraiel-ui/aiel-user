// models/Gallery.ts

import mongoose, { Schema, Document } from 'mongoose';

// Pehle check karo ki interface mein 'title' toh nahi hai?
export interface IGallery extends Document {
  slogan: string; 
  imageUrl: string;
  fileId: string;
}

const GallerySchema = new Schema(
  {
    slogan: {
      type: String,
      required: true, // Yahan 'slogan' hi hona chahiye
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
if (
  mongoose.models.Gallery 
) {
  delete mongoose.models
    .Gallery;
}

// Is line ko dhyan se dekho: 
// Agar pehle se Gallery model load hai, toh use delete karke naya banao
export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);