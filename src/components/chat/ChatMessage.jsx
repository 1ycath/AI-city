import './ChatMessage.css';

export default function ChatMessage({ role, content, isStreaming }) {
  const isUser = role === 'user';

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-message-avatar">{isUser ? '我' : '医'}</div>
      <div className="chat-message-bubble">
        <div className="chat-message-content">
          {content}
          {isStreaming && <span className="chat-cursor" />}
        </div>
      </div>
    </div>
  );
}
