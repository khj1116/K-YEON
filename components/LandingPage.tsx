
import React from 'react';
import { UserType } from '../types';

interface LandingPageProps {
  onStart: (type: UserType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="space-y-10">
          <div className="inline-block px-4 py-1.5 bg-rose-50 text-rose-600 rounded-full text-sm font-bold tracking-wide">
            KOREA & JAPAN HEART BRIDGE
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-neutral-900 leading-[1.1]">
            Find Your <span className="text-rose-500">True</span> <br />
            Family in <span className="text-indigo-600">Korea</span>.
          </h1>
          <p className="text-xl text-neutral-500 leading-relaxed max-w-lg">
            단순한 매칭을 넘어, 문화적 이해와 진심을 연결합니다. <br/>
            일본 여성의 섬세함과 한국 남성의 진정성이 만나는 곳.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => onStart('woman')}
              className="px-10 py-5 bg-rose-500 text-white rounded-2xl font-bold text-lg hover:bg-rose-600 shadow-xl shadow-rose-200 transition-all hover:-translate-y-1"
            >
              私は日本人女性です
            </button>
            <button 
              onClick={() => onStart('man')}
              className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all hover:-translate-y-1"
            >
              나는 한국인 남성입니다
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-rose-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-700"></div>
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1516589174184-c684ee396e5e?auto=format&fit=crop&q=80&w=1200" 
              alt="Romantic Connection" 
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-white border border-neutral-100 rounded-[2rem] p-10 mb-24 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16"></div>
        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-x-0 md:divide-x divide-neutral-100">
            <div className="pr-0 md:pr-8">
              <h4 className="font-bold text-neutral-900 mb-2 text-lg">서비스 이용 안내 (Notice)</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                이 서비스는 직접적인 이성 매칭을 해주는 서비스가 아니며, 교제 전 상대방에 대해 깊이 이해하고자 하는 분이나 결혼정보회사 같은 매칭 플랫폼 이용 전 도움을 제공하고자 운영하고 있습니다.
              </p>
            </div>
            <div className="pl-0 md:pl-8">
              <h4 className="font-bold text-neutral-900 mb-2 text-lg">サービスのご案内</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                本サービスは、直接的な出会いやマッチングを提供するものではありません。交際前にお相手をより深く理解したい方や、結婚相談所などのプラットフォームを利用する前の準備・サポートを目的としています。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
        {[
          { 
            title: "Value Analysis", 
            desc: "AI-powered interview to verify family values and domestic harmony.",
            img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400",
            color: "text-rose-500"
          },
          { 
            title: "Life Simulation", 
            desc: "Detailed simulation of your future life in Korea from budget to education.",
            img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=400",
            color: "text-emerald-500"
          },
          { 
            title: "Cultural Bridge", 
            desc: "AI that translates the subtle nuances between Korean and Japanese cultures.",
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400",
            color: "text-indigo-600"
          }
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden border border-neutral-100 hover-lift group">
            <img src={f.img} alt={f.title} className="w-full h-48 object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
            <div className="p-8">
              <h3 className={`text-xl font-black mb-3 ${f.color}`}>{f.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
