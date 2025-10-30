import { Schema, model } from 'mongoose';

const PromoCodeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['PERCENT', 'FLAT'], required: true }, // e.g., 'PERCENT' or 'FLAT'
  value: { type: Number, required: true }, // e.g., 10 for 10% or ₹100
  isActive: { type: Boolean, default: true },
});

export default model('PromoCode', PromoCodeSchema);