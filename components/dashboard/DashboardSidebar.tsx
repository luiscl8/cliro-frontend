import React from 'react';
import { Logo } from '../Logo';
import { LayoutDashboard, FileText, Sparkles, LogOut, Bookmark, Heart, Search } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Marketplace', icon: Search },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 h-full flex flex-col">
      <div className="p-6 border-b border-gray-50 flex items-center gap-3">
        <Logo className="h-8 w-8 text-cliro-black" />
        <span className="font-bold text-xl tracking-tight">CLIRO</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3 mt-4">
          Student Dashboard
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-cliro-black text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-cliro-black'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center gap-3 px-3 py-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Alex Miller</p>
            <p className="text-xs text-gray-500 truncate">alex.m@med.edu</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};
