import { TestCase, TestResult, Feedback } from '../types/types';

// This is a mock service to simulate code evaluation
// In a real application, this would connect to a backend service

export const evaluateCode = async (
  code: string,
  language: string,
  testCases: TestCase[]
): Promise<{ results: TestResult[]; feedback: Feedback }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, we'll evaluate JavaScript code
  const results: TestResult[] = [];
  
  for (const testCase of testCases) {
    try {
      // This is a simplified mock execution
      // In a real app, you would send the code to a backend for safe execution
      let actualOutput = "";
      let passed = false;
      
      if (language === 'javascript') {
        // Simulate execution (this is unsafe and only for demonstration)
        // In a real app, NEVER execute user code directly in the browser
        actualOutput = mockJsExecution(code, testCase.input);
        passed = actualOutput.trim() === testCase.expectedOutput.trim();
      } else {
        // For other languages, we'll simulate random results
        passed = Math.random() > 0.3;
        actualOutput = passed ? testCase.expectedOutput : generateRandomOutput(testCase.expectedOutput);
      }
      
      // Generate random execution stats
      const executionTime = Math.floor(Math.random() * 100) + 1;
      const memoryUsed = Math.floor(Math.random() * 1000) + 100;
      
      results.push({
        passed,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput,
        executionTime,
        memoryUsed,
        isHidden: testCase.isHidden
      });
    } catch (error) {
      results.push({
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: `Runtime Error: ${(error as Error).message}`,
        executionTime: 0,
        memoryUsed: 0,
        isHidden: testCase.isHidden
      });
    }
  }
  
  return {
    results,
    feedback: generateFeedback(code, language, results)
  };
};

// Mock JavaScript code execution (UNSAFE - demo purposes only)
const mockJsExecution = (code: string, input: string): string => {
  try {
    // Extract the function name from the code
    const functionName = code.match(/function\s+(\w+)/)?.[1] || 'solution';
    
    // Parse input based on common formats
    const parsedInput = parseInput(input);
    
    // Create a safe execution context
    const args = parsedInput.join(', ');
    const result = new Function(`
      ${code}
      return ${functionName}(${args});
    `)();
    
    return JSON.stringify(result);
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
};

// Parse input string to arguments
const parseInput = (input: string): any[] => {
  const lines = input.trim().split('\n');
  return lines.map(line => {
    // Try to parse as JSON array
    if (line.startsWith('[') && line.endsWith(']')) {
      try {
        return JSON.parse(line);
      } catch {
        // If parsing fails, treat as string
        return line;
      }
    }
    
    // Try to parse as number
    const num = Number(line);
    if (!isNaN(num)) {
      return num;
    }
    
    // Default to string
    return line;
  });
};

// Generate random output for simulation
const generateRandomOutput = (expectedOutput: string): string => {
  // For arrays, modify one element
  if (expectedOutput.startsWith('[') && expectedOutput.endsWith(']')) {
    try {
      const arr = JSON.parse(expectedOutput);
      if (Array.isArray(arr) && arr.length > 0) {
        const index = Math.floor(Math.random() * arr.length);
        if (typeof arr[index] === 'number') {
          arr[index] = arr[index] + 1;
        } else {
          arr[index] = `${arr[index]}X`;
        }
        return JSON.stringify(arr);
      }
    } catch {
      // If parsing fails, fall through to default
    }
  }
  
  // For boolean, flip it
  if (expectedOutput === 'true' || expectedOutput === 'false') {
    return expectedOutput === 'true' ? 'false' : 'true';
  }
  
  // Default: append random character
  return `${expectedOutput}${Math.floor(Math.random() * 10)}`;
};

// Generate feedback based on code and results
const generateFeedback = (code: string, language: string, results: TestResult[]): Feedback => {
  const allPassed = results.every(r => r.passed);
  
  // Time complexity analysis (simplified)
  let timeComplexity = "O(n)";
  if (code.includes('for') && code.includes('for')) {
    timeComplexity = "O(n²)";
  } else if (code.includes('for') || code.includes('while')) {
    timeComplexity = "O(n)";
  } else {
    timeComplexity = "O(1)";
  }
  
  // Space complexity analysis (simplified)
  let spaceComplexity = "O(1)";
  if (code.includes('new Array') || code.includes('[]')) {
    spaceComplexity = "O(n)";
  }
  
  const suggestions: string[] = [];
  const optimizationTips: string[] = [];
  
  if (!allPassed) {
    suggestions.push("Check your edge cases, some test cases are failing.");
    suggestions.push("Make sure your function returns the expected output format.");
  }
  
  if (code.includes('for') && code.includes('for')) {
    optimizationTips.push("Consider if a nested loop is necessary. Can you solve this with a single pass?");
  }
  
  if (!code.includes('return')) {
    suggestions.push("Your function doesn't have a return statement.");
  }
  
  if (language === 'javascript' && code.includes('console.log')) {
    suggestions.push("Remove console.log statements for performance.");
  }
  
  return {
    timeComplexity,
    spaceComplexity,
    suggestions,
    optimizationTips
  };
};