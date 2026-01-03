import React from 'react';
import { Button } from '../Button';
import { ArrowRight, Clock, CheckCircle, Sparkles, ArrowUpRight, Heart } from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';

interface OverviewProps {
  setActiveTab: (tab: string) => void;
  applications: Application[];
}

export const DashboardOverview: React.FC<OverviewProps> = ({ setActiveTab, applications }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hello, Alex.</h1>
        <p className="text-gray-500">Here's what's happening today.</p>
      </div>

      {/* AI Insight Card */}
      <div className="bg-gradient-to-r from-cliro-black to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">New Opportunity Match</h3>
              <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
                Based on your interest in <strong>Pediatrics</strong>, I found a new rotation at <strong>Boston Children's Hospital</strong> that accepts 4th-year students with your GPA profile.
              </p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="shrink-0"
            onClick={() => setActiveTab('ai-assistant')}
          >
            Review with Assistant
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm font-medium">Match Score</span>
            <div className="p-2 bg-blue-50 rounded-lg">
                <ArrowUpRight className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">92%</div>
          <div className="text-xs text-gray-400">Avg across active apps</div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm font-medium">Interviews</span>
            <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">1</div>
          <div className="text-xs text-gray-400">Oct 24, 2:00 PM EST</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm font-medium">Completed</span>
            <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">4</div>
          <div className="text-xs text-gray-400">Verified rotations</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden group">
           <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-50 rounded-full blur-2xl group-hover:bg-red-100 transition-colors duration-500"></div>
           <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm font-medium">Impact Generated</span>
                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                    <Heart className="w-5 h-5 text-red-500" />
                </div>
            </div>
            <div className="text-3xl font-bold mb-1">$125</div>
            <div className="text-xs text-gray-400">Funded for community health</div>
           </div>
        </div>
      </div>

      {/* Applications Preview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Recent Applications</h2>
          <button 
            onClick={() => setActiveTab('applications')}
            className="text-sm font-medium text-cliro-black hover:underline flex items-center"
          >
            View all <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Opportunity</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Match</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.slice(0, 3).map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-900">{app.opportunity.title}</span>
                                <span className="text-xs text-gray-500">{app.opportunity.institution}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                app.status === ApplicationStatus.INTERVIEW ? 'bg-purple-50 text-purple-700' :
                                app.status === ApplicationStatus.ACCEPTED ? 'bg-green-50 text-green-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                                {app.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium text-green-600">
                            {app.matchScore}%
                        </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};