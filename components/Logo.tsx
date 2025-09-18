
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className={className}
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#c084fc' }} /> 
                <stop offset="50%" style={{ stopColor: '#ec4899' }} /> 
                <stop offset="100%" style={{ stopColor: '#ef4444' }} />
            </linearGradient>
        </defs>
        <path 
            fillRule="evenodd" 
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9.696 9.68a.75.75 0 0 0 0 1.06l1.06 1.06a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 0 1.06 1.06l1.06-1.06a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 0 1.06-1.06l-1.06-1.06a.75.75 0 0 1 0-1.06l1.06-1.06a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 0-1.06 0Z" 
            clipRule="evenodd"
            fill="url(#logo-gradient)"
        />
        <path d="m11.164 15.424.815.815.215.215a.75.75 0 0 1-1.06 1.06l-.215-.215-.815-.815a4.5 4.5 0 0 1-1.8-6.669.75.75 0 1 1 1.248.832 3 3 0 0 0 1.2 4.442Z" fill="url(#logo-gradient)" opacity="0.7" />
        <path d="M12.836 8.576l-.815-.815-.215-.215a.75.75 0 0 1 1.06-1.06l.215.215.815.815a4.5 4.5 0 0 1 1.8 6.669.75.75 0 1 1-1.248-.832 3 3 0 0 0-1.2-4.442Z" fill="url(#logo-gradient)" opacity="0.7" />
    </svg>
);
