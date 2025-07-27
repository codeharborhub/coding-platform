import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface CustomTestCaseProps {
  onRunTest: (input: string) => void;
  language: string;
}

const CustomTestCase: React.FC<CustomTestCaseProps> = ({ onRunTest, language }) => {
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRunTest(input);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="bg-gray-100 px-4 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-medium text-gray-700">Custom Test Case</h3>
        <button className="text-blue-500 hover:text-blue-600">
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="testInput"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Input
              </label>
              <textarea
                id="testInput"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 p-2 border rounded-md font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter your test case input here...\nExample for JavaScript:\n[2,7,11,15]\n9`}
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Play className="h-4 w-4 mr-2" />
              Run Test Case
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CustomTestCase;