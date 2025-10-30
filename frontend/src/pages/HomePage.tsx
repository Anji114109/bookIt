// frontend/src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { Experience } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ExperienceCard from '../components/ExperienceCard';

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await apiClient.get<Experience[]>('/experiences');
        setExperiences(res.data);
      } catch (err) {
        console.error('Failed to fetch experiences:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Explore Unique Experiences
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover handpicked activities, tours, and adventures near you.
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V7m2 13a2 2 0 002-2V7m2 13a2 2 0 002-2V7m2 13a2 2 0 002-2V7m2 13a2 2 0 002-2V7m2 13a2 2 0 002-2V7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Experiences Available</h3>
            <p className="text-gray-500">Check back soon or add new experiences in the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp._id}
                experience={exp}
                onClick={() => navigate(`/experience/${exp._id}`)}
              />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Looking for more? We’re adding new experiences every week!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg text-blue-600 font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </div>
  );
}