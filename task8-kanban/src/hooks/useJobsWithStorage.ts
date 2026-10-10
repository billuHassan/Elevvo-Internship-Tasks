import { useState, useEffect, useCallback } from 'react';
import { Job, JobStatus, JobFormData } from '../types';

const STORAGE_KEY = 'jobtrail_kanban_jobs_v1';

const INITIAL_JOBS: Job[] = [
  {
    id: 'job-101',
    title: 'Senior Frontend Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$180,000 - $210,000',
    url: 'https://stripe.com/jobs',
    dateApplied: '2026-09-28',
    status: 'interviewing',
    notes: 'Completed technical screen with staff engineer. System design round scheduled next Tuesday.',
    tags: ['React', 'TypeScript', 'Design Systems']
  },
  {
    id: 'job-102',
    title: 'Staff UI Architect',
    company: 'Vercel',
    location: 'Remote',
    type: 'Remote',
    salary: '$200,000 - $230,000',
    url: 'https://vercel.com/careers',
    dateApplied: '2026-10-02',
    status: 'applied',
    notes: 'Submitted tailored portfolio with Next.js 15 App Router demo project.',
    tags: ['Next.js', 'Turbopack', 'Microfrontends']
  },
  {
    id: 'job-103',
    title: 'Principal Design Technologist',
    company: 'Linear',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$195,000 - $225,000',
    url: 'https://linear.app/careers',
    dateApplied: '2026-09-15',
    status: 'offer',
    notes: 'Offer package received! Reviewing stock equity vesting schedule and signing bonus.',
    tags: ['Figma API', 'WebGL', 'Keyboard Shortcuts']
  },
  {
    id: 'job-104',
    title: 'Lead Frontend Developer',
    company: 'Datadog',
    location: 'New York, NY (Hybrid)',
    type: 'Full-time',
    salary: '$175,000 - $195,000',
    url: 'https://datadoghq.com/careers',
    dateApplied: '2026-09-10',
    status: 'rejected',
    notes: 'Position placed on hiring freeze after final round. Recruiter offered to reconnect in Q1.',
    tags: ['Canvas API', 'Realtime Metrics', 'TypeScript']
  },
  {
    id: 'job-105',
    title: 'Senior Web Performance Engineer',
    company: 'Cloudflare',
    location: 'Remote',
    type: 'Remote',
    salary: '$185,000 - $215,000',
    url: 'https://cloudflare.com/careers',
    dateApplied: '2026-10-05',
    status: 'applied',
    notes: 'Applied through team referral. Highlighted Web Workers and WASM experience.',
    tags: ['Performance', 'Workers', 'V8 Engine']
  },
  {
    id: 'job-106',
    title: 'Frontend Tech Lead',
    company: 'Shopify',
    location: 'Remote',
    type: 'Remote',
    salary: '$190,000 - $220,000',
    url: 'https://shopify.com/careers',
    dateApplied: '2026-09-22',
    status: 'interviewing',
    notes: 'Round 2 behavioral interview completed. Preparing presentation for the team challenge.',
    tags: ['Hydrogen', 'GraphQL', 'Large Scale']
  }
];

export interface UseJobsWithStorageReturn {
  jobs: Job[];
  isLoading: boolean;
  addJob: (formData: JobFormData) => void;
  updateJobStatus: (jobId: string, newStatus: JobStatus) => void;
  deleteJob: (jobId: string) => void;
  resetToDefaults: () => void;
  totalCount: number;
}

export function useJobsWithStorage(): UseJobsWithStorageReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial load with simulated 1-second network latency requirement
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Job[];
          setJobs(parsed);
        } else {
          setJobs(INITIAL_JOBS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_JOBS));
        }
      } catch (err) {
        console.warn('Failed to parse jobs from localStorage, falling back to initial data.', err);
        setJobs(INITIAL_JOBS);
      } finally {
        setIsLoading(false);
      }
    }, 1000); // 1-second delay requirement to demonstrate Skeleton Loader shimmer

    return () => window.clearTimeout(timer);
  }, []);

  // Save to localStorage whenever jobs state updates (once initial load has finished)
  const persistJobs = useCallback((updatedJobs: Job[]) => {
    setJobs(updatedJobs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    } catch (err) {
      console.error('Failed to persist jobs to localStorage:', err);
    }
  }, []);

  const addJob = useCallback((formData: JobFormData) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: formData.title.trim(),
      company: formData.company.trim(),
      location: formData.location.trim() || 'Remote',
      type: formData.type,
      salary: formData.salary.trim() || 'Competitive',
      url: formData.url.trim(),
      dateApplied: new Date().toISOString().split('T')[0],
      status: formData.status,
      notes: formData.notes.trim(),
      tags: formData.tags
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : []
    };

    setJobs((prev) => {
      const updated = [newJob, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to persist new job:', err);
      }
      return updated;
    });
  }, []);

  const updateJobStatus = useCallback((jobId: string, newStatus: JobStatus) => {
    setJobs((prev) => {
      const updated = prev.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to update job status:', err);
      }
      return updated;
    });
  }, []);

  const deleteJob = useCallback((jobId: string) => {
    setJobs((prev) => {
      const updated = prev.filter((job) => job.id !== jobId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to delete job:', err);
      }
      return updated;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    persistJobs(INITIAL_JOBS);
  }, [persistJobs]);

  return {
    jobs,
    isLoading,
    addJob,
    updateJobStatus,
    deleteJob,
    resetToDefaults,
    totalCount: jobs.length
  };
}

