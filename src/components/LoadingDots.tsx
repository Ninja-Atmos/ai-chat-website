import React from 'react';
import { Bot } from 'lucide-react';

const LoadingDots: React.FC = () => {
  return (
    <div className="flex justify-start mb-6 animate-slideInUp">
      <div className="flex items-start max-w-[80%] gap-3">
        {/* Animated avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 shadow-lg animate-float">
          <Bot size={18} className="text-white" />
        </div>
        
        {/* Enhanced loading bubble */}
        <div className="relative px-5 py-4 rounded-3xl bg-gradient-to-r from-gray-800/95 via-gray-700/95 to-gray-800/95 text-gray-100 border border-gray-500/40 shadow-2xl shadow-gray-500/20 backdrop-blur-md">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-blue-500/20 blur-sm animate-pulse" />
          
          <div className="relative z-10 flex items-center gap-2">
            {/* Enhanced typing indicator */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            
            {/* Text indicator */}
            <span className="text-sm text-gray-400 ml-2 animate-pulse">AI is typing...</span>
          </div>
          
          {/* Enhanced chat bubble tail */}
          <div className="absolute w-4 h-4 transform rotate-45 bg-gradient-to-r from-gray-700 to-gray-800 -left-2 top-5 shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default LoadingDots;