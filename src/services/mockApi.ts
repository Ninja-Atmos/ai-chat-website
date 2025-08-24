// Mock API service for testing without external API key
const mockResponses = [
  "Hello! I'm a mock AI assistant. How can I help you today?",
  "That's an interesting question! Let me think about that...",
  "I understand what you're asking. Here's what I think...",
  "Great question! Based on my knowledge, I would say...",
  "Thanks for sharing that with me. Here's my perspective...",
  "I'm here to help! What would you like to know more about?",
  "That's a fascinating topic. Let me break it down for you...",
  "I appreciate you asking that. Here's what I can tell you...",
  "Interesting point! Let me provide some insights on that...",
  "I'm glad you brought that up. Here's my take on it..."
];

const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * mockResponses.length);
  return mockResponses[randomIndex];
};

// Simulate API delay
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const sendMessageToMockAI = async (message: string): Promise<string> => {
  // Simulate network delay
  await simulateDelay(1000 + Math.random() * 2000);
  
  // Generate a contextual response based on the message
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! 👋 I'm your AI assistant. How can I help you today?";
  }
  
  if (lowerMessage.includes('how are you')) {
    return "I'm doing great, thank you for asking! I'm here and ready to help you with any questions you might have.";
  }
  
  if (lowerMessage.includes('weather')) {
    return "I'd be happy to help with weather information! However, I'm currently running in mock mode. In a real implementation, I could fetch current weather data for you.";
  }
  
  if (lowerMessage.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}. Is there anything specific you'd like to know about time or scheduling?`;
  }
  
  if (lowerMessage.includes('help')) {
    return "I'm here to help! I can assist with questions, provide information, or just chat. What would you like to know?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know?";
  }
  
  // Default response with some context from the user's message
  const baseResponse = getRandomResponse();
  return `${baseResponse} I noticed you mentioned "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}". That's a great topic to explore!`;
};
