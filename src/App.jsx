import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatIntro from "./components/ChatIntro";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

// Grok-inspired color palette
const theme = {
  background: "#0f0f13",
  sidebar: "#141418",
  primary: "#7928CA",
  primaryHover: "#6c21b8",
  textPrimary: "#E6E6E6",
  textSecondary: "#A0A0A0",
  userMessageBg: "#1E1E24",
  assistantMessageBg: "#141418",
  border: "#2A2A32",
  inputBg: "#1E1E24",
  inputBorder: "#2A2A32",
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = async (msg) => {
    // Add user message
    setMessages((prev) => [...prev, msg]);
    
    // Add an empty assistant message that we'll update with the stream
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);
    setLoading(true);
    
    try {
      const response = await fetch("https://medcongo.afiagap.com:8084/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: msg.content,
          user_id: "test_user_6",
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur API");
      }
      
      // Handle the streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantMessage = "";
      
      // Function to update the last message with the new content
      const updateAssistantMessage = (newContent) => {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessageIndex = newMessages.length - 1;
          
          if (lastMessageIndex >= 0 && newMessages[lastMessageIndex].role === "assistant") {
            newMessages[lastMessageIndex] = {
              ...newMessages[lastMessageIndex],
              content: newContent
            };
          } else {
            newMessages.push({ role: "assistant", content: newContent });
          }
          
          return newMessages;
        });
      };
      
      // Process the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Decode the chunk and add to the message
        const chunk = decoder.decode(value, { stream: true });
        assistantMessage += chunk;
        
        // Update the UI with the new content
        updateAssistantMessage(assistantMessage);
        
        // Small delay to allow the UI to update
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Erreur: impossible de contacter le serveur.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0f0f13] text-[#E6E6E6] overflow-hidden">
      {/* Sidebar with toggle */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-0'} 
                  bg-[#141418] 
                  transition-all duration-300 
                  overflow-hidden 
                  flex-shrink-0 
                  border-r border-[#2A2A32]`}
      >
        <Sidebar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile header with sidebar toggle */}
        <div className="md:hidden p-4 border-b border-[#2A2A32] flex items-center">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-[#1E1E24]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Afiagap Chat</h1>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {messages.length === 0 ? (
            <ChatIntro />
          ) : (
            <MessageList messages={messages} loading={loading} />
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-[#2A2A32] p-4">
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </div>
  );
}