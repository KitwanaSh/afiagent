import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend({ role: "user", content: input });
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <form onSubmit={handleSend} className="w-full">
      <div className="relative flex items-end p-2 bg-[#0f0f13] border-t border-[#2A2A32]">
        <div className="flex-1 flex items-end bg-[#1E1E24] rounded-xl border border-[#2A2A32] focus-within:border-[#7928CA] transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="flex-1 bg-transparent border-none resize-none max-h-[200px] py-3 px-4 text-[#E6E6E9] placeholder-[#6B7280] focus:ring-0 focus:outline-none text-sm"
            placeholder="Message Afiagap AI..."
            rows={1}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 transparent',
              overflow: 'hidden',
            }}
          />
          
          <button
            type="submit"
            disabled={disabled || !input.trim()}
            className="self-end m-2 p-2 rounded-full text-[#9CA3AF] hover:text-[#E6E6E9] hover:bg-[#2A2A32] disabled:opacity-50 disabled:bg-transparent disabled:cursor-not-allowed"
            title="Send message"
          >
            <svg 
              className={`w-5 h-5 ${!disabled && input.trim() ? 'text-[#7928CA]' : ''}`} 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="px-4 py-2 text-xs text-center text-[#6B7280] bg-[#0f0f13] border-t border-[#2A2A32]">
        <p>Free Research Preview. Afiagap AI may produce inaccurate information.</p>
      </div>
    </form>
  );
}
