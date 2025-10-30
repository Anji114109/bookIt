export interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
}

export interface Slot {
  _id: string;
  date: string; // ISO string
  time: string;
  capacity: number;
  bookedCount: number;
}

export interface BookingData {
  experienceId: string;
  slotId: string;
  name: string;
  email: string;
  promoCode: string;
  totalPrice: number;
}