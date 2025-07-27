import React from 'react';
import { Problem } from '../../types/types';
import { Badge } from '../ui/Badge';

interface ProblemDisplayProps {
  problem: Problem;
}

const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem }) => {
  const difficultyColor = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  }[problem.difficulty];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{problem.title}</h1>
        <div className="flex gap-2 mt-2 md:mt-0">
          <Badge className={difficultyColor}>{problem.difficulty}</Badge>
          {problem.tags.map(tag => (
            <Badge key={tag} className="bg-blue-100 text-blue-800">{tag}</Badge>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🎯 Problem Statement</h2>
          <p className="text-gray-600 whitespace-pre-line">{problem.problemStatement}</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">💡 Input Format</h2>
          <p className="text-gray-600 whitespace-pre-line">{problem.inputFormat}</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🧾 Output Format</h2>
          <p className="text-gray-600 whitespace-pre-line">{problem.outputFormat}</p>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">✍️ Constraints</h2>
          <pre className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-line">{problem.constraints}</pre>
        </section>
        
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">🧪 Example Cases</h2>
          {problem.sampleInputs.map((input, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-500">Input:</h3>
                <pre className="bg-gray-100 p-2 rounded text-sm">{input}</pre>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Output:</h3>
                <pre className="bg-gray-100 p-2 rounded text-sm">{problem.sampleOutputs[index]}</pre>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProblemDisplay;