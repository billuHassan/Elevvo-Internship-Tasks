/**
 * Task 6: Multi-Page Admin Dashboard for Freelance Client
 * Features:
 * - Client-side SPA routing (Overview, Projects, Profile Settings) without page refresh
 * - Chart.js data visualizations: Monthly Earnings Bar Chart & Tasks Doughnut Chart
 * - Notification dropdown with 3 recent mock activities and unread badge (Bonus)
 * - Interactive Projects filter (Status dropdown) and dynamic text search
 * - Profile Settings save handler with animated feedback
 * - Mobile responsive drawer toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mock Projects Dataset
  const projectsData = [
    {
      id: 1,
      name: 'CloudSync Web Platform Redesign',
      client: 'CloudSync Inc.',
      status: 'In Progress',
      budget: '$14,200',
      deadline: 'Nov 15, 2026',
      progress: 65,
    },
    {
      id: 2,
      name: 'FinFlow Payment Gateway Integration',
      client: 'FinFlow Global',
      status: 'In Review',
      budget: '$8,500',
      deadline: 'Nov 04, 2026',
      progress: 90,
    },
    {
      id: 3,
      name: 'HealthPulse Patient Portal UI',
      client: 'HealthPulse Med',
      status: 'In Progress',
      budget: '$12,800',
      deadline: 'Nov 28, 2026',
      progress: 40,
    },
    {
      id: 4,
      name: 'Veritas Design System & Tokens',
      client: 'Veritas Media',
      status: 'Completed',
      budget: '$6,400',
      deadline: 'Oct 24, 2026',
      progress: 100,
    },
    {
      id: 5,
      name: 'Orbit Mobile App Onboarding',
      client: 'Orbit Labs',
      status: 'Pending',
      budget: '$4,500',
      deadline: 'Dec 10, 2026',
      progress: 10,
    },
    {
      id: 6,
      name: 'AuraMetrics Telemetry Dashboard',
      client: 'AuraCloud Corp',
      status: 'Completed',
      budget: '$9,200',
      deadline: 'Oct 18, 2026',
      progress: 100,
    },
  ];

  // 2. SPA View Routing
  const navButtons = document.querySelectorAll('.nav-btn');
  const pageViews = document.querySelectorAll('.page-view');
  const currentViewTitle = document.getElementById('currentViewTitle');
  const sidebar = document.getElementById('appSidebar');
  const menuToggleBtn = document.getElementById('menuToggleBtn');

  function switchView(viewName) {
    pageViews.forEach((view) => {
      view.classList.toggle('active', view.id === `view-${viewName}`);
    });

    navButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
    });

    // Update Header Title
    const titles = {
      overview: 'Overview',
      projects: 'Client Projects',
      settings: 'Profile & Settings',
    };
    currentViewTitle.textContent = titles[viewName] || 'Dashboard';

    // Close mobile sidebar if open
    sidebar.classList.remove('mobile-open');

    // Trigger chart resize if navigating to overview
    if (viewName === 'overview' && window.earningsChartInstance) {
      window.earningsChartInstance.resize();
      window.taskStatusChartInstance.resize();
    }
  }

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchView(view);
      window.location.hash = view;
    });
  });

  // Check URL hash on initial load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && ['overview', 'projects', 'settings'].includes(initialHash)) {
    switchView(initialHash);
  }

  // Mobile menu toggle
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // 3. Render Projects Table
  const tableBody = document.getElementById('projectsTableBody');
  const projectSearchInput = document.getElementById('projectSearchInput');
  const statusFilter = document.getElementById('statusFilter');

  function getStatusClass(status) {
    switch (status) {
      case 'In Progress': return 'status-in-progress';
      case 'In Review': return 'status-in-review';
      case 'Completed': return 'status-completed';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  }

  function renderProjectsTable(items) {
    tableBody.innerHTML = '';
    if (items.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 2rem;">No matching projects found.</td></tr>`;
      return;
    }

    items.forEach((proj) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="project-title-cell">${proj.name}</td>
        <td>${proj.client}</td>
        <td><span class="status-pill ${getStatusClass(proj.status)}">${proj.status}</span></td>
        <td><strong>${proj.budget}</strong></td>
        <td>${proj.deadline}</td>
        <td>
          <div style="font-size: 0.8rem; font-weight: 600; margin-bottom: 2px;">${proj.progress}%</div>
          <div class="table-progress-wrap">
            <div class="table-progress-bar" style="width: ${proj.progress}%;"></div>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  function filterProjects() {
    const term = (projectSearchInput.value || '').toLowerCase().trim();
    const status = statusFilter.value;

    const filtered = projectsData.filter((proj) => {
      const matchesText = proj.name.toLowerCase().includes(term) || proj.client.toLowerCase().includes(term);
      const matchesStatus = status === 'ALL' || proj.status === status;
      return matchesText && matchesStatus;
    });

    renderProjectsTable(filtered);
  }

  if (projectSearchInput) projectSearchInput.addEventListener('input', filterProjects);
  if (statusFilter) statusFilter.addEventListener('change', filterProjects);
  renderProjectsTable(projectsData);

  // 4. Notification Dropdown (Bonus Requirement)
  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  const notifBadge = document.getElementById('notifBadge');
  const markReadBtn = document.getElementById('markReadBtn');

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('open');
      notifBtn.setAttribute('aria-expanded', notifDropdown.classList.contains('open').toString());
    });

    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
        notifDropdown.classList.remove('open');
      }
    });

    if (markReadBtn) {
      markReadBtn.addEventListener('click', () => {
        const unreadItems = document.querySelectorAll('.notif-item.unread');
        unreadItems.forEach((el) => el.classList.remove('unread'));
        notifBadge.classList.add('hidden');
        markReadBtn.textContent = 'All read';
        markReadBtn.disabled = true;
      });
    }
  }

  // 5. Profile Settings Form Handler
  const settingsForm = document.getElementById('profileSettingsForm');
  const saveStatus = document.getElementById('saveStatus');

  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveStatus.textContent = 'Saving changes...';
      saveStatus.className = 'save-status';

      setTimeout(() => {
        saveStatus.textContent = '✓ Profile settings saved successfully!';
        saveStatus.className = 'save-status success';
        setTimeout(() => {
          saveStatus.textContent = '';
        }, 3500);
      }, 600);
    });
  }

  // 6. Chart.js Initialization
  initCharts();
});

function initCharts() {
  if (typeof Chart === 'undefined') return;

  // Monthly Earnings Bar Chart
  const ctxEarnings = document.getElementById('earningsChart');
  if (ctxEarnings) {
    window.earningsChartInstance = new Chart(ctxEarnings, {
      type: 'bar',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
          {
            label: 'Earnings ($)',
            data: [5800, 7200, 6400, 8900, 11400, 8550],
            backgroundColor: '#3b82f6',
            hoverBackgroundColor: '#1d4ed8',
            borderRadius: 6,
            barPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` $${context.raw.toLocaleString()}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value / 1000}k`,
              font: { family: 'Plus Jakarta Sans', size: 11 },
            },
            grid: { color: '#f1f5f9' },
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 11 } },
          },
        },
      },
    });
  }

  // Task Status Breakdown Doughnut Chart
  const ctxTasks = document.getElementById('taskStatusChart');
  if (ctxTasks) {
    window.taskStatusChartInstance = new Chart(ctxTasks, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'In Review', 'Pending'],
        datasets: [
          {
            data: [18, 7, 4, 3],
            backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#94a3b8'],
            borderWidth: 2,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: { family: 'Plus Jakarta Sans', size: 11 },
              boxWidth: 12,
              padding: 14,
            },
          },
        },
        cutout: '68%',
      },
    });
  }
}

