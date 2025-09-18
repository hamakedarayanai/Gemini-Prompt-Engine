import React, { useState, useEffect } from 'react';
import { marked } from 'marked';

// TypeScript declaration for the global hljs object from highlight.js
declare const hljs: any;

// FIX: The `highlight` property in `marked.setOptions` is deprecated and does not exist on the type `MarkedOptions`.
// Replaced the deprecated `highlight` option with the modern `marked.use()` API to provide a custom renderer for code blocks.
// This integrates highlight.js for syntax highlighting.
marked.use({
  renderer: {
    code(code: string, lang: string | undefined): string | false {
      if (typeof hljs !== 'undefined') {
        const language = (lang && hljs.getLanguage(lang)) ? lang : 'plaintext';
        try {
          const highlightedCode = hljs.highlight(code, { language, ignoreIllegals: true }).value;
          return `<pre><code class="hljs language-${language}">${highlightedCode}</code></pre>`;
        } catch (error) {
          console.error('highlight.js error:', error);
        }
      }
      // Return false to use the default renderer if highlight.js is not available or an error occurs.
      return false;
    }
  }
});

// Configure marked options.
marked.setOptions({
    gfm: true,
    breaks: true,
});

interface ResponseDisplayProps {
  response: string;
  isLoading: boolean; // To show typing cursor during streaming
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


export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

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

  const parsedHtml = marked.parse(response) as string;
  
  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-lg p-6 relative shadow-lg animate-fade-in">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <div className="flex items-center rounded-md bg-gray-700/50 p-1 text-sm font-medium">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
              viewMode === 'preview' 
              ? 'bg-purple-600 text-white shadow' 
              : 'text-gray-400 hover:bg-gray-600'
            }`}
            aria-pressed={viewMode === 'preview'}
          >
            Preview
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`px-3 py-1 rounded-md transition-colors duration-200 ${
              viewMode === 'raw' 
              ? 'bg-purple-600 text-white shadow' 
              : 'text-gray-400 hover:bg-gray-600'
            }`}
            aria-pressed={viewMode === 'raw'}
          >
            Raw
          </button>
        </div>

        <button 
          onClick={handleCopy}
          className="p-2 rounded-md bg-gray-700/50 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-200"
          aria-label="Copy to clipboard"
        >
          {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ClipboardIcon className="w-5 h-5" />}
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4 text-purple-400">Generated Response</h2>
      
      {viewMode === 'preview' ? (
        <div 
          className="prose prose-invert max-w-none text-gray-300"
          dangerouslySetInnerHTML={{ __html: parsedHtml + (isLoading ? '<span class="typing-cursor"></span>' : '') }}
        />
      ) : (
        <pre className="w-full bg-gray-900/50 p-4 rounded-md overflow-x-auto text-gray-300 whitespace-pre-wrap break-words font-mono text-sm">
          <code>
            {response}
            {isLoading && <span className="typing-cursor"></span>}
          </code>
        </pre>
      )}
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
  .typing-cursor {
    display: inline-block;
    width: 0.5em;
    height: 1.1em;
    background-color: #c084fc; /* Tailwind purple-400 */
    animation: blink 1s step-end infinite;
    vertical-align: bottom;
    margin-left: 2px;
  }
  @keyframes blink {
    from, to { background-color: transparent; }
    50% { background-color: #c084fc; } /* Tailwind purple-400 */
  }
  /* Improve prose styles for code blocks to match atom-one-dark */
  .prose code {
    background-color: #2c313a !important;
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    border-radius: 6px;
  }
  .prose pre {
    background-color: #282c34 !important;
    border: 1px solid #4b5563; /* Tailwind gray-600 */
  }
  .prose pre code {
    background-color: transparent !important;
    padding: 0;
  }
`;
document.head.appendChild(style);