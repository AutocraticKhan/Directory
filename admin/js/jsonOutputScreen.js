/* ============================================
   DiscoverLocal Admin - JSON Output Screen
   Generates live JSON from CMS data and shows
   publish instructions at the bottom.
   ============================================ */

// ---- Escape HTML helper (self-contained) ----
function escapeHtml(str) {
  const amp = String.fromCharCode(38) + 'amp;';
  const lt = String.fromCharCode(38) + 'lt;';
  const gt = String.fromCharCode(38) + 'gt;';
  const quot = String.fromCharCode(38) + 'quot;';
  const apos = String.fromCharCode(38) + '#039;';
  return String(str)
    .replace(/&/g, amp)
    .replace(/</g, lt)
    .replace(/>/g, gt)
    .replace(/"/g, quot)
    .replace(/'/g, apos);
}

// ---- Render: JSON Output Screen ----
function renderJsonOutputScreen() {
  const data = CMS_API.getData();
  const json = JSON.stringify(data, null, 2);
  const jsonSize = ((new Blob([json]).size) / 1024).toFixed(1);

  const entityTypeCount = data.entityTypes.length;
  const relationTypeCount = data.relationTypes.length;
  let entryCount = 0;
  Object.keys(data.entries || {}).forEach(slug => {
    entryCount += (data.entries[slug] || []).length;
  });

  return `
    <!-- ===== Generated JSON Preview ===== -->
    <div class="admin-card admin-json-card">
      <div class="admin-card-header">
        <div>
          <h2><i class="fa-solid fa-file-code"></i> Generated JSON</h2>
          <p>Live output of your CMS content · ${jsonSize} KB · updates as you edit</p>
        </div>
        <div class="admin-json-actions">
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="refreshJsonOutput()" title="Regenerate from current data">
            <i class="fa-solid fa-rotate"></i> Refresh
          </button>
          <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="copyJsonOutput()" title="Copy JSON to clipboard">
            <i class="fa-solid fa-copy"></i> Copy JSON
          </button>
          <button class="admin-btn admin-btn-primary admin-btn-sm" onclick="CMS_STORE.downloadExport()" title="Save as cms-data.json">
            <i class="fa-solid fa-download"></i> Download
          </button>
        </div>
      </div>
      <div class="admin-json-body">
        <textarea id="json-output" class="admin-json-output" readonly spellcheck="false" wrap="off">${escapeHtml(json)}</textarea>
      </div>
    </div>

    <!-- ===== Quick Summary ===== -->
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

    <!-- ===== How To Publish ===== -->
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2><i class="fa-solid fa-rocket"></i> How & Where to Put This JSON</h2>
          <p>Turn your dashboard content into a live website</p>
        </div>
      </div>
      <div class="admin-card-body">
        <div class="admin-steps">
          <div class="admin-step">
            <div class="admin-step-number">1</div>
            <div>
              <h3>Create your content</h3>
              <p>Add businesses, categories, photos, and reviews under <strong>Entries</strong> in the sidebar. Everything auto-saves to your browser while you work, and the JSON above updates instantly.</p>
            </div>
          </div>
          <div class="admin-step">
            <div class="admin-step-number">2</div>
            <div>
              <h3>Get the JSON</h3>
              <p>Click <strong>Copy JSON</strong> to copy it to your clipboard, or <strong>Download</strong> to save it as a file. The file must be named exactly:</p>
              <div class="admin-path-box"><code>cms-data.json</code></div>
            </div>
          </div>
          <div class="admin-step">
            <div class="admin-step-number">3</div>
            <div>
              <h3>Place it in the data/ folder</h3>
              <p>Paste this file into the project's <strong>data/</strong> folder. Your project should look like this:</p>
              <div class="admin-file-tree">
<pre>
Directory/
├── data/
│   └── cms-data.json   <span class="admin-comment">← put the file here</span>
├── js/
│   └── data.js         <span class="admin-comment">← reads it automatically</span>
├── pages/
├── css/
└── index.html         <span class="admin-comment">← open this to see your site</span>
</pre>
              </div>
            </div>
          </div>
          <div class="admin-step">
            <div class="admin-step-number">4</div>
            <div>
              <h3>Refresh the website</h3>
              <p>Open (or refresh) <strong>index.html</strong> in your browser. The site automatically detects <code>data/cms-data.json</code> and renders your content.</p>
            </div>
          </div>
        </div>

        <div class="admin-note">
          <i class="fa-solid fa-circle-info"></i>
          <div>
            <strong>Important notes</strong>
            <ul>
              <li>The filename must be exactly <code>cms-data.json</code> — the site looks for this exact file.</li>
              <li>Whenever you make changes here, re-copy / re-download and overwrite <code>data/cms-data.json</code>.</li>
              <li>If <code>data/cms-data.json</code> is missing, the site falls back to the hardcoded data inside <code>js/data.js</code>.</li>
              <li>No server is required — this works when you open <code>index.html</code> directly from the file system.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---- Copy JSON to clipboard ----
function copyJsonOutput() {
  const textarea = document.getElementById('json-output');
  if (!textarea) return;

  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textarea.value)
      .then(() => CMS_API.toast('JSON copied to clipboard'))
      .catch(() => {
        if (fallbackCopyJson(textarea)) CMS_API.toast('JSON copied to clipboard');
      });
  } else {
    if (fallbackCopyJson(textarea)) CMS_API.toast('JSON copied to clipboard');
  }
}

// ---- Fallback copy for file:// or older browsers ----
function fallbackCopyJson(textarea) {
  try {
    document.execCommand('copy');
    return true;
  } catch (e) {
    CMS_API.toast('Copy failed — use Download instead', 'error');
    return false;
  }
}

// ---- Refresh the JSON preview ----
function refreshJsonOutput() {
  renderCurrentRoute();
}