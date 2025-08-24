import React, { useState, useRef, useEffect } from 'react';
import { Message } from './types';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import LoadingDots from './components/LoadingDots';
import WelcomeScreen from './components/WelcomeScreen';

import ParticleBackground from './components/ParticleBackground';
import { sendMessageToPerplexity } from './services/perplexityApi';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0.3); // Start with a consistent value
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      // Only track scroll on welcome screen
      if (showWelcome) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.max(0, Math.min(1, scrollTop / Math.max(1, docHeight)));
        setScrollProgress(scrollPercent);
      }
    };

    if (showWelcome) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initialize scroll progress for welcome screen
      handleScroll();
    } else {
      // Keep a consistent scroll progress for chat screen
      setScrollProgress(0.3);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showWelcome]);





  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessageToPerplexity(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your message. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = () => {
    setShowWelcome(false);
  };

  const handleBackToHome = () => {
    setShowWelcome(true);
  };



  return (
    <>
      {/* Full coverage background */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none bg-gray-900"
        style={{
          width: '100vw',
          height: '100vh',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />

      <div
        className="relative bg-gray-900 overflow-hidden"
        style={{
          width: '100vw',
          minHeight: '100vh'
        }}
      >
        <ParticleBackground />

        {/* Welcome Screen */}
        <div className={`absolute inset-0 w-full overflow-y-auto overflow-x-hidden scrollbar-hide ${showWelcome ? 'block' : 'hidden'}`} style={{ minHeight: '100vh' }}>
          <WelcomeScreen onStartChat={handleStartChat} />
        </div>

        {/* Chat Screen */}
        <div className={`absolute inset-0 w-full h-screen flex flex-col ${!showWelcome ? 'block' : 'hidden'}`}>
          {/* Header */}
          <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 p-4 z-10 flex-shrink-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <div className="w-4 h-4 bg-cyan-300 rounded-sm" />
                </div>
                <h1 className="text-xl font-bold text-white">AI Chat</h1>
              </div>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col max-w-7xl mx-auto min-h-0 w-full px-4">
            <div className="flex-1 overflow-y-auto px-4 py-6 pb-32">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-red-300 animate-fadeIn">
                  {error}
                </div>
              )}

              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isLoading && <LoadingDots />}
              <div ref={messagesEndRef} />
            </div>
          </div>



          {/* Floating Back to Home Button */}
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={handleBackToHome}
              className="group relative overflow-hidden rounded-full p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 active:scale-95"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 scale-0 group-active:scale-100 transition-transform duration-200" />

              {/* Icon */}
              <div className="relative z-10">
                <svg
                  className="w-6 h-6 text-white transform group-hover:rotate-180 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '2s' }} />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '1s', animationDuration: '3s' }} />
            </button>

            {/* Tooltip */}
            <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-gray-900/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap backdrop-blur-sm border border-gray-700/50">
              Back to Home
              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-900/90 transform rotate-45 border-l border-t border-gray-700/50" />
            </div>
          </div>
        </div>

        {/* Fixed Chat Input - completely independent, only shows in chat mode */}
        {!showWelcome && (
          <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 pointer-events-auto">
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
          </div>
        )}


      </div>
    </>
  );
}

export default App;