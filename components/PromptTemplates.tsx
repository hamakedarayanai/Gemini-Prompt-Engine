import React from 'react';
import { promptTemplates } from '../services/promptTemplates';

interface PromptTemplatesProps {
  onSelectTemplate: (template: string) => void;
  isLoading: boolean;
}

export const PromptTemplates: React.FC<PromptTemplatesProps> = ({ onSelectTemplate, isLoading }) => {
    return (
        <div>
             <label className="block text-md font-semibold text-gray-300 mb-2">
                Templates
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
                        className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 text-left flex flex-col justify-between disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-700 disabled:hover:bg-gray-800"
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