import React from 'react';
import { KanbanIcon } from './icons/KanbanIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-blue-400">Gemini</span> ATS Tracker
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8">
          A modern, AI-powered Applicant Tracking System to streamline your hiring workflow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <KanbanIcon />
            </div>
            <h3 className="font-semibold text-lg mb-2">Visual Kanban Board</h3>
            <p className="text-gray-400 text-sm">Drag and drop candidates through your hiring pipeline stages.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <SparklesIcon />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Insights</h3>
            <p className="text-gray-400 text-sm">Leverage Gemini to summarize resumes and generate interview questions.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-center mb-4">
              <DatabaseIcon />
            </div>
            <h3 className="font-semibold text-lg mb-2">Centralized Data</h3>
            <p className="text-gray-400 text-sm">Keep all candidate information, notes, and resumes in one place.</p>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Enter App
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
