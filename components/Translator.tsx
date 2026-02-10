
import React, { useState } from 'react';
import { translateCulturalNuance } from '../geminiService';
import { UserType } from '../types';

interface TranslatorProps {
  onBack: () => void;
  userType: UserType;
}

const Translator: React.FC<TranslatorProps> = ({ onBack, userType }) => {
  const isWoman = userType === 'woman';
  const [text, setText] = useState('');
  const [role, setRole] = useState<'man' | 'woman'>(isWoman ? 'woman' : 'man');
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
      setResult(res || (isWoman ? "翻訳に失敗しました。" : "번역에 실패했습니다."));
    } catch (e) {
      alert("Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 relative">
       <div className="absolute top-10 right-0 text-5xl sticker-float opacity-10 select-none">💬</div>
       <div className="absolute bottom-10 left-0 text-5xl sticker-float opacity-10 select-none" style={{animationDelay: '3s'}}>🇯🇵</div>

      <button onClick={onBack} className="mb-8 text-neutral-400 hover:text-neutral-900 flex items-center gap-2 font-bold transition-colors">
        &larr; {isWoman ? '戻る' : '뒤로가기'}
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl p-10 border border-neutral-50 relative overflow-hidden">
        <h2 className="text-3xl font-black mb-3">
          {isWoman ? 'カルチャー・ブリッジ 翻訳' : '컬처 브릿지 번역'}
        </h2>
        <p className="text-neutral-500 mb-10 text-sm">
          {isWoman ? '言葉の裏にある「文化的なニュ아ンス」をAIが解説します。' : '상대방의 말에 담긴 일본 특유의 뉘앙스를 해석합니다.'}
        </p>
        
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => { setRole('woman'); setResult(null); setText(''); }}
            className={`flex-grow py-4 rounded-2xl font-black transition-all ${role === 'woman' ? 'bg-rose-500 text-white shadow-xl shadow-rose-100' : 'bg-neutral-100 text-neutral-500'}`}
          >
            {isWoman ? '受け取り側 (日本人女性)' : '일본인 여성 (받는 쪽)'}
          </button>
          <button 
            onClick={() => { setRole('man'); setResult(null); setText(''); }}
            className={`flex-grow py-4 rounded-2xl font-black transition-all ${role === 'man' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'bg-neutral-100 text-neutral-500'}`}
          >
            {isWoman ? '送り側 (韓国人男性)' : '한국인 남성 (보내는 쪽)'}
          </button>
        </div>

        <div className="mb-6">
          <label className="text-[10px] text-neutral-400 block mb-3 font-bold uppercase tracking-widest">
            {isWoman ? '例文を試す' : '주요 예문'}
          </label>
          <div className="flex flex-wrap gap-2">
            {(role === 'woman' ? womanExamples : manExamples).map((ex, i) => (
              <button 
                key={i} 
                onClick={() => { setText(ex); handleTranslate(ex); }}
                className="text-[11px] bg-neutral-50 hover:bg-rose-50 hover:text-rose-600 border border-neutral-100 rounded-full px-4 py-2 text-neutral-600 transition-all font-medium"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={role === 'woman' ? "メッセージを入力してください..." : "메시지를 입력하세요..."}
          className="w-full h-44 p-6 rounded-[2rem] border border-neutral-100 bg-neutral-50 outline-none focus:ring-4 focus:ring-rose-100 mb-6 resize-none text-lg font-medium transition-all"
        />

        <button 
          onClick={() => handleTranslate()}
          disabled={loading}
          className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black hover:bg-indigo-700 disabled:opacity-50 transition-all mb-10 shadow-xl shadow-indigo-100 text-lg flex items-center justify-center gap-3"
        >
          {loading ? (
            <><span className="animate-spin text-2xl">🪄</span> {isWoman ? '分析中...' : '분석 중...'}</>
          ) : (isWoman ? 'ニュアンスを解析する' : '뉘앙스 해석하기')}
        </button>

        {result && (
          <div className="p-8 bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 animate-fade-in relative">
            <h3 className="text-sm font-black text-indigo-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
              {isWoman ? 'AI解説 & 翻訳結果' : 'AI 해석 및 번역 결과'}
            </h3>
            <div className="text-neutral-800 whitespace-pre-wrap text-lg leading-relaxed font-bold">
              {result}
            </div>
            <div className="mt-6 pt-6 border-t border-indigo-100 text-[11px] text-neutral-400 italic">
              AI Note: {isWoman ? '日本の「遠慮」と韓国の「情」のバランスを考慮しています。' : '일본의 배려 문화와 한국의 직설적인 표현 방식을 중재합니다.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;
