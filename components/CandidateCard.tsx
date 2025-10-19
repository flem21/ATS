import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
  onClick: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, index, onClick }) => {
  return (
    <Draggable draggableId={candidate.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={`mb-3 p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600 cursor-pointer hover:bg-gray-600 transition-all duration-200 ${
            snapshot.isDragging ? 'shadow-2xl ring-2 ring-blue-500' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <img 
              src={candidate.avatarUrl} 
              alt={candidate.name} 
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-500"
            />
            <div>
              <h3 className="font-bold text-gray-100">{candidate.name}</h3>
              <p className="text-sm text-gray-400">{candidate.role}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default CandidateCard;