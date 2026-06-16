import { useState, useRef, useEffect } from 'react';
import './ChatInput.css';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [text]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-bar">
      <textarea
        ref={textareaRef}
        className="chat-input"
        placeholder="描述城市问题，例如：东区管网压力异常该如何处置？"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
      />
      <button
        type="button"
        className="chat-send-btn"
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
      >
        发送
      </button>
    </div>
  );
}
