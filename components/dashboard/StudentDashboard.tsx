import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardOverview } from './DashboardOverview';
import { DashboardApplications } from './DashboardApplications';
import { DashboardAI } from './DashboardAI';
import { DashboardMarketplace } from './DashboardMarketplace';
import { DashboardOpportunityDetail } from './DashboardOpportunityDetail';
import { SocialImpact } from '../sections/SocialImpact';
import { Menu, ArrowLeft } from 'lucide-react';
import { Logo } from '../Logo';
import { Application, ApplicationStatus, User, Opportunity } from '../../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    status: ApplicationStatus.INTERVIEW,
    lastUpdated: '2 hours ago',
    matchScore: 95,
    opportunity: {
      id: '1',
      title: 'Neurosurgery Clinical Rotation',
      institution: 'Johns Hopkins Medicine',
      location: 'Baltimore, MD',
      type: 'Clinical Rotation',
      imageUrl: '',
      description: '',
      spotsLeft: 2,
      duration: '4 Weeks',
      rating: 4.9,
      skills: ['Neurosurgery', 'Pediatrics', 'Surgery'],
      mentor: {
        name: 'Dr. James Wilson',
        role: 'Chief of Pediatric Neurosurgery',
        avatarUrl: 'https://i.pravatar.cc/150?u=dr_wilson'
      }
    }
  },
  {
    id: 'app-2',
    status: ApplicationStatus.UNDER_REVIEW,
    lastUpdated: '2 days ago',
    matchScore: 88,
    opportunity: {
      id: '2',
      title: 'Public Health Research Initiative',
      institution: 'Global Health Alliance',
      location: 'Cusco, Peru',
      type: 'Research',
      imageUrl: '',
      description: '',
      spotsLeft: 5,
      duration: '3 Months',
      rating: 4.8,
      skills: ['Data Collection', 'Spanish', 'Cardiology'],
      mentor: {
        name: 'Dr. Elena Rodriguez',
        role: 'Lead Investigator',
        avatarUrl: 'https://i.pravatar.cc/150?u=dr_rodriguez'
      }
    }
  },
  {
    id: 'app-3',
    status: ApplicationStatus.DRAFT,
    lastUpdated: '1 week ago',
    matchScore: 92,
    opportunity: {
      id: '3',
      title: 'Pediatric Oncology Shadowing',
      institution: 'St. Jude Children\'s Research Hospital',
      location: 'Memphis, TN',
      type: 'Clinical Rotation',
      imageUrl: '',
      description: '',
      spotsLeft: 1,
      duration: '2 Weeks',
      rating: 5.0,
      skills: ['Oncology', 'Pediatrics', 'Compassion'],
      mentor: {
        name: 'Dr. Sarah Miller',
        role: 'Attending Physician',
        avatarUrl: 'https://i.pravatar.cc/150?u=dr_miller'
      }
    }
  }
];

export const StudentDashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiContext, setAiContext] = useState<Opportunity | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [returnToContext, setReturnToContext] = useState<string | null>(null);

  const handleAskAI = (opportunity: Opportunity) => {
    setAiContext(opportunity);
    setActiveTab('ai-assistant');
  };

  const handleViewImpact = () => {
    if (activeTab === 'opportunity-detail' && selectedOpportunity) {
        setReturnToContext(selectedOpportunity.title);
    } else {
        setReturnToContext(null);
    }
    setActiveTab('social-impact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpportunityClick = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setActiveTab('opportunity-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMarketplace = () => {
    setSelectedOpportunity(null);
    setActiveTab('marketplace');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview setActiveTab={setActiveTab} applications={MOCK_APPLICATIONS} />;
      case 'marketplace':
        return <DashboardMarketplace onOpportunityClick={handleOpportunityClick} onAskAI={handleAskAI} onViewImpact={handleViewImpact} />;
      case 'opportunity-detail':
        return selectedOpportunity ? (
            <DashboardOpportunityDetail 
                opportunity={selectedOpportunity} 
                onBack={handleBackToMarketplace}
                onAskAI={handleAskAI}
                onViewImpact={handleViewImpact}
                onApply={(opp) => {
                    // Mock apply action or navigation to separate application flow
                    alert(`Applied to ${opp.title}!`);
                }}
            />
        ) : <DashboardMarketplace onOpportunityClick={handleOpportunityClick} onAskAI={handleAskAI} onViewImpact={handleViewImpact} />;
      case 'applications':
        return <DashboardApplications applications={MOCK_APPLICATIONS} onViewImpact={handleViewImpact} />;
      case 'ai-assistant':
        return <DashboardAI initialContext={aiContext} />;
      case 'social-impact':
        return (
            <div className="space-y-6">
                {returnToContext && (
                    <button 
                        onClick={() => {
                            setActiveTab('opportunity-detail');
                            setReturnToContext(null);
                        }}
                        className="flex items-center text-sm font-medium text-gray-500 hover:text-cliro-black transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to {returnToContext}
                    </button>
                )}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-500">
                    <SocialImpact />
                </div>
            </div>
        );
      default:
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
                <p>This module is under development.</p>
                <button onClick={() => setActiveTab('overview')} className="text-cliro-black underline mt-2">Return Home</button>
            </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed md:static inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <DashboardSidebar 
            activeTab={activeTab === 'opportunity-detail' ? 'marketplace' : activeTab} 
            setActiveTab={(tab) => {
                setActiveTab(tab);
                setSidebarOpen(false);
            }} 
            onLogout={onLogout} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-100 p-4 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-2">
                <Logo className="h-6 w-6 text-cliro-black" />
                <span className="font-bold text-lg">CLIRO</span>
            </div>
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600">
                <Menu className="w-6 h-6" />
            </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full">
                {renderContent()}
            </div>
        </main>
      </div>
    </div>
  );
};