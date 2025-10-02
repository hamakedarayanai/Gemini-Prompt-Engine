import React from 'react';

interface SystemPromptProps {
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  isLoading: boolean;
}

export const SystemPrompt: React.FC<SystemPromptProps> = ({ systemPrompt, setSystemPrompt, isLoading }) => {
  return (
    <div className="mt-6">
       <label htmlFor="system-prompt" className="block text-md font-semibold text-gray-300 mb-2">
            Custom System Prompt
        </label>
         <p className="text-sm text-gray-500 mb-3">
            Define the AI's persona or provide context for your prompts (e.g., 'You are a helpful assistant that speaks like a pirate.'). This will be saved for your session.
        </p>
      <textarea
        id="system-prompt"
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
        placeholder="Optional: Set a persona for the AI..."
        className="w-full h-24 p-4 rounded-lg bg-gray-900 border-2 border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none resize-none transition-colors duration-200 text-gray-200 placeholder-gray-500"
        disabled={isLoading}
        aria-label="System Prompt"
      />
    </div>
  );
};