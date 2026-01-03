import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/sections/Hero';
import { Democratization } from './components/sections/Democratization';
import { AINative } from './components/sections/AINative';
import { SocialImpact } from './components/sections/SocialImpact';
import { Footer } from './components/Footer';
import { AuthModal } from './components/auth/AuthModal';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole) => {
    // Simulate API call and login
    const mockUser: User = {
      id: '1',
      name: 'Alex Miller',
      email: 'alex.miller@med.edu',
      role: role
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogout = () => {
    setUser(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (user) {
    return <StudentDashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onLoginClick={() => setIsAuthModalOpen(true)} />
      
      <main>
        {/* Click hijacking for demonstration purposes to trigger auth on CTA clicks */}
        <div onClick={(e) => {
           const target = e.target as HTMLElement;
           // If clicking a button that looks like a CTA
           if (target.tagName === 'BUTTON' && 
               ['Get Started', 'Join', 'Offer', 'Find'].some(kw => target.innerText.includes(kw)) &&
               !target.closest('header')) {
             setIsAuthModalOpen(true);
           }
        }}>
          <Hero />
          <Democratization />
          <AINative />
          <SocialImpact />
        </div>
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
};

export default App;
