
import React from 'react';
import { UserType } from '../types';

interface DashboardProps {
  userType: UserType;
  setView: (view: 'home' | 'simulator' | 'aptitude' | 'translator' | 'optimizer') => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userType, setView, onReset }) => {
  const features = userType === 'woman' ? [
    { id: 'simulator', title: 'Life Simulator', desc: 'Is Korea expensive? Check your future household budget.', icon: '🏠', color: 'bg-emerald-50', textColor: 'text-emerald-600', border: 'border-emerald-100' },
    { id: 'aptitude', title: 'Values Analysis', desc: '10-minute interview to build your family-oriented profile.', icon: '📝', color: 'bg-rose-50', textColor: 'text-rose-600', border: 'border-rose-100' },
    { id: 'translator', title: 'Culture Bridge', desc: 'Understand the hidden nuances in his messages.', icon: '💬', color: 'bg-indigo-50', textColor: 'text-indigo-600', border: 'border-indigo-100' },
  ] : [
    { id: 'optimizer', title: 'Profile Optimizer', desc: 'Styling and bio creation optimized for Japanese tastes.', icon: '✨', color: 'bg-indigo-50', textColor: 'text-indigo-600', border: 'border-indigo-100' },
    { id: 'translator', title: 'Culture Bridge', desc: 'Understand the "Meiwaku" culture behind her words.', icon: '💬', color: 'bg-rose-50', textColor: 'text-rose-600', border: 'border-rose-100' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black mb-3">
            {userType === 'woman' ? 'ようこそ、K-Kizunaへ' : '반갑습니다, K-Kizuna 회원님'}
          </h2>
          <p className="text-neutral-500 text-lg">
            {userType === 'woman' 
              ? '韓国での新しい人生への第一歩を、AIがサポートします。' 
              : '일본 여성과의 진실된 만남을 위한 AI 도구를 시작해보세요.'}
          </p>
        </div>
        <button 
          onClick={onReset}
          className="px-4 py-2 text-sm font-bold text-neutral-400 hover:text-rose-500 transition-colors"
        >
          {userType === 'woman' ? '役割変更' : '역할 변경'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(f => (
          <button
            key={f.id}
            onClick={() => setView(f.id as any)}
            className={`${f.color} ${f.border} p-10 rounded-[2.5rem] text-left hover-lift border-2 shadow-sm flex flex-col gap-6 relative group overflow-hidden`}
          >
            <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.03] group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <span className="text-5xl bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm">{f.icon}</span>
            <div>
              <h3 className={`text-2xl font-black mb-3 ${f.textColor}`}>{f.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-16 p-1 bg-gradient-to-r from-rose-400 via-emerald-400 to-indigo-500 rounded-[2.5rem]">
        <div className="bg-neutral-900 rounded-[2.4rem] p-10 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="font-black text-2xl tracking-tight">K-Kizuna Verified Membership</h4>
              <p className="text-neutral-400">Join our premium list of sincere members seeking international marriage.</p>
            </div>
            <button className="px-10 py-4 bg-white text-neutral-900 rounded-2xl font-black hover:bg-neutral-100 transition-all shadow-xl shadow-white/10 shrink-0">
              Get Verified
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
