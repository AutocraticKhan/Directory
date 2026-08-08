/* ============================================
   DiscoverLocal Admin - Entity Type Manager
   Part A Step 1: Entity Type & Attribute Manager
   ============================================ */

// ---- Render: Entity Types Screen ----
function renderEntityTypesScreen() {
  const data = CMS_API.getData();
  const entityTypes = data.entityTypes;

  const rows = entityTypes.map(et => {
    const entryCount = (data.entries[et.slug] || []).length;
    return `
      <tr>
        <td><strong>${et.name}</strong></td>
        <td><code>${et.slug}</code></td>
        <td><span class="admin-badge admin-badge-gray">${et.attributes.length} attributes</span></td>
        <td><span class="admin-badge admin-badge-blue">${entryCount} entries</span></td>
        <td class="admin-table-actions">
          <button class="admin-btn-icon" onclick="openEntityTypeEditor('${et.id}')" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="admin-btn-icon danger" onclick="deleteEntityType('${et.id}')" title="Delete">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2>Entity Types</h2>
          <p>Define the content models for your site</p>
        </div>
        <button class="admin-btn admin-btn-primary" onclick="openEntityTypeEditor()">
          <i class="fa-solid fa-plus"></i> New Entity Type
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
            ${rows || '<tr><td colspan="5" style="text-align:center; color:#9ca3af; padding:2rem;">No entity types yet. Create one to get started.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ---- Open Entity Type Editor (create or edit) ----
function openEntityTypeEditor(entityTypeId) {
  const data = CMS_API.getData();
  const et = entityTypeId
    ? data.entityTypes.find(x => x.id === entityTypeId)
    : null;

  const isEdit = !!et;

  const form = `
    <div class="admin-modal-overlay" id="entity-type-modal">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3>${isEdit ? 'Edit' : 'Create'} Entity Type</h3>
          <button class="admin-modal-close" onclick="closeEntityTypeEditor()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="admin-modal-body">
          <div class="admin-form-grid">
            <div class="admin-form-group">
              <label>Name <span class="required">*</span></label>
              <input type="text" id="et-name" value="${et ? et.name : ''}" placeholder="e.g. Business" oninput="autoSlugEntityType()">
            </div>
            <div class="admin-form-group">
              <label>Slug <span class="required">*</span></label>
              <input type="text" id="et-slug" value="${et ? et.slug : ''}" placeholder="e.g. business">
              <span class="admin-help-text">Used as the key in the data model. Lowercase, no spaces.</span>
            </div>
            <div class="admin-form-group full-width">
              <label>Description</label>
              <textarea id="et-description" placeholder="What is this entity type?">${et ? et.description || '' : ''}</textarea>
            </div>
          </div>

          <div style="margin-top:1.5rem;">
            <h4 style="font-size:0.875rem; font-weight:700; color:var(--gray-900); margin-bottom:0.75rem;">Attributes</h4>
            <div id="et-attributes-list">
              ${renderAttributeRows(et ? et.attributes : [])}
            </div>
            <button class="admin-attr-add" onclick="addAttributeRow()">
              <i class="fa-solid fa-plus"></i> Add Attribute
            </button>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button class="admin-btn admin-btn-outline" onclick="closeEntityTypeEditor()">Cancel</button>
          <button class="admin-btn admin-btn-primary" onclick="saveEntityTypeFromForm('${et ? et.id : ''}')">
            <i class="fa-solid fa-floppy-disk"></i> Save
          </button>
        </div>
      </div>
    </div>
  `;

  // Append modal to body
  const existing = document.getElementById('entity-type-modal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', form);
}

// ---- Close Entity Type Editor ----
function closeEntityTypeEditor() {
  const modal = document.getElementById('entity-type-modal');
  if (modal) modal.remove();
}

// ---- Auto-generate slug from name ----
function autoSlugEntityType() {
  const nameInput = document.getElementById('et-name');
  const slugInput = document.getElementById('et-slug');
  if (!nameInput || !slugInput) return;
  // Only auto-fill if slug is empty or was auto-generated before
  if (!slugInput.value || slugInput.dataset.auto === 'true') {
    slugInput.value = CMS_API.slugify(nameInput.value);
    slugInput.dataset.auto = 'true';
  }
}

// ---- Render attribute rows ----
function renderAttributeRows(attributes) {
  if (!attributes || attributes.length === 0) {
    return '<p style="font-size:0.8125rem; color:var(--gray-400); padding:0.5rem 0;">No attributes yet. Add one below.</p>';
  }

  return attributes.map((attr, idx) => `
    <div class="admin-attr-row" data-attr-index="${idx}">
      <span class="admin-attr-drag" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></span>
      <input type="text" class="attr-name" value="${attr.name}" placeholder="Attribute name" oninput="updateAttrId(this)">
      <select class="attr-type" onchange="updateAttrId(this)">
        ${['text', 'number', 'boolean', 'date', 'image', 'richtext'].map(t =>
          `<option value="${t}" ${attr.type === t ? 'selected' : ''}>${t}</option>`
        ).join('')}
      </select>
      <label class="admin-attr-required">
        <input type="checkbox" class="attr-required" ${attr.required ? 'checked' : ''}> Req
      </label>
      <button class="admin-btn-icon danger" onclick="removeAttributeRow(this)" title="Remove">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

// ---- Add attribute row ----
function addAttributeRow() {
  const list = document.getElementById('et-attributes-list');
  if (!list) return;

  // Remove empty state if present
  const empty = list.querySelector('p');
  if (empty) empty.remove();

  const row = document.createElement('div');
  row.className = 'admin-attr-row';
  row.innerHTML = `
    <span class="admin-attr-drag" title="Drag to reorder"><i class="fa-solid fa-grip-vertical"></i></span>
    <input type="text" class="attr-name" placeholder="Attribute name" oninput="updateAttrId(this)">
    <select class="attr-type" onchange="updateAttrId(this)">
      <option value="text">text</option>
      <option value="number">number</option>
      <option value="boolean">boolean</option>
      <option value="date">date</option>
      <option value="image">image</option>
      <option value="richtext">richtext</option>
    </select>
    <label class="admin-attr-required">
      <input type="checkbox" class="attr-required"> Req
    </label>
    <button class="admin-btn-icon danger" onclick="removeAttributeRow(this)" title="Remove">
      <i class="fa-solid fa-trash"></i>
    </button>
  `;
  list.appendChild(row);
}

// ---- Remove attribute row ----
function removeAttributeRow(btn) {
  const row = btn.closest('.admin-attr-row');
  if (row) row.remove();
}

// ---- Update attribute id from name ----
function updateAttrId(input) {
  // The id is derived from the name; we store it on the row dataset
  const row = input.closest('.admin-attr-row');
  if (!row) return;
  const nameInput = row.querySelector('.attr-name');
  if (nameInput) {
    row.dataset.attrId = `attr_${CMS_API.slugify(nameInput.value) || 'unnamed'}`;
  }
}

// ---- Collect attributes from form ----
function collectAttributes() {
  const list = document.getElementById('et-attributes-list');
  if (!list) return [];

  const rows = list.querySelectorAll('.admin-attr-row');
  const attributes = [];

  rows.forEach(row => {
    const nameInput = row.querySelector('.attr-name');
    const typeSelect = row.querySelector('.attr-type');
    const requiredCheck = row.querySelector('.attr-required');

    const name = nameInput ? nameInput.value.trim() : '';
    if (!name) return;

    attributes.push({
      id: `attr_${CMS_API.slugify(name)}`,
      name: name,
      type: typeSelect ? typeSelect.value : 'text',
      required: requiredCheck ? requiredCheck.checked : false
    });
  });

  return attributes;
}

// ---- Save entity type from form ----
function saveEntityTypeFromForm(entityTypeId) {
  const nameInput = document.getElementById('et-name');
  const slugInput = document.getElementById('et-slug');
  const descInput = document.getElementById('et-description');

  const name = nameInput ? nameInput.value.trim() : '';
  const slug = slugInput ? slugInput.value.trim() : '';
  const description = descInput ? descInput.value.trim() : '';

  if (!name) {
    CMS_API.toast('Name is required', 'error');
    return;
  }
  if (!slug) {
    CMS_API.toast('Slug is required', 'error');
    return;
  }

  const attributes = collectAttributes();

  const data = CMS_API.getData();

  // Check slug uniqueness (excluding self)
  const slugExists = data.entityTypes.some(et =>
    et.slug === slug && et.id !== entityTypeId
  );
  if (slugExists) {
    CMS_API.toast(`Slug "${slug}" is already in use`, 'error');
    return;
  }

  const entityType = {
    id: entityTypeId || CMS_API.genId('et'),
    name: name,
    slug: slug,
    description: description,
    attributes: attributes
  };

  CMS_API.saveEntityType(entityType);
  CMS_API.toast(`Entity type "${name}" saved`);
  closeEntityTypeEditor();
  renderCurrentRoute();
}

// ---- Delete entity type ----
function deleteEntityType(id) {
  const data = CMS_API.getData();
  const et = data.entityTypes.find(x => x.id === id);
  if (!et) return;

  if (!confirm(`Delete entity type "${et.name}"?\n\nThis will also delete all its entries and related relation types. This cannot be undone.`)) {
    return;
  }

  CMS_API.deleteEntityType(id);
  CMS_API.toast(`Entity type "${et.name}" deleted`);
  renderCurrentRoute();
}