import { Slot } from '../types';

interface Props {
  slots: Slot[];
  selectedSlot: string | null;
  onSelect: (id: string) => void;
}

export default function SlotSelector({ slots, selectedSlot, onSelect }: Props) {
  return (
    <div className="space-y-3 mb-6">
      {slots.map((slot) => {
        const isAvailable = slot.bookedCount < slot.capacity;
        const isSelected = selectedSlot === slot._id;
        return (
          <button
            key={slot._id}
            onClick={() => isAvailable && onSelect(slot._id)}
            disabled={!isAvailable}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              isSelected
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                : isAvailable
                ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900">
                {new Date(slot.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })} at {slot.time}
              </span>
              {isAvailable ? (
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {slot.capacity - slot.bookedCount} spots left
                </span>
              ) : (
                <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
                  Sold Out
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}