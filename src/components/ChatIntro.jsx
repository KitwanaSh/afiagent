export default function ChatIntro() {
  const suggestions = [
    "Comment puis-je vous aider aujourd'hui ?",
    "Pales mois de la monkeypox en RDC",
    "La monkeypox est-elle contagieuse ?",
    "Qu'est-ce qui cause la fièvre jaune ?"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#E6E6E9] mb-4">
          Bienvenue sur <span className="text-[#9F7AEA]">Afiagap AI</span>
        </h1>
        <p className="text-lg text-[#A0A0A0] max-w-2xl">
          Je suis votre assistant IA COSAMED. Posez-moi des questions, discutez avec moi ou explorez des idées. 
          Comment puis-je vous aider aujourd'hui ?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="p-4 text-left rounded-xl border border-[#2A2A32] bg-[#141418] hover:bg-[#1E1E24] transition-colors duration-200 text-[#E6E6E9]"
            onClick={() => {
              // This would typically trigger a search with the suggestion
              console.log('Selected suggestion:', suggestion);
            }}
          >
            <div className="flex items-start">
              <div className="p-1.5 rounded-md bg-[#7928CA] mr-3 mt-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <span>{suggestion}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-[#6B7280]">
        <p>Free Research Preview. Afiagap AI may produce inaccurate information.</p>
        <p className="mt-2">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}