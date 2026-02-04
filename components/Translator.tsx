
import React, { useState } from 'react';
import { translateCulturalNuance } from '../geminiService';

interface TranslatorProps {
  onBack: () => void;
}

const Translator: React.FC<TranslatorProps> = ({ onBack }) => {
  const [text, setText] = useState('');
  const [role, setRole] = useState<'man' | 'woman'>('woman');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const womanExamples = [
    "오늘 회식이 늦어질 것 같아. 미안해!",
    "우리 주말에 뭐 할까? 맛집 찾아놨어!",
    "부모님이 너를 빨리 보고 싶어 하셔."
  ];

  const manExamples = [
    "連絡が遅れてすみません。少し忙しかったです。",
    "週末は家でゆっくり休みたいのですが、いかがでしょうか。",
    "お母様にはまた別の機会にお会いできれば嬉しいです。"
  ];

  const handleTranslate = async (customText?: string) => {
    const textToUse = customText || text;
    if (!textToUse.trim()) return;
    setLoading(true);
    try {
      const res = await translateCulturalNuance(textToUse, role);
      setResult(res || "翻訳に失敗しました。");
    } catch (e) {
      alert("Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button onClick={onBack} className="mb-6 text-neutral-400 hover:text-neutral-900 flex items-center gap-2">
        &larr; 戻る (Back)
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-neutral-100">
        <h2 className="text-2xl font-bold mb-2">AI "Culture Bridge" 翻訳</h2>
        <p className="text-neutral-500 mb-8 text-sm">言葉の裏にある「文化的なニュアンス」を読み解きます。</p>
        
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => { setRole('woman'); setResult(null); setText(''); }}
            className={`flex-grow py-3 rounded-xl font-bold transition-all ${role === 'woman' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-neutral-100 text-neutral-500'}`}
          >
            受け取る側 (日本人女性)
          </button>
          <button 
            onClick={() => { setRole('man'); setResult(null); setText(''); }}
            className={`flex-grow py-3 rounded-xl font-bold transition-all ${role === 'man' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-neutral-100 text-neutral-500'}`}
          >
            보내는 쪽 (한국인 남성)
          </button>
        </div>

        <div className="mb-4">
          <label className="text-[10px] text-neutral-400 block mb-2">よくある例文 (Click to try):</label>
          <div className="flex flex-wrap gap-2">
            {(role === 'woman' ? womanExamples : manExamples).map((ex, i) => (
              <button 
                key={i} 
                onClick={() => { setText(ex); handleTranslate(ex); }}
                className="text-[10px] bg-neutral-50 hover:bg-blue-50 border rounded px-2 py-1 text-neutral-600 transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={role === 'woman' ? "受け取った韓国語を入力してください..." : "한국어로 보낼 메시지를 입력하세요..."}
          className="w-full h-40 p-4 rounded-2xl border border-neutral-200 outline-none focus:ring-2 focus:ring-indigo-500 mb-4 resize-none text-lg"
        />

        <button 
          onClick={() => handleTranslate()}
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all mb-8 shadow-lg shadow-indigo-100"
        >
          {loading ? '文化のニュアンスを分析中...' : 'ニュアンスを翻訳する'}
        </button>

        {result && (
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-fade-in">
            <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              {role === 'woman' ? 'AI解説 & 翻訳' : 'AI 해석 및 번역'}
            </h3>
            <div className="text-neutral-700 whitespace-pre-wrap text-lg leading-relaxed font-medium">
              {result}
            </div>
            <div className="mt-4 p-4 bg-white rounded-xl text-[10px] text-neutral-400 italic">
              AI Note: 日本の「遠慮/和」の文化と、韓国の「情/ストレートさ」のバランスを考慮しています。
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
