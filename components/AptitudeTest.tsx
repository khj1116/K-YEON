
import React, { useState } from 'react';
import { getAptitudeReport } from '../geminiService';
import { AptitudeReport, ChatMessage, UserType } from '../types';

interface AptitudeTestProps {
  onBack: () => void;
  userType: UserType;
}

const AptitudeTest: React.FC<AptitudeTestProps> = ({ onBack, userType }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "こんにちは。あなたの家庭観や、韓国での理想の生活について教えてください。まずは、あなたが大切にしている「家族の形」とはどのようなものですか？" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AptitudeReport | null>(null);

  const examples = [
    "お互いを尊重し、毎日一緒に夕食を囲めるような温かい家庭が理想です。",
    "家事は分担しつつも、料理は私が担当して旦那さん를支えたいです。",
    "韓国の文化を学びながら、義両親とも良好な関係を築いていきたいと思っています。"
  ];

  const sendMessage = async (customText?: string) => {
    const textToUse = customText || input;
    if (!textToUse.trim() || loading) return;
    
    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: textToUse }];
    setMessages(newMessages);
    setInput('');
    
    if (newMessages.length >= 6) {
      setLoading(true);
      const conversationStr = newMessages.map(m => `${m.role}: ${m.text}`).join('\n');
      try {
        const rep = await getAptitudeReport(conversationStr);
        setReport(rep);
      } catch (e) {
        alert("レポートの生成中にエラーが発生しました。");
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        const nextQuestions = [
          "素敵な考えですね。家事の分担については、どのようにお考えですか？",
          "旦那さんのご両親（義実家）との付き合い方について、理想はありますか？",
          "最後に、韓国で生活することへの一番の期待や、どんなサポートが欲しいかを教えてください。"
        ];
        const nextQ = nextQuestions[Math.floor((newMessages.length - 2) / 2)] || "もう少し詳しく教えていただけますか？";
        setMessages([...newMessages, { role: 'model', text: nextQ }]);
      }, 800);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 relative">
      <div className="absolute top-20 -left-10 text-4xl sticker-float opacity-10 select-none">✍️</div>
      <div className="absolute bottom-20 -right-10 text-4xl sticker-float opacity-10 select-none" style={{animationDelay: '2s'}}>💍</div>

      <button onClick={onBack} className="mb-8 text-neutral-400 hover:text-neutral-900 flex items-center gap-2 font-bold transition-colors">
        &larr; 戻る (Back)
      </button>

      {!report ? (
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col h-[700px] border border-neutral-50 ring-1 ring-neutral-100 relative">
          <div className="p-6 bg-white border-b flex justify-between items-center z-10">
            <div>
              <h2 className="font-black text-emerald-600 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                AI価値観インタビュー
              </h2>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-bold border border-emerald-100">{Math.floor((messages.length / 6) * 100)}% 完了</span>
          </div>
          <div className="flex-grow p-8 overflow-y-auto space-y-6 bg-neutral-50/30 z-0">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl ${m.role === 'user' ? 'bg-emerald-500 text-white rounded-tr-none shadow-lg' : 'bg-white shadow-sm border border-neutral-100 rounded-tl-none text-neutral-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center p-4">
                <span className="animate-pulse text-emerald-500 font-bold">分析レポートを作成しています... ✨</span>
              </div>
            )}
          </div>
          
          <div className="p-6 bg-white border-t space-y-4 z-10">
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, idx) => (
                <button 
                  key={idx} 
                  onClick={() => sendMessage(ex)}
                  className="text-[10px] bg-neutral-50 hover:bg-emerald-50 hover:text-emerald-600 px-3 py-1.5 rounded-full border border-neutral-100 transition-all font-medium"
                >
                  {ex.substring(0, 15)}...
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="メッセージを入力してください..."
                className="flex-grow p-4 rounded-2xl border border-neutral-100 bg-neutral-50 outline-none focus:ring-4 focus:ring-emerald-50 transition-all"
              />
              <button onClick={() => sendMessage()} className="p-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 px-8 font-black shadow-lg shadow-emerald-100">
                送信
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-emerald-50 relative animate-scale-in">
          <div className="absolute top-6 right-10 text-6xl font-black text-emerald-50/50 select-none">REPORT</div>
          <h2 className="text-3xl font-black mb-1 text-neutral-900">家庭的適性レポート</h2>
          <p className="text-xs text-neutral-400 mb-8 tracking-widest uppercase font-bold">Family Aptitude Report</p>
          
          <div className="flex items-center gap-8 mb-10 p-8 bg-emerald-50/50 rounded-[2.5rem] border border-emerald-100">
            <div className="text-center px-4 border-r border-emerald-100">
              <div className="text-5xl font-black text-emerald-600">{report.score}</div>
              <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-black mt-1">Stability</div>
            </div>
            <div className="flex-grow flex flex-wrap gap-3">
              {report.traits.map((t, i) => (
                <span key={i} className="px-4 py-2 bg-white text-emerald-600 rounded-2xl text-xs font-black border border-emerald-200 shadow-sm">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative">
              <h3 className="font-black text-neutral-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-400 rounded-full"></span>
                AI 総合分析
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm whitespace-pre-wrap font-medium">{report.summary}</p>
            </div>
            <div className="p-8 bg-neutral-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">💡</div>
              <h3 className="font-black text-emerald-400 mb-3 text-sm">未来の旦那様へのアドバイス (韓国語)</h3>
              <p className="text-neutral-300 text-sm italic leading-relaxed whitespace-pre-wrap">"{report.adviceForMen}"</p>
              <p className="text-[10px] text-neutral-500 mt-6 border-t border-neutral-800 pt-4 font-bold uppercase tracking-widest">For Future Husband</p>
            </div>
          </div>

          <button 
            onClick={() => setReport(null)}
            className="mt-10 w-full py-5 border-2 border-emerald-500 text-emerald-600 font-black rounded-3xl hover:bg-emerald-50 transition-all text-lg"
          >
            診断をやり直す
          </button>
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
