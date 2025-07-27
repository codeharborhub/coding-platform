import React, { useState } from 'react';
import { Hint } from '../../types/types';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface HintSystemProps {
  hints: string[];
  solution: {
    approach: string;
    complexity: {
      time: string;
      space: string;
    };
    explanation: string;
  };
}

const HintSystem: React.FC<HintSystemProps> = ({ hints, solution }) => {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);

  const handleRevealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Hints & Solution</h2>
      </div>

      <div className="space-y-4">
        {hints.map((hint, index) => (
          <div key={index} className="border rounded-lg p-4">
            <button
              onClick={() => handleRevealHint(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-medium text-gray-700">
                Hint #{index + 1}
              </span>
              {revealedHints.includes(index) ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {revealedHints.includes(index) && (
              <p className="mt-2 text-gray-600">{hint}</p>
            )}
          </div>
        ))}

        <div className="border-t pt-4 mt-4">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="w-full flex justify-between items-center text-left"
          >
            <span className="font-medium text-gray-700">Solution</span>
            {showSolution ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
          {showSolution && (
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium text-gray-700">Approach:</h3>
                <p className="mt-1 text-gray-600">{solution.approach}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Time Complexity:</h3>
                <p className="mt-1 text-gray-600">{solution.complexity.time}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Space Complexity:</h3>
                <p className="mt-1 text-gray-600">{solution.complexity.space}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Detailed Explanation:</h3>
                <p className="mt-1 text-gray-600">{solution.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HintSystem;