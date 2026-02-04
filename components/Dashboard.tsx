
import React from 'react';
import { UserType } from '../types';

interface DashboardProps {
  userType: UserType;
  setView: (view: 'home' | 'simulator' | 'aptitude' | 'translator' | 'optimizer') => void;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userType, setView, onReset }) => {
  const isWoman = userType === 'woman';

  const features = isWoman ? [
    { id: 'simulator', title: 'ライフシミュレーター', desc: '韓国での生活費や育児環境をAIが予測します。', icon: '🏠', color: 'bg-emerald-50', textColor: 'text-emerald-600', border: 'border-emerald-100' },
    { id: 'aptitude', title: '価値観・適성分析', desc: 'あなたの理想の家庭像をAIインタビューで整理します。', icon: '📝', color: 'bg-rose-50', textColor: 'text-rose-600', border: 'border-rose-100' },
    { id: 'translator', title: 'カルチャー・ブリッジ', desc: '韓国人男性の言葉の裏にある「情」を翻訳します。', icon: '💬', color: 'bg-indigo-50', textColor: 'text-indigo-600', border: 'border-indigo-100' },
  ] : [
    { id: 'optimizer', title: '프로필 최적화', desc: '일본 여성이 선호하는 스타일로 프로필을 리모델링합니다.', icon: '✨', color: 'bg-indigo-50', textColor: 'text-indigo-600', border: 'border-indigo-100' },
    { id: 'translator', title: '컬처 브릿지', desc: '일본 여성의 조심스러운 거절이나 긍정의 뉘앙스를 해석합니다.', icon: '💬', color: 'bg-rose-50', textColor: 'text-rose-600', border: 'border-rose-100' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-10 text-5xl opacity-10 sticker-float select-none">🎈</div>
      <div className="absolute bottom-10 left-0 text-5xl opacity-10 sticker-float select-none" style={{animationDelay: '3s'}}>🍼</div>

      <div className="mb-14">
        <h2 className="text-4xl font-black mb-4">
          {isWoman ? 'おかえりなさい 🌸' : '반갑습니다, K-Kizuna 회원님 ✨'}
        </h2>
        <p className="text-neutral-500 text-lg">
          {isWoman 
            ? '韓国での新しい人生への準備、AIが心を込めてサポートします。' 
            : '성공적인 한일 커플 매칭을 위한 AI 도구를 활용해 보세요.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(f => (
          <button
            key={f.id}
            onClick={() => setView(f.id as any)}
            className={`${f.color} ${f.border} p-10 rounded-[3rem] text-left hover-lift border-2 shadow-sm flex flex-col gap-6 relative group overflow-hidden`}
          >
            <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.05] group-hover:scale-110 transition-transform">
              {f.icon}
            </div>
            <span className="text-5xl bg-white w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm border border-neutral-50">{f.icon}</span>
            <div>
              <h3 className={`text-2xl font-black mb-3 ${f.textColor}`}>{f.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </button>
        ))}
      </div>
      
      {/* Premium Banner */}
      <div className="mt-20 p-1 bg-gradient-to-r from-rose-200 to-indigo-200 rounded-[3rem] shadow-xl">
        <div className="bg-white rounded-[2.9rem] p-10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl opacity-50"></div>
          <div className="space-y-2 text-center md:text-left z-10">
            <h4 className="font-black text-2xl text-neutral-800">
              {isWoman ? 'プレミアム認証リスト' : '프리미엄 인증 회원'}
            </h4>
            <p className="text-neutral-400 text-sm">
              {isWoman 
                ? '真剣に結婚を考えているメンバーのみが集まるコミュニティです。' 
                : '진정성 있는 국제 결혼을 꿈꾸는 검증된 회원 리스트에 합류하세요.'}
            </p>
          </div>
          <button className="px-10 py-4 bg-neutral-900 text-white rounded-2xl font-black hover:bg-neutral-800 transition-all shadow-xl z-10">
            {isWoman ? '詳細を見る' : '인증 받기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
