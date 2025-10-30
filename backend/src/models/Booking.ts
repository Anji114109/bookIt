import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  promoCode: { type: String, default: '' },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Booking', BookingSchema);