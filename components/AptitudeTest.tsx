
import React, { useState } from 'react';
import { getAptitudeReport } from '../geminiService';
import { AptitudeReport, ChatMessage } from '../types';

interface AptitudeTestProps {
  onBack: () => void;
}

const AptitudeTest: React.FC<AptitudeTestProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "こんにちは。あなたの家庭観や、韓国での理想の生活について教えてください。まずは、あなたが大切にしている「家族の形」とはどのようなものですか？" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AptitudeReport | null>(null);

  const examples = [
    "お互いを尊重し、毎日一緒に夕食を囲めるような温かい家庭が理想です。",
    "家事は分担しつつも、料理は私が担当して旦那さんを支えたいです。",
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
    <div className="max-w-2xl mx-auto px-6 py-12">
      <button onClick={onBack} className="mb-6 text-neutral-400 hover:text-neutral-900 flex items-center gap-2">
        &larr; 戻る (Back)
      </button>

      {!report ? (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[650px] border border-neutral-100">
          <div className="p-4 bg-emerald-500 text-white font-bold flex justify-between items-center">
            <span>AIインタビュー (分析中)</span>
            <span className="text-xs bg-emerald-600 px-2 py-1 rounded">{Math.floor((messages.length / 6) * 100)}%</span>
          </div>
          <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-neutral-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-emerald-500 text-white rounded-tr-none shadow-md' : 'bg-white shadow-sm border rounded-tl-none text-neutral-800'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-center text-xs text-neutral-400 animate-pulse">分析レポートを作成しています...</div>}
          </div>
          
          <div className="p-4 bg-white border-t">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[10px] text-neutral-400 w-full">クリックして入力例を使用:</span>
              {examples.map((ex, idx) => (
                <button 
                  key={idx} 
                  onClick={() => sendMessage(ex)}
                  className="text-[10px] bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-600 px-2 py-1 rounded border border-neutral-200 transition-colors"
                >
                  {ex.substring(0, 15)}...
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="メッセージを入力..."
                className="flex-grow p-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button onClick={() => sendMessage()} className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 px-6 font-bold">
                送信
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-emerald-50 relative animate-scale-in">
          <div className="absolute top-4 right-8 text-4xl font-black text-emerald-100 select-none">REPORT</div>
          <h2 className="text-2xl font-bold mb-1 text-emerald-700">家庭的適性レポート</h2>
          <p className="text-xs text-neutral-400 mb-6 tracking-widest uppercase">Family Aptitude Report</p>
          
          <div className="flex items-center gap-6 mb-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600">{report.score}</div>
              <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">安定指数</div>
            </div>
            <div className="flex-grow flex flex-wrap gap-2">
              {report.traits.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-white text-emerald-600 rounded-full text-xs font-bold border border-emerald-200 shadow-sm">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-neutral-800 mb-2 border-l-4 border-emerald-400 pl-3">総合分析 (AI分析)</h3>
              <p className="text-neutral-600 leading-relaxed text-sm whitespace-pre-wrap">{report.summary}</p>
            </div>
            <div className="p-6 bg-neutral-900 text-white rounded-2xl shadow-xl">
              <h3 className="font-bold text-emerald-400 mb-2 text-sm">남편을 위한 조언 (Husband's View)</h3>
              <p className="text-neutral-300 text-sm italic leading-relaxed whitespace-pre-wrap">"{report.adviceForMen}"</p>
              <p className="text-[10px] text-neutral-500 mt-4 border-t border-neutral-800 pt-2">※ このセクションは将来の旦那様が確認する内容です。</p>
            </div>
          </div>

          <button 
            onClick={() => setReport(null)}
            className="mt-8 w-full py-4 border-2 border-emerald-500 text-emerald-500 font-bold rounded-2xl hover:bg-emerald-50 transition-colors"
          >
            インタビューを再開する
          </button>
        </div>
      )}
    </div>
  );
};

export default AptitudeTest;
