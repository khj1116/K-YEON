
import React, { useState } from 'react';
import { UserType } from '../types';

interface LandingPageProps {
  onStart: (type: UserType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  // 브라우저 호환성을 위해 복잡한 URL 객체 대신 단순 경로를 사용합니다.
  // Vite 환경에서는 루트의 이미지를 'main_hero.png' 또는 '/main_hero.png'로 참조합니다.
  const heroImageUrl = "main_hero.png";
  
  // 이미지 로드 실패 상태 관리
  const [imgError, setImgError] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 relative">
      {/* Decorative Floating Elements */}
      <div className="absolute top-20 right-10 text-4xl sticker-float opacity-30 select-none">🌸</div>
      <div className="absolute bottom-40 left-10 text-4xl sticker-float opacity-30 select-none" style={{animationDelay: '2s'}}>🎨</div>
      <div className="absolute top-1/2 left-1/4 text-2xl sticker-float opacity-20 select-none" style={{animationDelay: '4s'}}>☁️</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-xs font-bold tracking-widest uppercase">
            <span className="animate-pulse">✨</span> Sincere Connection Bridge
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-black text-neutral-900 leading-tight">
              Find Your <span className="text-rose-500">True</span> <br />
              Family in <span className="text-indigo-600">Korea</span>.
            </h1>
            <h2 className="text-2xl lg:text-3xl font-bold text-neutral-400">
              韓国で、本当の家族を見つける.
            </h2>
          </div>

          <p className="text-lg text-neutral-500 leading-relaxed max-w-lg">
            한국 남성의 진정성과 일본 여성의 섬세함이 만나는 곳.<br/>
            <span className="text-neutral-400 text-sm italic">韓国人男性の誠実さと日本人女性の繊細사が出회우는 곳.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => onStart('woman')}
              className="px-10 py-5 bg-rose-500 text-white rounded-[2rem] font-bold text-lg hover:bg-rose-600 shadow-xl shadow-rose-200 transition-all hover:-translate-y-1 flex flex-col items-center leading-tight"
            >
              <span>私は日本人女性です</span>
              <span className="text-xs opacity-80 mt-1">나는 일본인 여성입니다 🇯🇵</span>
            </button>
            <button 
              onClick={() => onStart('man')}
              className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1 flex flex-col items-center leading-tight"
            >
              <span>나는 한국인 남성입니다</span>
              <span className="text-xs opacity-80 mt-1">저는 한국인 남성입니다 🇰🇷</span>
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-rose-100 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl border-[12px] border-white ring-1 ring-neutral-100 bg-neutral-50 min-h-[450px] flex items-center justify-center">
            {/* 
               이미지 경로 이슈 해결 전략:
               1. 복잡한 'new URL' 대신 단순 경로 문자열 사용
               2. 로컬 이미지 로드 실패 시 고품질 대체 이미지(Unsplash)로 자동 전환하여 UI 완성도 유지
            */}
            <img 
              src={imgError ? "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop" : heroImageUrl} 
              alt="K-Kizuna Connection" 
              className="w-full h-full aspect-square object-cover hover:scale-105 transition-transform duration-700 block"
              onError={() => {
                console.warn("main_hero.png 로드 실패. 대체 이미지를 사용합니다.");
                setImgError(true);
              }}
            />
            {imgError && (
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full opacity-60">
                  main_hero.png 파일을 찾을 수 없어 기본 이미지가 표시됩니다.
                </span>
              </div>
            )}
          </div>
          {/* Decorative stickers */}
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center text-3xl z-20 border border-neutral-50 sticker-float">
            🏠
          </div>
          <div className="absolute top-10 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl z-20 border border-neutral-50 sticker-float" style={{animationDelay: '1.5s'}}>🕊️</div>
        </div>
      </div>

      {/* Intro Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: "💍", title: "Sincerity / 誠実さ", desc: "AI가 분석하는 진심 어린 가치관", color: "bg-rose-50" },
          { icon: "🍱", title: "Future / 未来", desc: "한국 생활을 미리 그리는 시뮬레이션", color: "bg-emerald-50" },
          { icon: "💌", title: "Harmony / 調和", desc: "문화와 언어의 장벽을 넘는 대화", color: "bg-indigo-50" }
        ].map((f, i) => (
          <div key={i} className={`${f.color} rounded-[2.5rem] p-8 border border-white hover-lift text-center`}>
            <div className="text-4xl mb-4 sticker-float inline-block" style={{animationDelay: `${i*1}s`}}>{f.icon}</div>
            <h3 className="font-bold text-neutral-800 mb-2">{f.title}</h3>
            <p className="text-xs text-neutral-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
