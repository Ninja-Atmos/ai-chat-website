import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isTyping = false }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isUser = message.role === 'user';

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
    
    if (message.role === 'assistant' && !isTyping) {
      const timer = setInterval(() => {
        if (currentIndex < message.content.length) {
          setDisplayText(message.content.slice(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    } else if (message.role === 'user') {
      setDisplayText(message.content);
    }
  }, [message.content, currentIndex, message.role, isTyping]);

  // Function to parse content and extract code blocks
  const parseContent = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content }];
  };

  // Function to format letter content with proper line breaks
  const formatLetterContent = (text: string) => {
    if (!text.includes('Subject:') || !text.includes('Dear')) {
      return text;
    }

    let formatted = text;
    
    // Add line breaks before key elements
    formatted = formatted
      .replace(/Subject:/g, '\n\nSubject:')
      .replace(/Dear/g, '\n\nDear')
      .replace(/Best regards,/g, '\n\nBest regards,')
      .replace(/Yours sincerely,/g, '\n\nYours sincerely,')
      .replace(/Sincerely,/g, '\n\nSincerely,');
    
    // Add line breaks after sentences
    formatted = formatted.replace(/([.!?])\s+([A-Z])/g, '$1\n\n$2');
    
    // Clean up multiple line breaks
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    return formatted.trim();
  };

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        animationDelay: `${message.role === 'user' ? 0 : 0.1}s`
      }}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%] gap-3`}>
        {/* Avatar with floating animation */}
        <div 
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600' 
              : 'bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600'
          } shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-2xl ${
            isUser ? 'hover:shadow-purple-500/50' : 'hover:shadow-blue-500/50'
          } animate-float`}
          style={{
            animation: 'float 3s ease-in-out infinite',
            animationDelay: `${message.role === 'user' ? 0 : 0.5}s`
          }}
        >
          {isUser ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
        </div>
        
        {/* Enhanced Chat Bubble */}
        <div 
          className={`relative px-5 py-4 rounded-3xl shadow-2xl backdrop-blur-md border transition-all duration-500 ${
            isUser 
              ? 'bg-gradient-to-r from-purple-500/95 via-pink-500/95 to-purple-600/95 text-white border-purple-300/40 shadow-purple-500/30 hover:shadow-3xl hover:scale-105 transform-gpu' 
              : 'bg-gradient-to-r from-gray-800/95 via-gray-700/95 to-gray-800/95 text-gray-100 border-gray-500/40 shadow-gray-500/20 hover:shadow-xl hover:scale-[1.02] transform-gpu'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            boxShadow: isHovered 
              ? isUser 
                ? '0 25px 50px -12px rgba(147, 51, 234, 0.4), 0 0 0 1px rgba(147, 51, 234, 0.1)' 
                : '0 15px 30px -12px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.05)'
              : undefined
          }}
        >
          {/* Glowing border effect */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${
            isUser 
              ? 'from-purple-400/20 via-pink-400/20 to-purple-500/20' 
              : 'from-blue-400/10 via-indigo-400/10 to-blue-500/10'
          } blur-sm opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : ''}`} />
          
          <div className="relative z-10">
            {isUser ? (
              <div className="font-medium">{displayText}</div>
            ) : (
              parseContent(displayText).map((part, index) => (
                <React.Fragment key={index}>
                  {part.type === 'text' ? (
                    <span style={{ whiteSpace: 'pre-wrap' }} className="leading-relaxed">
                      {formatLetterContent(part.content)}
                    </span>
                  ) : (
                    <CodeBlock code={part.content} language={part.language} />
                  )}
                </React.Fragment>
              ))
            )}
            
            {/* Enhanced typing indicator */}
            {message.role === 'assistant' && currentIndex < message.content.length && (
              <span className="inline-block w-1 h-5 bg-gradient-to-b from-indigo-400 to-purple-400 ml-2 animate-pulse rounded-full" />
            )}
          </div>
          
          {/* Enhanced chat bubble tail */}
          <div className={`absolute w-4 h-4 transform rotate-45 ${
            isUser 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 -right-2 top-5' 
              : 'bg-gradient-to-r from-gray-700 to-gray-800 -left-2 top-5'
          } shadow-lg`} />
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;