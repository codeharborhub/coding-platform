import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { supportedLanguages } from '../../data/languages';

interface CodeEditorProps {
  initialCode?: string;
  language: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
}

const defaultCode = {
  javascript: `function solution(nums, target) {
  // Write your code here
}

// Example usage:
// solution([2,7,11,15], 9) should return [0,1]`,
  typescript: `function solution(nums: number[], target: number): number[] {
  // Write your code here
  return [];
}

// Example usage:
// solution([2,7,11,15], 9) should return [0,1]`,
  python: `def solution(nums, target):
    # Write your code here
    pass

# Example usage:
# solution([2,7,11,15], 9) should return [0,1]`,
  java: `class Solution {
    public int[] solution(int[] nums, int target) {
        // Write your code here
        return new int[]{0, 0};
    }
}

// Example usage:
// solution([2,7,11,15], 9) should return [0,1]`,
  cpp: `#include <vector>

std::vector<int> solution(std::vector<int>& nums, int target) {
    // Write your code here
    return {0, 0};
}

// Example usage:
// solution([2,7,11,15], 9) should return [0,1]`
};

const languageToHighlightMap: Record<string, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  java: 'java',
  cpp: 'cpp'
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  language,
  onCodeChange,
  onLanguageChange
}) => {
  const [code, setCode] = useState(initialCode || defaultCode[language as keyof typeof defaultCode] || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!initialCode || code === initialCode) {
      setCode(defaultCode[language as keyof typeof defaultCode] || '');
    }
  }, [language, initialCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange(newCode);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    onLanguageChange(newLanguage);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-white border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {supportedLanguages.map(lang => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm transition-colors"
            onClick={() => setCode(defaultCode[language as keyof typeof defaultCode] || '')}
          >
            Reset
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded text-sm transition-colors"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Preview' : 'Edit'}
          </button>
        </div>
      </div>
      <div className="relative w-full h-96">
        {isEditing ? (
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none"
            placeholder="Write your solution here..."
            spellCheck="false"
          />
        ) : (
          <div className="w-full h-full overflow-auto">
            <SyntaxHighlighter
              language={languageToHighlightMap[language]}
              style={tomorrow}
              customStyle={{
                margin: 0,
                padding: '1rem',
                height: '100%',
                fontSize: '0.875rem',
                backgroundColor: 'transparent'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;