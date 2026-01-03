import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button';
import { Bot, Send, Paperclip, Mic, Sparkles } from 'lucide-react';
import { Opportunity } from '../../types';

interface Props {
  initialContext?: Opportunity | null;
}

export const DashboardAI: React.FC<Props> = ({ initialContext }) => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: 'Hello Alex! I see you have an upcoming interview with Johns Hopkins. Would you like to practice some common interview questions for Neurosurgery rotations?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle incoming context from Marketplace
  useEffect(() => {
    if (initialContext) {
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now(), 
          role: 'user', 
          text: `I'd like to ask about the ${initialContext.title} at ${initialContext.institution}.` 
        },
        { 
          id: Date.now() + 1, 
          role: 'assistant', 
          text: `Certainly! I have the details for the ${initialContext.title} at ${initialContext.institution}. It's a ${initialContext.duration} ${initialContext.type} located in ${initialContext.location}. What would you like to know? I can help with application requirements, skills fit (${initialContext.skills.join(', ')}), or more.` 
        }
      ]);
    }
  }, [initialContext]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = { id: Date.now(), role: 'user', text: inputValue };
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate AI thinking and response placeholder
    // In a real implementation, this would connect to Gemini API
    setTimeout(() => {
      let responseText = "That's a great question. Based on your profile and the opportunity details, I recommend highlighting your relevant experience.";
      
      // Simple keyword matching for demo purposes
      const lowerInput = inputValue.toLowerCase();
      if (initialContext) {
         if (lowerInput.includes('requirement') || lowerInput.includes('eligib')) {
             responseText = `For the ${initialContext.title}, the main requirements align with your current academic standing. They specifically look for proficiency in ${initialContext.skills.join(' and ')}.`;
         } else if (lowerInput.includes('location') || lowerInput.includes('where')) {
             responseText = `This opportunity is based in ${initialContext.location}. I can help you find housing information nearby if needed.`;
         } else if (lowerInput.includes('apply') || lowerInput.includes('application')) {
             responseText = `You can apply directly through the marketplace. Would you like me to draft a cover letter emphasizing your ${initialContext.skills[0]} experience?`;
         }
      }

      const aiResponse = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        text: responseText
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-in zoom-in-95 duration-300">
      
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cliro-black flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">CLIRO Assistant</h2>
            <div className="flex items-center gap-2">
                <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Online • Pro Mode
                </p>
                {initialContext && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 max-w-[150px] truncate">
                        Context: {initialContext.institution}
                    </span>
                )}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setMessages([])}>
          <Sparkles className="w-4 h-4 mr-2" />
          Clear Context
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-gray-200' : 'bg-cliro-black'
              }`}>
                {msg.role === 'user' ? (
                  <span className="text-xs font-bold text-gray-600">AM</span>
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-cliro-black text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>

            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
            {(initialContext ? 
                ['What are the prerequisites?', `Draft cover letter for ${initialContext.institution}`, 'Housing in ' + initialContext.location.split(',')[0]] : 
                ['Prepare for Interview', 'Draft Cover Letter', 'Analyze CV', 'Find Research']
            ).map(suggestion => (
                <button key={suggestion} onClick={() => setInputValue(suggestion)} className="whitespace-nowrap px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-cliro-black transition-colors">
                    {suggestion}
                </button>
            ))}
        </div>
        <div className="relative flex items-end gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-black/5 focus-within:border-gray-300 transition-all">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200/50">
            <Paperclip className="w-5 h-5" />
          </button>
          <textarea 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder={initialContext ? `Ask about ${initialContext.title}...` : "Ask anything about your medical career..."}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            rows={1}
          />
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200/50">
            <Mic className="w-5 h-5" />
          </button>
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2 bg-cliro-black text-white rounded-lg hover:bg-cliro-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400">CLIRO AI can make mistakes. Verify critical medical information.</span>
        </div>
      </div>
    </div>
  );
};