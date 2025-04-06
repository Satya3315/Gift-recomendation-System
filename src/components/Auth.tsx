import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Lock, Mail, User, AlertCircle } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Supabase Configuration Required
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>Please follow these steps to set up Supabase:</p>
              <ol className="text-left list-decimal list-inside space-y-2">
                <li>Click the "Connect to Supabase" button in the top right corner</li>
                <li>Follow the setup process to create a new project</li>
                <li>Wait for the environment variables to be configured automatically</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error: authError } = isSignUp
        ? await supabase!.auth.signUp({ email, password })
        : await supabase!.auth.signInWithPassword({ email, password });

      if (authError) throw authError;
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <User className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isSignUp ? 'Sign up to get started' : 'Sign in to continue'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Lock className="w-4 h-4 mr-2" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 hover:text-purple-700"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;