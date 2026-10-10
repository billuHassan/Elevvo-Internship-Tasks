import React, { useState, useMemo } from 'react';
import { Column, Job, JobStatus, EmploymentType, JobFormData, FilterType } from '../types';
import { KanbanColumn } from './KanbanColumn';
import { AddJobModal } from './AddJobModal';

interface KanbanBoardProps {
  jobs: Job[];
  onAddJob: (formData: JobFormData) => void;
  onUpdateStatus: (jobId: string, newStatus: JobStatus) => void;
  onDeleteJob: (jobId: string) => void;
  onResetDefaults: () => void;
}

const COLUMNS: Column[] = [
  {
    id: 'applied',
    title: 'Applied',
    color: '#3b82f6',
    accentBg: '#eff6ff',
    description: 'Submitted applications awaiting response'
  },
  {
    id: 'interviewing',
    title: 'Interviewing',
    color: '#8b5cf6',
    accentBg: '#f5f3ff',
    description: 'Active technical screens and on-sites'
  },
  {
    id: 'offer',
    title: 'Offer',
    color: '#10b981',
    accentBg: '#ecfdf5',
    description: 'Formal job offers received'
  },
  {
    id: 'rejected',
    title: 'Rejected',
    color: '#ef4444',
    accentBg: '#fef2f2',
    description: 'Archived or passed on'
  }
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  jobs,
  onAddJob,
  onUpdateStatus,
  onDeleteJob,
  onResetDefaults
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<FilterType>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDefaultStatus, setModalDefaultStatus] = useState<JobStatus>('applied');

  // Filter jobs based on search term and employment type
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType =
        selectedType === 'all' || job.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, selectedType]);

  const handleOpenAddModal = (status: JobStatus = 'applied') => {
    setModalDefaultStatus(status);
    setIsModalOpen(true);
  };

  const handleDragStartJob = (
    e: React.DragEvent<HTMLDivElement>,
    jobId: string,
    _currentStatus: JobStatus
  ) => {
    e.dataTransfer.setData('text/plain', jobId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropJob = (jobId: string, targetStatus: JobStatus) => {
    onUpdateStatus(jobId, targetStatus);
  };

  const employmentTypes: (EmploymentType | 'all')[] = [
    'all',
    'Full-time',
    'Remote',
    'Contract',
    'Part-time',
    'Internship'
  ];

  return (
    <div className="kanban-wrapper">
      {/* Controls and Filter Bar */}
      <div className="board-toolbar">
        <div className="search-group">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by role, company, or tech stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search job cards"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter" className="filter-label">Filter Type:</label>
          <select
            id="type-filter"
            className="filter-select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as FilterType)}
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
        </div>

        <div className="toolbar-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={onResetDefaults}
            title="Reset board to default sample jobs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2.5 2v6h6M21.5 22v-6h-6"></path>
              <path d="M22 11.5A10 10 0 0 0 3.2 7.2L2.5 8M2 12.5a10 10 0 0 0 18.8 4.3l.7-.8"></path>
            </svg>
            Reset Data
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => handleOpenAddModal('applied')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Application
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="metrics-strip">
        <div className="metric-item">
          <span className="metric-label">Total Tracked</span>
          <span className="metric-val">{jobs.length}</span>
        </div>
        {COLUMNS.map((col) => {
          const count = jobs.filter((j) => j.status === col.id).length;
          return (
            <div key={col.id} className="metric-item">
              <span className="metric-label">
                <span className="metric-dot" style={{ backgroundColor: col.color }}></span>
                {col.title}
              </span>
              <span className="metric-val" style={{ color: col.color }}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* 4-Column Board Columns */}
      <main className="columns-grid" role="region" aria-label="Job Application Board Columns">
        {COLUMNS.map((col) => {
          const colJobs = filteredJobs.filter((job) => job.status === col.id);
          return (
            <KanbanColumn
              key={col.id}
              column={col}
              jobs={colJobs}
              onDropJob={handleDropJob}
              onDragStartJob={handleDragStartJob}
              onDeleteJob={onDeleteJob}
              onMoveQuickJob={onUpdateStatus}
              onOpenAddModal={handleOpenAddModal}
            />
          );
        })}
      </main>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={isModalOpen}
        defaultStatus={modalDefaultStatus}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onAddJob}
      />
    </div>
  );
};

