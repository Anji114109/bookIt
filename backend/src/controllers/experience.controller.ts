import { Types } from 'mongoose';
import Experience from '../models/Experience';
import Slot from '../models/Slot';

export const getExperiences = async (_req: any, res: any) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    console.error('Error fetching experiences:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getExperienceById = async (req: any, res: any) => {
  const { id } = req.params;

  // ✅ Validate ObjectId format
  if (!Types.ObjectId.isValid(id)) {
    console.warn('Invalid ObjectId format:', id);
    return res.status(400).json({ error: 'Invalid experience ID format' });
  }

  try {
    // ✅ Fetch experience
    const experience = await Experience.findById(id);
    if (!experience) {
      console.warn('Experience not found for ID:', id);
      return res.status(404).json({ error: 'Experience not found' });
    }

    // ✅ Fetch all slots for this experience
    const slots = await Slot.find({ experienceId: id }).select(
      'date time capacity bookedCount'
    );

    // ✅ Filter available slots in JavaScript (safe and clear)
    const availableSlots = slots.filter(
      (slot) => slot.bookedCount < slot.capacity
    );

    // ✅ Respond with experience + available slots
    res.json({
      ...experience.toObject(),
      slots: availableSlots,
    });
  } catch (err) {
    console.error('Error in getExperienceById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};