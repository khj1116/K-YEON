
import React, { useState } from 'react';
import { getLifeSimulation } from '../geminiService';
import { SimulationResult } from '../types';

interface SimulatorProps {
  onBack: () => void;
}

const Simulator: React.FC<SimulatorProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({ location: 'Seoul', budget: '3000000', children: 0 });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await getLifeSimulation(formData.location, formData.budget, formData.children);
      setResult(res);
    } catch (e) {
      alert("シミュレーションに失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  const setExample = () => {
    setFormData({ location: 'Gyeonggi', budget: '4500000', children: 2 });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button onClick={onBack} className="mb-6 text-neutral-400 hover:text-neutral-900 flex items-center gap-2">
        &larr; 戻る (Back)
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🏠 韓国生活適応シミュレーター
          </h2>
          <button 
            onClick={setExample}
            className="text-xs bg-neutral-100 hover:bg-neutral-200 px-3 py-1 rounded-full text-neutral-600 transition-colors"
          >
            例を入力 (Try Example)
          </button>
        </div>
        
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">希望居住地域 (居住地域)</label>
            <select 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-rose-500 outline-none"
            >
              <option value="Seoul">ソウル (Seoul)</option>
              <option value="Gyeonggi">京畿道 (Gyeonggi-do)</option>
              <option value="Busan">釜山 (Busan)</option>
              <option value="Incheon">仁川 (Incheon)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">月間の家計予算 (KRW)</label>
            <input 
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              className="w-full p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-rose-500 outline-none"
            />
            <p className="text-[10px] text-neutral-400 mt-1">※ 3,000,000 KRW ≒ 約33万円</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-neutral-700">希望する子供の数 (Children)</label>
            <input 
              type="number"
              value={formData.children}
              onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})}
              className="w-full p-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>

        <button 
          onClick={handleSimulate}
          disabled={loading}
          className="w-full py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 disabled:opacity-50 transition-all shadow-lg shadow-rose-100"
        >
          {loading ? 'AI分析中...' : 'シミュレーション結果を見る'}
        </button>
      </div>

      {result && (
        <div className="mt-8 space-y-6 animate-fade-in pb-12">
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-lg">
            <h3 className="font-bold text-rose-600 mb-2 flex items-center gap-2">💰 家計管理のシミュレーション</h3>
            <p className="text-neutral-700 whitespace-pre-wrap text-sm leading-relaxed">{result.livingCost}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-lg">
            <h3 className="font-bold text-blue-600 mb-2 flex items-center gap-2">🎓 教育・子育て環境</h3>
            <p className="text-neutral-700 whitespace-pre-wrap text-sm leading-relaxed">{result.educationInfo}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-lg">
            <h3 className="font-bold text-emerald-600 mb-2 flex items-center gap-2">📖 言語学習ルート</h3>
            <p className="text-neutral-700 whitespace-pre-wrap text-sm leading-relaxed">{result.languageRoute}</p>
          </div>
          <div className="p-6 bg-rose-50 rounded-3xl italic text-rose-800 border border-rose-100 text-center">
            "{result.customAdvice}"
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulator;
