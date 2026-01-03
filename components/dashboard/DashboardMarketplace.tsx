import React, { useState, useMemo } from 'react';
import { Opportunity } from '../../types';
import { MapPin, Clock, Search, Filter, Star, Sparkles, Heart } from 'lucide-react';
import { Button } from '../Button';

const MOCK_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Neurosurgery Clinical Rotation',
    type: 'Clinical Rotation',
    location: 'Johns Hopkins, Baltimore',
    institution: 'Johns Hopkins Medicine',
    description: 'A comprehensive 4-week shadowing experience focusing on pediatric neurosurgery and operative planning. Perfect for students interested in high-acuity surgical fields.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    spotsLeft: 2,
    duration: '4 Weeks',
    rating: 4.9,
    skills: ['Neurosurgery', 'Pediatrics', 'Surgery'],
    matchScore: 98,
    mentor: {
      name: 'Dr. James Wilson',
      role: 'Chief of Pediatric Neurosurgery',
      avatarUrl: 'https://i.pravatar.cc/150?u=dr_wilson',
      bio: 'Dedicated to training the next generation of surgeons with a focus on compassionate care and technical excellence.'
    }
  },
  {
    id: '2',
    title: 'Public Health Research Initiative',
    type: 'Research',
    location: 'Cusco, Peru',
    institution: 'Global Health Alliance',
    description: 'Field research studying the impact of high-altitude living on cardiovascular health. Requires basic Spanish proficiency and data collection skills.',
    imageUrl: 'https://picsum.photos/600/400?random=2',
    spotsLeft: 5,
    duration: '3 Months',
    rating: 4.8,
    skills: ['Data Collection', 'Spanish', 'Cardiology'],
    matchScore: 85,
    mentor: {
      name: 'Dr. Elena Rodriguez',
      role: 'Lead Investigator',
      avatarUrl: 'https://i.pravatar.cc/150?u=dr_rodriguez',
      bio: 'Epidemiologist specializing in high-altitude physiology and community health interventions.'
    }
  },
  {
    id: '3',
    title: 'Cardiology Volunteering',
    type: 'Volunteering',
    location: 'Nairobi, Kenya',
    institution: 'Heart of Africa Foundation',
    description: 'Assist in screening camps and community education programs for congenital heart defects. Open to preclinical students.',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    spotsLeft: 3,
    duration: '6 Weeks',
    rating: 5.0,
    skills: ['Outreach', 'Screening', 'Education'],
    matchScore: 92,
    mentor: {
      name: 'Dr. Sarah Ochieng',
      role: 'Program Director',
      avatarUrl: 'https://i.pravatar.cc/150?u=dr_ochieng',
      bio: 'Cardiologist passionate about addressing health disparities in rural Kenya through education and early detection.'
    }
  },
  {
    id: '4',
    title: 'Emergency Medicine Elective',
    type: 'Clinical Rotation',
    location: 'New York, NY',
    institution: 'Mount Sinai Hospital',
    description: 'High-intensity rotation in a Level 1 Trauma Center. Participation in trauma alerts and rapid assessment.',
    imageUrl: 'https://picsum.photos/600/400?random=4',
    spotsLeft: 1,
    duration: '4 Weeks',
    rating: 4.9,
    skills: ['Trauma Care', 'Emergency Med', 'Triage'],
    matchScore: 96,
    mentor: {
      name: 'Dr. Michael Chang',
      role: 'Trauma Attending',
      avatarUrl: 'https://i.pravatar.cc/150?u=dr_chang',
      bio: 'Experienced trauma surgeon and educator, focusing on rapid decision making in critical care.'
    }
  },
  {
    id: '5',
    title: 'Genetics Lab Research',
    type: 'Research',
    location: 'Boston, MA',
    institution: 'Broad Institute',
    description: 'Computational biology project focusing on gene editing techniques.',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    spotsLeft: 4,
    duration: '10 Weeks',
    rating: 4.7,
    skills: ['Python', 'Genetics', 'Lab Tech'],
    matchScore: 78,
    mentor: {
      name: 'Dr. Emily Chen',
      role: 'Principal Investigator',
      avatarUrl: 'https://i.pravatar.cc/150?u=dr_chen',
      bio: 'Leading research in CRISPR applications for rare genetic disorders.'
    }
  }
];

type SortOption = 'match' | 'rating' | 'newest';

interface Props {
    onOpportunityClick: (opportunity: Opportunity) => void;
    onAskAI?: (opportunity: Opportunity) => void;
    onViewImpact?: () => void;
}

export const DashboardMarketplace: React.FC<Props> = ({ onOpportunityClick, onAskAI, onViewImpact }) => {
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>('match');

  // AI Recommended Logic (Matches >= 90%)
  const recommendedOpps = useMemo(() => {
    return MOCK_OPPORTUNITIES.filter(o => (o.matchScore || 0) >= 90).slice(0, 3);
  }, []);

  // General Filter Logic
  const filteredOpps = useMemo(() => {
    let result = MOCK_OPPORTUNITIES;

    // Filter by Type
    if (activeType !== 'All') {
      result = result.filter(o => o.type === activeType);
    }

    // Filter by Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o => 
        o.title.toLowerCase().includes(q) || 
        o.institution.toLowerCase().includes(q) ||
        o.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Filter by Rating
    if (minRating > 0) {
      result = result.filter(o => o.rating >= minRating);
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'match') return (b.matchScore || 0) - (a.matchScore || 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // 'newest' mock fallback
    });

    return result;
  }, [activeType, searchQuery, minRating, sortBy]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 relative">
      
      {/* SECTION 1: AI Recommended */}
      {!searchQuery && (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cliro-black to-gray-800 rounded-lg shadow-lg">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
                    <p className="text-sm text-gray-500">Curated based on your profile and past rotations.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {recommendedOpps.map(opp => (
                    <OpportunityCard 
                        key={`rec-${opp.id}`}
                        opp={opp}
                        showAIFeatures={true}
                        onDetails={() => onOpportunityClick(opp)}
                    />
                ))}
            </div>
        </div>
      )}

      {/* SECTION 2: General Explore */}
      <div className="space-y-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col gap-6">
            <div>
            <h2 className="text-xl font-bold text-gray-900">Explore All Opportunities</h2>
            <p className="text-gray-500">Browse the complete catalog of verified learning experiences.</p>
            </div>
            
            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
            
            {/* Search */}
            <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by specialty, location, or skill..." 
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cliro-black transition-shadow"
                />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Sort By:</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer text-gray-900"
                    >
                        <option value="match">Relevance</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest Added</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Rating:</span>
                    <select 
                        value={minRating}
                        onChange={(e) => setMinRating(Number(e.target.value))}
                        className="text-sm font-medium bg-transparent border-none focus:ring-0 cursor-pointer text-gray-900"
                    >
                        <option value="0">Any</option>
                        <option value="4.5">4.5+</option>
                        <option value="4.8">4.8+</option>
                        <option value="5">5.0 Only</option>
                    </select>
                </div>
            </div>
            </div>
        </div>

        {/* Type Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Clinical Rotation', 'Research', 'Volunteering'].map(type => (
                <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        activeType === type 
                            ? 'bg-cliro-black text-white shadow-md' 
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    {type}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOpps.map((opp) => (
                <OpportunityCard 
                    key={opp.id}
                    opp={opp}
                    showAIFeatures={false} 
                    onDetails={() => onOpportunityClick(opp)}
                />
            ))}
        </div>

        {filteredOpps.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <Filter className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No matches found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
                <button 
                    onClick={() => {
                        setSearchQuery('');
                        setActiveType('All');
                        setMinRating(0);
                    }}
                    className="mt-4 text-cliro-accent hover:underline text-sm font-medium"
                >
                    Clear all filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

// Reusable Opportunity Card Component
interface CardProps {
    opp: Opportunity;
    showAIFeatures: boolean;
    onDetails: () => void;
}

const OpportunityCard: React.FC<CardProps> = ({ opp, showAIFeatures, onDetails }) => {
    return (
        <div className="group flex flex-col h-full bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 overflow-hidden cursor-pointer" onClick={onDetails}>
            <img 
                src={opp.imageUrl} 
                alt={opp.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
            
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide text-gray-900 shadow-sm">
                {opp.type}
            </div>
            
            {/* Match Score Badge - ONLY VISIBLE IF showAIFeatures IS TRUE */}
            {showAIFeatures && opp.matchScore && (
                <div className="absolute top-4 right-4 bg-cliro-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-in zoom-in">
                    <Sparkles className="w-3 h-3" />
                    {opp.matchScore}% Match
                </div>
            )}

            <div className="absolute bottom-4 left-4 text-white">
                <div className="flex items-center gap-1 text-xs font-medium bg-black/40 backdrop-blur-md px-2 py-1 rounded-md w-fit mb-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {opp.rating}
                </div>
                <div className="font-semibold text-lg leading-tight">{opp.institution}</div>
            </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
            <h3 
                className="text-lg font-bold mb-2 group-hover:text-cliro-accent transition-colors cursor-pointer"
                onClick={onDetails}
            >
                {opp.title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
                {opp.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-semibold uppercase tracking-wider rounded-md">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-4 space-x-3">
                <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {opp.location}</span>
                <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {opp.duration}</span>
                <span className="flex items-center text-red-600 font-medium" title="Social Impact Opportunity"><Heart className="w-3 h-3 mr-1 fill-current" /> Impact</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{opp.description}</p>
            
            {/* Mentor Section */}
            {opp.mentor && (
                <div className="flex items-center gap-3 mb-4 p-2.5 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                    <img src={opp.mentor.avatarUrl} alt={opp.mentor.name} className="w-8 h-8 rounded-full object-cover border border-white shadow-sm" />
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold mb-0.5">Hosted by</p>
                        <p className="text-xs font-bold text-gray-900 truncate">{opp.mentor.name}</p>
                    </div>
                </div>
            )}

            <div className="mt-auto pt-4 border-t border-gray-100">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={onDetails}
                >
                View Details
                </Button>
            </div>
            </div>
        </div>
    );
};