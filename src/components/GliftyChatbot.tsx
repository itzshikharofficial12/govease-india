import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles, X, SendHorizontal, ArrowRight,
  Trash2, Copy, Check, ThumbsUp, ThumbsDown,
  Mic, MicOff, Maximize2, Minimize2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  sendMessageToGemini,
  extractDocumentMentions,
  type GeminiMessage,
  type ActionLink,
} from '../services/geminiService';
import './GliftyChatbot.css';

/* ──────────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────────── */
interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
  links?: ActionLink[];
  rated?: 'up' | 'down';
  isNew?: boolean;
}

/* ──────────────────────────────────────────────────────────────
   SpeechRecognition polyfill type
   ────────────────────────────────────────────────────────────── */
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((ev: { results: SpeechRecognitionResultList }) => void) | null;
  onerror: ((ev: { error: string }) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => ISpeechRecognition;
    SpeechRecognition?: new () => ISpeechRecognition;
  }
}

/* ──────────────────────────────────────────────────────────────
   AnimatedText — word-by-word reveal
   ────────────────────────────────────────────────────────────── */
const AnimatedText: React.FC<{ text: string; onDone: () => void }> = ({
  text,
  onDone,
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const words = text.split(/(\s+)/); // preserve whitespace tokens
  const totalTokens = words.length;

  useEffect(() => {
    if (visibleCount >= totalTokens) {
      onDone();
      return;
    }
    const speed = 30 + Math.random() * 20; // ms per token
    const timer = setTimeout(() => setVisibleCount(c => c + 1), speed);
    return () => clearTimeout(timer);
  }, [visibleCount, totalTokens, onDone]);

  return (
    <span style={{ whiteSpace: 'pre-line' }}>
      {words.map((w, i) => (
        <span
          key={i}
          className={i < visibleCount ? 'glifty-word visible' : 'glifty-word'}
        >
          {w}
        </span>
      ))}
    </span>
  );
};

/* ──────────────────────────────────────────────────────────────
   Suggestion chips — bilingual (mix of gov + general)
   ────────────────────────────────────────────────────────────── */
const SUGGESTIONS_EN = [
  'Apply for PAN Card',
  'Passport fees?',
  'Tell me a joke 😄',
  'What is the capital of India?',
  'Renew Driving License',
];

const SUGGESTIONS_HI = [
  'पैन कार्ड के लिए आवेदन',
  'पासपोर्ट शुल्क?',
  'एक चुटकुला सुनाओ 😄',
  'भारत की राजधानी क्या है?',
  'ड्राइविंग लाइसेंस नवीनीकरण',
];

/* ──────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────── */
export const GliftyChatbot: React.FC = () => {
  const { language: appLanguage } = useLanguage();
  const [chatLang, setChatLang] = useState<'EN' | 'HI'>(appLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [msgCounter, setMsgCounter] = useState(3);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'bot',
      text: `Hi! 👋 I'm Glifty, your AI assistant. Ask me about government services, general knowledge, or just chat — I'm here to help with anything!`,
      isNew: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  // Gemini conversation history (for API context)
  const [conversationHistory, setConversationHistory] = useState<GeminiMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const navigate = useNavigate();

  // Check for speech recognition support
  const hasSpeechSupport =
    typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  // Sync chatbot language with app language changes
  useEffect(() => {
    setChatLang(appLanguage);
  }, [appLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Escape key to exit expanded mode
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  /* ── Welcome message helper ── */
  const getWelcomeText = (lang: 'EN' | 'HI') =>
    lang === 'HI'
      ? `नमस्ते! 👋 मैं Glifty हूँ, आपका AI असिस्टेंट। सरकारी सेवाएँ, सामान्य ज्ञान, या कोई भी बात — मुझसे कुछ भी पूछें!`
      : `Hi! 👋 I'm Glifty, your AI assistant. Ask me about government services, general knowledge, or just chat — I'm here to help with anything!`;

  /* ── Language toggle ── */
  const handleToggleLang = () => {
    const newLang: 'EN' | 'HI' = chatLang === 'EN' ? 'HI' : 'EN';
    setChatLang(newLang);
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'bot') {
        return [{ ...prev[0], text: getWelcomeText(newLang) }];
      }
      return prev;
    });
  };

  /* ── Clear chat ── */
  const handleClear = () => {
    setMsgCounter(3);
    setAnimatingId(null);
    setConversationHistory([]);
    setMessages([{ id: 1, role: 'bot', text: getWelcomeText(chatLang), isNew: false }]);
  };

  /* ── Expand toggle ── */
  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  /* ── Navigation ── */
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setIsExpanded(false);
  };

  /* ── Copy to clipboard ── */
  const handleCopy = async (id: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* silently fail on insecure origins */
    }
  };

  /* ── Thumbs rating ── */
  const handleRate = (id: number, rating: 'up' | 'down') => {
    setMessages(prev =>
      prev.map(m =>
        m.id === id ? { ...m, rated: m.rated === rating ? undefined : rating } : m,
      ),
    );
  };

  /* ── Animation done callback ── */
  const handleAnimDone = useCallback(() => {
    setAnimatingId(null);
  }, []);

  /* ── Voice input ── */
  const handleVoiceToggle = () => {
    if (!hasSpeechSupport) return;

    if (isListening) {
      // Stop
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    // Start
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) return;

    const recognition = new SpeechRec();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = chatLang === 'HI' ? 'hi-IN' : 'en-IN';

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setInput(prev => (prev ? prev + ' ' + transcript : transcript));
      }
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  /* ── Send message (async — calls Gemini) ── */
  const handleSend = async (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText || isTyping) return;

    // Stop listening if active
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const botId = msgCounter + 1;
    const userMsg: Message = { id: msgCounter, role: 'user', text: msgText, isNew: false };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setMsgCounter(prev => prev + 2);

    // Build updated conversation history for Gemini
    const updatedHistory: GeminiMessage[] = [
      ...conversationHistory,
      { role: 'user', parts: [{ text: msgText }] },
    ];

    try {
      const response = await sendMessageToGemini(updatedHistory, chatLang);

      // Extract document references and clean the response
      const { cleanedText, links } = extractDocumentMentions(response.text, chatLang);

      // Update conversation history (with the raw response for context)
      if (!response.error) {
        setConversationHistory([
          ...updatedHistory,
          { role: 'model', parts: [{ text: response.text }] },
        ]);
      }

      setAnimatingId(botId);
      setMessages(prev => [
        ...prev,
        {
          id: botId,
          role: 'bot',
          text: cleanedText,
          links: links.length > 0 ? links : undefined,
          isNew: true,
        },
      ]);
    } catch {
      // Fallback error message
      setMessages(prev => [
        ...prev,
        {
          id: botId,
          role: 'bot',
          text:
            chatLang === 'HI'
              ? '😔 कुछ गड़बड़ हुई। कृपया फिर से कोशिश करें।'
              : '😔 Something went wrong. Please try again.',
          isNew: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = chatLang === 'HI' ? SUGGESTIONS_HI : SUGGESTIONS_EN;

  /* ── Render ── */
  return (
    <>
      {/* Backdrop for expanded mode */}
      {isOpen && isExpanded && (
        <div
          className="glifty-backdrop"
          onClick={() => setIsExpanded(false)}
          id="glifty-backdrop"
        />
      )}

      {isOpen && (
        <div
          className={`glifty-panel ${isExpanded ? 'expanded' : ''}`}
          id="glifty-panel"
        >

          {/* ── Header ── */}
          <div className="glifty-header">
            <div className="glifty-avatar">
              <Sparkles size={18} />
            </div>
            <div className="glifty-header-info">
              <h3>Glifty</h3>
              <p>
                {chatLang === 'HI'
                  ? 'AI असिस्टेंट — कुछ भी पूछें'
                  : 'AI Assistant — Ask me anything'}
              </p>
            </div>
            <div className="glifty-header-actions">
              {/* Language toggle */}
              <button
                className="glifty-lang-toggle"
                onClick={handleToggleLang}
                title={chatLang === 'EN' ? 'Switch to Hindi' : 'Switch to English'}
                id="glifty-lang-toggle"
              >
                {chatLang === 'EN' ? 'हिं' : 'EN'}
              </button>
              {/* Expand toggle */}
              <button
                className="glifty-expand-btn"
                onClick={handleToggleExpand}
                title={isExpanded
                  ? (chatLang === 'HI' ? 'छोटा करें' : 'Minimize')
                  : (chatLang === 'HI' ? 'बड़ा करें' : 'Expand')}
                id="glifty-expand-btn"
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              {/* Clear chat */}
              <button
                className="glifty-clear-btn"
                onClick={handleClear}
                title={chatLang === 'HI' ? 'चैट साफ़ करें' : 'Clear chat'}
                id="glifty-clear-btn"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div className="glifty-messages">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`glifty-msg ${msg.role === 'user' ? 'user' : 'bot'}`}
              >
                {/* Bot message with animation or plain text */}
                {msg.role === 'bot' && msg.isNew && animatingId === msg.id ? (
                  <AnimatedText text={msg.text} onDone={handleAnimDone} />
                ) : (
                  <span style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
                )}

                {/* Action links (show after animation) */}
                {msg.links && msg.links.length > 0 && animatingId !== msg.id && (
                  <div className="glifty-action-links">
                    {msg.links.map((link, li) => (
                      <button
                        key={li}
                        className="glifty-action-btn"
                        onClick={() => handleNavigate(link.path)}
                      >
                        {link.label}
                        <ArrowRight size={14} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Bot message footer: rating + copy (show after animation) */}
                {msg.role === 'bot' && animatingId !== msg.id && (
                  <div className="glifty-msg-footer">
                    <div className="glifty-rate-group">
                      <button
                        className={`glifty-rate-btn${msg.rated === 'up' ? ' active-up' : ''}`}
                        onClick={() => handleRate(msg.id, 'up')}
                        title="Helpful"
                        aria-label="Mark as helpful"
                      >
                        <ThumbsUp size={11} />
                      </button>
                      <button
                        className={`glifty-rate-btn${msg.rated === 'down' ? ' active-down' : ''}`}
                        onClick={() => handleRate(msg.id, 'down')}
                        title="Not helpful"
                        aria-label="Mark as not helpful"
                      >
                        <ThumbsDown size={11} />
                      </button>
                    </div>

                    {msg.rated && (
                      <span className="glifty-rated-label">
                        {chatLang === 'HI' ? 'धन्यवाद!' : 'Thanks!'}
                      </span>
                    )}

                    <div className="glifty-copy-wrap">
                      <button
                        className={`glifty-copy-btn${copiedId === msg.id ? ' copied' : ''}`}
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title={chatLang === 'HI' ? 'कॉपी करें' : 'Copy'}
                        aria-label="Copy message"
                      >
                        {copiedId === msg.id ? <Check size={11} /> : <Copy size={11} />}
                      </button>
                      {copiedId === msg.id && (
                        <span className="glifty-copied-tooltip">
                          {chatLang === 'HI' ? 'कॉपी हो गया!' : 'Copied!'}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="glifty-msg typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Initial suggestion chips (only at start) ── */}
          {messages.length <= 2 && !isTyping && (
            <div className="glifty-suggestions">
              {suggestions.map((s, idx) => (
                <button key={idx} className="glifty-chip" onClick={() => handleSend(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* ── Input area ── */}
          <div className="glifty-input-area">
            {/* Mic button */}
            {hasSpeechSupport && (
              <button
                className={`glifty-mic-btn${isListening ? ' listening' : ''}`}
                onClick={handleVoiceToggle}
                title={isListening
                  ? (chatLang === 'HI' ? 'सुनना बंद करें' : 'Stop listening')
                  : (chatLang === 'HI' ? 'बोलकर पूछें' : 'Speak')}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                id="glifty-mic-btn"
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </button>
            )}
            <input
              type="text"
              className="glifty-input"
              placeholder={
                isListening
                  ? (chatLang === 'HI' ? '🎤 सुन रहा हूँ...' : '🎤 Listening...')
                  : (chatLang === 'HI' ? 'Glifty से कुछ भी पूछें...' : 'Ask Glifty anything...')
              }
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              id="glifty-input"
            />
            <button
              className="glifty-send-btn"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              id="glifty-send-btn"
            >
              <SendHorizontal size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        className={`glifty-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close Glifty' : 'Ask Glifty AI'}
        id="glifty-fab"
      >
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
      </button>
    </>
  );
};
