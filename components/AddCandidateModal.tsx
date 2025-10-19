import React, { useState } from 'react';
import { Candidate, PipelineStage } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface AddCandidateModalProps {
  onClose: () => void;
  onAddCandidate: (candidate: Omit<Candidate, 'id' | 'applicationDate' | 'avatarUrl'>) => void;
}

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ onClose, onAddCandidate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [resumeText, setResumeText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !role) return;

    onAddCandidate({
      name,
      email,
      phone,
      role,
      stage: PipelineStage.APPLIED,
      notes: [],
      resumeText,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-100">Add New Candidate</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Full Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
           <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-400">Phone</label>
            <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-400">Role Applied For</label>
            <input type="text" id="role" value={role} onChange={e => setRole(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-400">Paste Resume Text</label>
            <textarea id="resume" value={resumeText} onChange={e => setResumeText(e.target.value)} rows={5} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Add Candidate</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;