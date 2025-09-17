
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
);


export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="w-full flex items-center gap-4 bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-lg animate-fade-in">
        <ErrorIcon className="w-8 h-8 text-red-400 flex-shrink-0"/>
        <div>
            <h3 className="font-bold">An Error Occurred</h3>
            <p className="text-sm">{message}</p>
        </div>
    </div>
  );
};
