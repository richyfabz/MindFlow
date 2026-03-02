import { useState, useRef, useEffect } from "react";
import ChatGPTLogo from "./chatGBTLogo";

const SYSTEM_PROMPT = {
  role: "system",
  content:
    "You are MindFlowAI, a helpful, smart, and friendly AI assistant. Answer clearly and concisely. If asked to write code, format it properly."
};

function ChatInterface({ chat, onUpdateChat }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const messages = chat?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const callAPI = async (messageHistory) => {
    
    const response = await fetch("https://mindflowai-z9ht.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [SYSTEM_PROMPT, ...messageHistory] }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Server error");
    return data.reply;
  };

  const sendMessage = async (overrideMessages = null) => {
    const trimmed = input.trim();
    if (!trimmed && !overrideMessages) return;
    if (isLoading) return;
    setError(null);
    let updatedMessages;
    if (overrideMessages) {
      updatedMessages = overrideMessages;
    } else {
      const userMessage = { role: "user", content: trimmed };
      updatedMessages = [...messages, userMessage];
      setInput("");
      onUpdateChat(updatedMessages);
    }
    setIsLoading(true);
    try {
      const reply = await callAPI(updatedMessages);
      onUpdateChat([...updatedMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    const withoutLast = messages.filter((_, i) =>
      !(i === messages.length - 1 && messages[messages.length - 1].role === "assistant")
    );
    onUpdateChat(withoutLast);
    sendMessage(withoutLast);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const isEmpty = messages.length === 0;
  const lastIsAssistant = messages.length > 0 && messages[messages.length - 1].role === "assistant";

  return (
    <main className="chat-main">
      <div className="messages-area">
        {isEmpty ? (
          <div className="empty-state">
            <ChatGPTLogo className="empty-logo" />
            <h1 className="empty-title">How can I help you today?</h1>
            <p className="empty-subtitle">Start a conversation below</p>
            <div className="suggestions">
              {["Explain quantum computing simply","Write a React component for a modal","What's the best way to learn TypeScript?","Help me debug my Python code"].map((s) => (
                <button key={s} className="suggestion-chip" onClick={() => { setInput(s); textareaRef.current?.focus(); }}>{s}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role}`}>
                <div className="message-avatar">
                  {msg.role === "assistant" ? <ChatGPTLogo className="avatar-logo" /> : <div className="user-avatar">U</div>}
                </div>
                <div className="message-bubble"><MessageContent content={msg.content} /></div>
              </div>
            ))}
            {isLoading && (
              <div className="message-row assistant">
                <div className="message-avatar"><ChatGPTLogo className="avatar-logo" /></div>
                <div className="message-bubble"><div className="typing-dots"><span /><span /><span /></div></div>
              </div>
            )}
            {error && (
              <div className="error-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      {lastIsAssistant && !isLoading && (
        <div className="regen-row">
          <button className="regen-btn" onClick={handleRegenerate}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.75"/></svg>
            Regenerate response
          </button>
        </div>
      )}
      <div className="input-area">
        <div className="input-box">
          <textarea ref={textareaRef} className="chat-input" placeholder="Message MindFlowAI..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} rows={1} disabled={isLoading} />
          <button className={`send-btn ${input.trim() && !isLoading ? "active" : ""}`} onClick={() => sendMessage()} disabled={!input.trim() || isLoading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </main>
  );
}

function MessageContent({ content }) {
  const parts = content.split(/(```[\s\S]*?```)/g);
  return (
    <div className="message-text">
      {parts.map((part, i) => {
        if (part.startsWith("```")) {
          const lines = part.slice(3, -3).split("\n");
          const lang = lines[0].trim();
          const code = lines.slice(1).join("\n");
          return <div key={i} className="code-block">{lang && <div className="code-lang">{lang}</div>}<pre><code>{code}</code></pre></div>;
        }
        return <span key={i} style={{ whiteSpace: "pre-wrap" }}>{part}</span>;
      })}
    </div>
  );
}

export default ChatInterface;