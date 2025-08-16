import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ role, content, isLatest = false }) {
  const isUser = role === "user";
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-3xl w-full px-4`}>
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-1`}>
          <div className={`text-xs font-medium ${isUser ? 'text-[#A0A0A0]' : 'text-[#7928CA]'}`}>
            {isUser ? 'You' : 'Afiagap AI'}
          </div>
        </div>
        
        <div 
          className={`rounded-xl p-4 ${isUser 
            ? 'bg-[#1E1E24] text-[#E6E6E9]' 
            : 'bg-[#141418] text-[#E6E6E9] border border-[#2A2A32]'}`}
        >
          <div className="prose prose-invert max-w-none prose-p:my-3 prose-headings:my-4 prose-ul:my-2 prose-ol:my-2 prose-li:my-1">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Paragraphs
                p: ({node, ...props}) => <p className="my-3" {...props} />,
                // Links
                a: ({node, ...props}) => (
                  <a 
                    {...props} 
                    className="text-[#9F7AEA] hover:underline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  />
                ),
                // Inline and block code
                code: ({node, inline, className, children, ...props}) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="my-2">
                      <div className="bg-[#1A1A1F] p-4 rounded-lg overflow-x-auto">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </div>
                    </div>
                  ) : (
                    <code className="bg-[#2A2A32] px-1.5 py-0.5 rounded text-[#E6E6E9]">
                      {children}
                    </code>
                  );
                },
                // Blockquotes
                blockquote: ({node, ...props}) => (
                  <blockquote 
                    className="border-l-4 border-[#7928CA] pl-4 italic text-[#A0A0A0] my-4 py-1"
                    {...props}
                  />
                ),
                // Headers
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-5 mb-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-lg font-medium mt-4 mb-2" {...props} />,
                // Lists
                ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-1" {...props} />,
                // Tables
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border-collapse" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-[#1E1E24]" {...props} />,
                th: ({node, ...props}) => <th className="border border-[#2A2A32] px-4 py-2 text-left" {...props} />,
                td: ({node, ...props}) => <td className="border border-[#2A2A32] px-4 py-2" {...props} />,
                // Horizontal rule
                hr: ({node, ...props}) => <hr className="my-6 border-[#2A2A32]" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
        
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mt-1`}>
          <div className="text-xs text-[#6B7280]">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {isLatest && (
              <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-[#1E1E24] text-[#A0A0A0]">
                Just now
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
