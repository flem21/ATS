import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import AddCandidateModal from './components/AddCandidateModal';
import { Candidate } from './types';
import LandingPage from './components/LandingPage';

const API_URL = 'http://localhost:5000/api/candidates';

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch candidates');
        }
        const data = await response.json();
        setCandidates(data);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  const handleAddCandidate = async (candidateData: Omit<Candidate, 'id' | 'applicationDate' | 'avatarUrl'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidateData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add candidate');
      }
      const newCandidate = await response.json();
      setCandidates(prev => [newCandidate, ...prev]);
      setIsAddModalOpen(false);
    } catch (error: any) {
      console.error("Failed to add candidate:", error);
      setError(error.message);
    }
  };

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }
  
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col font-sans">
      <Header onAddCandidate={() => setIsAddModalOpen(true)} />
      <main className="flex-grow flex">
        {isLoading && <div className="m-auto text-xl">Loading candidates...</div>}
        {error && <div className="m-auto text-xl text-red-500">Error: {error}</div>}
        {!isLoading && !error && <KanbanBoard candidates={candidates} setCandidates={setCandidates} />}
      </main>
      {isAddModalOpen && (
        <AddCandidateModal 
          onClose={() => setIsAddModalOpen(false)} 
          onAddCandidate={handleAddCandidate}
        />
      )}
    </div>
  );
}

export default App;
