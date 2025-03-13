'use client';

import { useState } from 'react';
import { KeyRound, Save, Search, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Home() {
  const [key, setKey] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const saveText = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, text }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Text saved successfully!');
        setText('');
      } else {
        setMessage(data.error || 'Failed to save text');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error saving text');
    } finally {
      setLoading(false);
    }
  };

  const retrieveText = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/text?key=${encodeURIComponent(key)}`);
      const data = await response.json();
      
      if (response.ok) {
        setText(data.text);
        setMessage('Text retrieved successfully!');
      } else {
        setMessage(data.error || 'Failed to retrieve text');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error retrieving text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center justify-center mb-8 flex-col space-y-4">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">T-Vault</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center">
            Share text between your devices quickly and easily
          </p>
          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg text-amber-800 dark:text-amber-200 text-sm w-full max-w-xl">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              Quick, simple text sharing - perfect for notes and temporary messages. Use a unique key!
            </div>
          </div>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6 border-2 border-gray-100 dark:border-gray-700">
          <div className="space-y-2">
            <label htmlFor="key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Storage Key
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="key"
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter a unique key"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Text
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                dark:bg-gray-700 dark:text-white transition-colors
                min-h-[200px] resize-y field-sizing-content"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={saveText}
              disabled={loading || !key || !text}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 
                text-white font-medium rounded-lg transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center"
            >
              <Save className="h-5 w-5 mr-2" />
              {loading ? 'Saving...' : 'Save Text'}
            </button>

            <button
              onClick={retrieveText}
              disabled={loading || !key}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700
                text-white font-medium rounded-lg transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center"
            >
              <Search className="h-5 w-5 mr-2" />
              {loading ? 'Retrieving...' : 'Retrieve Text'}
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-lg text-center flex items-center justify-center ${
              message.includes('success') 
                ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-200'
            }`}>
              {message.includes('success') ? (
                <ShieldCheck className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              {message}
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>All stored text is automatically deleted after 24 hours.</p>
          <p className="mt-1">Please don&apos;t store sensitive information like passwords.</p>
        </div>
      </div>
    </main>
  );
}
