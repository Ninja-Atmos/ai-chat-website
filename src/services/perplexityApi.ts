const API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/chat/completions';

export const sendMessageToPerplexity = async (message: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error('Perplexity API key is not configured. Please check your environment variables.');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          {
            role: 'system',
            content: 'You are a professional AI assistant. Provide clear, concise, and accurate responses. Use professional language and avoid markdown formatting. For letters and emails, structure them with proper line breaks: Subject on its own line, greeting on a new line, each paragraph separated, and closing on a new line. Keep responses informative but conversational.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.2,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    let content = data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
    
    // Clean up the response to make it more professional
    content = content
      // Remove markdown bold formatting
      .replace(/\*\*(.*?)\*\*/g, '$1')
      // Remove citation numbers like [1], [2], etc.
      .replace(/\[\d+\]/g, '')
      // Remove extra whitespace and line breaks
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
    
    // NEW: Simple letter formatting function
    if (content.includes('Subject:') && content.includes('Dear')) {
      // Split the content into sections and add line breaks
      let formattedContent = '';
      
      // Add line break before Subject
      if (content.includes('Subject:')) {
        formattedContent = content.replace('Subject:', '\n\nSubject:');
      }
      
      // Add line break before Dear
      if (formattedContent.includes('Dear')) {
        formattedContent = formattedContent.replace('Dear', '\n\nDear');
      }
      
      // Add line break before Best regards
      if (formattedContent.includes('Best regards,')) {
        formattedContent = formattedContent.replace('Best regards,', '\n\nBest regards,');
      }
      
      // Add line break before Yours sincerely
      if (formattedContent.includes('Yours sincerely,')) {
        formattedContent = formattedContent.replace('Yours sincerely,', '\n\nYours sincerely,');
      }
      
      // Add line breaks after sentences (periods followed by capital letters)
      formattedContent = formattedContent.replace(/([.!?])\s+([A-Z])/g, '$1\n\n$2');
      
      // Clean up multiple line breaks
      formattedContent = formattedContent.replace(/\n{3,}/g, '\n\n');
      
      // If we made changes, use the formatted version
      if (formattedContent !== content) {
        content = formattedContent.trim();
      }
    }
    
    return content;
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    throw new Error('Failed to get response from AI. Please try again.');
  }
};