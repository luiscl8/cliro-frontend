import React from 'react';
import { Heart, RefreshCw, GraduationCap, TrendingUp } from 'lucide-react';

export const SocialImpact: React.FC = () => {
  return (
    <section id="social-impact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-cliro-black/60 font-serif italic text-lg mb-2 block">The CLIRO Foundation</span>
          <h2 className="text-4xl font-bold mb-6">Invest in Education = Social Impact</h2>
          <p className="text-gray-600 text-lg">
            We are more than a marketplace. We are a social engine. Every connection made on CLIRO helps power user-led healthcare initiatives in underserved communities.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Step 1 */}
            <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-cliro-black text-white rounded-full flex items-center justify-center mb-6 text-2xl font-bold relative z-10">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Marketplace Activity</h3>
              <p className="text-gray-500 text-sm">
                Students book experiences listed by professionals. A percentage of every transaction is allocated automatically.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-cliro-black text-white rounded-full flex items-center justify-center mb-6 text-2xl font-bold relative z-10">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">The Foundation</h3>
              <p className="text-gray-500 text-sm">
                Acts as an infrastructure provider. We pool resources from the marketplace and public donations to co-create projects with users.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-cliro-black text-white rounded-full flex items-center justify-center mb-6 text-2xl font-bold relative z-10">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Impact</h3>
              <p className="text-gray-500 text-sm">
                Resources fuel user-led volunteering and research, creating a virtuous cycle where education directly improves global health.
              </p>
            </div>

          </div>
        </div>

        <div className="mt-20 bg-cliro-black text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Join the movement</h3>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                    Whether you're learning or teaching, you are contributing to a greater cause.
                </p>
                <button className="bg-white text-cliro-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                    Read the Impact Report
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};