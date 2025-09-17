
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ResponseDisplay } from './components/ResponseDisplay';
import { Loader } from './components/Loader';
import { ErrorDisplay } from './components/ErrorDisplay';
import { generateText } from './services/geminiService';
import { SystemPrompt } from './components/SystemPrompt';
import { PromptTemplates } from './components/PromptTemplates';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [systemPrompt, setSystemPrompt] = useState<string>(() => {
    return localStorage.getItem('gemini-system-prompt') || '';
  });
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('gemini-system-prompt', systemPrompt);
  }, [systemPrompt]);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const result = await generateText(prompt, systemPrompt);
      setResponse(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, systemPrompt, isLoading]);
  
  const handleSelectTemplate = useCallback((template: string) => {
    setSystemPrompt(template);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Header />
        
        <main className="mt-8">
           <PromptTemplates
             onSelectTemplate={handleSelectTemplate}
             isLoading={isLoading}
           />
           <SystemPrompt
            systemPrompt={systemPrompt}
            setSystemPrompt={setSystemPrompt}
            isLoading={isLoading}
          />
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerate}
            isLoading={isLoading}
          />

          <div className="mt-8 min-h-[200px] flex items-center justify-center">
            {isLoading && <Loader />}
            {error && <ErrorDisplay message={error} />}
            {response && !isLoading && <ResponseDisplay response={response} />}
          </div>
        </main>
        
        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>Powered by Gemini. Built by a World-Class Senior Frontend React Engineer.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
