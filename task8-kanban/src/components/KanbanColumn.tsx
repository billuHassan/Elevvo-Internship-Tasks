import React, { useState } from 'react';
import { Column, Job, JobStatus } from '../types';
import { JobCard } from './JobCard';

interface KanbanColumnProps {
  column: Column;
  jobs: Job[];
  onDropJob: (jobId: string, targetStatus: JobStatus) => void;
  onDragStartJob: (e: React.DragEvent<HTMLDivElement>, jobId: string, currentStatus: JobStatus) => void;
  onDeleteJob: (jobId: string) => void;
  onMoveQuickJob: (jobId: string, newStatus: JobStatus) => void;
  onOpenAddModal: (defaultStatus: JobStatus) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  jobs,
  onDropJob,
  onDragStartJob,
  onDeleteJob,
  onMoveQuickJob,
  onOpenAddModal
}) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // Only deactivate when leaving the column container itself
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const jobId = e.dataTransfer.getData('text/plain');
    if (jobId) {
      onDropJob(jobId, column.id);
    }
  };

  return (
    <section
      className={`kanban-column ${isDragOver ? 'column-drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-labelledby={`col-header-${column.id}`}
    >
      <header className="column-header" style={{ borderTopColor: column.color }}>
        <div className="column-title-group">
          <span className="column-dot" style={{ backgroundColor: column.color }}></span>
          <h3 id={`col-header-${column.id}`} className="column-heading">
            {column.title}
          </h3>
          <span className="column-count-badge" style={{ backgroundColor: column.accentBg, color: column.color }}>
            {jobs.length}
          </span>
        </div>
        <button
          type="button"
          className="col-add-btn"
          onClick={() => onOpenAddModal(column.id)}
          title={`Add job to ${column.title}`}
          aria-label={`Add job to ${column.title}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </header>

      <div className="column-drop-zone">
        {jobs.length === 0 ? (
          <div className="empty-column-placeholder">
            <div className="empty-icon" style={{ color: column.color }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
              </svg>
            </div>
            <p className="empty-text">No jobs in {column.title.toLowerCase()}</p>
            <span className="empty-subtext">Drop cards here or click + to add</span>
          </div>
        ) : (
          <div className="cards-list">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDragStart={onDragStartJob}
                onDelete={onDeleteJob}
                onMoveQuick={onMoveQuickJob}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

