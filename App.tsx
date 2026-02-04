
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Simulator from './components/Simulator';
import AptitudeTest from './components/AptitudeTest';
import Translator from './components/Translator';
import ProfileOptimizer from './components/ProfileOptimizer';
import AdBanner from './components/AdBanner';
import { PrivacyPolicy, TermsOfUse } from './components/LegalPages';
import { UserType } from './types';

const App: React.FC = () => {
  const [userType, setUserType] = useState<UserType>(null);
  const [currentView, setCurrentView] = useState<'home' | 'simulator' | 'aptitude' | 'translator' | 'optimizer' | 'privacy' | 'terms'>('home');

  const handleStart = (type: UserType) => {
    setUserType(type);
    setCurrentView('home');
  };

  const renderContent = () => {
    if (currentView === 'privacy') return <PrivacyPolicy />;
    if (currentView === 'terms') return <TermsOfUse />;

    if (!userType) {
      return <LandingPage onStart={handleStart} />;
    }

    switch (currentView) {
      case 'simulator':
        return <Simulator onBack={() => setCurrentView('home')} />;
      case 'aptitude':
        return <AptitudeTest onBack={() => setCurrentView('home')} />;
      case 'translator':
        return <Translator onBack={() => setCurrentView('home')} />;
      case 'optimizer':
        return <ProfileOptimizer onBack={() => setCurrentView('home')} />;
      default:
        return (
          <>
            <Dashboard userType={userType} setView={setCurrentView} onReset={() => setUserType(null)} />
            <div className="max-w-5xl mx-auto px-6 mb-24">
              <div className="p-8 bg-white rounded-[2rem] text-xs text-neutral-400 border border-neutral-100 shadow-sm leading-relaxed">
                <div className="flex gap-4 items-start mb-4">
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-500 rounded font-bold">INFO</span>
                  <p>본 서비스는 직접적인 매칭 플랫폼이 아닙니다. 이성과의 교제 전 깊이 있는 이해를 돕거나 결혼정보 서비스 이용 전 준비를 위한 문화/생활 가이드를 제공합니다.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-500 rounded font-bold">案内</span>
                  <p>本サービスは直接的なマッチングを提供するものではありません。交際前にお相手を深く理解したい方や、結婚相談所などのプラットフォームを利用する前の準備・サポート를 목적으로 합니다.</p>
                </div>
              </div>
              <AdBanner slot="home-dashboard-bottom" />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white/80 backdrop-blur-md py-5 px-8 flex justify-between items-center sticky top-0 z-50 border-b border-neutral-100">
        <div 
          className="text-2xl font-black flex items-center gap-2 cursor-pointer group"
          onClick={() => { setCurrentView('home'); if(!userType) setUserType(null); }}
        >
          <span className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white text-sm group-hover:bg-indigo-600 transition-colors">K</span>
          <span className="gradient-text">K-Kizuna</span>
          <span className="text-neutral-300 font-light text-sm ml-1">絆</span>
        </div>
        <div className="flex gap-8 items-center font-bold text-sm">
          <button onClick={() => setCurrentView('home')} className="text-neutral-900 hover:text-rose-500 transition-colors">Home</button>
          {userType && (
            <button 
              onClick={() => setUserType(null)}
              className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs hover:bg-neutral-800 transition-all"
            >
              Role Switch
            </button>
          )}
        </div>
      </nav>
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-white border-t py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-6 h-6 bg-rose-500 rounded-md"></span>
                K-Kizuna
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                Bridging Korea and Japan with the power of AI. <br/>
                We focus on cultural sincerity, domestic stability, and the pure heart of connection.
              </p>
            </div>
            <div>
              <div className="font-bold text-neutral-900 mb-6 uppercase text-xs tracking-widest">Legal</div>
              <ul className="text-sm text-neutral-400 space-y-4">
                <li><button onClick={() => setCurrentView('privacy')} className="hover:text-rose-500 transition-colors">개인정보처리방침</button></li>
                <li><button onClick={() => setCurrentView('terms')} className="hover:text-rose-500 transition-colors">이용약관</button></li>
              </ul>
            </div>
            <div>
              <div className="font-bold text-neutral-900 mb-6 uppercase text-xs tracking-widest">Support</div>
              <p className="text-sm text-neutral-400 mb-2">support@k-kizuna.com</p>
              <p className="text-sm text-neutral-400">Seoul, South Korea</p>
            </div>
          </div>
          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-300 font-medium tracking-wide">© 2024 K-KIZUNA. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <span className="text-xs text-neutral-200">Instagram</span>
              <span className="text-xs text-neutral-200">Twitter (X)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
