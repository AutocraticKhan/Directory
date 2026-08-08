/* ============================================
   DiscoverLocal Admin - Shell, Sidebar, Routing
   ============================================ */

let currentRoute = 'overview';

// ---- Route definitions ----
const ROUTES = {
  'overview': {
    title: 'Overview',
    subtitle: 'Manage your site content',
    render: renderOverview
  },
  'entity-types': {
    title: 'Entity Types',
    subtitle: 'Define content models and attributes',
    render: renderEntityTypesScreen
  },
  'relation-types': {
    title: 'Relation Types',
    subtitle: 'Define how entity types connect',
    render: renderRelationTypesScreen
  },
  'entries': {
    title: 'Entries',
    subtitle: 'Create and edit content instances',
    render: renderEntriesScreen
  },
  'json-output': {
    title: 'JSON Output',
    subtitle: 'Generate, copy, and publish your site data',
    render: renderJsonOutputScreen
  }
};

// ---- Navigate to a route ----
function navigateTo(route) {
  if (!ROUTES[route]) route = 'overview';
  currentRoute = route;

  // Update sidebar active state
  document.querySelectorAll('.admin-nav-item[data-route]').forEach(item => {
    item.classList.toggle('active', item.dataset.route === route);
  });

  // Update topbar
  const title = document.getElementById('admin-page-title');
  const subtitle = document.getElementById('admin-page-subtitle');
  if (title) title.textContent = ROUTES[route].title;
  if (subtitle) subtitle.textContent = ROUTES[route].subtitle;

  // Render content
  renderCurrentRoute();
}

// ---- Render current route ----
function renderCurrentRoute() {
  const content = document.getElementById('admin-content');
  if (!content) return;
  const route = ROUTES[currentRoute];
  if (route && typeof route.render === 'function') {
    content.innerHTML = route.render();
  }
}

// ---- Render: Overview ----
function renderOverview() {
  const data = CMS_API.getData();

  const entityTypeCount = data.entityTypes.length;
  const relationTypeCount = data.relationTypes.length;
  let entryCount = 0;
  Object.keys(data.entries || {}).forEach(slug => {
    entryCount += (data.entries[slug] || []).length;
  });

  // Per-type entry counts
  const typeRows = data.entityTypes.map(et => {
    const count = (data.entries[et.slug] || []).length;
    const attrCount = et.attributes.length;
    return `
      <tr>
        <td><strong>${et.name}</strong></td>
        <td><code>${et.slug}</code></td>
        <td><span class="admin-badge admin-badge-gray">${attrCount} attributes</span></td>
        <td><span class="admin-badge admin-badge-blue">${count} entries</span></td>
        <td class="admin-table-actions">
          <button class="admin-btn-icon" onclick="navigateTo('entries'); selectEntryType('${et.slug}');" title="Manage entries">
            <i class="fa-solid fa-pen"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <!-- JSON Workflow Banner -->
    <div class="admin-card" style="border-left:4px solid #2563eb; background:linear-gradient(135deg,#eff6ff 0%,#ffffff 100%);">
      <div class="admin-card-body">
        <div style="display:flex; align-items:flex-start; gap:1rem;">
          <div style="font-size:2rem; color:#2563eb; flex-shrink:0;"><i class="fa-solid fa-file-code"></i></div>
          <div>
            <h2 style="font-size:1.1rem; font-weight:700; margin-bottom:0.25rem;">This Dashboard Creates JSON Data</h2>
            <p style="font-size:0.875rem; color:var(--gray-600); margin-bottom:0.75rem;">
              Build your content here, download it as a JSON file, and place it in the project's <code>data/</code> folder.
              The website automatically reads from <code>data/cms-data.json</code> and displays your content.
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
              <button class="admin-btn admin-btn-primary admin-btn-sm" onclick="CMS_STORE.downloadExport()">
                <i class="fa-solid fa-download"></i> Download JSON
              </button>
              <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="CMS_API.importFile()">
                <i class="fa-solid fa-file-import"></i> Import JSON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="admin-stats-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-icon" style="background:#dbeafe; color:#2563eb;"><i class="fa-solid fa-cubes"></i></div>
        <div class="admin-stat-value">${entityTypeCount}</div>
        <div class="admin-stat-label">Entity Types</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon" style="background:#dcfce7; color:#16a34a;"><i class="fa-solid fa-code-branch"></i></div>
        <div class="admin-stat-value">${relationTypeCount}</div>
        <div class="admin-stat-label">Relation Types</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon" style="background:#fef3c7; color:#d97706;"><i class="fa-solid fa-database"></i></div>
        <div class="admin-stat-value">${entryCount}</div>
        <div class="admin-stat-label">Total Entries</div>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2>Content Model</h2>
          <p>Entity types and their entry counts</p>
        </div>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="navigateTo('entity-types')">
          <i class="fa-solid fa-plus"></i> Manage Types
        </button>
      </div>
      <div class="admin-card-body" style="padding:0;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Attributes</th>
              <th>Entries</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${typeRows || '<tr><td colspan="5" style="text-align:center; color:#9ca3af; padding:2rem;">No entity types yet. Create one to get started.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2>How to Publish Your JSON</h2>
          <p>Four simple steps from editor to website</p>
        </div>
      </div>
      <div class="admin-card-body">
        <ol style="list-style:decimal; padding-left:1.25rem; display:flex; flex-direction:column; gap:0.5rem; font-size:0.875rem; color:var(--gray-600);">
          <li>Create your content in this CMS — everything auto-saves to localStorage.</li>
          <li>Click <strong>Export</strong> (top right) to download <code>cms-data.json</code>.</li>
          <li>Place the downloaded <code>cms-data.json</code> into the project's <code>data/</code> folder.</li>
          <li>The website automatically reads <code>data/cms-data.json</code> and renders your content.</li>
        </ol>
      </div>
    </div>
  `;
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Wire up import file input
  const importInput = document.getElementById('admin-import-input');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) CMS_API.handleImportFile(file);
    });
  }

  navigateTo('overview');
});