
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
);

const RetryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001a7.5 7.5 0 0 1-1.066 2.593l-2.256 3.011a15.004 15.004 0 0 1-1.066 2.593c-1.858 2.477-4.542 3.84-7.498 3.84-3.56 0-6.78-1.954-8.498-4.998a.757.757 0 0 1 .01-1.05zM4.982 8.652a7.5 7.5 0 0 1 1.066-2.593l2.256-3.011a15.004 15.004 0 0 1 1.066-2.593c1.858-2.477 4.542-3.84 7.498-3.84 3.56 0 6.78 1.954 8.498 4.998a.757.757 0 0 1-.01 1.05z" />
    </svg>
);


export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-lg animate-fade-in flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <ErrorIcon className="w-8 h-8 text-red-400 flex-shrink-0 mt-1 sm:mt-0"/>
        <div className="flex-grow">
            <h3 className="font-bold">An Error Occurred</h3>
            <p className="text-sm">{message}</p>
        </div>
        {onRetry && (
            <button
                onClick={onRetry}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 self-start sm:self-center"
                aria-label="Retry request"
            >
                <RetryIcon className="w-4 h-4" />
                Retry
            </button>
        )}
    </div>
  );
};