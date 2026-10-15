import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, RefreshCw, FileDown, Cake } from 'lucide-react';
import { askChocoBot } from '../services/geminiChat';
import { ChatMessage } from '../types';
import { BAKERY_CONTACT } from '../data/knowledgeBase';

interface AIChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onDownloadPdf: () => void;
  onOpenKnowledgeBase: () => void;
  onExploreCatalog: () => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen,
  onToggle,
  onDownloadPdf,
  onOpenKnowledgeBase,
  onExploreCatalog,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello and welcome to CHOCOLOCO! 🎂\n\nI am **Choco Bot**, your virtual pastry concierge. I have direct access to our official bakery knowledge base.\n\nAsk me anything about our eggless cakes, prices, ingredients, delivery radius (18km), or dynamic UPI payments!`,
      timestamp: new Date(),
    },
  ]);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'What are your best eggless cakes?',
    'Price for 1kg Belgian Chocolate Truffle?',
    'How do I pay with UPI QR code?',
    'What is your delivery radius and cutoff?',
    'Download official Knowledge Base PDF',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // If asking for PDF
    if (query.toLowerCase().includes('pdf') || query.toLowerCase().includes('download')) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `📄 You can download our official 3-page Knowledge Base PDF right away! It contains our full catalog, pricing, UPI instructions, and FAQs.`,
            timestamp: new Date(),
            quickActions: [
              {
                label: '📥 Download PDF Now',
                action: onDownloadPdf,
              },
            ],
          },
        ]);
        setIsTyping(false);
      }, 500);
      return;
    }

    try {
      const responseText = await askChocoBot(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `I had trouble connecting, but here is our direct kitchen contact: Phone ${BAKERY_CONTACT.phoneDisplay} or WhatsApp ${BAKERY_CONTACT.whatsappDisplay}!`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <button
        onClick={onToggle}
        className={`fixed bottom-5 right-5 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer ${
          isOpen
            ? 'bg-[#2A1810] text-amber-200 rotate-90 scale-90'
            : 'bg-gradient-to-tr from-[#3D2314] via-[#5C2D16] to-[#8B4513] text-white hover:scale-105'
        }`}
        aria-label="Toggle Choco Bot Concierge"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6 text-amber-300" />
            <span className="hidden sm:inline font-bold text-xs pr-1">Choco Bot AI</span>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </>
        )}
      </button>

      {/* Concierge Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-40 w-[94vw] sm:w-[400px] h-[550px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2A1810] via-[#3E2114] to-[#5C2D16] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-300/30 flex items-center justify-center text-amber-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-sm text-white">Choco Bot</h4>
                  <span className="bg-emerald-500 text-stone-950 font-bold text-[9px] px-1.5 py-0.2 rounded-full">
                    LIVE AI
                  </span>
                </div>
                <p className="text-[10px] text-amber-200/80">
                  Virtual Concierge • Connected to Knowledge Base
                </p>
              </div>
            </div>

            <button
              onClick={onToggle}
              className="text-stone-300 hover:text-white p-1 rounded-lg"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF4EE]/40 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    C
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap ${
                    m.sender === 'user'
                      ? 'bg-[#2A1810] text-amber-100 rounded-tr-xs'
                      : 'bg-white text-stone-800 border border-stone-200 shadow-2xs rounded-tl-xs'
                  }`}
                >
                  {m.text}

                  {m.quickActions && m.quickActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex flex-wrap gap-2">
                      {m.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={qa.action}
                          className="px-3 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg font-semibold text-[11px] hover:bg-rose-100 transition-colors"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-stone-500 text-[11px]">
                <div className="w-6 h-6 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  C
                </div>
                <div className="bg-white p-2.5 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-700 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-amber-700 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-700 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-stone-400">Consulting kitchen notes...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="p-2.5 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-amber-100 text-[10px] font-medium text-stone-700 whitespace-nowrap transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about cakes, eggless options, prices..."
              className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2.5 bg-[#2A1810] hover:bg-[#3D2314] disabled:opacity-40 text-amber-200 rounded-xl transition-all cursor-pointer shadow-xs"
              aria-label="Send query"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
