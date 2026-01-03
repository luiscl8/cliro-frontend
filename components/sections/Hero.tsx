import React from 'react';
import { Button } from '../Button';
import { ArrowRight, Search, ShieldCheck, RefreshCw } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-white to-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cliro-black/5 text-cliro-black text-xs font-semibold uppercase tracking-wider mb-8">
          <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
          The New Standard
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-cliro-black mb-6 max-w-4xl mx-auto leading-tight">
          Democratizing <span className="font-serif italic font-medium">Healthcare</span> Education.
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The AI-native marketplace connecting students with professionals for exceptional rotations, research, and volunteering opportunities. 
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="group">
            Find Opportunities 
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline">
            Offer an Experience
          </Button>
        </div>

        {/* Floating Metrics / Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-2xl">500+</span>
            </div>
            <p className="text-sm text-gray-500">Active Opportunities</p>
          </div>
          <div className="flex flex-col items-center">
             <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-2xl">Verified</span>
            </div>
            <p className="text-sm text-gray-500">Professionals & Institutions</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="w-5 h-5 text-gray-400" />
              <span className="font-bold text-2xl">20%</span>
            </div>
            <p className="text-sm text-gray-500">Reinvested in Social Impact</p>
          </div>
        </div>
      </div>
    </section>
  );
};