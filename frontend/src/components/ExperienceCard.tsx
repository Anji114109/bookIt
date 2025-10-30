// frontend/src/components/ExperienceCard.tsx
import { Experience } from '../types';

interface Props {
  experience: Experience;
  onClick: () => void;
}

export default function ExperienceCard({ experience, onClick }: Props) {
  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1506260456009-0c7d6e8a7d3a?auto=format&fit=crop&w=600';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {experience.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{experience.location}</p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            ₹{experience.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {experience.description}
        </p>

        <button
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm group-hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
}