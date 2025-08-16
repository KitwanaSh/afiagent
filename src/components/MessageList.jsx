import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, loading }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full py-6 px-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-[#A0A0A0] text-sm">Start a new conversation</p>
          </div>
        ) : (
          <div className="space-y-8">
            {messages.map((msg, idx) => (
              <div key={idx} className="scroll-mt-32">
                <MessageBubble 
                  role={msg.role} 
                  content={msg.content} 
                  isLatest={idx === messages.length - 1}
                />
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-3xl w-full px-4">
                  <div className="text-xs font-medium text-[#7928CA] mb-1">
                    Afiagap AI
                  </div>
                  <div className="bg-[#141418] text-[#E6E6E9] rounded-xl p-4 border border-[#2A2A32]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#7928CA] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#7928CA] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#7928CA] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
