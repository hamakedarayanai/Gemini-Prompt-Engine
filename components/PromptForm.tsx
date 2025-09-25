
import React from 'react';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.949a.75.75 0 0 0 .95.826L11.25 9.25v1.5L4.643 11.98a.75.75 0 0 0-.95.826l-1.414 4.949a.75.75 0 0 0 .826.95l14.25-5.25a.75.75 0 0 0 0-1.4l-14.25-5.25Z" />
    </svg>
);

const ClearIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
);


export const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your prompt here... e.g., 'Write a short story about a robot who discovers music.'"
        className="w-full h-32 p-4 pr-[180px] rounded-lg bg-gray-800 border-2 border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none resize-none transition-colors duration-200 text-gray-200 placeholder-gray-500"
        disabled={isLoading}
        aria-label="Prompt input"
      />
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-2">
        {prompt && !isLoading && (
          <button
            type="button"
            onClick={() => setPrompt('')}
            className="p-1 text-gray-500 hover:text-gray-200 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Clear prompt"
          >
            <ClearIcon className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          <SendIcon className="w-5 h-5" />
          {isLoading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    </div>
  );
};
