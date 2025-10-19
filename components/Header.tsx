import React from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface HeaderProps {
  onAddCandidate: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddCandidate }) => {
  return (
    <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-20">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-100">
        <span className="text-blue-400">Gemini</span> ATS Tracker
      </h1>
      <button
        onClick={onAddCandidate}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
      >
        <PlusIcon />
        <span className="hidden sm:inline">Add Candidate</span>
      </button>
    </header>
  );
};

export default Header;