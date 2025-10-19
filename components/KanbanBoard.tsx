import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';
import { Candidate, PipelineStage } from '../types';
import { STAGE_ORDER } from '../constants';
import CandidateDetailsModal from './CandidateDetailsModal';

const API_URL = 'http://localhost:5000/api/candidates';

interface KanbanBoardProps {
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ candidates, setCandidates }) => {
  const [columns, setColumns] = useState<Record<PipelineStage, Candidate[]>>({} as any);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const newColumns = STAGE_ORDER.reduce((acc, stage) => {
      acc[stage] = candidates.filter(c => c.stage === stage).sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime());
      return acc;
    }, {} as Record<PipelineStage, Candidate[]>);
    setColumns(newColumns);
  }, [candidates]);
  
  const handleUpdateCandidate = async (updatedCandidate: Candidate) => {
    try {
        const response = await fetch(`${API_URL}/${updatedCandidate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCandidate),
        });
        if (!response.ok) {
            throw new Error('Failed to update candidate');
        }
        const data = await response.json();
        setCandidates(prev => prev.map(c => c.id === data.id ? data : c));
    } catch (error) {
        console.error("Failed to update candidate:", error);
        // Optionally revert state or show an error to the user
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const endColumnId = destination.droppableId as PipelineStage;
    
    // Optimistic UI update
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === draggableId) {
        return { ...candidate, stage: endColumnId };
      }
      return candidate;
    });
    setCandidates(updatedCandidates);

    // Persist change to the backend
    const movedCandidate = candidates.find(c => c.id === draggableId);
    if (movedCandidate) {
        handleUpdateCandidate({ ...movedCandidate, stage: endColumnId });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto space-x-4 p-2 custom-scrollbar">
          {STAGE_ORDER.map(stage => (
            <KanbanColumn
              key={stage}
              stage={stage}
              candidates={columns[stage] || []}
              onCardClick={setSelectedCandidate}
            />
          ))}
        </div>
      </DragDropContext>
      {selectedCandidate && (
        <CandidateDetailsModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onUpdateCandidate={handleUpdateCandidate}
        />
      )}
    </>
  );
};

export default KanbanBoard;
