import React, { useState } from 'react';

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m18 0h-1.5m-15 0H3m18 0h-1.5m-15 0H3m18 0h-1.5M12 4.5v1.5m0 12V18m-4.036-9.964l-1.06-1.06M17.096 17.096l-1.06-1.06M4.94 17.096l1.06-1.06M18.156 5.964l-1.06 1.06M12 6.75a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5ZM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
    </svg>
);


interface ConfigurationProps {
  children: React.ReactNode;
  isSystemPromptSet: boolean;
}

export const Configuration: React.FC<ConfigurationProps> = ({ children, isSystemPromptSet }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl mb-8 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4"
        aria-expanded={isOpen}
        aria-controls="config-panel"
      >
        <div className="flex items-center gap-3">
            <CogIcon className="w-6 h-6 text-gray-400" />
            <span className="text-lg font-semibold text-gray-200">AI Configuration</span>
            {isSystemPromptSet && !isOpen && (
                <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">
                    Custom Persona Active
                </span>
            )}
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        id="config-panel"
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <div className="p-4 border-t border-gray-700">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};
