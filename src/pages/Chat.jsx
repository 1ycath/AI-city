import { useState, useRef, useEffect, useCallback } from 'react';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import ChatSidebar from '../components/chat/ChatSidebar';
import {
  CHAT_SYSTEM_PROMPT,
  CHAT_WELCOME,
  CHAT_MODEL,
  DASHSCOPE_BASE_URL,
} from '../constants/chatPrompt';
import { sendChatCompletion } from '../services/dashscopeChat';
import {
  fetchConversations,
  createConversation,
  fetchMessages,
  saveMessagePair,
  updateConversationTitle,
  generateTitleFromMessage,
} from '../services/chat';
import './Chat.css';

function buildApiMessages(history) {
  return [
    { role: 'system', content: CHAT_SYSTEM_PROMPT },
    ...history.map(({ role, content }) => ({ role, content })),
  ];
}

function toUiMessages(rows) {
  return rows.map(({ role, content }) => ({ role, content }));
}

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([CHAT_WELCOME]);
  const [loading, setLoading] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const loadConversations = useCallback(async () => {
    setLoadingConversations(true);
    try {
      const list = await fetchConversations();
      setConversations(list);
    } catch (err) {
      setError(err.message ?? '加载会话列表失败');
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  const loadConversationMessages = useCallback(async (conversationId) => {
    setLoadingMessages(true);
    setError(null);
    try {
      const rows = await fetchMessages(conversationId);
      setMessages(rows.length ? toUiMessages(rows) : [CHAT_WELCOME]);
    } catch (err) {
      setError(err.message ?? '加载聊天记录失败');
      setMessages([CHAT_WELCOME]);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  const handleSelectConversation = async (conversationId) => {
    if (loading || conversationId === activeConversationId) return;
    setActiveConversationId(conversationId);
    await loadConversationMessages(conversationId);
  };

  const handleNewChat = async () => {
    if (loading) return;
    setError(null);
    try {
      const conversation = await createConversation();
      setConversations((prev) => [conversation, ...prev]);
      setActiveConversationId(conversation.id);
      setMessages([CHAT_WELCOME]);
    } catch (err) {
      setError(err.message ?? '创建新会话失败');
    }
  };

  const ensureConversation = async () => {
    if (activeConversationId) return activeConversationId;

    const conversation = await createConversation();
    setConversations((prev) => [conversation, ...prev]);
    setActiveConversationId(conversation.id);
    return conversation.id;
  };

  const handleSend = async (text) => {
    const userMessage = { role: 'user', content: text };
    const nextHistory = [...messages, userMessage];
    const isFirstExchange =
      messages.length === 1 && messages[0].content === CHAT_WELCOME.content;

    setMessages(nextHistory);
    setLoading(true);
    setError(null);

    try {
      const conversationId = await ensureConversation();
      const reply = await sendChatCompletion(buildApiMessages(nextHistory));
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);

      await saveMessagePair(conversationId, text, reply);

      if (isFirstExchange) {
        const title = generateTitleFromMessage(text);
        const updated = await updateConversationTitle(conversationId, title);
        setConversations((prev) =>
          prev.map((c) => (c.id === conversationId ? updated : c)),
        );
      } else {
        setConversations((prev) => {
          const next = prev.map((c) =>
            c.id === conversationId
              ? { ...c, updated_at: new Date().toISOString() }
              : c,
          );
          return next.sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
          );
        });
      }
    } catch (err) {
      setError(err.message ?? '对话请求失败');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const sessionBusy = loading || loadingMessages;

  return (
    <div className="page chat-page">
      <ChatSidebar
        conversations={conversations}
        activeId={activeConversationId}
        loading={loadingConversations}
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
        disabled={sessionBusy}
      />

      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-actions">
            <div>
              <h2>AI 城市医生</h2>
              <p>基于通义千问 · 支持多轮上下文对话</p>
              <span className="chat-model-tag">{CHAT_MODEL}</span>
              <span className="chat-model-tag chat-base-url">{DASHSCOPE_BASE_URL}</span>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {loadingMessages && (
            <p className="chat-loading-hint">加载聊天记录…</p>
          )}
          {!loadingMessages &&
            messages.map((msg, i) => (
              <ChatMessage key={`${msg.role}-${i}`} role={msg.role} content={msg.content} />
            ))}
          {loading && (
            <ChatMessage role="assistant" content="正在分析…" isStreaming />
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && <div className="chat-error">{error}</div>}

        <ChatInput onSend={handleSend} disabled={sessionBusy} />
      </div>
    </div>
  );
}
