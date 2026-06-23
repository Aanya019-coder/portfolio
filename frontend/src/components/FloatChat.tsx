import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const FloatChat: React.FC = () => {
  const [trayOpen, setTrayOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hi! Ask me anything about Aanya's software skills, AI/ML crop scanner research, or internships!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Append user message
    const userMsg: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.reply || "No reply generated." }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: "Error connecting to backend AI server." }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    handleSendMessage(q);
  };

  return (
    <>
      {/* Floating launcher bubble (Styled as bouncy circle) */}
      <div
        onClick={() => setTrayOpen(!trayOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-color)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-color)] flex items-center justify-center cursor-pointer transition-all z-[999] shadow-lg hover:scale-110 duration-200 select-none"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Floating Chat Tray Container (Rounded, Modern, Shadowy) */}
      <div 
        className={`fixed bottom-24 right-6 w-80 md:w-96 h-[480px] z-[999] bg-[var(--bg-color)] border-2 border-[var(--card-border)] rounded-2xl flex flex-col p-1 transition-all duration-300 transform shadow-2xl select-none ${
          trayOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Inner Border Frame */}
        <div className="w-full h-full border border-[var(--card-border)] rounded-[14px] overflow-hidden flex flex-col bg-transparent">
          
          {/* Header */}
          <div className="bg-[var(--card-bg)] px-4 py-3 border-b border-[var(--card-border)] flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5 font-sans font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-display uppercase tracking-wider text-[var(--text-primary)]">Aanya's AI Assistant 🤖</span>
            </div>
            <button
              onClick={() => setTrayOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border border-[var(--card-border)] p-1 rounded-full bg-[var(--bg-color)]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Message Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[10px] font-sans min-h-[100px] bg-transparent">
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={index} className="space-y-0.5">
                  <div className={`text-[8px] font-bold font-mono opacity-60 mb-0.5 ${isUser ? 'text-right' : 'text-left'}`}>
                    {isUser ? 'YOU' : 'AI ASSISTANT'}
                  </div>
                  <div
                    className={`p-3 leading-relaxed break-words text-xs ${
                      isUser
                        ? 'chat-bubble-user ml-auto max-w-[85%]'
                        : 'chat-bubble-ai max-w-[85%]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="space-y-0.5 animate-pulse">
                <div className="text-[8px] font-bold font-mono opacity-60 text-left">AI ASSISTANT</div>
                <div className="p-3 chat-bubble-ai max-w-[85%] italic text-stone-500">
                  Thinking... 🤔
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 flex flex-wrap gap-1.5 bg-[var(--card-bg)] border-t border-[var(--card-border)] font-mono text-[9px]">
            <button
              onClick={() => handleQuickQuestion("What are Aanya's technical skills?")}
              className="px-3 py-1.5 border border-[var(--card-border)] hover:border-[var(--accent-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer rounded-full bg-[var(--bg-color)] font-bold"
            >
              Skills 🛠️
            </button>
            <button
              onClick={() => handleQuickQuestion("Why hire Aanya?")}
              className="px-3 py-1.5 border border-[var(--card-border)] hover:border-[var(--accent-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer rounded-full bg-[var(--bg-color)] font-bold"
            >
              Why Hire? 🌟
            </button>
            <button
              onClick={() => handleQuickQuestion("Tell me about Beyond Career")}
              className="px-3 py-1.5 border border-[var(--card-border)] hover:border-[var(--accent-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer rounded-full bg-[var(--bg-color)] font-bold"
            >
              Projects 🚀
            </button>
          </div>

          {/* Input Row */}
          <div className="p-2 border-t border-[var(--card-border)] bg-[var(--card-bg)] flex gap-1.5 font-mono text-[10px]">
            <input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1 bg-[var(--bg-color)] border border-[var(--card-border)] px-4 py-2 text-[var(--text-primary)] placeholder-stone-600 focus:outline-none focus:border-[var(--accent-secondary)] rounded-full text-xs"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="px-4 py-2 bg-[var(--accent-secondary)] hover:bg-[var(--accent-primary)] text-white hover:text-slate-900 font-bold hover:opacity-90 transition-all flex items-center justify-center cursor-pointer rounded-full uppercase"
            >
              Send
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
