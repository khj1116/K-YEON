
import React, { useState } from 'react';
import { optimizeProfile } from '../geminiService';
import { UserType } from '../types';

interface ProfileOptimizerProps {
  onBack: () => void;
  userType: UserType;
}

// @google/genai task type: Profile optimization is a text generation task suitable for gemini-3-flash-preview.
const ProfileOptimizer: React.FC<ProfileOptimizerProps> = ({ onBack, userType }) => {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleOptimize = async (customText?: string) => {
    const textToUse = customText || info;
    if (!textToUse.trim()) return;
    setLoading(true);
    try {
      const res = await optimizeProfile(textToUse);
      setResult(res || null);
    } catch (e) {
      alert("Error.");
    } finally {
      setLoading(false);
    }
  };

  const setExample = () => {
    const ex = "34세 직장인입니다. 서울에서 IT 엔지니어로 일하고 있고, 취미는 요리와 산책입니다. 안정적인 가정을 꾸리고 싶고, 아내의 꿈과 가사를 함께 소중히 여기는 다정한 남편이 되고 싶습니다.";
    setInfo(ex);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <button onClick={onBack} className="mb-6 text-neutral-400 hover:text-neutral-900 flex items-center gap-2">
        &larr; 뒤로가기 (Back)
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              ✨ 프로필 최적화
            </h2>
            <button 
              onClick={setExample}
              className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded border border-indigo-100"
            >
              예시 입력 (Example)
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Step 1: 사진 스타일링 가이드</label>
              <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 text-center text-neutral-400 hover:border-indigo-400 cursor-pointer transition-colors bg-neutral-50">
                <span className="text-3xl block mb-2">📸</span>
                본인의 사진을 업로드하세요
                <p className="text-[10px] mt-1 text-neutral-400">AI가 일본 여성이 선호하는 헤어/코디 추천</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Step 2: 자기소개서 정보 입력</label>
              <textarea 
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                placeholder="나이, 직업, 가치관, 취미 등을 자유롭게 입력하세요."
                className="w-full h-40 p-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
              />
            </div>

            <button 
              onClick={() => handleOptimize()}
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-lg shadow-indigo-100 transition-all"
            >
              {loading ? '일본어 최적화 생성 중...' : '프로필 자동 생성'}
            </button>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col h-full shadow-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-black select-none">KIZUNA</div>
          <h3 className="text-xl font-bold mb-6 text-indigo-400 z-10">Preview Dashboard (미리보기)</h3>
          
          {result ? (
            <div className="space-y-6 animate-fade-in flex-grow z-10">
              <div className="p-4 bg-neutral-800 rounded-2xl border border-neutral-700">
                <p className="text-[10px] text-indigo-300 uppercase tracking-widest mb-3 font-bold">Optimized Bio (KR/JP)</p>
                <div className="text-sm leading-relaxed whitespace-pre-wrap text-neutral-200 max-h-[300px] overflow-y-auto">
                  {result}
                </div>
              </div>
              <div className="p-4 bg-indigo-900/40 rounded-2xl border border-indigo-700">
                <p className="text-xs text-indigo-300 font-bold mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  Styling Strategy for JP
                </p>
                <p className="text-xs text-indigo-100 italic leading-relaxed">
                  "일본 여성은 '청결감(清潔感)'을 가장 중요시합니다. 너무 화려한 명품이나 과한 근육 강조보다는, 다정하고 정돈된 이미지를 부각시켰습니다."
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center text-neutral-500 italic text-sm text-center z-10">
              정보를 입력하고 생성 버튼을 누르면 <br /> 일본 여성이 선호하는 스타일의 <br /> 프로필이 완성됩니다.
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-neutral-800 text-[10px] text-neutral-500 z-10">
            K-Kizuna Matching Algorithm v2.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptimizer;
