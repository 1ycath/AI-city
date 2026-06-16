import { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import {
  CHAT_SYSTEM_PROMPT,
  CHAT_WELCOME,
  CHAT_MODEL,
  DASHSCOPE_BASE_URL,
} from '../constants/chatPrompt';
import { sendChatCompletion } from '../services/dashscopeChat';
import './Chat.css';

function buildApiMessages(history) {
  return [
    { role: 'system', content: CHAT_SYSTEM_PROMPT },
    ...history.map(({ role, content }) => ({ role, content })),
  ];
}

export default function Chat() {
  const [messages, setMessages] = useState([CHAT_WELCOME]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const handleSend = async (text) => {
    const userMessage = { role: 'user', content: text };
    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setLoading(true);
    setError(null);

    try {
      const reply = await sendChatCompletion(buildApiMessages(nextHistory));
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message ?? '对话请求失败');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (loading) return;
    setMessages([CHAT_WELCOME]);
    setError(null);
  };

  return (
    <div className="page chat-page">
      <div className="chat-header">
        <div className="chat-header-actions">
          <div>
            <h2>AI 城市医生</h2>
            <p>基于通义千问 · 支持多轮上下文对话</p>
            <span className="chat-model-tag">{CHAT_MODEL}</span>
            <span className="chat-model-tag chat-base-url">{DASHSCOPE_BASE_URL}</span>
          </div>
          <button
            type="button"
            className="chat-clear-btn"
            onClick={handleClear}
            disabled={loading || messages.length <= 1}
          >
            清空对话
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatMessage key={`${msg.role}-${i}`} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <ChatMessage role="assistant" content="正在分析…" isStreaming />
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="chat-error">{error}</div>}

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
