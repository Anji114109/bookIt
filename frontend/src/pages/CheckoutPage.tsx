import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { Experience, BookingData } from '../types';
import PromoInput from '../components/PromoInput';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CheckoutPage() {
  const { expId, slotId } = useParams<{ expId: string; slotId: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchExp = async () => {
      if (!expId) return;
      try {
        const res = await apiClient.get<Experience>(`/experiences/${expId}`);
        setExperience(res.data);
      } catch (err) {
        console.error('Checkout fetch error:', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
  }, [expId, navigate]);

  const basePrice = experience?.price || 0;
  const discount = appliedPromo?.discount || 0;
  const totalPrice = Math.max(0, basePrice - discount);

  const handleApplyPromo = async (code: string) => {
    if (!code.trim()) return;
    try {
      const res = await apiClient.post('/promo/validate', { code });
      if (res.data.valid) {
        const disc = res.data.type === 'FLAT' 
          ? res.data.value 
          : Math.round((basePrice * res.data.value) / 100);
        setAppliedPromo({ code, discount: disc });
      } else {
        alert(res.data.message || 'Invalid promo code');
        setAppliedPromo(null);
      }
    } catch (err) {
      alert('Invalid promo code');
      setAppliedPromo(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      return alert('Please fill all fields');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return alert('Invalid email');
    }

    setSubmitting(true);
    try {
      const bookingData: BookingData = {
        experienceId: expId!,
        slotId: slotId!,
        name: name.trim(),
        email: email.trim(),
        promoCode: appliedPromo?.code || '',
        totalPrice,
      };
      const res = await apiClient.post('/bookings', bookingData);
      navigate(`/result/success/${res.data.bookingId}`);
    } catch (err: any) {
      console.error('Booking error:', err);
      alert('Booking failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Booking</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {experience && (
            <div className="flex items-center mb-6">
              {/* ✅ FIXED: Show real experience image */}
              <img
                src={experience.image}
                alt={experience.title}
                className="w-16 h-16 object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1506260456009-0c7d6e8a7d3a?auto=format&fit=crop&w=100';
                }}
              />
              <div className="ml-4">
                <h2 className="text-xl font-bold text-gray-900">{experience.title}</h2>
                <p className="text-gray-600">{experience.location}</p>
              </div>
              <div className="ml-auto text-2xl font-bold text-blue-600">₹{basePrice}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <PromoInput
              onApply={handleApplyPromo}
              appliedCode={appliedPromo?.code || null}
              discount={discount}
              currentInput={promoCodeInput}
              onInputChange={setPromoCodeInput}
            />

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">₹{totalPrice}</span>
              </div>
              {appliedPromo && (
                <div className="text-sm text-green-600 mt-1">
                  Promo applied: -₹{discount}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                submitting
                  ? 'bg-gray-400'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md'
              }`}
            >
              {submitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}