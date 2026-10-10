/**
 * Strict TypeScript Domain Types for JobTrail Pro Kanban Tracker
 * Fully strictly typed - ZERO use of 'any'.
 */

export type JobStatus = 'applied' | 'interviewing' | 'offer' | 'rejected';

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote' | 'Internship';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: EmploymentType;
  salary: string;
  url: string;
  dateApplied: string;
  status: JobStatus;
  notes: string;
  tags: string[];
}

export interface Column {
  id: JobStatus;
  title: string;
  color: string;
  accentBg: string;
  description: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: EmploymentType;
  salary: string;
  url: string;
  status: JobStatus;
  notes: string;
  tags: string;
}

export interface FormErrors {
  title?: string;
  company?: string;
  location?: string;
  salary?: string;
  url?: string;
}

export type FilterStatus = 'all' | JobStatus;
export type FilterType = 'all' | EmploymentType;

export interface BoardFilters {
  searchTerm: string;
  status: FilterStatus;
  employmentType: FilterType;
}

export interface DraggedJobPayload {
  jobId: string;
  fromStatus: JobStatus;
}

