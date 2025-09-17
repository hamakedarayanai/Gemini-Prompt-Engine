import React from 'react';
import { promptTemplates } from '../services/promptTemplates';

interface PromptTemplatesProps {
  onSelectTemplate: (template: string) => void;
  isLoading: boolean;
}

const FileTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);


export const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onSelectTemplate, isLoading }) => {
    return (
        <div className="mb-8">
             <label className="flex items-center gap-2 text-lg font-semibold text-gray-300 mb-2">
                <FileTextIcon className="w-6 h-6 text-gray-400" />
                System Prompt Templates
            </label>
            <p className="text-sm text-gray-500 mb-4">
                Select a template to instantly load a pre-configured system prompt for a specific task.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {promptTemplates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => onSelectTemplate(template.content)}
                        disabled={isLoading}
                        className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 text-left flex flex-col justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-gray-800"
                        aria-label={`Select template: ${template.title}`}
                    >
                        <div>
                            <h3 className="font-bold text-lg text-gray-100">{template.title}</h3>
                            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{template.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};