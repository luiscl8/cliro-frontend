import React, { useState } from 'react';
import { Opportunity } from '../../types';
import { Button } from '../Button';
import { 
  MapPin, Clock, Star, Sparkles, Zap, Building2, Users, Share2, 
  GraduationCap, User, Calendar, MessageCircle, FileText, ArrowLeft, 
  CheckCircle, ShieldCheck, ChevronRight, Heart, X
} from 'lucide-react';

interface Props {
  opportunity: Opportunity;
  onBack: () => void;
  onAskAI?: (opp: Opportunity) => void;
  onApply?: (opp: Opportunity) => void;
  onViewImpact?: () => void;
}

export const DashboardOpportunityDetail: React.FC<Props> = ({ opportunity, onBack, onAskAI, onApply, onViewImpact }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'mentor' | 'schedule' | 'reviews'>('overview');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  if (!opportunity) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Navigation / Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="hover:text-cliro-black hover:underline">Marketplace</button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{opportunity.title}</span>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 text-gray-500 hover:text-cliro-black">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      {/* Header Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white mb-8">
        <div className="absolute inset-0">
          <img src={opportunity.imageUrl} alt={opportunity.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>
        
        <div className="relative p-8 md:p-12">
          <div className="flex flex-wrap gap-3 mb-4">
             <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-sm font-medium">
                {opportunity.type}
             </span>
             {opportunity.matchScore && (
                <span className="bg-cliro-accent/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    {opportunity.matchScore}% Match
                </span>
             )}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-4xl">
            {opportunity.title}
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-white">{opportunity.institution}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-bold">{opportunity.rating}</span>
                <span className="text-gray-400">(12 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        
        {/* Left Column: Main Content */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                    {[
                        { id: 'overview', label: 'Overview', icon: FileText },
                        { id: 'mentor', label: 'Mentor', icon: User },
                        { id: 'schedule', label: 'Schedule', icon: Calendar },
                        { id: 'reviews', label: 'Reviews', icon: MessageCircle },
                    ].map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    isActive 
                                        ? 'border-cliro-black text-cliro-black' 
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                         <section>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About this experience</h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {opportunity.description}
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg mt-4">
                                Join a high-performing team at {opportunity.institution}. This opportunity is curated to provide hands-on experience in {opportunity.type.toLowerCase()}, focusing on {opportunity.skills.join(', ')}.
                            </p>
                        </section>

                        <section className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-blue-600" /> Learning Objectives
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    'Advanced diagnostic techniques',
                                    'Patient management & care',
                                    'Interdisciplinary collaboration',
                                    'Research methodology',
                                    'Data analysis & synthesis',
                                    'Professional ethics'
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {opportunity.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === 'mentor' && opportunity.mentor && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative">
                                <img src={opportunity.mentor.avatarUrl} alt={opportunity.mentor.name} className="w-32 h-32 rounded-2xl object-cover shadow-lg" />
                                <div className="absolute -bottom-3 -right-3 bg-white p-1.5 rounded-full shadow-md">
                                    <ShieldCheck className="w-6 h-6 text-blue-500 fill-blue-50" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-1">{opportunity.mentor.name}</h3>
                                <p className="text-cliro-accent font-medium mb-4 flex items-center gap-2">
                                    {opportunity.mentor.role}
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                                    {opportunity.mentor.bio || "An experienced professional dedicated to mentorship and clinical excellence."}
                                </p>
                                <div className="flex gap-4">
                                    <Button variant="outline" size="sm">View Full Profile</Button>
                                    <Button variant="ghost" size="sm">Send Message</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'schedule' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                         <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                                <Calendar className="w-5 h-5" /> Typical Schedule
                            </h4>
                            <div className="relative border-l-2 border-gray-100 pl-8 space-y-8 ml-3">
                                <div className="relative">
                                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-cliro-black border-4 border-white shadow-sm"></div>
                                    <div className="font-bold text-gray-900 text-lg mb-1">08:00 AM</div>
                                    <div className="text-gray-600 bg-gray-50 p-3 rounded-lg inline-block">Morning Rounds / Team Meeting</div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-gray-300 border-4 border-white"></div>
                                    <div className="font-bold text-gray-900 text-lg mb-1">10:00 AM</div>
                                    <div className="text-gray-600 bg-gray-50 p-3 rounded-lg inline-block">Clinical Duties / Research Work</div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-gray-300 border-4 border-white"></div>
                                    <div className="font-bold text-gray-900 text-lg mb-1">02:00 PM</div>
                                    <div className="text-gray-600 bg-gray-50 p-3 rounded-lg inline-block">Specialty Procedures / Lab Work</div>
                                </div>
                            </div>
                         </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="bg-gray-50 p-6 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-5xl font-bold text-gray-900">{opportunity.rating}</div>
                                <div>
                                    <div className="flex text-yellow-400 gap-1 mb-1">
                                        {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">Based on 12 student reviews</div>
                                </div>
                            </div>
                            <Button variant="outline">Write a Review</Button>
                        </div>

                        {[1, 2].map((i) => (
                            <div key={i} className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">S{i}</div>
                                    <div>
                                        <div className="font-bold text-gray-900">Student Reviewer</div>
                                        <div className="text-xs text-gray-400">2 weeks ago</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">
                                    "An incredible experience. Dr. {opportunity.mentor?.name.split(' ').pop()} was very supportive and I learned so much about {opportunity.type.toLowerCase()}."
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
                
                {/* Main Action Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xl shadow-gray-200/50">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-500">Application Deadline</div>
                        <div className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">Oct 31</div>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" /> Duration
                            </div>
                            <span className="font-semibold text-gray-900">{opportunity.duration}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="w-4 h-4" /> Spots Left
                            </div>
                            <span className="font-semibold text-gray-900">{opportunity.spotsLeft}</span>
                        </div>
                    </div>

                    <Button 
                        size="lg" 
                        onClick={() => setIsApplyModalOpen(true)} 
                        className="w-full mb-3 shadow-lg shadow-cliro-black/20"
                    >
                        Apply Now <Zap className="w-4 h-4 ml-2 text-yellow-300 fill-yellow-300" />
                    </Button>
                    
                    {onAskAI && (
                        <Button 
                            variant="secondary" 
                            onClick={() => onAskAI(opportunity)} 
                            className="w-full"
                        >
                            <Sparkles className="w-4 h-4 mr-2 text-cliro-accent" /> Ask AI Assistant
                        </Button>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
                        <button className="text-gray-400 hover:text-gray-600 flex items-center gap-2 text-sm font-medium transition-colors">
                            <Share2 className="w-4 h-4" /> Share Opportunity
                        </button>
                    </div>
                </div>

                 {/* Social Impact Card */}
                 <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100 p-6 relative overflow-hidden group">
                    <button 
                        onClick={onViewImpact}
                        className="absolute inset-0 w-full h-full z-10 cursor-pointer"
                        aria-label="View Impact Details"
                    />
                    <div className="flex items-center gap-2 mb-3 text-red-600 relative z-0">
                        <Heart className="w-5 h-5 fill-red-600" />
                        <span className="font-bold text-sm uppercase tracking-wide">Social Impact</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 relative z-0">
                        Booking this opportunity contributes to the CLIRO Foundation's community health fund.
                        <span className="block mt-2 font-medium text-red-600 group-hover:underline underline-offset-2 transition-all">Learn how this works &rarr;</span>
                    </p>
                    <div className="h-1.5 w-full bg-red-100 rounded-full overflow-hidden relative z-0">
                        <div className="h-full bg-red-500 w-3/4 rounded-full"></div>
                    </div>
                    <div className="text-xs text-red-500 mt-2 font-medium text-right relative z-0">75% of goal funded</div>
                </div>

                {/* AI Insight Card */}
                {opportunity.matchScore && opportunity.matchScore > 80 && (
                     <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-yellow-300" />
                                <span className="font-bold text-sm">Why you matched</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Your experience in <strong>{opportunity.skills[0]}</strong> aligns perfectly with the prerequisites for this rotation.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {isApplyModalOpen && (
          <QuickApplyModal 
            isOpen={isApplyModalOpen} 
            onClose={() => setIsApplyModalOpen(false)}
            opportunity={opportunity} 
          />
      )}
    </div>
  );
};

// Internal Quick Apply Component (Moved from Marketplace)
const QuickApplyModal = ({ isOpen, onClose, opportunity }: { isOpen: boolean, onClose: () => void, opportunity: Opportunity }) => {
    const [step, setStep] = useState(1);
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2 text-cliro-black">
                            <Zap className="w-5 h-5 fill-cliro-black" />
                            <span className="font-bold">Quick Apply</span>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
                    </div>

                    {step === 1 ? (
                        <>
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-2">Apply to {opportunity.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Our AI has analyzed your profile against the requirements for this {opportunity.institution} opportunity.
                                </p>
                                
                                <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Match Score</span>
                                        <span className="text-sm font-bold text-green-600">{opportunity.matchScore}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${opportunity.matchScore}%` }}></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-cliro-black" />
                                        <span>Cover letter auto-drafted</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-cliro-black" />
                                        <span>CV tailored for {opportunity.type}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 text-cliro-black" />
                                        <span>Prerequisites verified</span>
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full" onClick={() => setStep(2)}>
                                Submit Application
                            </Button>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Application Sent!</h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Good luck! We'll notify you when {opportunity.institution} reviews your profile.
                            </p>
                            <Button variant="outline" onClick={onClose}>Close</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};