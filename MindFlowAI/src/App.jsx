import { useState } from "react";
import { ThemeProvider } from "./context/themeContext";
import Sidebar from "./components/sidebar";
import ChatInterface from "./components/chatinterface";
//chat interface and message list are now combined into one component for better UX
function App() {
  const [chats, setChats] = useState([
    { id: 1, title: "New Chat", messages: [] }
  ]);
  const [activeChatId, setActiveChatId] = useState(1);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const updateChat = (chatId, messages) => {
    setChats(prev => prev.map(chat => {
      if (chat.id !== chatId) return chat;
      const firstUserMsg = messages.find(m => m.role === "user");
      const title = firstUserMsg
        ? firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? "..." : "")
        : "New Chat";
      return { ...chat, messages, title };
    }));
  };

  const deleteChat = (chatId) => {
    setChats(prev => {
      const remaining = prev.filter(c => c.id !== chatId);
      if (remaining.length === 0) {
        const newChat = { id: Date.now(), title: "New Chat", messages: [] };
        setActiveChatId(newChat.id);
        return [newChat];
      }
      if (activeChatId === chatId) setActiveChatId(remaining[0].id);
      return remaining;
    });
  };

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
    <ThemeProvider>
      <div className="app-shell">
        <Sidebar
          chats={chats}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
          onNewChat={createNewChat}
          onDeleteChat={deleteChat}
        />
        <ChatInterface
          key={activeChatId}
          chat={activeChat}
          onUpdateChat={(messages) => updateChat(activeChatId, messages)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;