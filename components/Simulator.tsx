
import React, { useState } from 'react';
import { getLifeSimulation } from '../geminiService';
import { SimulationResult, UserType } from '../types';

interface SimulatorProps {
  onBack: () => void;
  userType: UserType;
}

const Simulator: React.FC<SimulatorProps> = ({ onBack, userType }) => {
  const isWoman = userType === 'woman';
  const [formData, setFormData] = useState({ location: 'Seoul', budget: '3000000', children: 0 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await getLifeSimulation(formData.location, formData.budget, formData.children);
      setResult(res);
    } catch (e) {
      alert(isWoman ? "シミュレーションに失敗しました。" : "시뮬레이션에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleChildrenChange = (val: string) => {
    // 0보다 작은 값은 입력할 수 없도록 철저히 방지
    const num = Math.max(0, parseInt(val) || 0);
    setFormData({...formData, children: num});
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 relative">
      <div className="absolute top-10 right-0 text-5xl sticker-float opacity-10 select-none">🎎</div>
      <div className="absolute bottom-20 left-0 text-5xl sticker-float opacity-10 select-none" style={{animationDelay: '4s'}}>🍱</div>

      <button onClick={onBack} className="mb-8 text-neutral-400 hover:text-neutral-900 flex items-center gap-2 font-bold transition-colors">
        &larr; {isWoman ? '戻る' : '뒤로가기'}
      </button>

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-neutral-50 relative overflow-hidden">
        <div className="mb-10">
          <h2 className="text-3xl font-black flex items-center gap-3">
            🏠 {isWoman ? 'ライフシミュレーター' : '라이프 시뮬레이터'}
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            {isWoman ? '韓国での理想的な生活費と環境を分析します。' : '한국에서의 구체적인 가계 경제와 생활 환경을 예측합니다.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold mb-3 text-neutral-700">
              {isWoman ? '希望居住地域' : '희망 거주 지역'}
            </label>
            <select 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:ring-4 focus:ring-rose-100 outline-none transition-all font-medium"
            >
              <option value="Seoul">ソウル (Seoul)</option>
              <option value="Gyeonggi">京畿道 (Gyeonggi)</option>
              <option value="Busan">釜山 (Busan)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-3 text-neutral-700">
              {isWoman ? '希望する子供の数' : '희망 자녀 수'}
            </label>
            <input 
              type="number"
              min="0"
              value={formData.children}
              onChange={(e) => handleChildrenChange(e.target.value)}
              className="w-full p-4 rounded-2xl border border-neutral-100 bg-neutral-50 focus:ring-4 focus:ring-rose-100 outline-none transition-all font-medium"
            />
          </div>
        </div>

        <div className="mb-10">
          <label className="block text-sm font-bold mb-3 text-neutral-700">
            {isWoman ? '月間の想定予算 (KRW)' : '월평균 희망 가계 예산 (원)'}
          </label>
          <div className="relative">
            <input 
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full p-4 pl-12 rounded-2xl border border-neutral-100 bg-neutral-50 focus:ring-4 focus:ring-rose-100 outline-none transition-all font-bold"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">₩</span>
          </div>
        </div>

        <button 
          onClick={handleSimulate}
          disabled={loading}
          className="w-full py-5 bg-rose-500 text-white font-black rounded-3xl hover:bg-rose-600 disabled:opacity-50 transition-all shadow-xl shadow-rose-100 text-lg flex items-center justify-center gap-3"
        >
          {loading ? (
            <><span className="animate-spin text-2xl">🪄</span> {isWoman ? '分析中...' : '분석 중...'}</>
          ) : (isWoman ? 'シミュレーションを開始' : '시뮬레이션 시작')}
        </button>
      </div>

      {result && (
        <div className="mt-12 space-y-8 animate-fade-in pb-20">
          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-xl group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl sticker-float">💰</div>
            <h3 className="font-black text-emerald-600 mb-4 flex items-center gap-2 text-xl">
              {isWoman ? '家計管理の予測' : '가계 경제 예측'}
            </h3>
            <p className="text-neutral-700 whitespace-pre-wrap text-sm leading-relaxed font-medium">{result.livingCost}</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-indigo-100 shadow-xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl sticker-float">🎓</div>
            <h3 className="font-black text-indigo-600 mb-4 flex items-center gap-2 text-xl">
              {isWoman ? '教育・生活環境' : '교육 및 생활 환경'}
            </h3>
            <p className="text-neutral-700 whitespace-pre-wrap text-sm leading-relaxed font-medium">{result.educationInfo}</p>
          </div>
          <div className="p-10 bg-rose-50/50 backdrop-blur-sm rounded-[3rem] text-center border border-rose-100 shadow-inner">
            <p className="text-rose-700 font-bold italic text-lg leading-relaxed">"{result.customAdvice}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulator;
