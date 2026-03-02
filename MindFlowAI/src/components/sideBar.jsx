import { useState } from "react";
import { useTheme } from "../context/themeContext";
import ChatGPTLogo from "./chatGBTLogo";

function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <ChatGPTLogo className="brand-logo" />
          <span className="brand-name">MindFlow<em>AI</em></span>
        </div>
        <button className="new-chat-btn" onClick={onNewChat} title="New Chat">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>

      {/* Chat History */}
      <div className="chat-history">
        <p className="history-label">Recent</p>
        <ul className="chat-list">
          {chats.map(chat => (
            <li
              key={chat.id}
              className={`chat-item ${chat.id === activeChatId ? "active" : ""}`}
              onMouseEnter={() => setHoveredId(chat.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectChat(chat.id)}
            >
              <svg className="chat-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="chat-title">{chat.title}</span>
              {hoveredId === chat.id && (
                <button
                  className="delete-btn"
                  onClick={(e) => { e.stopPropagation(); onDeleteChat(chat.id); }}
                  title="Delete chat"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {isDarkMode ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
          <span>{isDarkMode ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;