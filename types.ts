
export enum PipelineStage {
  APPLIED = 'Applied',
  SCREENING = 'Screening',
  INTERVIEW = 'Interview',
  OFFER = 'Offer',
  HIRED = 'Hired',
  REJECTED = 'Rejected',
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string;
  stage: PipelineStage;
  applicationDate: string;
  notes: string[];
  resumeText: string;
}
