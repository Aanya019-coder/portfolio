import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

export const InlineChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I am Aanya's virtual portfolio assistant. Feel free to ask me questions regarding her B.Tech studies, Next.js systems architecture, Python research, or engineering internships!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

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
        { sender: 'ai', text: "Error connecting to backend AI server. Please check that the server is running." }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const quickPrompts = [
    { label: '🔧 Technical skills', text: "What are Aanya's strongest technical skills?" },
    { label: '🧠 AI/ML research', text: "Tell me about Aanya's AI/ML research" },
    { label: '🚀 MAANG pitch', text: "Why should we hire Aanya at a MAANG company?" },
    { label: '💼 Projects', text: "What projects has Aanya built?" }
  ];

  return (
    <section id="ai-chat" className="py-20 max-w-4xl mx-auto px-6 relative border-t border-[var(--card-border)] select-none">
      
      {/* Section Header */}
      <div className="flex flex-col items-center mb-10 text-center select-none">
        <div className="pb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-primary)] font-bold">
            SECTION V: DISPATCH & CORRESPONDENCE
          </span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-black uppercase w-full py-2.5 border-y border-[var(--card-border)] text-[var(--text-primary)]">
          Letters to the Editor
        </h2>
        <div className="py-1 px-4 text-[9px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
          Direct enquiries regarding the candidate's achievements and engineering records.
        </div>
      </div>

      {/* Quick Typewriter Prompts */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 select-none font-mono text-xs">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt.text)}
            className="px-3 py-1.5 border border-[var(--card-border)] hover:border-[var(--accent-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          >
            [{prompt.label.substring(2)}]
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="border border-[var(--card-border)] overflow-hidden bg-black/5 flex flex-col">
        {/* Chat Header Banner */}
        <div className="px-6 py-2 border-b border-[var(--card-border)] bg-black/10 flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold">AGENT STATUS: READY</span>
          </div>
          <span>RECORDING ACTIVE</span>
        </div>

        {/* Messages Ledger Log */}
        <div className="h-80 overflow-y-auto p-6 space-y-6 text-xs font-mono">
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={index} className="space-y-1">
                {/* Stamp label */}
                <div className={`text-[9px] font-bold ${isUser ? 'text-[var(--accent-primary)] text-right' : 'text-[var(--text-primary)]'}`}>
                  {isUser ? '➔ READER ENQUIRY:' : '➔ DISPATCH RESPONSE:'}
                </div>
                
                {/* Message Copy */}
                <div className={`p-3 border text-xs max-w-[85%] leading-relaxed ${
                  isUser 
                    ? 'border-[var(--accent-primary)] bg-[rgba(var(--accent-primary),0.02)] ml-auto text-right text-[var(--text-primary)]' 
                    : 'border-[var(--card-border)] bg-[var(--bg-color)] text-[var(--text-secondary)]'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="space-y-1">
              <div className="text-[9px] font-bold text-[var(--text-primary)]">
                ➔ DISPATCH RESPONSE:
              </div>
              <div className="p-3 border border-[var(--card-border)] bg-[var(--bg-color)] text-stone-500 text-xs italic animate-pulse">
                Agent is typing draft response...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Typewriter Input Row */}
        <div className="p-3 border-t border-[var(--card-border)] bg-black/10 flex gap-2 font-mono text-xs">
          <input
            type="text"
            placeholder="Type correspondence enquiry here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1 bg-[var(--bg-color)] border border-[var(--card-border)] px-4 py-2 text-[var(--text-primary)] placeholder-stone-600 focus:outline-none focus:border-[var(--accent-primary)]"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            className="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-color)] font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
          >
            SEND <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </section>
  );
};
