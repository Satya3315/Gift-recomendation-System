import React, { useState } from 'react';
import { Gift, Heart, Calendar, User, DollarSign, Brain, ArrowRight } from 'lucide-react';

interface FormData {
  occasion: string;
  relationship: string;
  age: string;
  interests: string;
  budget: string;
  personality: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
}

const QuestionnaireForm: React.FC<Props> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
      <div className="space-y-6">
        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
            <Calendar className="w-5 h-5 mr-2 text-purple-500" />
            What's the occasion?
          </label>
          <select
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select an occasion</option>
            <option value="birthday">Birthday</option>
            <option value="christmas">Christmas</option>
            <option value="anniversary">Anniversary</option>
            <option value="graduation">Graduation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
            <Heart className="w-5 h-5 mr-2 text-purple-500" />
            Relationship to recipient
          </label>
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            placeholder="e.g., Friend, Parent, Sibling"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
            <User className="w-5 h-5 mr-2 text-purple-500" />
            Age range
          </label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select age range</option>
            <option value="0-12">0-12 years</option>
            <option value="13-17">13-17 years</option>
            <option value="18-24">18-24 years</option>
            <option value="25-34">25-34 years</option>
            <option value="35-50">35-50 years</option>
            <option value="50+">50+ years</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
            <Gift className="w-5 h-5 mr-2 text-purple-500" />
            Interests & Hobbies
          </label>
          <textarea
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            placeholder="e.g., Reading, Gaming, Cooking"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            required
            rows={3}
          />
        </div>

        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
            <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
            Budget Range
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select budget range</option>
            <option value="0-2000">₹0-₹2,000</option>
            <option value="2000-4000">₹2,000-₹4,000</option>
            <option value="4000-8000">₹4,000-₹8,000</option>
            <option value="8000-20000">₹8,000-₹20,000</option>
            <option value="20000+">₹20,000+</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
            <Brain className="w-5 h-5 mr-2 text-purple-500" />
            Personality Traits
          </label>
          <textarea
            name="personality"
            value={formData.personality}
            onChange={handleChange}
            placeholder="e.g., Adventurous, Creative, Practical"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            required
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
        >
          Get Gift Suggestions
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </form>
  );
};

export default QuestionnaireForm;