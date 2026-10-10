import React from 'react';

export const SkeletonLoader: React.FC = () => {
  const columns = ['Applied', 'Interviewing', 'Offer', 'Rejected'];

  return (
    <div className="skeleton-grid" aria-label="Loading job applications...">
      {columns.map((_, index) => (
        <div key={index} className="skeleton-column">
          <div className="skeleton-header shimmer"></div>
          <div className="skeleton-cards">
            {[1, 2, 3].map((cardIdx) => (
              <div key={cardIdx} className="skeleton-card shimmer">
                <div className="skeleton-line title"></div>
                <div className="skeleton-line company"></div>
                <div className="skeleton-tags">
                  <div className="skeleton-pill"></div>
                  <div className="skeleton-pill"></div>
                </div>
                <div className="skeleton-footer">
                  <div className="skeleton-line date"></div>
                  <div className="skeleton-line badge"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
