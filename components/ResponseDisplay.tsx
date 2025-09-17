
import React, { useState, useEffect } from 'react';

interface ResponseDisplayProps {
  response: string;
}

const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);


export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-6 relative shadow-lg animate-fade-in">
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200"
        aria-label="Copy to clipboard"
      >
        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
      </button>
      <h2 className="text-xl font-bold mb-4 text-purple-400">Generated Response</h2>
      <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
        {response}
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config if possible, or define in a style tag. 
// For this single-file setup, we can inject it via JS or rely on a custom tailwind.config.js.
// Since we can't do that, we can add a small style block in index.html or rely on a simple opacity transition.
// Let's add an animation class to the component itself for simplicity.

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
