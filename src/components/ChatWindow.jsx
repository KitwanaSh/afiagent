import { useState, useRef, useEffect } from 'react';
import { FiSend, FiZap } from 'react-icons/fi';
import { API_BASE_URL } from "../config";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle input key down (Shift+Enter for new line)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to parse HTML/markdown content
  const parseContent = (content) => {
    // This is a simple parser - you might want to use a library like react-markdown for production
    return content
      .replace(/<h3>/g, '<h3 style="font-size: 1.25rem; font-weight: 600; margin: 1rem 0;">')
      .replace(/<h4>/g, '<h4 style="font-size: 1.1rem; font-weight: 600; margin: 0.8rem 0;">')
      .replace(/<ul>/g, '<ul style="margin: 0.5rem 0; padding-left: 1.5rem;">')
      .replace(/<li>/g, '<li style="margin: 0.25rem 0;">')
      .replace(/<table>/g, '<table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">')
      .replace(/<th>/g, '<th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">')
      .replace(/<td>/g, '<td style="border: 1px solid #ddd; padding: 8px;">');
  };

  // Handle sending a message to the API
  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = {
      id: Date.now(),
      content: inputValue,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create AI message placeholder
      const aiMessageId = Date.now() + 1;
      setMessages(prev => [...prev, {
        id: aiMessageId,
        content: '',
        isUser: false,
        isStreaming: true
      }]);

      // Call your API endpoint
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        // Update the message content progressively
        setMessages(prev => prev.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, content: parseContent(accumulatedContent) } 
            : msg
        ));
      }

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { ...msg, isStreaming: false } 
          : msg
      ));
    } catch (error) {
      console.error('Error calling API:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        content: `**Error**: Unable to process your request. ${error.message}`,
        isUser: false,
        isStreaming: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [inputValue]);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <FiZap className="logo-icon" />
          <span>Afiagap</span>
        </div>
      </header>

      <div className="chat-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h2 className="empty-title">Bienvenue à Afiagap Chat</h2>
            <p className="empty-subtitle">
              Démandez moi ce que vous voulez, je fairez de mon mieux pour vous aider à vos questions.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? 'message-user' : 'message-ai'}`}
            >
              <div 
                className="message-content"
                dangerouslySetInnerHTML={{ __html: message.content }}
              />
              {message.isStreaming && (
                <div className="streaming-indicator">...</div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`input-area ${messages.length === 0 ? 'input-centered' : ''}`}>
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            className="input-field"
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === '' || isLoading}
            className="send-button"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}