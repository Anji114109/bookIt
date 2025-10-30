import { useState } from 'react';

interface Props {
  onApply: (code: string) => void;
  appliedCode: string | null;
  discount: number;
  currentInput: string;
  onInputChange: (value: string) => void;
}

export default function PromoInput({ 
  onApply, 
  appliedCode, 
  discount,
  currentInput,
  onInputChange 
}: Props) {
  const handleApplyClick = () => {
    if (currentInput.trim()) {
      onApply(currentInput.trim());
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code (Optional)</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={currentInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter promo code"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="button" // 👈 Critical: not "submit"
          onClick={handleApplyClick}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Apply
        </button>
      </div>
      {appliedCode && (
        <p className="mt-2 text-green-600 font-medium">
          ✓ Promo applied! Discount: ₹{discount}
        </p>
      )}
    </div>
  );
}