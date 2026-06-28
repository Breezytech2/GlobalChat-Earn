import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Send, Paperclip, Mic, Image, FileText, Globe, ShieldAlert, Sparkles, CheckCheck } from "lucide-react";

export const ChatModal: React.FC = () => {
  const { activeChatTeacher, setActiveChatTeacher, chatMessages, sendMessage, currentUser, targetLanguage, setTargetLanguage } = useApp();
  const [inputText, setInputText] = useState<string>("");
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [isSimulatingTyping, setIsSimulatingTyping] = useState<boolean>(false);

  if (!activeChatTeacher) return null;

  const t = activeChatTeacher;
  const filteredMsgs = chatMessages.filter(m => 
    (m.senderId === currentUser.id && m.recipientId === t.id) ||
    (m.senderId === t.id && m.recipientId === currentUser.id)
  );

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const textToSend = inputText;
    setInputText("");
    setIsSimulatingTyping(true);
    await sendMessage(textToSend, "text");
    setTimeout(() => setIsSimulatingTyping(false), 1600);
  };

  const handleFileUpload = (type: "image" | "pdf") => {
    const fileName = type === "pdf" ? "Maasai_Traditions_Summary_Guide.pdf" : "Kyoto_Temple_Photo.jpg";
    sendMessage(`[Sent a file: ${fileName}]`, type, "#", fileName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none">
      <div className="relative w-full max-w-2xl bg-[#09090b] text-white rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[680px] max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-[#18181b] border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={t.avatarUrl} alt={t.fullName} className="w-11 h-11 rounded-2xl object-cover border border-white/10" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#18181b]"></div>
            </div>
            <div>
              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                {t.fullName} {t.countryFlag}
              </h4>
              <p className="text-[11px] text-[white] font-medium">Standard Rate: $2.00 / 30 mins</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Target Language Toggle */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <Globe className="w-3.5 h-3.5 text-[white]" />
              <select 
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="bg-transparent text-white/90 focus:outline-none text-xs cursor-pointer"
              >
                <option value="Spanish" className="bg-[#18181b]">Spanish</option>
                <option value="French" className="bg-[#18181b]">French</option>
                <option value="Japanese" className="bg-[#18181b]">Japanese</option>
                <option value="Swahili" className="bg-[#18181b]">Swahili</option>
                <option value="Korean" className="bg-[#18181b]">Korean</option>
              </select>
            </div>

            <button 
              onClick={() => setActiveChatTeacher(null)}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white/70"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Moderation Banner */}
        <div className="bg-gradient-to-r from-[#18181b] via-blue-950/40 to-[#18181b] px-6 py-2 border-b border-white/5 flex items-center justify-between text-[11px] text-white/60">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[white]" /> AI Scam & Toxic Language Guard Active
          </span>
          <span className="text-green-400 font-mono">E2E AES-256</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs md:text-sm bg-[black]">
          <div className="text-center my-2">
            <span className="text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              Secure Cultural Learning Protocol Established
            </span>
          </div>

          {filteredMsgs.map(m => {
            const isMe = m.senderId === currentUser.id;
            return (
              <div key={m.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] text-white/40">{m.senderName}</span>
                  <span className="text-[9px] text-white/30">{m.timestamp}</span>
                </div>

                <div className={`max-w-md p-4 rounded-2xl ${isMe ? "bg-[white] text-[black] font-medium rounded-tr-none shadow-lg" : "bg-[#18181b] border border-white/10 text-white rounded-tl-none shadow-md"} space-y-1.5 relative`}>
                  {m.isFlaggedByAI && (
                    <div className="bg-red-600 text-white p-2 rounded-lg text-[10px] font-bold mb-1 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> AI Fraud Flag: Off-platform wire transfer attempt
                    </div>
                  )}

                  {m.type === "image" || m.type === "pdf" ? (
                    <div className="flex items-center gap-2 bg-black/20 p-3 rounded-xl">
                      {m.type === "pdf" ? <FileText className="w-6 h-6 text-red-400" /> : <Image className="w-6 h-6 text-blue-400" />}
                      <span className="text-xs font-semibold underline truncate">{m.fileName || "Attachment"}</span>
                    </div>
                  ) : (
                    <p className="leading-relaxed">{m.content}</p>
                  )}

                  {/* AI Translation Output */}
                  {showTranslation && m.translatedContent && m.translatedContent[targetLanguage] && (
                    <div className={`pt-2 mt-2 border-t text-xs ${isMe ? "border-black/15 text-[black]/80" : "border-white/10 text-[white]"}`}>
                      <span className="text-[9px] font-bold uppercase tracking-wider opacity-60 block mb-0.5">
                        AI Gemini Translation ({targetLanguage}):
                      </span>
                      <p className="italic font-normal">{m.translatedContent[targetLanguage]}</p>
                    </div>
                  )}
                </div>

                {isMe && (
                  <div className="flex items-center gap-1 text-[9px] text-white/40 mt-0.5 mr-1">
                    <span>Delivered</span>
                    <CheckCheck className="w-3 h-3 text-[white]" />
                  </div>
                )}
              </div>
            );
          })}

          {isSimulatingTyping && (
            <div className="flex items-center gap-2 bg-[#18181b] p-3 rounded-2xl w-24 border border-white/10 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[white]"></span>
              <span className="w-2 h-2 rounded-full bg-[white] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[white]"></span>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-[#18181b] border-t border-white/10 flex flex-col gap-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleFileUpload("image")}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
              title="Upload Image"
            >
              <Image className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleFileUpload("pdf")}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
              title="Upload Cultural PDF"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Recording voice note (HD Opus Audio Mockup)...")}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-colors"
              title="Voice Message"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input 
              type="text"
              placeholder={`Message ${t.fullName}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-[black] border border-white/10 rounded-2xl px-4 py-3 text-xs md:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[white]"
            />

            <button 
              onClick={handleSend}
              className="p-3 bg-[white] hover:bg-[#e4e4e7] text-[black] rounded-2xl font-bold transition-all active:scale-95 shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
