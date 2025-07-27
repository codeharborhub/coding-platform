// import React from 'react';?
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProblemList from './pages/ProblemList';
import Problem from './pages/Problem';
import { Code } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link to="/" className="flex items-center">
                <Code className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">CodeHarborHub</span>
              </Link>
              <nav className="flex space-x-4">
                <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Problems
                </Link>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Submissions
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Leaderboard
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ProblemList />} />
            <Route path="/problem/:id" element={<Problem />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © 2025 CodeHarborHub. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;