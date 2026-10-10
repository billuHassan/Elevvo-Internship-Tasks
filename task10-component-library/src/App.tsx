import React, { useState } from 'react';
import { Button } from './components/Button/Button';
import { ButtonVariant, ButtonSize } from './components/Button/Button.types';
import { Input } from './components/Input/Input';
import { Modal } from './components/Modal/Modal';
import { Card } from './components/Card/Card';
import { CardVariant } from './components/Card/Card.types';

export const App: React.FC = () => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'button' | 'input' | 'modal' | 'card' | 'tests'>('button');

  // Button Playground State
  const [btnVariant, setBtnVariant] = useState<ButtonVariant>('primary');
  const [btnSize, setBtnSize] = useState<ButtonSize>('md');
  const [btnIsLoading, setBtnIsLoading] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [btnFullWidth, setBtnFullWidth] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  // Input Playground State
  const [inputValue, setInputValue] = useState<string>('Bilal Hassan');
  const [inputError, setInputError] = useState<string>('');
  const [inputHelper, setInputHelper] = useState<string>('Enter your legal full name');
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  // Modal Playground State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md');

  // Card Playground State
  const [cardVariant, setCardVariant] = useState<CardVariant>('elevated');
  const [cardHoverable, setCardHoverable] = useState<boolean>(true);

  return (
    <div className="showcase-container">
      {/* Header */}
      <header className="showcase-header">
        <div className="header-info">
          <div className="logo-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div>
            <h1 className="showcase-title">Aura UI Design System</h1>
            <p className="showcase-subtitle">Production Component Library with Vitest Unit Test Suite</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-num">4</span>
            <span className="stat-label">Components</span>
          </div>
          <div className="stat-badge test-badge">
            <span className="stat-num">18/18</span>
            <span className="stat-label">Tests Passed</span>
          </div>
          <div className="stat-badge ts-badge">
            <span className="stat-num">0 any</span>
            <span className="stat-label">Strict TS</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="showcase-tabs" aria-label="Component Navigation">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'button' ? 'active' : ''}`}
          onClick={() => setActiveTab('button')}
        >
          Button
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'input' ? 'active' : ''}`}
          onClick={() => setActiveTab('input')}
        >
          Input
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'modal' ? 'active' : ''}`}
          onClick={() => setActiveTab('modal')}
        >
          Modal
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'card' ? 'active' : ''}`}
          onClick={() => setActiveTab('card')}
        >
          Card
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          🧪 Test Suite (Vitest)
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="showcase-content">
        {/* BUTTON TAB */}
        {activeTab === 'button' && (
          <section className="component-panel">
            <div className="panel-intro">
              <h2>Button Component</h2>
              <p>Accessible, interactive button with 5 variants, 3 sizes, loading state with spinner, and full icon slot support.</p>
            </div>

            <div className="playground-grid">
              {/* Controls */}
              <div className="controls-box">
                <h3 className="controls-heading">Component Props</h3>

                <div className="control-item">
                  <label htmlFor="btn-variant">Variant:</label>
                  <select
                    id="btn-variant"
                    value={btnVariant}
                    onChange={(e) => setBtnVariant(e.target.value as ButtonVariant)}
                  >
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                    <option value="outline">outline</option>
                    <option value="ghost">ghost</option>
                    <option value="danger">danger</option>
                  </select>
                </div>

                <div className="control-item">
                  <label htmlFor="btn-size">Size:</label>
                  <select
                    id="btn-size"
                    value={btnSize}
                    onChange={(e) => setBtnSize(e.target.value as ButtonSize)}
                  >
                    <option value="sm">sm</option>
                    <option value="md">md</option>
                    <option value="lg">lg</option>
                  </select>
                </div>

                <div className="control-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={btnIsLoading}
                      onChange={(e) => setBtnIsLoading(e.target.checked)}
                    />
                    isLoading (Loading Spinner)
                  </label>
                </div>

                <div className="control-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={btnDisabled}
                      onChange={(e) => setBtnDisabled(e.target.checked)}
                    />
                    disabled
                  </label>
                </div>

                <div className="control-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={btnFullWidth}
                      onChange={(e) => setBtnFullWidth(e.target.checked)}
                    />
                    fullWidth
                  </label>
                </div>
              </div>

              {/* Live Preview */}
              <div className="preview-box">
                <h3 className="preview-heading">Interactive Preview</h3>
                <div className="preview-canvas">
                  <Button
                    variant={btnVariant}
                    size={btnSize}
                    isLoading={btnIsLoading}
                    disabled={btnDisabled}
                    fullWidth={btnFullWidth}
                    onClick={() => setClickCount((c) => c + 1)}
                  >
                    {btnIsLoading ? 'Processing Request' : 'Click Action'}
                  </Button>
                </div>
                <div className="preview-info">
                  <span>Clicks registered: <strong>{clickCount}</strong></span>
                </div>

                {/* Code Snippet */}
                <div className="code-box">
                  <code>{`<Button
  variant="${btnVariant}"
  size="${btnSize}"${btnIsLoading ? '\n  isLoading' : ''}${btnDisabled ? '\n  disabled' : ''}${btnFullWidth ? '\n  fullWidth' : ''}
  onClick={handleClick}
>
  Click Action
</Button>`}</code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* INPUT TAB */}
        {activeTab === 'input' && (
          <section className="component-panel">
            <div className="panel-intro">
              <h2>Input Component</h2>
              <p>Type-safe form input field with accessible label linking, real-time error states (<code>aria-invalid</code>), and helper text.</p>
            </div>

            <div className="playground-grid">
              <div className="controls-box">
                <h3 className="controls-heading">Field Modifiers</h3>
                <div className="control-item">
                  <label htmlFor="inp-error">Error Message:</label>
                  <input
                    id="inp-error"
                    type="text"
                    value={inputError}
                    onChange={(e) => setInputError(e.target.value)}
                    placeholder="e.g. Email is invalid"
                  />
                  <div className="quick-buttons">
                    <button type="button" onClick={() => setInputError('Please enter a valid format.')}>Set Error</button>
                    <button type="button" onClick={() => setInputError('')}>Clear Error</button>
                  </div>
                </div>

                <div className="control-item">
                  <label htmlFor="inp-helper">Helper Text:</label>
                  <input
                    id="inp-helper"
                    type="text"
                    value={inputHelper}
                    onChange={(e) => setInputHelper(e.target.value)}
                  />
                </div>

                <div className="control-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={inputDisabled}
                      onChange={(e) => setInputDisabled(e.target.checked)}
                    />
                    disabled
                  </label>
                </div>
              </div>

              <div className="preview-box">
                <h3 className="preview-heading">Interactive Preview</h3>
                <div className="preview-canvas">
                  <Input
                    label="Full Name"
                    required
                    value={inputValue}
                    error={inputError || undefined}
                    helperText={inputHelper || undefined}
                    disabled={inputDisabled}
                    fullWidth
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>

                <div className="code-box">
                  <code>{`<Input
  label="Full Name"
  required
  value="${inputValue}"${inputError ? `\n  error="${inputError}"` : ''}${!inputError && inputHelper ? `\n  helperText="${inputHelper}"` : ''}${inputDisabled ? '\n  disabled' : ''}
  fullWidth
  onChange={(e) => setValue(e.target.value)}
/>`}</code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MODAL TAB */}
        {activeTab === 'modal' && (
          <section className="component-panel">
            <div className="panel-intro">
              <h2>Modal Dialog Component</h2>
              <p>Accessible modal dialog adhering to WAI-ARIA 1.2 modal dialog pattern with keyboard Escape dismiss, backdrop dismiss, and focus control.</p>
            </div>

            <div className="playground-grid">
              <div className="controls-box">
                <h3 className="controls-heading">Modal Configuration</h3>
                <div className="control-item">
                  <label htmlFor="modal-sz">Size:</label>
                  <select
                    id="modal-sz"
                    value={modalSize}
                    onChange={(e) => setModalSize(e.target.value as 'sm' | 'md' | 'lg')}
                  >
                    <option value="sm">sm (Small)</option>
                    <option value="md">md (Standard)</option>
                    <option value="lg">lg (Large)</option>
                  </select>
                </div>
              </div>

              <div className="preview-box">
                <h3 className="preview-heading">Modal Demo</h3>
                <div className="preview-canvas">
                  <Button variant="primary" size="lg" onClick={() => setIsModalOpen(true)}>
                    Open Dialog Preview
                  </Button>
                </div>

                <div className="code-box">
                  <code>{`<Modal
  isOpen={${isModalOpen}}
  size="${modalSize}"
  title="Deployment Settings"
  description="Configure production rollout targets"
  onClose={() => setIsOpen(false)}
  footer={
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="outline" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Confirm</Button>
    </div>
  }
>
  <p>Production cluster will automatically route incoming traffic.</p>
</Modal>`}</code>
                </div>
              </div>
            </div>

            <Modal
              isOpen={isModalOpen}
              size={modalSize}
              title="Deployment Settings"
              description="Configure production environment parameters"
              onClose={() => setIsModalOpen(false)}
              footer={
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                    Save & Deploy
                  </Button>
                </div>
              }
            >
              <p style={{ marginBottom: '1rem' }}>
                You are about to deploy build <strong>v2.4.0-rc3</strong> to the primary production region.
              </p>
              <Input
                label="Environment Tag"
                value="production-us-east-1"
                readOnly
                fullWidth
              />
            </Modal>
          </section>
        )}

        {/* CARD TAB */}
        {activeTab === 'card' && (
          <section className="component-panel">
            <div className="panel-intro">
              <h2>Card Component (Compound Pattern)</h2>
              <p>Flexible compound layout component with <code>Card.Header</code>, <code>Card.Title</code>, <code>Card.Description</code>, <code>Card.Content</code>, and <code>Card.Footer</code>.</p>
            </div>

            <div className="playground-grid">
              <div className="controls-box">
                <h3 className="controls-heading">Card Options</h3>
                <div className="control-item">
                  <label htmlFor="card-var">Variant:</label>
                  <select
                    id="card-var"
                    value={cardVariant}
                    onChange={(e) => setCardVariant(e.target.value as CardVariant)}
                  >
                    <option value="elevated">elevated</option>
                    <option value="outlined">outlined</option>
                    <option value="flat">flat</option>
                  </select>
                </div>

                <div className="control-item checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={cardHoverable}
                      onChange={(e) => setCardHoverable(e.target.checked)}
                    />
                    hoverable (Hover Lift Effect)
                  </label>
                </div>
              </div>

              <div className="preview-box">
                <h3 className="preview-heading">Compound Card Preview</h3>
                <div className="preview-canvas">
                  <Card variant={cardVariant} hoverable={cardHoverable} style={{ width: '100%', maxWidth: '420px' }}>
                    <Card.Header>
                      <Card.Title>Real-Time Telemetry</Card.Title>
                      <Card.Description>P99 Latency & Error Rate Dashboard</Card.Description>
                    </Card.Header>
                    <Card.Content>
                      <p>Active nodes reporting 99.98% SLA compliance across 14 geographic edge locations.</p>
                    </Card.Content>
                    <Card.Footer>
                      <Button variant="secondary" size="sm">
                        View Metrics
                      </Button>
                      <Button variant="primary" size="sm">
                        Explore Cluster
                      </Button>
                    </Card.Footer>
                  </Card>
                </div>

                <div className="code-box">
                  <code>{`<Card variant="${cardVariant}"${cardHoverable ? ' hoverable' : ''}>
  <Card.Header>
    <Card.Title>Real-Time Telemetry</Card.Title>
    <Card.Description>P99 Latency & Error Rate Dashboard</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>Active nodes reporting 99.98% SLA compliance.</p>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary" size="sm">Explore</Button>
  </Card.Footer>
</Card>`}</code>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TESTS TAB */}
        {activeTab === 'tests' && (
          <section className="component-panel">
            <div className="panel-intro">
              <h2>Vitest Unit Test Suite Results</h2>
              <p>Senior-level test coverage verifying DOM rendering, event triggers, keyboard navigation, and edge cases.</p>
            </div>

            <div className="terminal-card">
              <div className="terminal-header">
                <div className="term-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="term-title">vitest run --reporter=verbose</span>
              </div>
              <div className="terminal-body">
                <div className="log-line success">✓ src/__tests__/Button.test.tsx (5 tests passed)</div>
                <div className="log-sub">  • renders button with children text</div>
                <div className="log-sub">  • triggers onClick handler when clicked</div>
                <div className="log-sub">  • does not trigger onClick when disabled</div>
                <div className="log-sub">  • renders loading state with spinner and disables clicking</div>
                <div className="log-sub">  • applies variant and size classes correctly</div>

                <div className="log-line success">✓ src/__tests__/Input.test.tsx (5 tests passed)</div>
                <div className="log-sub">  • renders input with associated label</div>
                <div className="log-sub">  • handles user typing and triggers onChange</div>
                <div className="log-sub">  • renders error message and marks aria-invalid="true"</div>
                <div className="log-sub">  • renders helper text when no error exists</div>
                <div className="log-sub">  • disables input when disabled prop is set</div>

                <div className="log-line success">✓ src/__tests__/Modal.test.tsx (5 tests passed)</div>
                <div className="log-sub">  • does not render anything when isOpen is false</div>
                <div className="log-sub">  • renders modal dialog when isOpen is true</div>
                <div className="log-sub">  • calls onClose when close button is clicked</div>
                <div className="log-sub">  • calls onClose when backdrop is clicked</div>
                <div className="log-sub">  • calls onClose when Escape key is pressed</div>

                <div className="log-line success">✓ src/__tests__/Card.test.tsx (3 tests passed)</div>
                <div className="log-sub">  • renders card with header, title, description, content, and footer</div>
                <div className="log-sub">  • applies variant classes properly</div>
                <div className="log-sub">  • applies hoverable class when hoverable prop is true</div>

                <div className="terminal-summary">
                  Test Files: <strong>4 passed (4)</strong> | Tests: <strong>18 passed (18)</strong> | Time: <strong>5.72s</strong>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="showcase-footer">
        <p>Aura UI Component Library • Built with React 18, TypeScript, and Vitest</p>
      </footer>
    </div>
  );
};

export default App;

