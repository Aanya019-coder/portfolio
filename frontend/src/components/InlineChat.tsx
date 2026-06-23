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
      <div className="text-center mb-10 select-none">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--accent-secondary)] font-bold bg-[var(--card-bg)] px-3.5 py-1.5 rounded-full border border-[var(--card-border)]">
          🤖 ASK ME ANYTHING!
        </span>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-[var(--text-primary)] mt-4">
          Aanya's AI Chatbot
        </h2>
        <div className="mt-3 text-[10px] font-mono text-[var(--text-secondary)] uppercase tracking-wider">
          Ask my AI assistant about my B.Tech studies, projects, and work experience!
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-8 select-none font-mono text-xs">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt.text)}
            className="px-4 py-2 border border-[var(--card-border)] hover:border-[var(--accent-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer rounded-full bg-[var(--card-bg)] shadow-sm font-bold"
          >
            {prompt.label}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="border-2 border-[var(--card-border)] rounded-2xl overflow-hidden bg-[var(--card-bg)] flex flex-col shadow-sm">
        {/* Chat Header Banner */}
        <div className="px-6 py-3.5 border-b border-[var(--card-border)] bg-[var(--bg-color)] flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-[var(--text-primary)]">AI ASSISTANT ACTIVE</span>
          </div>
          <span className="font-bold">SECURE CONNECTION</span>
        </div>

        {/* Messages Log */}
        <div className="h-80 overflow-y-auto p-6 space-y-6 text-xs font-sans">
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={index} className="space-y-1">
                {/* Stamp label */}
                <div className={`text-[9px] font-mono font-bold opacity-60 ${isUser ? 'text-right' : 'text-left'}`}>
                  {isUser ? 'YOU' : 'AI ASSISTANT'}
                </div>
                
                {/* Message Copy */}
                <div className={`p-3 text-xs max-w-[85%] leading-relaxed ${
                  isUser 
                    ? 'chat-bubble-user ml-auto' 
                    : 'chat-bubble-ai'
                }`}>
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isThinking && (
            <div className="space-y-1 animate-pulse font-sans">
              <div className="text-[9px] font-mono font-bold opacity-60 text-left">
                AI ASSISTANT
              </div>
              <div className="p-3 chat-bubble-ai max-w-[85%] text-stone-500 text-xs italic">
                Thinking... 🤔
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Row */}
        <div className="p-3 border-t border-[var(--card-border)] bg-[var(--bg-color)] flex gap-2 font-mono text-xs">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1 bg-[var(--card-bg)] border border-[var(--card-border)] px-4 py-2.5 text-[var(--text-primary)] placeholder-stone-600 focus:outline-none focus:border-[var(--accent-secondary)] rounded-full"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            className="px-5 py-2.5 bg-[var(--accent-secondary)] hover:bg-[var(--accent-primary)] text-white hover:text-slate-900 font-bold hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer rounded-full uppercase"
          >
            Send <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
