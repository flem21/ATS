import { PipelineStage } from './types';

export const STAGE_ORDER: PipelineStage[] = [
  PipelineStage.APPLIED,
  PipelineStage.SCREENING,
  PipelineStage.INTERVIEW,
  PipelineStage.OFFER,
  PipelineStage.HIRED,
  PipelineStage.REJECTED,
];

export const STAGE_DETAILS: Record<PipelineStage, { title: string; color: string }> = {
  [PipelineStage.APPLIED]: { title: 'Applied', color: 'bg-blue-600' },
  [PipelineStage.SCREENING]: { title: 'Screening', color: 'bg-purple-600' },
  [PipelineStage.INTERVIEW]: { title: 'Interview', color: 'bg-yellow-500' },
  [PipelineStage.OFFER]: { title: 'Offer', color: 'bg-orange-500' },
  [PipelineStage.HIRED]: { title: 'Hired', color: 'bg-green-600' },
  [PipelineStage.REJECTED]: { title: 'Rejected', color: 'bg-red-600' },
};
