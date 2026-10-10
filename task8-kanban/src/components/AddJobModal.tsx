import React, { useState, useEffect } from 'react';
import { JobFormData, FormErrors, JobStatus } from '../types';

interface AddJobModalProps {
  isOpen: boolean;
  defaultStatus: JobStatus;
  onClose: () => void;
  onSubmit: (formData: JobFormData) => void;
}

const INITIAL_FORM: JobFormData = {
  title: '',
  company: '',
  location: '',
  type: 'Full-time',
  salary: '',
  url: '',
  status: 'applied',
  notes: '',
  tags: ''
};

export const AddJobModal: React.FC<AddJobModalProps> = ({
  isOpen,
  defaultStatus,
  onClose,
  onSubmit
}) => {
  const [form, setForm] = useState<JobFormData>({
    ...INITIAL_FORM,
    status: defaultStatus
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setForm({ ...INITIAL_FORM, status: defaultStatus });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, defaultStatus]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validateField = (name: keyof JobFormData, value: string): string | undefined => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Job title is required';
        if (value.trim().length < 2) return 'Job title must be at least 2 characters';
        return undefined;
      case 'company':
        if (!value.trim()) return 'Company name is required';
        return undefined;
      case 'location':
        if (!value.trim()) return 'Location is required (e.g. Remote, City)';
        return undefined;
      case 'url':
        if (value.trim()) {
          try {
            const urlObj = new URL(value.trim());
            if (!['http:', 'https:'].includes(urlObj.protocol)) {
              return 'URL must start with http:// or https://';
            }
          } catch {
            return 'Please enter a valid URL';
          }
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof JobFormData;

    setForm((prev) => ({ ...prev, [fieldName]: value }));

    if (touched[name]) {
      const fieldError = validateField(fieldName, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof JobFormData;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = validateField('title', form.title);
    const companyError = validateField('company', form.company);
    const locationError = validateField('location', form.location);
    const urlError = validateField('url', form.url);

    const newErrors: FormErrors = {
      title: titleError,
      company: companyError,
      location: locationError,
      url: urlError
    };

    setErrors(newErrors);
    setTouched({
      title: true,
      company: true,
      location: true,
      url: true
    });

    if (!titleError && !companyError && !locationError && !urlError) {
      onSubmit(form);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <div>
            <h2 id="modal-title" className="modal-title">Track New Job Application</h2>
            <p className="modal-subtitle">Log application details to organize your interview pipeline</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-grid">
            {/* Job Title */}
            <div className="form-group col-span-2">
              <label htmlFor="field-title" className="form-label">
                Job Title <span className="required-star">*</span>
              </label>
              <input
                id="field-title"
                name="title"
                type="text"
                className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
                placeholder="e.g. Senior Frontend Engineer"
                value={form.title}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.title && errors.title && (
                <span className="field-error-message">{errors.title}</span>
              )}
            </div>

            {/* Company Name */}
            <div className="form-group">
              <label htmlFor="field-company" className="form-label">
                Company <span className="required-star">*</span>
              </label>
              <input
                id="field-company"
                name="company"
                type="text"
                className={`form-input ${touched.company && errors.company ? 'input-error' : ''}`}
                placeholder="e.g. Stripe, Vercel"
                value={form.company}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.company && errors.company && (
                <span className="field-error-message">{errors.company}</span>
              )}
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="field-location" className="form-label">
                Location <span className="required-star">*</span>
              </label>
              <input
                id="field-location"
                name="location"
                type="text"
                className={`form-input ${touched.location && errors.location ? 'input-error' : ''}`}
                placeholder="e.g. Remote, San Francisco"
                value={form.location}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {touched.location && errors.location && (
                <span className="field-error-message">{errors.location}</span>
              )}
            </div>

            {/* Employment Type */}
            <div className="form-group">
              <label htmlFor="field-type" className="form-label">
                Employment Type
              </label>
              <select
                id="field-type"
                name="type"
                className="form-select"
                value={form.type}
                onChange={handleChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Initial Stage */}
            <div className="form-group">
              <label htmlFor="field-status" className="form-label">
                Stage Column
              </label>
              <select
                id="field-status"
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Salary */}
            <div className="form-group">
              <label htmlFor="field-salary" className="form-label">
                Compensation / Salary
              </label>
              <input
                id="field-salary"
                name="salary"
                type="text"
                className="form-input"
                placeholder="e.g. $160k - $190k"
                value={form.salary}
                onChange={handleChange}
              />
            </div>

            {/* Job Posting URL */}
            <div className="form-group">
              <label htmlFor="field-url" className="form-label">
                Job Posting URL
              </label>
              <input
                id="field-url"
                name="url"
                type="url"
                className={`form-input ${touched.url && errors.url ? 'input-error' : ''}`}
                placeholder="https://company.com/job/123"
                value={form.url}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.url && errors.url && (
                <span className="field-error-message">{errors.url}</span>
              )}
            </div>

            {/* Skill Tags */}
            <div className="form-group col-span-2">
              <label htmlFor="field-tags" className="form-label">
                Tags <span className="helper-hint">(comma-separated)</span>
              </label>
              <input
                id="field-tags"
                name="tags"
                type="text"
                className="form-input"
                placeholder="React, TypeScript, GraphQL, Next.js"
                value={form.tags}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div className="form-group col-span-2">
              <label htmlFor="field-notes" className="form-label">
                Application Notes
              </label>
              <textarea
                id="field-notes"
                name="notes"
                rows={3}
                className="form-textarea"
                placeholder="Referral name, recruiter email, interview prep notes..."
                value={form.notes}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <footer className="modal-footer">
            <button
              type="button"
              className="btn-modal-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-modal-primary"
            >
              Add Application
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
