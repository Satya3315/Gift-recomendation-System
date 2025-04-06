import React, { useState, useEffect } from 'react';
import { Gift, Heart, Calendar, User, ArrowRight, ArrowLeft, RefreshCw, LogOut } from 'lucide-react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import QuestionnaireForm from './components/QuestionnaireForm';
import Suggestions from './components/Suggestions';
import Auth from './components/Auth';

function App() {
  const [session, setSession] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: '',
    relationship: '',
    age: '',
    interests: '',
    budget: '',
    personality: ''
  });

  useEffect(() => {
    if (isSupabaseConfigured()) {
      supabase!.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const {
        data: { subscription },
      } = supabase!.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const handleFormSubmit = (data: typeof formData) => {
    setFormData(data);
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      occasion: '',
      relationship: '',
      age: '',
      interests: '',
      budget: '',
      personality: ''
    });
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase!.auth.signOut();
    }
  };

  if (!session) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <Gift className="w-10 h-10 text-purple-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Perfect Gift Finder</h1>
              <p className="text-gray-600">Discover thoughtful gift ideas tailored to your loved ones</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </header>

        <div className="max-w-2xl mx-auto">
          {step === 1 ? (
            <QuestionnaireForm onSubmit={handleFormSubmit} initialData={formData} />
          ) : (
            <div>
              <Suggestions formData={formData} />
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-700 mr-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Form
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 text-purple-600 hover:text-purple-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App