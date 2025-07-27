import React from 'react';
import { TestResult, Feedback } from '../../types/types';
import { Badge } from '../ui/Badge';
import { Clock, Cpu, CheckCircle, XCircle } from 'lucide-react';

interface TestResultsProps {
  results: TestResult[];
  isLoading: boolean;
  feedback?: Feedback;
  overallStatus: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Evaluating' | null;
}

const TestResults: React.FC<TestResultsProps> = ({ 
  results, 
  isLoading, 
  feedback,
  overallStatus
}) => {
  const passedCount = results.filter(result => result.passed).length;
  const totalCount = results.length;
  
  const getStatusColor = (status: string | null) => {
    switch(status) {
      case 'Accepted': return 'text-green-600';
      case 'Wrong Answer': return 'text-red-600';
      case 'Time Limit Exceeded': return 'text-yellow-600';
      case 'Runtime Error': return 'text-red-600';
      case 'Evaluating': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Test Results</h2>
        <div className={`font-medium ${getStatusColor(overallStatus)}`}>
          {overallStatus || 'Not submitted'}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${passedCount === totalCount ? 'bg-green-600' : 'bg-yellow-500'}`}
              style={{ width: `${totalCount > 0 ? (passedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {passedCount}/{totalCount} tests passed
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg border ${result.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                {result.passed ? 
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" /> : 
                  <XCircle className="h-5 w-5 text-red-600 mr-2" />
                }
                <span className="font-medium">Test Case {index + 1}</span>
              </div>
              {result.isHidden && <Badge className="bg-gray-100 text-gray-800">Hidden</Badge>}
            </div>
            
            {!result.isHidden && (
              <div className="ml-7 space-y-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Input:</span>
                  <pre className="mt-1 bg-white p-2 rounded text-xs">{result.input}</pre>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Expected Output:</span>
                  <pre className="mt-1 bg-white p-2 rounded text-xs">{result.expectedOutput}</pre>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Your Output:</span>
                  <pre className="mt-1 bg-white p-2 rounded text-xs">{result.actualOutput}</pre>
                </div>
              </div>
            )}
            
            <div className="mt-2 flex ml-7 space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{result.executionTime} ms</span>
              </div>
              <div className="flex items-center">
                <Cpu className="h-3 w-3 mr-1" />
                <span>{result.memoryUsed} KB</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {feedback && (
        <div className="mt-6 border-t pt-4">
          <h3 className="font-medium text-gray-800 mb-2">Analysis & Feedback</h3>
          
          <div className="mb-3">
            <div className="text-sm font-medium text-gray-700">Time Complexity:</div>
            <div className="bg-gray-50 p-2 rounded text-sm">{feedback.timeComplexity}</div>
          </div>
          
          <div className="mb-3">
            <div className="text-sm font-medium text-gray-700">Space Complexity:</div>
            <div className="bg-gray-50 p-2 rounded text-sm">{feedback.spaceComplexity}</div>
          </div>
          
          {feedback.suggestions.length > 0 && (
            <div className="mb-3">
              <div className="text-sm font-medium text-gray-700">Suggestions:</div>
              <ul className="list-disc list-inside text-sm pl-2">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-600">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          
          {feedback.optimizationTips.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-700">Optimization Tips:</div>
              <ul className="list-disc list-inside text-sm pl-2">
                {feedback.optimizationTips.map((tip, index) => (
                  <li key={index} className="text-gray-600">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestResults;