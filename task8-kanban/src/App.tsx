import React from 'react';
import { useJobsWithStorage } from './hooks/useJobsWithStorage';
import { KanbanBoard } from './components/KanbanBoard';
import { SkeletonLoader } from './components/SkeletonLoader';

export const App: React.FC = () => {
  const {
    jobs,
    isLoading,
    addJob,
    updateJobStatus,
    deleteJob,
    resetToDefaults
  } = useJobsWithStorage();

  return (
    <div className="app-container">
      {/* Top Application Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="7" height="18" rx="2"></rect>
              <rect x="14" y="3" width="7" height="10" rx="2"></rect>
            </svg>
          </div>
          <div>
            <h1 className="brand-title">JobTrail Pro</h1>
            <p className="brand-subtitle">Interactive Kanban Pipeline & Career Tracker</p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge-tech">React 18</span>
          <span className="badge-tech">TypeScript</span>
          <span className="badge-tech">Local Persistence</span>
          <span className="status-live-pill">
            <span className="live-dot"></span>
            Auto-saved
          </span>
        </div>
      </header>

      {/* Main Board Area with Skeleton Loader Fallback */}
      <div className="board-container">
        {isLoading ? (
          <div className="loading-state-wrapper">
            <div className="loading-indicator">
              <span className="spinner"></span>
              <span>Syncing pipeline from local storage...</span>
            </div>
            <SkeletonLoader />
          </div>
        ) : (
          <KanbanBoard
            jobs={jobs}
            onAddJob={addJob}
            onUpdateStatus={updateJobStatus}
            onDeleteJob={deleteJob}
            onResetDefaults={resetToDefaults}
          />
        )}
      </div>

      {/* Quick Footer info */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            💡 <strong>Senior Developer Tip:</strong> Drag and drop any card between columns, or use the quick status selector on each card. All changes persist automatically to browser <code>localStorage</code>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

