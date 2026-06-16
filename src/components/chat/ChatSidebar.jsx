import './ChatSidebar.css';

function formatRelativeTime(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return '刚刚';
  if (diffMin < 60) return `${diffMin} 分钟前`;
  if (diffHour < 24) return `${diffHour} 小时前`;
  if (diffDay < 7) return `${diffDay} 天前`;

  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

export default function ChatSidebar({
  conversations,
  activeId,
  loading,
  onSelect,
  onNewChat,
  disabled,
}) {
  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar-header">
        <h3>会话记录</h3>
        <button
          type="button"
          className="chat-new-btn"
          onClick={onNewChat}
          disabled={disabled}
        >
          New Chat
        </button>
      </div>

      <div className="chat-sidebar-list">
        {loading && conversations.length === 0 && (
          <p className="chat-sidebar-empty">加载中…</p>
        )}
        {!loading && conversations.length === 0 && (
          <p className="chat-sidebar-empty">暂无会话，点击 New Chat 开始</p>
        )}
        {conversations.map((conv) => {
          const isActive = conv.id === activeId;
          const label = conv.title?.trim() || '新对话';

          return (
            <button
              key={conv.id}
              type="button"
              className={`chat-sidebar-item${isActive ? ' active' : ''}`}
              onClick={() => onSelect(conv.id)}
              disabled={disabled}
            >
              <span className="chat-sidebar-item-title">{label}</span>
              <span className="chat-sidebar-item-time">
                {formatRelativeTime(conv.updated_at)}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
