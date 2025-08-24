export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
  color: string;
}