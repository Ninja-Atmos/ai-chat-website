import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="relative bg-transparent backdrop-blur-sm p-4 rounded-t-3xl w-full">
      {/* Minimal animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/8 to-pink-500/5 animate-pulse rounded-t-3xl" />

      {/* Floating particles */}
      <div className="absolute top-2 left-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-4 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute top-1 right-1/4 w-0.5 h-0.5 bg-pink-400 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s', animationDuration: '5s' }} />

      <form onSubmit={handleSubmit} className="flex items-end gap-4 w-full max-w-none">
        <div className={`flex-1 relative transform transition-all duration-500 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
          {/* Input container with transparent styling */}
          <div className={`relative rounded-3xl transition-all duration-500 overflow-hidden ${isFocused
            ? 'shadow-2xl shadow-indigo-500/30 ring-2 ring-indigo-400/60'
            : 'shadow-lg hover:shadow-xl hover:shadow-purple-500/20'
            }`}>
            {/* Subtle border only when focused */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 ${isFocused ? 'opacity-20' : 'hover:opacity-10'
              }`} style={{ padding: '1px' }}>
              <div className="w-full h-full bg-transparent rounded-3xl" />
            </div>

            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="✨ Type your message here... (Press Enter to send, Shift+Enter for new line)"
              className="relative z-10 w-full resize-none bg-transparent text-white placeholder-indigo-300/60 rounded-3xl px-8 py-5 border-0 focus:outline-none transition-all duration-300 min-h-[70px] max-h-32 pr-20 text-lg leading-relaxed focus:text-indigo-100"
              disabled={isLoading}
              rows={1}
            />

            {/* Enhanced status indicator */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {isFocused && (
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '3s' }} />
              )}
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isLoading
                ? 'bg-yellow-400 animate-pulse'
                : message.trim()
                  ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50'
                  : 'bg-gray-500'
                }`} />
            </div>

            {/* Character count indicator */}
            {message.length > 0 && (
              <div className="absolute -bottom-6 right-2 text-xs text-gray-500 animate-fadeIn">
                {message.length} characters
              </div>
            )}
          </div>
        </div>

        {/* Enhanced send button */}
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={`relative flex-shrink-0 group overflow-hidden rounded-3xl p-4 transition-all duration-500 transform ${!message.trim() || isLoading
            ? 'opacity-50 cursor-not-allowed scale-100 bg-gradient-to-br from-gray-900/70 via-purple-900/30 to-indigo-900/40'
            : 'hover:scale-110 active:scale-95 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-2xl hover:shadow-purple-500/30'
            }`}
        >
          {/* Button background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

          {/* Button content */}
          <div className="relative z-10 flex items-center justify-center">
            {isLoading ? (
              <Loader2 size={22} className="animate-spin text-white" />
            ) : (
              <Send size={22} className="text-white group-hover:rotate-12 transition-transform duration-300" />
            )}
          </div>

          {/* Ripple effect - changed from white to cyan */}
          <div className="absolute inset-0 rounded-3xl bg-cyan-400/30 scale-0 group-active:scale-100 transition-transform duration-200" />
        </button>
      </form>

      {/* Typing indicator */}
      {isLoading && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-700/80 backdrop-blur-sm text-gray-200 text-sm px-3 py-1 rounded-full animate-bounce border border-gray-600/30 shadow-lg">
          AI is thinking...
        </div>
      )}
    </div>
  );
};

export default ChatInput;