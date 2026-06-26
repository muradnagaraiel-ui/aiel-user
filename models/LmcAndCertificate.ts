import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILmcAndCertificate extends Document {
  name: string;
  batchTime: string;
  cardType: "LMC" | "Certificate";
  status: "Uncollected" | "Collected" | "Not Issued";
}

const LmcAndCertificateSchema = new Schema<ILmcAndCertificate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    batchTime: {
      type: String,
      required: true,
      trim: true,
    },
    cardType: {
      type: String,
      enum: ["LMC", "Certificate"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Uncollected", "Collected", "Not Issued"],
      default: "Not Issued",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LmcAndCertificate: Model<ILmcAndCertificate> =
  mongoose.models.LmcAndCertificate ||
  mongoose.model<ILmcAndCertificate>(
    "LmcAndCertificate",
    LmcAndCertificateSchema
  );

export default LmcAndCertificate;