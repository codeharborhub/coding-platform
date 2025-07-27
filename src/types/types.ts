export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInputs: string[];
  sampleOutputs: string[];
  hiddenInputs?: string[];
  hiddenOutputs?: string[];
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

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  executionTime: number;
  memoryUsed: number;
  isHidden: boolean;
}

export interface CodeSubmission {
  id: string;
  problemId: string;
  code: string;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  results: TestResult[];
  executionTime: number;
  memoryUsed: number;
  submittedAt: Date;
}

export interface Language {
  id: string;
  name: string;
  extension: string;
}

export interface Feedback {
  timeComplexity: string;
  spaceComplexity: string;
  suggestions: string[];
  optimizationTips: string[];
}

export interface UserProgress {
  problemsSolved: number;
  totalProblems: number;
  byDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  byTags: Record<string, number>;
  recentSubmissions: CodeSubmission[];
  streak: number;
  rating: number;
}

export interface Hint {
  id: string;
  content: string;
  type: 'concept' | 'approach' | 'optimization';
  revealed: boolean;
}