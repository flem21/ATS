import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CandidateCard from './CandidateCard';
import { Candidate, PipelineStage } from '../types';
import { STAGE_DETAILS } from '../constants';

interface KanbanColumnProps {
  stage: PipelineStage;
  candidates: Candidate[];
  onCardClick: (candidate: Candidate) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ stage, candidates, onCardClick }) => {
  const { title, color } = STAGE_DETAILS[stage];

  return (
    <div className="flex-shrink-0 w-80 bg-gray-800 rounded-xl shadow-lg flex flex-col">
      <div className={`p-4 rounded-t-xl sticky top-0 bg-gray-800 z-10`}>
        <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2`}>
                <span className={`w-3 h-3 rounded-full ${color}`}></span>
                <h2 className="font-bold text-lg text-gray-100">{title}</h2>
            </div>
            <span className="bg-gray-700 text-gray-300 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                {candidates.length}
            </span>
        </div>
      </div>
      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-grow p-2 min-h-[200px] transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-gray-700/50' : 'bg-gray-800'
            }`}
          >
            {candidates.map((candidate, index) => (
              <CandidateCard 
                key={candidate.id} 
                candidate={candidate} 
                index={index} 
                onClick={() => onCardClick(candidate)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;