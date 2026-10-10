/**
 * Task 4: Personal Blog Homepage
 * Features:
 * - Card layout displaying title, image, short description, date, and category
 * - Category filter (Tech, Travel, Food, All)
 * - Visible posts pagination limit per page
 * - Bonus: Search input to filter posts by title keyword
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mock Blog Posts Dataset (12 High-Quality Posts)
  const POSTS_DATA = [
    {
      id: 1,
      title: 'Architecting Scalable Microfrontends with Module Federation',
      category: 'Tech',
      date: 'Oct 08, 2026',
      readTime: '6 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80',
      description: 'A deep dive into decoupled deployment pipelines, shared runtime dependencies, and state isolation in modern web apps.',
    },
    {
      id: 2,
      title: 'A Week Wandering the Neon Alleys and Temples of Kyoto',
      category: 'Travel',
      date: 'Oct 04, 2026',
      readTime: '8 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=700&auto=format&fit=crop&q=80',
      description: 'Navigating dawn bamboo groves in Arashiyama, silent Zen gardens, and the unforgettable midnight ramen stalls of Pontocho.',
    },
    {
      id: 3,
      title: 'The Alchemy of 72-Hour Sourdough: Fermentation & Crumb',
      category: 'Food',
      date: 'Sep 29, 2026',
      readTime: '5 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
      description: 'Demystifying hydration percentages, ambient yeast temperatures, and Dutch-oven baking techniques for the perfect blistered crust.',
    },
    {
      id: 4,
      title: 'Optimizing React 19 Actions and Server Components',
      category: 'Tech',
      date: 'Sep 22, 2026',
      readTime: '7 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=700&auto=format&fit=crop&q=80',
      description: 'Benchmarking bundle sizes and streaming SSR performance when adopting React 19 Compiler and optimistic mutations.',
    },
    {
      id: 5,
      title: 'Bouldering Across the Granite Monoliths of Patagonia',
      category: 'Travel',
      date: 'Sep 18, 2026',
      readTime: '9 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=700&auto=format&fit=crop&q=80',
      description: 'Facing relentless Patagonian winds, crossing glacial moraines, and witnessing sunrise ignite the iconic towers of Torres del Paine.',
    },
    {
      id: 6,
      title: 'Handcrafted Espresso: Dialing in Single-Origin Geisha Beans',
      category: 'Food',
      date: 'Sep 12, 2026',
      readTime: '4 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80',
      description: 'Exploring extraction ratios, flow profiling, and water TDS hardness to unlock jasmine florals and peach sweetness in high-altitude roasts.',
    },
    {
      id: 7,
      title: 'Building Type-Safe Design Systems with TypeScript Generics',
      category: 'Tech',
      date: 'Sep 06, 2026',
      readTime: '6 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&auto=format&fit=crop&q=80',
      description: 'Leveraging mapped types, polymorphic ref forwarding, and variant union types for bulletproof enterprise UI components.',
    },
    {
      id: 8,
      title: 'Kayaking the Fjords of Western Norway: A Solitary Journey',
      category: 'Travel',
      date: 'Aug 28, 2026',
      readTime: '10 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&auto=format&fit=crop&q=80',
      description: 'Gliding beneath sheer two-thousand-foot rock faces, camping along cascading waterfalls, and discovering Arctic coastal tranquility.',
    },
    {
      id: 9,
      title: 'The Art of Roman Cacio e Pepe: Emulsifying Without Clumps',
      category: 'Food',
      date: 'Aug 20, 2026',
      readTime: '5 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281788?w=700&auto=format&fit=crop&q=80',
      description: 'Why pasta starchy water temperature and freshly crushed Tellicherry peppercorns are the sole secrets to creamy Roman perfection.',
    },
    {
      id: 10,
      title: 'Zero to Production with WebAssembly and Rust in the Browser',
      category: 'Tech',
      date: 'Aug 14, 2026',
      readTime: '8 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80',
      description: 'Porting high-throughput image processing filters directly to client-side threads using wasm-bindgen and Web Workers.',
    },
    {
      id: 11,
      title: 'Renting a Campervan Across Iceland’s Volcanic Ring Road',
      category: 'Travel',
      date: 'Aug 07, 2026',
      readTime: '11 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&auto=format&fit=crop&q=80',
      description: 'Chasing the midnight sun, hot springs in remote highland passes, and black sand basalt beaches carved by North Atlantic swells.',
    },
    {
      id: 12,
      title: 'Wood-Fired Neapolitan Pizza: 68% Hydration & San Marzano',
      category: 'Food',
      date: 'Jul 30, 2026',
      readTime: '6 min read',
      author: 'Bilal Hassan',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80',
      description: 'Mastering the 90-second bake at 900°F with fresh Fior di Latte, cold poolish starters, and fragrant Genovese basil.',
    },
  ];

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryList = document.getElementById('categoryList');
  const perPageSelect = document.getElementById('perPageSelect');
  const postsGrid = document.getElementById('postsGrid');
  const emptyState = document.getElementById('emptyState');
  const paginationBar = document.getElementById('paginationBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageNumbers = document.getElementById('pageNumbers');
  const resultsCount = document.getElementById('resultsCount');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  // Application State
  let currentCategory = 'ALL';
  let searchQuery = '';
  let currentPage = 1;
  let postsPerPage = 6;

  // Compute category counts
  function updateCounts() {
    document.getElementById('count-all').textContent = POSTS_DATA.length;
    document.getElementById('count-tech').textContent = POSTS_DATA.filter((p) => p.category === 'Tech').length;
    document.getElementById('count-travel').textContent = POSTS_DATA.filter((p) => p.category === 'Travel').length;
    document.getElementById('count-food').textContent = POSTS_DATA.filter((p) => p.category === 'Food').length;
  }

  // Filter posts based on category and title search keyword (Bonus)
  function getFilteredPosts() {
    return POSTS_DATA.filter((post) => {
      const matchesCategory = currentCategory === 'ALL' || post.category === currentCategory;
      const matchesTitle = post.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesTitle;
    });
  }

  // Render Post Card HTML
  function renderPostCard(post) {
    const tagClass = `tag-${post.category.toLowerCase()}`;

    return `
      <article class="post-card" data-category="${post.category}">
        <div class="post-media">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
          <span class="post-tag ${tagClass}">${post.category}</span>
        </div>
        <div class="post-body">
          <div class="post-meta">
            <time>${post.date}</time>
            <span>•</span>
            <span>${post.readTime}</span>
          </div>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-desc">${post.description}</p>
          <div class="post-footer">
            <span class="author-name">By ${post.author}</span>
            <a href="#" class="read-more">Read Story →</a>
          </div>
        </div>
      </article>
    `;
  }

  // Render Page
  function render() {
    const filtered = getFilteredPosts();
    const totalPosts = filtered.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage) || 1;

    // Boundary check
    if (currentPage > totalPages) currentPage = 1;

    // Slice for pagination limit per page (Required)
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts);
    const visiblePosts = filtered.slice(startIndex, endIndex);

    // Update Results Label
    if (totalPosts === 0) {
      resultsCount.textContent = '0 articles found';
      postsGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      paginationBar.classList.add('hidden');
    } else {
      resultsCount.textContent = `Showing ${startIndex + 1}–${endIndex} of ${totalPosts} articles`;
      emptyState.classList.add('hidden');
      paginationBar.classList.remove('hidden');

      // Populate Grid
      postsGrid.innerHTML = visiblePosts.map(renderPostCard).join('');

      // Render Pagination Buttons
      renderPagination(totalPages);
    }
  }

  // Render Pagination Controls
  function renderPagination(totalPages) {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = `page-num ${i === currentPage ? 'active' : ''}`;
      btn.textContent = i;
      btn.setAttribute('aria-label', `Page ${i}`);
      btn.addEventListener('click', () => {
        currentPage = i;
        render();
        window.scrollTo({ top: 220, behavior: 'smooth' });
      });
      pageNumbers.appendChild(btn);
    }
  }

  // Search input handler (Bonus: filter posts by title keyword)
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.classList.toggle('hidden', searchQuery.length === 0);
    currentPage = 1;
    render();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    currentPage = 1;
    render();
    searchInput.focus();
  });

  // Category Filter Pills
  categoryList.addEventListener('click', (e) => {
    const target = e.target.closest('.cat-pill');
    if (!target) return;

    categoryList.querySelectorAll('.cat-pill').forEach((btn) => btn.classList.remove('active'));
    target.classList.add('active');

    currentCategory = target.getAttribute('data-category');
    currentPage = 1;
    render();
  });

  // Per Page Select
  perPageSelect.addEventListener('change', (e) => {
    postsPerPage = parseInt(e.target.value, 10);
    currentPage = 1;
    render();
  });

  // Pagination Prev / Next
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      render();
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(getFilteredPosts().length / postsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      render();
      window.scrollTo({ top: 220, behavior: 'smooth' });
    }
  });

  // Reset Filters button
  resetFiltersBtn.addEventListener('click', () => {
    currentCategory = 'ALL';
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    categoryList.querySelectorAll('.cat-pill').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-category') === 'ALL');
    });
    currentPage = 1;
    render();
  });

  // Initialize
  updateCounts();
  render();
});

