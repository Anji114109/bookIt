import { Schema, model } from 'mongoose';

const SlotSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g., "10:00"
  capacity: { type: Number, default: 10 },
  bookedCount: { type: Number, default: 0 },
});

SlotSchema.index({ experienceId: 1, date: 1, time: 1 }, { unique: true });

export default model('Slot', SlotSchema);