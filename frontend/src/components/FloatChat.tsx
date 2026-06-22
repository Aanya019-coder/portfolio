import React, { useState, useRef, useEffect } from 'react';
import { X, Newspaper } from 'lucide-react';

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
      {/* Floating launcher bubble (Styled as sharp square print button) */}
      <div
        onClick={() => setTrayOpen(!trayOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 border-2 border-[var(--accent-primary)] bg-[var(--bg-color)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-color)] flex items-center justify-center cursor-pointer transition-all z-[999] shadow-md select-none"
        aria-label="Open AI Assistant"
      >
        <Newspaper className="w-5 h-5" />
      </div>

      {/* Floating Chat Tray Container (Newspaper Double Border, Sharp Edges) */}
      <div 
        className={`fixed bottom-24 right-6 w-80 md:w-96 h-[480px] z-[999] bg-[var(--bg-color)] border-4 border-double border-[var(--card-border)] flex flex-col p-1 transition-all duration-300 transform select-none ${
          trayOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Inner Border Frame */}
        <div className="w-full h-full border border-[var(--card-border)] flex flex-col bg-transparent">
          
          {/* Header */}
          <div className="bg-black/10 px-4 py-2 border-b border-[var(--card-border)] flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold uppercase">DISPATCH AGENT</span>
            </div>
            <button
              onClick={() => setTrayOpen(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border border-[var(--card-border)] p-0.5 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Message Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-[10px] font-mono min-h-[100px] bg-transparent">
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';
              return (
                <div key={index} className="space-y-0.5">
                  <div className={`text-[8px] font-bold ${isUser ? 'text-[var(--accent-primary)] text-right' : 'text-[var(--text-primary)]'}`}>
                    {isUser ? '➔ ENQUIRY:' : '➔ RESPONSE:'}
                  </div>
                  <div
                    className={`p-2.5 border leading-relaxed break-words ${
                      isUser
                        ? 'border-[var(--accent-primary)] bg-[rgba(var(--accent-primary),0.02)] ml-auto text-right text-[var(--text-primary)] max-w-[85%]'
                        : 'border-[var(--card-border)] bg-[var(--bg-color)] text-[var(--text-secondary)] max-w-[85%]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isThinking && (
              <div className="space-y-0.5 animate-pulse">
                <div className="text-[8px] font-bold text-[var(--text-primary)]">➔ RESPONSE:</div>
                <div className="p-2.5 border border-[var(--card-border)] bg-[var(--bg-color)] text-stone-500 italic">
                  Compiling response report...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips (Courier Stamps) */}
          <div className="px-3 py-1.5 flex flex-wrap gap-1 bg-black/10 border-t border-[var(--card-border)] font-mono text-[9px]">
            <button
              onClick={() => handleQuickQuestion("What are Aanya's technical skills?")}
              className="px-2 py-0.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              [skills]
            </button>
            <button
              onClick={() => handleQuickQuestion("Why hire Aanya?")}
              className="px-2 py-0.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              [why hire]
            </button>
            <button
              onClick={() => handleQuickQuestion("Tell me about Beyond Career")}
              className="px-2 py-0.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
            >
              [projects]
            </button>
          </div>

          {/* Input Row */}
          <div className="p-2 border-t border-[var(--card-border)] bg-black/10 flex gap-1 font-mono text-[10px]">
            <input
              type="text"
              placeholder="Query log..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1 bg-[var(--bg-color)] border border-[var(--card-border)] px-3 py-1.5 text-[var(--text-primary)] placeholder-stone-600 focus:outline-none focus:border-[var(--accent-primary)]"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="px-3 bg-[var(--text-primary)] text-[var(--bg-color)] font-bold hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
            >
              SEND
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
