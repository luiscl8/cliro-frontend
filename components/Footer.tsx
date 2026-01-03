import React from 'react';
import { Logo } from './Logo';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-cliro-black" />
              <span className="text-xl font-bold">CLIRO</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Empowering the next generation of healthcare professionals through AI-driven connection and social purpose.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cliro-black">For Students</a></li>
              <li><a href="#" className="hover:text-cliro-black">For Professionals</a></li>
              <li><a href="#" className="hover:text-cliro-black">Institutions</a></li>
              <li><a href="#" className="hover:text-cliro-black">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Foundation</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cliro-black">Our Mission</a></li>
              <li><a href="#" className="hover:text-cliro-black">Impact Reports</a></li>
              <li><a href="#" className="hover:text-cliro-black">Grants</a></li>
              <li><a href="#" className="hover:text-cliro-black">Donate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-cliro-black"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-cliro-black"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-cliro-black"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} CLIRO Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};