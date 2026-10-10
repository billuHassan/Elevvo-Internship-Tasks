import React, { useState } from 'react';
import { Job, JobStatus } from '../types';

interface JobCardProps {
  job: Job;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, jobId: string, currentStatus: JobStatus) => void;
  onDelete: (jobId: string) => void;
  onMoveQuick: (jobId: string, newStatus: JobStatus) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onDragStart,
  onDelete,
  onMoveQuick
}) => {
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart(e, job.id, job.status);
  };

  const statusOptions: { value: JobStatus; label: string }[] = [
    { value: 'applied', label: 'Applied' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const formattedDate = new Date(job.dateApplied).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      className="job-card"
      draggable={true}
      onDragStart={handleDragStart}
      tabIndex={0}
      aria-grabbed="false"
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className="card-top">
        <span className="card-company">{job.company}</span>
        <div className="card-actions">
          {isConfirmDelete ? (
            <div className="delete-confirm-group">
              <button
                type="button"
                className="btn-confirm-delete"
                onClick={() => onDelete(job.id)}
                title="Confirm delete"
                aria-label="Confirm deletion"
              >
                Delete
              </button>
              <button
                type="button"
                className="btn-cancel-delete"
                onClick={() => setIsConfirmDelete(false)}
                title="Cancel"
                aria-label="Cancel deletion"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-delete"
              onClick={() => setIsConfirmDelete(true)}
              title="Delete job card"
              aria-label={`Delete ${job.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      <h4 className="card-title">{job.title}</h4>

      <div className="card-meta">
        <span className="meta-pill type-pill">{job.type}</span>
        <span className="meta-pill location-pill" title={job.location}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {job.location}
        </span>
      </div>

      {job.salary && (
        <div className="card-salary">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span>{job.salary}</span>
        </div>
      )}

      {job.tags && job.tags.length > 0 && (
        <div className="card-tags">
          {job.tags.map((tag, idx) => (
            <span key={idx} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      )}

      {job.notes && (
        <div className="card-notes-wrapper">
          <button
            type="button"
            className="toggle-notes-btn"
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            aria-expanded={isNotesOpen}
          >
            <span>{isNotesOpen ? 'Hide Notes' : 'View Notes'}</span>
            <svg
              className={`arrow-icon ${isNotesOpen ? 'open' : ''}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {isNotesOpen && <p className="card-notes-content">{job.notes}</p>}
        </div>
      )}

      <div className="card-bottom">
        <span className="date-applied">Applied {formattedDate}</span>
        
        {/* Quick status dropdown for keyboard/touch accessibility */}
        <div className="quick-move">
          <label htmlFor={`quick-move-${job.id}`} className="sr-only">Move Status</label>
          <select
            id={`quick-move-${job.id}`}
            value={job.status}
            onChange={(e) => onMoveQuick(job.id, e.target.value as JobStatus)}
            className="quick-move-select"
            title="Move to column"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

