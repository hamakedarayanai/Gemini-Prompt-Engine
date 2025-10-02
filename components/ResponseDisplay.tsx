import React, { useState, useEffect, useRef } from 'react';
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
  const responseRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
  };
  
  useEffect(() => {
    if (responseRef.current && viewMode === 'preview') {
      const codeBlocks = responseRef.current.querySelectorAll('pre');
      codeBlocks.forEach(block => {
        if (block.querySelector('.code-block-header')) return; // Avoid duplicates

        const codeEl = block.querySelector('code');
        const codeText = codeEl ? codeEl.innerText : '';
        const lang = codeEl?.className.match(/language-(\w+)/)?.[1] || 'code';

        const header = document.createElement('div');
        header.className = 'code-block-header';
        
        const langName = document.createElement('span');
        langName.innerText = lang;
        langName.className = 'code-lang-name';
        
        const button = document.createElement('button');
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg> Copy`;
        button.className = 'copy-code-btn';

        button.onclick = () => {
          navigator.clipboard.writeText(codeText);
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1 text-green-400"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg> Copied!`;
          setTimeout(() => {
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 0 1-2.25 2.25H9a2.25 2.25 0 0 1-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" /></svg> Copy`;
          }, 2000);
        };
        
        header.appendChild(langName);
        header.appendChild(button);
        block.prepend(header);
      });
    }
  }, [response, viewMode]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const parsedHtml = marked.parse(response) as string;
  
  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-xl p-6 relative shadow-lg animate-fade-in">
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
          ref={responseRef}
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

  /* Improved Prose Styles */
  .prose {
      line-height: 1.7;
  }
  .prose h1, .prose h2, .prose h3 {
      font-weight: 700;
  }
  .prose a {
      color: #a78bfa; /* Tailwind violet-400 */
      text-decoration: none;
      transition: color 0.2s;
  }
  .prose a:hover {
      color: #c4b5fd; /* Tailwind violet-300 */
      text-decoration: underline;
  }
  .prose blockquote {
      border-left-color: #6d28d9; /* Tailwind violet-700 */
      font-style: normal;
  }

  /* Atom One Dark Theme for code blocks */
  .prose pre {
    position: relative;
    background-color: #282c34 !important;
    border: 1px solid #4b5563; /* Tailwind gray-600 */
    border-radius: 0.5rem;
    padding-top: 2.5rem !important; /* Make space for header */
  }
  .prose pre code.hljs {
    background-color: transparent !important;
    padding: 0;
  }
  .code-block-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background-color: #353b45;
    border-bottom: 1px solid #4b5563;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  .code-lang-name {
      font-family: monospace;
      font-size: 0.8rem;
      color: #9ca3af; /* Tailwind gray-400 */
      text-transform: uppercase;
  }
  .copy-code-btn {
    display: flex;
    align-items: center;
    background-color: #4b5563;
    color: #d1d5db; /* Tailwind gray-300 */
    border: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .copy-code-btn:hover {
    background-color: #6b7280; /* Tailwind gray-500 */
  }
`;
document.head.appendChild(style);