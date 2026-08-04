/* ============================================
   DiscoverLocal - Main JavaScript
   Fetches JSON data and renders dynamic content
   ============================================ */

// ---- Helper: Generate star rating HTML ----
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  let html = '';
  for (let i = 0; i < fullStars; i++) {
    html += '<i class="fa-solid fa-star"></i>';
  }
  if (hasHalf) {
    html += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    html += '<i class="fa-regular fa-star"></i>';
  }
  return html;
}

// ---- Render: Popular Search Pills ----
function renderPopularSearches(items) {
  const container = document.getElementById('hero-pills');
  if (!container) return;

  const html = items.map(item => `
    <a href="#" class="hero-pill">${item.emoji} ${item.label}</a>
  `).join('');

  container.innerHTML = html;
}

// ---- Render: Category Cards ----
function renderCategories(categories) {
  const container = document.getElementById('categories-grid');
  if (!container) return;

  const html = categories.map(cat => `
    <a href="#" class="category-card">
      <div class="category-card-icon" style="background:${cat.bgColor}; color:${cat.iconColor};">
        <i class="fa-solid ${cat.icon}"></i>
      </div>
      <span>${cat.name}</span>
    </a>
  `).join('');

  container.innerHTML = html;
}

// ---- Render: Business Cards ----
function renderBusinesses(businesses) {
  const container = document.getElementById('business-grid');
  if (!container) return;

  const html = businesses.map(biz => {
    const tagsHtml = biz.categories.map(c => `<span>${c}</span>`).join('');
    const statusClass = biz.statusType === 'open' ? 'open' : 'closing';

    return `
    <div class="business-card" onclick="window.location.href='pages/business.html?id=${biz.id}'" style="cursor:pointer;">
      <div class="business-card-image">
        <img src="${biz.image}" alt="${biz.name}">
        <button class="business-card-bookmark" onclick="event.stopPropagation(); toggleBookmark(this)">
          <i class="fa-regular fa-bookmark"></i>
        </button>
        <span class="business-card-photos">
          <i class="fa-solid fa-camera"></i> ${biz.photoCount} Photos
        </span>
      </div>
      <div class="business-card-body">
        <div>
          <div class="business-card-top">
            <h3 class="business-card-name"><a href="pages/business.html?id=${biz.id}">${biz.name}</a></h3>
            <span class="business-card-price">${biz.price}</span>
          </div>
          <div class="business-card-rating">
            <div class="business-card-stars">${renderStars(biz.rating)}</div>
            <span class="business-card-rating-num">${biz.rating}</span>
            <span class="business-card-review-count">(${biz.reviewCount} reviews)</span>
          </div>
          <div class="business-card-tags">${tagsHtml}</div>
          <p class="business-card-quote">
            <i class="fa-solid fa-quote-left"></i>${biz.quote}
          </p>
        </div>
        <div class="business-card-footer">
          <span class="business-card-status ${statusClass}">
            <span class="status-dot ${statusClass}"></span> ${biz.status}
          </span>
          <span class="business-card-location">
            <i class="fa-solid fa-location-dot"></i>${biz.location}
          </span>
        </div>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = html;
}

// ---- Interaction: Toggle Mobile Menu ----
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('active');
}

// ---- Interaction: Toggle Bookmark ----
function toggleBookmark(btn) {
  const icon = btn.querySelector('i');
  if (!icon) return;

  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
    btn.classList.add('bookmarked');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
    btn.classList.remove('bookmarked');
  }
}

// ---- Interaction: Filter Badge Toggle ----
function initFilterBadges() {
  const badges = document.querySelectorAll('.filter-badge');
  badges.forEach(badge => {
    badge.addEventListener('click', () => {
      badges.forEach(b => b.classList.remove('active'));
      badge.classList.add('active');
    });
  });
}

// ---- Init: Load all data and render ----
function init() {
  try {
    renderCategories(LOCAL_DATA.categories);
    renderBusinesses(LOCAL_DATA.businesses);
    renderPopularSearches(LOCAL_DATA.popularSearches);
    initFilterBadges();
  } catch (err) {
    console.error('Failed to render data:', err);
    const grid = document.getElementById('business-grid');
    if (grid) {
      grid.innerHTML = '<p style="text-align:center; padding:2rem; color:#6b7280;">Failed to render data. Please check the console for errors.</p>';
    }
  }
}

// ---- Run on DOM ready ----
document.addEventListener('DOMContentLoaded', init);