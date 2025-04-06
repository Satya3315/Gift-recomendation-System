import { DeepSeek } from '@deepseek/deepseek';

const deepseek = new DeepSeek({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // We'll reuse the existing API key env variable
});

export const generateGiftSuggestions = async (formData: {
  occasion: string;
  relationship: string;
  age: string;
  interests: string;
  budget: string;
  personality: string;
}) => {
  const prompt = `Suggest 3 thoughtful gifts for a ${formData.age} year old ${formData.relationship} 
    who is ${formData.personality} and interested in ${formData.interests}. 
    The occasion is ${formData.occasion} and the budget is ${formData.budget}.
    Format the response as a JSON array with objects containing title, description, and price fields.`;

  const response = await deepseek.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: "You are a helpful gift suggestion assistant that provides specific, thoughtful gift ideas within the given budget. Always include a price and detailed description."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  const suggestions = JSON.parse(response.choices[0].message.content || "{}").suggestions;
  return suggestions.map((suggestion: any) => ({
    ...suggestion,
    image: `https://source.unsplash.com/featured/?${encodeURIComponent(suggestion.title)}`
  }));
};