export default function Sidebar({ onToggleSidebar, isOpen }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header with close button for mobile */}
      <div className="p-4 flex items-center justify-between border-b border-[#2A2A32]">
        <h2 className="text-lg font-semibold text-white">Afiagap</h2>
        <button 
          onClick={onToggleSidebar}
          className="md:hidden p-1 rounded-full hover:bg-[#2A2A32]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-[#7928CA] hover:bg-[#6c21b8] text-white py-2.5 px-4 rounded-lg transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nouvelle conversation
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto px-2">
        <p className="px-3 py-2 text-xs font-medium text-[#A0A0A0] uppercase tracking-wider">
          Historique
        </p>
        <ul className="space-y-1">
          {/* Example chat history items */}
          <li className="px-3 py-2.5 rounded-lg hover:bg-[#1E1E24] text-[#E6E6E6] cursor-pointer flex items-center">
            <svg className="w-4 h-4 mr-2 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span className="truncate">Comment puis-je vous aider ?</span>
          </li>
          <li className="px-3 py-2.5 rounded-lg bg-[#1E1E24] text-[#E6E6E6] cursor-pointer flex items-center">
            <svg className="w-4 h-4 mr-2 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span className="truncate">Nouvelle conversation</span>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#2A2A32] text-sm text-[#A0A0A0]">
        <div className="flex items-center justify-between mb-2">
          <span>Version 1.0.0</span>
          <span> 2025 Afiagap</span>
        </div>
        <div className="text-xs">
          <p>Powered by AI</p>
        </div>
      </div>
    </div>
  );
}