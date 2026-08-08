/* ============================================
   DiscoverLocal Admin - Entity Instance Editor
   Part A Step 3: Generic, metadata-driven editor
   ============================================ */

// ---- State ----
let selectedEntryTypeSlug = null;
let selectedEntryId = null;
let creatingNewEntry = false;

// ---- Select entry type (called from overview) ----
function selectEntryType(slug) {
  selectedEntryTypeSlug = slug;
  selectedEntryId = null;
  creatingNewEntry = false;
  renderCurrentRoute();
}

// ---- Open editor for a new entry ----
function openEntryEditor(typeSlug) {
  selectedEntryTypeSlug = typeSlug;
  selectedEntryId = null;
  creatingNewEntry = true;
  renderCurrentRoute();
}

// ---- Render: Entries Screen ----
function renderEntriesScreen() {
  const data = CMS_API.getData();
  const entityTypes = data.entityTypes;

  // If no type selected, default to first
  if (!selectedEntryTypeSlug && entityTypes.length > 0) {
    selectedEntryTypeSlug = entityTypes[0].slug;
  }

  const et = selectedEntryTypeSlug
    ? data.entityTypes.find(x => x.slug === selectedEntryTypeSlug)
    : null;

  if (!et) {
    return `
      <div class="admin-card">
        <div class="admin-card-body">
          <div class="admin-empty">
            <i class="fa-solid fa-database"></i>
            <p>No entity types available. Create an entity type first.</p>
          </div>
        </div>
      </div>
    `;
  }

  const entries = data.entries[et.slug] || [];

  // Type selector
  const typeOptions = entityTypes.map(t =>
    `<option value="${t.slug}" ${t.slug === et.slug ? 'selected' : ''}>${t.name}</option>`
  ).join('');

  // Entry list items
  const entryItems = entries.map(entry => {
    const name = CMS_API.getEntryDisplayName(et.slug, entry);
    const active = entry.id === selectedEntryId ? 'active' : '';
    return `
      <div class="admin-entry-item ${active}" onclick="selectEntry('${entry.id}')">
        <div>
          <div class="admin-entry-name">${escapeHtml(name)}</div>
          <div class="admin-entry-id">${entry.id}</div>
        </div>
        <button class="admin-btn-icon danger" onclick="event.stopPropagation(); deleteEntry('${et.slug}', '${entry.id}')" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  }).join('');

  return `
    <div class="admin-entries-layout">
      <!-- Left: Type selector + entry list -->
      <div>
        <div class="admin-card">
          <div class="admin-card-header">
            <div>
              <h2>Entries</h2>
              <p>${et.name} (${entries.length})</p>
            </div>
          </div>
          <div class="admin-card-body">
            <div class="admin-form-group" style="margin-bottom:0.75rem;">
              <select id="entries-type-select" onchange="changeEntryType(this.value)">
                ${typeOptions}
              </select>
            </div>
            <div class="admin-entry-search">
              <input type="text" id="entries-search" placeholder="Search entries..." oninput="filterEntryList(this.value)">
            </div>
            <div class="admin-entries-list" id="entries-list">
              ${entryItems || '<div class="admin-empty"><p>No entries yet.</p></div>'}
            </div>
            <button class="admin-btn admin-btn-primary" style="width:100%; margin-top:0.75rem;" onclick="openEntryEditor('${et.slug}')">
              <i class="fa-solid fa-plus"></i> New ${et.name}
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Editor -->
      <div id="entry-editor-container">
        ${selectedEntryId || creatingNewEntry
          ? renderEntryEditor(et.slug, selectedEntryId)
          : `
            <div class="admin-card">
              <div class="admin-card-body">
                <div class="admin-empty">
                  <i class="fa-solid fa-pen-to-square"></i>
                  <p>Select an entry to edit, or create a new one.</p>
                </div>
              </div>
            </div>
          `}
      </div>
    </div>
  `;
}

// ---- Escape HTML helper ----
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

// ---- Change entry type ----
function changeEntryType(slug) {
  selectedEntryTypeSlug = slug;
  selectedEntryId = null;
  creatingNewEntry = false;
  renderCurrentRoute();
}

// ---- Select entry ----
function selectEntry(entryId) {
  selectedEntryId = entryId;
  creatingNewEntry = false;
  renderCurrentRoute();
}

// ---- Filter entry list ----
function filterEntryList(query) {
  const data = CMS_API.getData();
  const et = data.entityTypes.find(x => x.slug === selectedEntryTypeSlug);
  if (!et) return;

  const entries = data.entries[et.slug] || [];
  const q = query.toLowerCase().trim();

  const filtered = entries.filter(entry => {
    const name = CMS_API.getEntryDisplayName(et.slug, entry).toLowerCase();
    return name.includes(q) || entry.id.toLowerCase().includes(q);
  });

  const list = document.getElementById('entries-list');
  if (!list) return;

  list.innerHTML = filtered.map(entry => {
    const name = CMS_API.getEntryDisplayName(et.slug, entry);
    const active = entry.id === selectedEntryId ? 'active' : '';
    return `
      <div class="admin-entry-item ${active}" onclick="selectEntry('${entry.id}')">
        <div>
          <div class="admin-entry-name">${escapeHtml(name)}</div>
          <div class="admin-entry-id">${entry.id}</div>
        </div>
        <button class="admin-btn-icon danger" onclick="event.stopPropagation(); deleteEntry('${et.slug}', '${entry.id}')" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  }).join('') || '<div class="admin-empty"><p>No matching entries.</p></div>';
}

// ---- Delete entry ----
function deleteEntry(typeSlug, entryId) {
  const data = CMS_API.getData();
  const et = data.entityTypes.find(x => x.slug === typeSlug);
  const entry = (data.entries[typeSlug] || []).find(e => e.id === entryId);
  if (!entry) return;

  const name = CMS_API.getEntryDisplayName(typeSlug, entry);
  if (!confirm(`Delete "${name}"?\n\nThis will also remove it from any relations. This cannot be undone.`)) {
    return;
  }

  CMS_API.deleteEntry(typeSlug, entryId);
  if (selectedEntryId === entryId) selectedEntryId = null;
  CMS_API.toast(`Entry "${name}" deleted`);
  renderCurrentRoute();
}

// ============================================
// Entry Editor
// ============================================

// ---- Render entry editor (attributes + relations) ----
function renderEntryEditor(typeSlug, entryId) {
  const data = CMS_API.getData();
  const et = data.entityTypes.find(x => x.slug === typeSlug);
  if (!et) return '';

  const entry = entryId
    ? (data.entries[typeSlug] || []).find(e => e.id === entryId)
    : null;

  const isEdit = !!entry;
  const values = entry ? entry.attributeValues : {};
  const relations = entry ? entry.relations : {};

  // ---- Attributes section ----
  const attrFields = et.attributes.map(attr => {
    const val = values[attr.name] !== undefined ? values[attr.name] : '';
    const required = attr.required ? '<span class="required">*</span>' : '';

    let fieldHtml = '';
    switch (attr.type) {
      case 'text':
        fieldHtml = `<input type="text" id="entry-attr-${attr.id}" value="${escapeHtml(val)}" placeholder="${escapeHtml(attr.name)}">`;
        break;
      case 'number':
        fieldHtml = `<input type="number" id="entry-attr-${attr.id}" value="${val !== '' ? val : ''}" step="any">`;
        break;
      case 'boolean':
        fieldHtml = `
          <label class="admin-switch">
            <input type="checkbox" id="entry-attr-${attr.id}" ${val ? 'checked' : ''}>
            <span class="admin-switch-slider"></span>
          </label>
        `;
        break;
      case 'date':
        fieldHtml = `<input type="date" id="entry-attr-${attr.id}" value="${escapeHtml(val)}">`;
        break;
      case 'image':
        fieldHtml = `
          <input type="text" id="entry-attr-${attr.id}" value="${escapeHtml(val)}" placeholder="https://...">
          ${val ? `<img src="${escapeHtml(val)}" class="admin-image-thumb" onerror="this.style.display='none'">` : ''}
        `;
        break;
      case 'richtext':
        fieldHtml = `<textarea id="entry-attr-${attr.id}" placeholder="${escapeHtml(attr.name)}">${escapeHtml(val)}</textarea>`;
        break;
      default:
        fieldHtml = `<input type="text" id="entry-attr-${attr.id}" value="${escapeHtml(val)}">`;
    }

    return `
      <div class="admin-form-group ${attr.type === 'richtext' ? 'full-width' : ''}">
        <label>${escapeHtml(attr.name)} ${required}</label>
        ${fieldHtml}
      </div>
    `;
  }).join('');

  // ---- Relations section ----
  const relationPanels = data.relationTypes
    .filter(rt => rt.fromType === typeSlug)
    .map(rt => renderRelationPanel(data, rt, entry, isEdit))
    .join('');

  return `
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2>${isEdit ? 'Edit' : 'Create'} ${et.name}</h2>
          <p>${isEdit ? entry.id : 'New entry'}</p>
        </div>
      </div>
      <div class="admin-card-body">
        <div class="admin-form-grid">
          ${attrFields}
        </div>

        ${relationPanels ? `
          <div style="margin-top:2rem;">
            <h3 style="font-size:1rem; font-weight:700; color:var(--gray-900); margin-bottom:1rem;">Relations</h3>
            ${relationPanels}
          </div>
        ` : ''}

        <div style="margin-top:1.5rem; display:flex; gap:0.5rem; justify-content:flex-end;">
          <button class="admin-btn admin-btn-outline" onclick="resetEntryEditor()">Reset</button>
          <button class="admin-btn admin-btn-primary" onclick="saveEntryFromEditor('${typeSlug}', '${entryId || ''}')">
            <i class="fa-solid fa-floppy-disk"></i> Save ${et.name}
          </button>
        </div>
      </div>
    </div>
  `;
}

// ---- Render a single relation panel ----
function renderRelationPanel(data, rt, entry, isEdit) {
  const toEt = data.entityTypes.find(x => x.slug === rt.toType);
  if (!toEt) return '';

  const targetEntries = data.entries[rt.toType] || [];
  const currentIds = (entry && entry.relations && entry.relations[rt.name]) || [];

  // For one-to-many, only keep the first id
  const selectedIds = rt.cardinality === 'one-to-many' ? currentIds.slice(0, 1) : currentIds;

  const chips = selectedIds.map(id => {
    const target = targetEntries.find(t => t.id === id);
    if (!target) return '';
    const name = CMS_API.getEntryDisplayName(rt.toType, target);
    return `
      <span class="admin-chip">
        ${escapeHtml(name)}
        <button onclick="removeRelationChip('${rt.name}', '${id}')" title="Remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `;
  }).join('');

  const options = targetEntries.map(t => {
    const name = CMS_API.getEntryDisplayName(rt.toType, t);
    return `<option value="${t.id}">${escapeHtml(name)}</option>`;
  }).join('');

  const cardinalityLabel = rt.cardinality === 'one-to-many' ? 'Select one' : 'Select multiple';

  return `
    <div class="admin-relation-panel" data-relation="${rt.name}">
      <h4>${escapeHtml(rt.name)}</h4>
      <div class="admin-relation-meta">
        ${toEt.name} • ${rt.cardinality}
      </div>
      <div class="admin-relation-picker">
        <select id="relation-select-${rt.name}" onchange="addRelationChip('${rt.name}', this.value)">
          <option value="">${cardinalityLabel}...</option>
          ${options}
        </select>
        <button class="admin-btn admin-btn-outline admin-btn-sm" onclick="openInlineCreate('${rt.toType}', '${rt.name}')">
          <i class="fa-solid fa-plus"></i> Create new
        </button>
      </div>
      <div class="admin-chips" id="relation-chips-${rt.name}">
        ${chips}
      </div>
    </div>
  `;
}

// ---- Add relation chip ----
function addRelationChip(relationName, targetId) {
  if (!targetId) return;

  const data = CMS_API.getData();
  const rt = data.relationTypes.find(x => x.name === relationName);
  if (!rt) return;

  const entry = getCurrentEditingEntry();
  if (!entry) return;

  if (!entry.relations) entry.relations = {};
  if (!entry.relations[relationName]) entry.relations[relationName] = [];

  if (rt.cardinality === 'one-to-many') {
    entry.relations[relationName] = [targetId];
  } else {
    if (!entry.relations[relationName].includes(targetId)) {
      entry.relations[relationName].push(targetId);
    }
  }

  // Persist
  CMS_API.saveEntry(rt.fromType, entry);
  renderCurrentRoute();
}

// ---- Remove relation chip ----
function removeRelationChip(relationName, targetId) {
  const data = CMS_API.getData();
  const rt = data.relationTypes.find(x => x.name === relationName);
  if (!rt) return;

  const entry = getCurrentEditingEntry();
  if (!entry) return;

  if (entry.relations && entry.relations[relationName]) {
    entry.relations[relationName] = entry.relations[relationName].filter(id => id !== targetId);
  }

  CMS_API.saveEntry(rt.fromType, entry);
  renderCurrentRoute();
}

// ---- Get the entry currently being edited ----
function getCurrentEditingEntry() {
  if (!selectedEntryTypeSlug || !selectedEntryId) return null;
  const data = CMS_API.getData();
  return (data.entries[selectedEntryTypeSlug] || []).find(e => e.id === selectedEntryId) || null;
}

// ---- Reset entry editor ----
function resetEntryEditor() {
  renderCurrentRoute();
}

// ---- Save entry from editor ----
function saveEntryFromEditor(typeSlug, entryId) {
  const data = CMS_API.getData();
  const et = data.entityTypes.find(x => x.slug === typeSlug);
  if (!et) return;

  const existing = entryId
    ? (data.entries[typeSlug] || []).find(e => e.id === entryId)
    : null;

  // Collect attribute values
  const attributeValues = {};
  let valid = true;

  et.attributes.forEach(attr => {
    const input = document.getElementById(`entry-attr-${attr.id}`);
    if (!input) return;

    let val;
    switch (attr.type) {
      case 'boolean':
        val = input.checked;
        break;
      case 'number':
        val = input.value === '' ? '' : Number(input.value);
        break;
      default:
        val = input.value;
    }

    // Required validation
    if (attr.required && (val === '' || val === undefined || val === null)) {
      CMS_API.toast(`"${attr.name}" is required`, 'error');
      valid = false;
      return;
    }

    attributeValues[attr.name] = val;
  });

  if (!valid) return;

  // Build entry
  const entry = {
    id: existing ? existing.id : CMS_API.genId(typeSlug.slice(0, 3)),
    attributeValues: attributeValues,
    relations: existing ? existing.relations || {} : {}
  };

  // Ensure all relation keys exist
  data.relationTypes
    .filter(rt => rt.fromType === typeSlug)
    .forEach(rt => {
      if (!entry.relations[rt.name]) entry.relations[rt.name] = [];
    });

  CMS_API.saveEntry(typeSlug, entry);
  selectedEntryId = entry.id;
  creatingNewEntry = false;
  CMS_API.toast(`Entry saved`);
  renderCurrentRoute();
}

// ============================================
// Inline "+ Create new" (recursive)
// ============================================

// ---- Open inline create modal for a target type ----
function openInlineCreate(targetTypeSlug, relationName) {
  const data = CMS_API.getData();
  const et = data.entityTypes.find(x => x.slug === targetTypeSlug);
  if (!et) return;

  const attrFields = et.attributes.map(attr => {
    const required = attr.required ? '<span class="required">*</span>' : '';

    let fieldHtml = '';
    switch (attr.type) {
      case 'text':
        fieldHtml = `<input type="text" id="inline-attr-${attr.id}" placeholder="${escapeHtml(attr.name)}">`;
        break;
      case 'number':
        fieldHtml = `<input type="number" id="inline-attr-${attr.id}" step="any">`;
        break;
      case 'boolean':
        fieldHtml = `
          <label class="admin-switch">
            <input type="checkbox" id="inline-attr-${attr.id}">
            <span class="admin-switch-slider"></span>
          </label>
        `;
        break;
      case 'date':
        fieldHtml = `<input type="date" id="inline-attr-${attr.id}">`;
        break;
      case 'image':
        fieldHtml = `<input type="text" id="inline-attr-${attr.id}" placeholder="https://...">`;
        break;
      case 'richtext':
        fieldHtml = `<textarea id="inline-attr-${attr.id}" placeholder="${escapeHtml(attr.name)}"></textarea>`;
        break;
      default:
        fieldHtml = `<input type="text" id="inline-attr-${attr.id}">`;
    }

    return `
      <div class="admin-form-group ${attr.type === 'richtext' ? 'full-width' : ''}">
        <label>${escapeHtml(attr.name)} ${required}</label>
        ${fieldHtml}
      </div>
    `;
  }).join('');

  const form = `
    <div class="admin-modal-overlay" id="inline-create-modal">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3>Create New ${et.name}</h3>
          <button class="admin-modal-close" onclick="closeInlineCreate()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="admin-modal-body">
          <div class="admin-form-grid">
            ${attrFields}
          </div>
        </div>
        <div class="admin-modal-footer">
          <button class="admin-btn admin-btn-outline" onclick="closeInlineCreate()">Cancel</button>
          <button class="admin-btn admin-btn-primary" onclick="saveInlineCreate('${targetTypeSlug}', '${relationName}')">
            <i class="fa-solid fa-floppy-disk"></i> Create & Link
          </button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('inline-create-modal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', form);
}

// ---- Close inline create modal ----
function closeInlineCreate() {
  const modal = document.getElementById('inline-create-modal');
  if (modal) modal.remove();
}

// ---- Save inline created entry and link it ----
function saveInlineCreate(targetTypeSlug, relationName) {
  const data = CMS_API.getData();
  const et = data.entityTypes.find(x => x.slug === targetTypeSlug);
  if (!et) return;

  const attributeValues = {};
  let valid = true;

  et.attributes.forEach(attr => {
    const input = document.getElementById(`inline-attr-${attr.id}`);
    if (!input) return;

    let val;
    switch (attr.type) {
      case 'boolean':
        val = input.checked;
        break;
      case 'number':
        val = input.value === '' ? '' : Number(input.value);
        break;
      default:
        val = input.value;
    }

    if (attr.required && (val === '' || val === undefined || val === null)) {
      CMS_API.toast(`"${attr.name}" is required`, 'error');
      valid = false;
      return;
    }

    attributeValues[attr.name] = val;
  });

  if (!valid) return;

  const newEntry = {
    id: CMS_API.genId(targetTypeSlug.slice(0, 3)),
    attributeValues: attributeValues,
    relations: {}
  };

  CMS_API.saveEntry(targetTypeSlug, newEntry);

  // Link to the currently editing entry
  const entry = getCurrentEditingEntry();
  if (entry) {
    if (!entry.relations) entry.relations = {};
    if (!entry.relations[relationName]) entry.relations[relationName] = [];

    const rt = data.relationTypes.find(x => x.name === relationName);
    if (rt && rt.cardinality === 'one-to-many') {
      entry.relations[relationName] = [newEntry.id];
    } else {
      if (!entry.relations[relationName].includes(newEntry.id)) {
        entry.relations[relationName].push(newEntry.id);
      }
    }

    CMS_API.saveEntry(rt.fromType, entry);
  }

  closeInlineCreate();
  CMS_API.toast(`New ${et.name} created and linked`);
  renderCurrentRoute();
}