import Experience from '../models/Experience';
import Slot from '../models/Slot';
import Booking from '../models/Booking';

export const createBooking = async (req: any, res: any) => {
  const { experienceId, slotId, name, email, promoCode, totalPrice } = req.body;

  const session = await Slot.startSession();
  session.startTransaction();

  try {
    // Validate slot availability
    const slot = await Slot.findById(slotId).session(session);
    if (!slot || slot.experienceId.toString() !== experienceId) {
      throw new Error('Invalid slot');
    }
    if (slot.bookedCount >= slot.capacity) {
      return res.status(400).json({ error: 'Slot is fully booked' });
    }

    // Create booking
    const booking = new Booking({
      experienceId,
      slotId,
      name,
      email,
      promoCode,
      totalPrice,
    });
    await booking.save({ session });

    // Increment bookedCount
    slot.bookedCount += 1;
    await slot.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, bookingId: booking._id });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(400).json({ error: err.message || 'Booking failed' });
  }
};