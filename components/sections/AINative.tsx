import React, { useState } from 'react';
import { UserRole } from '../../types';
import { Bot, Sparkles, MessageSquare, LineChart, FileText, UserCheck, Calendar } from 'lucide-react';

export const AINative: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.STUDENT);

  return (
    <section id="ai-native" className="py-24 bg-cliro-black text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cliro-dark rounded-full blur-3xl opacity-30 -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">AI Built into the Core.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A personalized, proactive, context-aware assistant that guides you from discovery to completion.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 p-1 rounded-full flex">
            <button
              onClick={() => setActiveRole(UserRole.STUDENT)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeRole === UserRole.STUDENT ? 'bg-white text-cliro-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              For Students
            </button>
            <button
              onClick={() => setActiveRole(UserRole.PROFESSIONAL)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeRole === UserRole.PROFESSIONAL ? 'bg-white text-cliro-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              For Professionals
            </button>
          </div>
        </div>

        {/* Interactive UI Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Feature List */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            {activeRole === UserRole.STUDENT ? (
              <>
                <FeatureItem 
                  icon={Sparkles} 
                  title="Intelligent Matching" 
                  desc="AI analyzes your profile and career goals to recommend the perfect opportunities."
                />
                <FeatureItem 
                  icon={FileText} 
                  title="Application Assistant" 
                  desc="Auto-generated cover letter drafts and interview preparation specific to the desired experience."
                />
                <FeatureItem 
                  icon={Bot} 
                  title="Learning Companion" 
                  desc="During your journey, the AI acts as an expert-level tutor, answering your questions and tracking progress."
                />
              </>
            ) : (
              <>
                <FeatureItem 
                  icon={UserCheck} 
                  title="Automated Screening" 
                  desc="Instantly analyze hundreds of applications. The AI surfaces the most suitable candidates."
                />
                <FeatureItem 
                  icon={Calendar} 
                  title="Smart Management" 
                  desc="Automated scheduling, status tracking, and rejection/acceptance handling."
                />
                <FeatureItem 
                  icon={LineChart} 
                  title="Impact Analytics" 
                  desc="Deep insights into your program's performance, acceptance rates, and student satisfaction."
                />
              </>
            )}
          </div>

          {/* Right Side: Visual Mockup */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-cliro-dark border border-white/10 rounded-2xl p-6 shadow-2xl h-[500px] flex flex-col">
              
              {/* Fake Browser Header */}
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-xs text-gray-500">CLIRO Assistant</div>
              </div>

              {/* Chat Interface */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                {activeRole === UserRole.STUDENT ? (
                  <>
                    <ChatMessage side="left" text="Welcome back, Alex. Based on your recent interest in Cardiology, I found a new rotation at Mt. Sinai that matches your profile perfectly." />
                    <ChatMessage side="right" text="That sounds great. Can you check if I meet the prerequisites?" />
                    <ChatMessage side="left" text="Checking... Yes, you meet 4/4 requirements. Your GPA and previous internal medicine rotation align well. Would you like me to draft an application letter?" />
                    <ChatMessage side="right" text="Yes, please highlight my research paper." />
                    <ChatMessage side="left" isTyping />
                  </>
                ) : (
                  <>
                    <ChatMessage side="left" text="Dr. Smith, you have 12 new applications for the Summer Research Program." />
                    <ChatMessage side="right" text="Summarize the top candidates for me." />
                    <ChatMessage side="left" text="I've screened all 12. Here are the top candidates. Would you like to schedule interviews with them?" />
                    <div className="bg-white/5 p-3 rounded-lg ml-10 mb-2 border border-white/10">
                      <div className="font-semibold text-sm">1. Sarah Chen</div>
                      <div className="text-xs text-gray-400">98% Match • Strong Research Background</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg ml-10 mb-2 border border-white/10">
                      <div className="font-semibold text-sm">2. James Wilson</div>
                      <div className="text-xs text-gray-400">92% Match • Exceptional Clinical Reviews</div>
                    </div>
                  </>
                )}
              </div>

              {/* Input Area */}
              <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                <div className="flex-1 bg-cliro-black rounded-lg h-10 px-3 flex items-center text-sm text-gray-500">
                  Ask CLIRO anything...
                </div>
                <button className="bg-white text-cliro-black p-2 rounded-lg hover:bg-gray-200 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>

            </div>
            
            

          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ChatMessage = ({ side, text, isTyping }: { side: 'left' | 'right', text?: string, isTyping?: boolean }) => (
  <div className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
      side === 'right' 
        ? 'bg-white text-cliro-black rounded-br-none' 
        : 'bg-white/10 text-white rounded-bl-none'
    }`}>
      {isTyping ? (
        <div className="flex gap-1 h-5 items-center">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
        </div>
      ) : text}
    </div>
  </div>
);