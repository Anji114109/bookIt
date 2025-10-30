import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { Experience, Slot } from '../types';
import SlotSelector from '../components/SlotSelector';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const res = await apiClient.get(`/experiences/${id}`);
        setExperience(res.data);
        setSlots(res.data.slots || []);
      } catch (err) {
        console.error('Details fetch error:', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const handleBook = () => {
    if (!selectedSlot) return alert('Please select a slot');
    navigate(`/checkout/${id}/${selectedSlot}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience Not Found</h2>
          <p className="text-gray-600 mb-4">The experience you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
        >
          ← Back to Experiences
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={experience.image}
                alt={experience.title}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1506260456009-0c7d6e8a7d3a?auto=format&fit=crop&w=600';
                }}
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{experience.title}</h1>
              <p className="text-gray-600 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {experience.location}
              </p>
              <p className="text-gray-700 mb-6">{experience.description}</p>
              <p className="text-3xl font-bold text-blue-600 mb-6">₹{experience.price}</p>

              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Slots</h2>
              {slots.length === 0 ? (
                <p className="text-gray-500 mb-6">No available slots. Check back later!</p>
              ) : (
                <SlotSelector slots={slots} selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
              )}

              <button
                onClick={handleBook}
                disabled={!selectedSlot}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
                  selectedSlot
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedSlot ? 'Book Now' : 'Select a Slot to Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}