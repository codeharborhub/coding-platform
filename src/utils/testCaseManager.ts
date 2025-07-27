import { Problem, TestCase } from '../types/types';

export const prepareTestCases = (problem: Problem): TestCase[] => {
  const testCases: TestCase[] = [];
  
  // Add sample test cases
  for (let i = 0; i < problem.sampleInputs.length; i++) {
    testCases.push({
      input: problem.sampleInputs[i],
      expectedOutput: problem.sampleOutputs[i],
      isHidden: false
    });
  }
  
  // Add hidden test cases if available
  if (problem.hiddenInputs && problem.hiddenOutputs) {
    for (let i = 0; i < problem.hiddenInputs.length; i++) {
      testCases.push({
        input: problem.hiddenInputs[i],
        expectedOutput: problem.hiddenOutputs[i],
        isHidden: true
      });
    }
  }
  
  return testCases;
};