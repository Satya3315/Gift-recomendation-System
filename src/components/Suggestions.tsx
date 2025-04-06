import React from 'react';
import { Gift, Tag, ShoppingBag } from 'lucide-react';
import { generateGiftSuggestions } from '../lib/openai';

interface SuggestionProps {
  formData: {
    occasion: string;
    relationship: string;
    age: string;
    interests: string;
    budget: string;
    personality: string;
  };
}

const Suggestions: React.FC<SuggestionProps> = ({ formData }) => {
  const [suggestions, setSuggestions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await generateGiftSuggestions(formData);
        setSuggestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [formData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gift Suggestions</h2>
        <div className="grid gap-6">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="md:w-1/3">
                <img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">{suggestion.title}</h3>
                <p className="text-gray-600">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-purple-600 font-medium">
                    <Tag className="w-4 h-4 mr-2" />
                    {suggestion.price}
                  </span>
                  <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-2">Why these suggestions?</h3>
        <p className="text-purple-700">
          Based on the recipient being a {formData.relationship} who is {formData.personality}, 
          with interests in {formData.interests}, we've selected gifts that align with their 
          preferences while staying within your budget of {formData.budget}.
        </p>
      </div>
    </div>
  );
};

export default Suggestions;