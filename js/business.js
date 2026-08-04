/* ============================================
   DiscoverLocal - Business Detail Page JS
   Reads URL param, fetches JSON, renders page
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

// ---- Helper: Get URL parameter ----
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
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

// ---- Render: Photo Mosaic ----
function renderPhotoMosaic(biz) {
  const container = document.getElementById('photo-mosaic');
  if (!container) return;

  const photos = biz.photos || [];
  const mainPhoto = photos[0] || biz.image;
  const gridPhotos = photos.slice(1, 5);

  const gridHtml = gridPhotos.map(p => `
    <div class="photo-mosaic-grid-item">
      <img src="${p}" alt="Business photo">
    </div>
  `).join('');

  container.innerHTML = `
    <div class="photo-mosaic-main">
      <img src="${mainPhoto}" alt="${biz.name}">
    </div>
    <div class="photo-mosaic-grid">
      ${gridHtml}
    </div>
    <button class="photo-mosaic-all-btn">
      <i class="fa-solid fa-grip"></i> See all ${biz.photoCount} photos
    </button>
  `;
}

// ---- Render: Detail Header ----
function renderDetailHeader(biz) {
  const container = document.getElementById('detail-header');
  if (!container) return;

  const categoriesHtml = biz.categories.map(c =>
    `<a href="#" class="detail-category-link">${c}</a>`
  ).join(', ');

  const claimedBadge = biz.claimed
    ? `<span class="detail-claimed-badge"><i class="fa-solid fa-circle-check"></i> Claimed</span>`
    : '';

  const statusClass = biz.statusType === 'open' ? 'open' : 'closing';

  container.innerHTML = `
    <h1>${biz.name}</h1>
    <div class="detail-rating-row">
      <div class="detail-rating-stars">${renderStars(biz.rating)}</div>
      <span class="detail-rating-num">${biz.rating}</span>
      <span class="detail-rating-count">(${biz.reviewCount} reviews)</span>
    </div>
    <div class="detail-meta">
      ${claimedBadge}
      <span class="detail-price">${biz.price}</span>
      <span class="detail-meta-separator">•</span>
      ${categoriesHtml}
    </div>
    <div class="detail-hours-row">
      <span class="detail-status-bold ${statusClass}">${biz.status}</span>
      <span class="detail-hours-text">${biz.hoursRange}</span>
      <a href="#sidebar-hours" class="detail-hours-link"><i class="fa-solid fa-circle-info"></i> See hours</a>
    </div>
    <div class="detail-actions">
      <button class="detail-action-btn primary">
        <i class="fa-solid fa-star"></i> Write a Review
      </button>
      <button class="detail-action-btn secondary">
        <i class="fa-solid fa-camera"></i> Add Photo
      </button>
      <button class="detail-action-btn secondary">
        <i class="fa-solid fa-arrow-up-from-bracket"></i> Share
      </button>
      <button class="detail-action-btn secondary" onclick="toggleBookmark(this)">
        <i class="fa-regular fa-bookmark"></i> Save
      </button>
    </div>
  `;
}

// ---- Render: Popular Dishes ----
function renderDishes(biz) {
  const container = document.getElementById('dishes-section');
  if (!container || !biz.popularDishes || biz.popularDishes.length === 0) return;

  container.style.display = 'block';

  const dishesHtml = biz.popularDishes.map(dish => `
    <div class="dish-card">
      <img src="${dish.image}" alt="${dish.name}">
      <div class="dish-card-body">
        <h3>${dish.name}</h3>
        <p>${dish.photoCount} Photos • ${dish.reviewCount} Reviews</p>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <h2>Popular Dishes</h2>
    <div class="dishes-scroll">${dishesHtml}</div>
    <a href="#" class="dishes-full-menu"><i class="fa-solid fa-book-open"></i> Full Menu</a>
  `;
}

// ---- Render: Amenities ----
function renderAmenities(biz) {
  const container = document.getElementById('amenities-section');
  if (!container || !biz.amenities || biz.amenities.length === 0) return;

  container.style.display = 'block';

  const amenitiesHtml = biz.amenities.map(a => {
    const icon = a.available
      ? '<i class="fa-solid fa-check"></i>'
      : '<i class="fa-solid fa-xmark"></i>';
    const cls = a.available ? '' : 'unavailable';
    return `<div class="amenity-item ${cls}">${icon} <span>${a.name}</span></div>`;
  }).join('');

  container.innerHTML = `
    <h2>Amenities and More</h2>
    <div class="amenities-grid">${amenitiesHtml}</div>
    <button class="amenities-more-btn">14 More Attributes</button>
  `;
}

// ---- Render: Reviews ----
function renderReviews(biz) {
  const container = document.getElementById('reviews-section');
  if (!container) return;

  const reviewsHtml = (biz.reviews || []).map(r => {
    const photoHtml = r.photo
      ? `<img src="${r.photo}" alt="Review photo" class="review-photo">`
      : '';

    const usefulText = r.useful > 0 ? ` ${r.useful}` : '';
    const funnyText = r.funny > 0 ? ` ${r.funny}` : '';
    const coolText = r.cool > 0 ? ` ${r.cool}` : '';

    return `
    <div class="review-card">
      <div class="review-header">
        <img src="${r.avatar}" alt="${r.userName}" class="review-avatar">
        <div class="review-user">
          <h4>${r.userName}</h4>
          <p>${r.location}</p>
          <div class="review-user-meta">
            <span><i class="fa-solid fa-user-group"></i> ${r.friends} friends</span>
            <span><i class="fa-solid fa-star"></i> ${r.reviewCount} reviews</span>
          </div>
        </div>
      </div>
      <div class="review-rating-row">
        <div class="detail-rating-stars">${renderStars(r.rating)}</div>
        <span class="review-date">${r.date}</span>
      </div>
      <p class="review-text">${r.text}</p>
      ${photoHtml}
      <div class="review-actions">
        <button class="review-action-btn"><i class="fa-regular fa-lightbulb"></i> Useful${usefulText}</button>
        <button class="review-action-btn"><i class="fa-regular fa-face-smile"></i> Funny${funnyText}</button>
        <button class="review-action-btn"><i class="fa-solid fa-arrow-trend-up"></i> Cool${coolText}</button>
      </div>
    </div>`;
  }).join('');

  container.innerHTML = `
    <h2>Recommended Reviews</h2>
    <div class="review-filters">
      <input type="text" placeholder="Search reviews" class="review-search-input">
      <select class="review-sort-select">
        <option>Yelp Sort</option>
        <option>Newest First</option>
        <option>Highest Rated</option>
      </select>
    </div>
    ${reviewsHtml}
  `;
}

// ---- Render: Sidebar Contact Card ----
function renderSidebarContact(biz) {
  const container = document.getElementById('sidebar-contact');
  if (!container) return;

  const addr = biz.address || {};

  container.innerHTML = `
    <div class="sidebar-cta">
      <button class="sidebar-cta-primary">Order Delivery</button>
      <button class="sidebar-cta-secondary">Make a Reservation</button>
    </div>
    <hr class="sidebar-divider">
    <ul class="sidebar-info-list">
      <li class="sidebar-info-item">
        <div>
          <a href="#" class="sidebar-info-label">${biz.website || ''}</a>
          <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.75rem; margin-left:0.5rem; margin-top:0.25rem;"></i>
        </div>
        <i class="fa-solid fa-link sidebar-info-icon"></i>
      </li>
      <li class="sidebar-info-item">
        <div class="sidebar-info-label-dark">${biz.phone || ''}</div>
        <i class="fa-solid fa-phone sidebar-info-icon"></i>
      </li>
      <li class="sidebar-info-item">
        <div class="sidebar-address">
          <a href="#" class="sidebar-info-label-dark">
            ${addr.street || ''}<br>
            ${addr.neighborhood || ''}<br>
            ${addr.city || ''}
          </a>
          <div class="sidebar-map">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Map area">
            <div class="sidebar-map-pin">
              <i class="fa-solid fa-location-dot"></i>
            </div>
          </div>
        </div>
        <i class="fa-solid fa-diamond-turn-right sidebar-info-icon"></i>
      </li>
    </ul>
  `;
}

// ---- Render: Sidebar Hours Card ----
function renderSidebarHours(biz) {
  const container = document.getElementById('sidebar-hours');
  if (!container) return;

  const hoursHtml = (biz.weeklyHours || []).map(h => {
    const todayClass = h.isToday ? 'today' : '';
    const todayBadge = h.isToday ? '<span class="hours-today-badge">(Open now)</span>' : '';
    return `
      <tr class="${todayClass}">
        <td class="day">${h.day}</td>
        <td class="hours">${h.hours}${todayBadge}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <h3 style="font-weight:700; color:var(--gray-900); font-size:1.125rem; margin-bottom:1rem;">Hours</h3>
    <table class="hours-table">
      ${hoursHtml}
    </table>
    <div class="hours-edit-link">
      <i class="fa-solid fa-pen" style="margin-right:0.5rem;"></i>
      <a href="#">Edit business info</a>
    </div>
  `;
}

// ---- Init: Load business data and render ----
async function init() {
  const id = getQueryParam('id') || '1';

  try {
    const res = await fetch(`../data/businesses/${id}.json`);
    if (!res.ok) throw new Error('Business not found');
    const biz = await res.json();

    // Update page title
    document.title = `${biz.name} - DiscoverLocal`;

    // Render all sections
    renderPhotoMosaic(biz);
    renderDetailHeader(biz);
    renderDishes(biz);
    renderAmenities(biz);
    renderReviews(biz);
    renderSidebarContact(biz);
    renderSidebarHours(biz);
  } catch (err) {
    console.error('Failed to load business data:', err);
    const main = document.querySelector('.detail-main');
    if (main) {
      main.innerHTML = '<p style="text-align:center; padding:3rem; color:#6b7280;">Failed to load business data. Please run via a local server (e.g., <code>python -m http.server</code>).</p>';
    }
  }
}

// ---- Run on DOM ready ----
document.addEventListener('DOMContentLoaded', init);