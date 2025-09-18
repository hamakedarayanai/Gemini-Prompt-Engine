
import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center gap-4">
        <Logo className="w-12 h-12" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Gemini Prompt Engine
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
        Unleash your creativity. Provide any custom prompt and watch the AI bring your ideas to life with state-of-the-art text generation.
      </p>
    </header>
  );
};
