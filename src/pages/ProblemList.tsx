import React from 'react';
import { sampleProblems } from '../data/sampleProblems';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ProblemList: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-blue-500 text-white">
          <h1 className="text-xl font-bold">Coding Challenges</h1>
        </div>
        
        <div className="divide-y">
          {sampleProblems.map((problem) => (
            <div key={problem.id} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <Link 
                  to={`/problem/${problem.id}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {problem.title}
                </Link>
                <div className="flex items-center mt-1 space-x-2">
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium
                    ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {problem.difficulty}
                  </span>
                  {problem.tags.map(tag => (
                    <span key={tag} className="text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemList;