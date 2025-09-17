
import React from 'react';

interface SystemPromptProps {
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  isLoading: boolean;
}

const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0H3m18 0h-1.5m-15 0H3m18 0h-1.5M12 4.5v1.5m0 12V18m-4.036-9.964l-1.06-1.06M17.096 17.096l-1.06-1.06M4.94 17.096l1.06-1.06M18.156 5.964l-1.06 1.06M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
);


export const SystemPrompt: React.FC<SystemPromptProps> = ({ systemPrompt, setSystemPrompt, isLoading }) => {
  return (
    <div className="mb-6">
        <label htmlFor="system-prompt" className="flex items-center gap-2 text-lg font-semibold text-gray-300 mb-2">
            <CogIcon className="w-6 h-6 text-gray-400" />
            System Prompt
        </label>
         <p className="text-sm text-gray-500 mb-3">
            Define the AI's persona or provide context for all your prompts (e.g., 'You are a helpful assistant that speaks like a pirate.'). This will be saved for your session.
        </p>
      <textarea
        id="system-prompt"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
        placeholder="Optional: Set a persona for the AI..."
        className="w-full h-24 p-4 rounded-lg bg-gray-800 border-2 border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none resize-none transition-colors duration-200 text-gray-200 placeholder-gray-500"
        disabled={isLoading}
        aria-label="System Prompt"
      />
    </div>
  );
};
