import React, { useState, useEffect } from 'react';
import ProblemDisplay from '../components/ProblemDisplay/ProblemDisplay';
import CodeEditor from '../components/CodeEditor/CodeEditor';
import TestResults from '../components/TestResults/TestResults';
import HintSystem from '../components/HintSystem/HintSystem';
import CustomTestCase from '../components/CustomTestCase/CustomTestCase';
import { prepareTestCases } from '../utils/testCaseManager';
import { evaluateCode } from '../services/evaluationService';
import { Problem as ProblemType, TestResult, Feedback } from '../types/types';
import { sampleProblems } from '../data/sampleProblems';

const Problem: React.FC = () => {
  const [problem, setProblem] = useState<ProblemType | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [results, setResults] = useState<TestResult[]>([]);
  const [feedback, setFeedback] = useState<Feedback | undefined>(undefined);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [status, setStatus] = useState<'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error' | 'Evaluating' | null>(null);

  useEffect(() => {
    setProblem(sampleProblems[0]);
  }, []);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleCustomTest = async (input: string) => {
    setIsEvaluating(true);
    try {
      const testCase = {
        input,
        expectedOutput: 'Custom test case',
        isHidden: false
      };
      
      const { results } = await evaluateCode(code, language, [testCase]);
      setResults(results);
    } catch (error) {
      console.error('Error running custom test:', error);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleRunCode = async () => {
    if (!problem) return;
    
    setIsEvaluating(true);
    setStatus('Evaluating');
    setResults([]);
    setFeedback(undefined);
    
    try {
      const testCases = prepareTestCases(problem);
      const visibleTestCases = testCases.filter(tc => !tc.isHidden);
      
      const { results, feedback } = await evaluateCode(code, language, visibleTestCases);
      
      setResults(results);
      setFeedback(feedback);
      
      if (results.every(r => r.passed)) {
        setStatus('Accepted');
      } else if (results.some(r => r.actualOutput.includes('Runtime Error'))) {
        setStatus('Runtime Error');
      } else {
        setStatus('Wrong Answer');
      }
    } catch (error) {
      console.error('Error evaluating code:', error);
      setStatus('Runtime Error');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleSubmitSolution = async () => {
    if (!problem) return;
    
    setIsEvaluating(true);
    setStatus('Evaluating');
    setResults([]);
    setFeedback(undefined);
    
    try {
      const testCases = prepareTestCases(problem);
      
      const { results, feedback } = await evaluateCode(code, language, testCases);
      
      setResults(results);
      setFeedback(feedback);
      
      if (results.every(r => r.passed)) {
        setStatus('Accepted');
      } else if (results.some(r => r.executionTime > 1000)) {
        setStatus('Time Limit Exceeded');
      } else if (results.some(r => r.actualOutput.includes('Runtime Error'))) {
        setStatus('Runtime Error');
      } else {
        setStatus('Wrong Answer');
      }
    } catch (error) {
      console.error('Error evaluating code:', error);
      setStatus('Runtime Error');
    } finally {
      setIsEvaluating(false);
    }
  };

  if (!problem) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProblemDisplay problem={problem} />
          <HintSystem hints={problem.hints} solution={problem.solution} />
        </div>
        
        <div className="space-y-6">
          <CodeEditor
            initialCode={code}
            language={language}
            onCodeChange={handleCodeChange}
            onLanguageChange={handleLanguageChange}
          />
          
          <CustomTestCase
            onRunTest={handleCustomTest}
            language={language}
          />
          
          <div className="flex space-x-4">
            <button
              onClick={handleRunCode}
              disabled={isEvaluating}
              className={`flex-1 py-2 px-4 rounded font-medium ${
                isEvaluating
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition-colors`}
            >
              {isEvaluating ? 'Running...' : 'Run Code'}
            </button>
            
            <button
              onClick={handleSubmitSolution}
              disabled={isEvaluating}
              className={`flex-1 py-2 px-4 rounded font-medium ${
                isEvaluating
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              } transition-colors`}
            >
              {isEvaluating ? 'Submitting...' : 'Submit Solution'}
            </button>
          </div>
          
          <TestResults
            results={results}
            isLoading={isEvaluating}
            feedback={feedback}
            overallStatus={status}
          />
        </div>
      </div>
    </div>
  );
};

export default Problem;