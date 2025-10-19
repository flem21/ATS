import React, { useState, useCallback } from 'react';
import { Candidate } from '../types';
import { CloseIcon } from './icons/CloseIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { generateGeminiContent } from '../services/geminiService';

interface CandidateDetailsModalProps {
  candidate: Candidate;
  onClose: () => void;
  onUpdateCandidate: (candidate: Candidate) => void;
}

const CandidateDetailsModal: React.FC<CandidateDetailsModalProps> = ({ candidate, onClose, onUpdateCandidate }) => {
  const [newNote, setNewNote] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const updatedCandidate = { ...candidate, notes: [...candidate.notes, newNote.trim()] };
      onUpdateCandidate(updatedCandidate);
      setNewNote('');
    }
  };

  const fetchAiInsight = useCallback(async (prompt: string) => {
    setIsLoadingAi(true);
    setAiInsight('');
    try {
      const result = await generateGeminiContent(prompt);
      setAiInsight(result);
    } catch (error) {
      console.error("Gemini API call failed:", error);
      setAiInsight("Sorry, couldn't generate insights at this moment.");
    } finally {
      setIsLoadingAi(false);
    }
  }, []);

  const summarizeResume = () => {
    const prompt = `Summarize the following resume for a ${candidate.role} position. Highlight key skills, years of experience, and overall suitability. Keep it concise (3-4 bullet points):\n\n${candidate.resumeText}`;
    fetchAiInsight(prompt);
  };

  const generateInterviewQuestions = () => {
    const prompt = `Generate 5 insightful and role-specific interview questions for a ${candidate.role} candidate with the following resume highlights:\n\n${candidate.resumeText}\n\nAvoid generic questions. Focus on technical skills, problem-solving, and past experiences.`;
    fetchAiInsight(prompt);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-100">{candidate.name}</h2>
            <p className="text-blue-400">{candidate.role}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-300 mb-2">Contact Information</h3>
            <p className="text-gray-400">Email: {candidate.email}</p>
            <p className="text-gray-400">Phone: {candidate.phone}</p>
          </div>

          {/* AI Insights */}
          <div>
            <h3 className="font-semibold text-gray-300 mb-3 flex items-center gap-2">
              <SparklesIcon /> AI Insights
            </h3>
            <div className="flex gap-2 mb-3">
              <button onClick={summarizeResume} disabled={isLoadingAi} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm py-2 px-3 rounded-lg transition-colors">Summarize Resume</button>
              <button onClick={generateInterviewQuestions} disabled={isLoadingAi} className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white text-sm py-2 px-3 rounded-lg transition-colors">Generate Questions</button>
            </div>
            {isLoadingAi && <div className="text-gray-400 animate-pulse">Generating...</div>}
            {aiInsight && (
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 prose prose-invert prose-sm max-w-none whitespace-pre-wrap">
                {aiInsight}
              </div>
            )}
          </div>
          
          {/* Notes */}
          <div>
            <h3 className="font-semibold text-gray-300 mb-2">Notes</h3>
            <ul className="space-y-2 mb-4">
              {candidate.notes.map((note, index) => (
                <li key={index} className="bg-gray-700 p-3 rounded-md text-gray-300 text-sm">{note}</li>
              ))}
              {candidate.notes.length === 0 && <p className="text-gray-500 text-sm">No notes yet.</p>}
            </ul>
            <div className="flex gap-2">
              <input 
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button onClick={handleAddNote} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;