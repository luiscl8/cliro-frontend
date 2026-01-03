import React from 'react';
import { Opportunity } from '../../types';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Neurosurgery Clinical Rotation',
    type: 'Clinical Rotation',
    location: 'Johns Hopkins, Baltimore',
    institution: 'Johns Hopkins Medicine',
    description: 'A comprehensive 4-week shadowing experience focusing on pediatric neurosurgery and operative planning.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    spotsLeft: 2,
    duration: '4 Weeks',
    rating: 4.9,
    skills: ['Neurosurgery', 'Pediatrics', 'Patient Care'],
    matchScore: 98
  },
  {
    id: '2',
    title: 'Public Health Research Initiative',
    type: 'Research',
    location: 'Cusco, Peru',
    institution: 'Global Health Alliance',
    description: 'Field research studying the impact of high-altitude living on cardiovascular health in rural communities.',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    spotsLeft: 5,
    duration: '3 Months',
    rating: 4.8,
    skills: ['Data Collection', 'Spanish', 'Cardiology'],
    matchScore: 85
  },
  {
    id: '3',
    title: 'Cardiology Volunteering',
    type: 'Volunteering',
    location: 'Nairobi, Kenya',
    institution: 'Heart of Africa Foundation',
    description: 'Assist in screening camps and community education programs for congenital heart defects.',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    spotsLeft: 3,
    duration: '6 Weeks',
    rating: 5.0,
    skills: ['Community Outreach', 'Screening', 'Education'],
    matchScore: 92
  }
];

export const Democratization: React.FC = () => {
  return (
    <section id="opportunities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Exceptional Opportunities</h2>
            <p className="text-gray-600 text-lg">
              Secure, verified, and high-impact learning experiences. We democratize access to the best mentors and institutions worldwide.
            </p>
          </div>
          <a href="#" className="hidden md:flex items-center text-cliro-black font-semibold hover:underline mt-4 md:mt-0">
            View all listings <ArrowUpRight className="ml-1 w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_OPPORTUNITIES.map((opp) => (
            <div key={opp.id} className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={opp.imageUrl} 
                  alt={opp.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {opp.type}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                  <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {opp.location}</span>
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {opp.duration}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700">{opp.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{opp.description}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{opp.institution}</span>
                  <span className="text-xs font-semibold text-white bg-black backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                    {opp.spotsLeft} spots left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <a href="#" className="inline-flex items-center text-cliro-black font-semibold hover:underline">
            View all listings <ArrowUpRight className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};