/* ============================================
   DiscoverLocal Admin - Relation Type Manager
   Part A Step 2: Relation Type Manager
   ============================================ */

// ---- Render: Relation Types Screen ----
function renderRelationTypesScreen() {
  const data = CMS_API.getData();
  const relationTypes = data.relationTypes;
  const entityTypes = data.entityTypes;

  const typeNameBySlug = {};
  entityTypes.forEach(et => { typeNameBySlug[et.slug] = et.name; });

  const rows = relationTypes.map(rt => {
    const fromName = typeNameBySlug[rt.fromType] || rt.fromType;
    const toName = typeNameBySlug[rt.toType] || rt.toType;
    const cardinalityBadge = rt.cardinality === 'one-to-many'
      ? '<span class="admin-badge admin-badge-blue">one-to-many</span>'
      : '<span class="admin-badge admin-badge-green">many-to-many</span>';

    return `
      <tr>
        <td><strong>${rt.name}</strong></td>
        <td>${fromName} <i class="fa-solid fa-arrow-right" style="color:var(--gray-400); font-size:0.75rem; margin:0 0.25rem;"></i> ${toName}</td>
        <td>${cardinalityBadge}</td>
        <td class="admin-table-actions">
          <button class="admin-btn-icon" onclick="openRelationTypeEditor('${rt.id}')" title="Edit">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="admin-btn-icon danger" onclick="deleteRelationType('${rt.id}')" title="Delete">
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
          <h2>Relation Types</h2>
          <p>Define how entity types connect to each other</p>
        </div>
        <button class="admin-btn admin-btn-primary" onclick="openRelationTypeEditor()">
          <i class="fa-solid fa-plus"></i> New Relation Type
        </button>
      </div>
      <div class="admin-card-body" style="padding:0;">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>From → To</th>
              <th>Cardinality</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rows || '<tr><td colspan="4" style="text-align:center; color:#9ca3af; padding:2rem;">No relation types yet. Create one to get started.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ---- Open Relation Type Editor (create or edit) ----
function openRelationTypeEditor(relationTypeId) {
  const data = CMS_API.getData();
  const rt = relationTypeId
    ? data.relationTypes.find(x => x.id === relationTypeId)
    : null;

  const isEdit = !!rt;
  const entityTypes = data.entityTypes;

  const typeOptions = entityTypes.map(et =>
    `<option value="${et.slug}" ${rt && rt.fromType === et.slug ? 'selected' : ''}>${et.name}</option>`
  ).join('');

  const toTypeOptions = entityTypes.map(et =>
    `<option value="${et.slug}" ${rt && rt.toType === et.slug ? 'selected' : ''}>${et.name}</option>`
  ).join('');

  const form = `
    <div class="admin-modal-overlay" id="relation-type-modal">
      <div class="admin-modal">
        <div class="admin-modal-header">
          <h3>${isEdit ? 'Edit' : 'Create'} Relation Type</h3>
          <button class="admin-modal-close" onclick="closeRelationTypeEditor()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="admin-modal-body">
          <div class="admin-form-grid">
            <div class="admin-form-group full-width">
              <label>Name <span class="required">*</span></label>
              <input type="text" id="rt-name" value="${rt ? rt.name : ''}" placeholder="e.g. has_category">
              <span class="admin-help-text">Used as the relation key. Lowercase, no spaces.</span>
            </div>
            <div class="admin-form-group">
              <label>From Entity Type <span class="required">*</span></label>
              <select id="rt-from">
                <option value="">Select type...</option>
                ${typeOptions}
              </select>
            </div>
            <div class="admin-form-group">
              <label>To Entity Type <span class="required">*</span></label>
              <select id="rt-to">
                <option value="">Select type...</option>
                ${toTypeOptions}
              </select>
            </div>
            <div class="admin-form-group full-width">
              <label>Cardinality <span class="required">*</span></label>
              <select id="rt-cardinality">
                <option value="many-to-many" ${rt && rt.cardinality === 'many-to-many' ? 'selected' : ''}>many-to-many</option>
                <option value="one-to-many" ${rt && rt.cardinality === 'one-to-many' ? 'selected' : ''}>one-to-many</option>
              </select>
              <span class="admin-help-text">many-to-many: an entry can link to multiple targets. one-to-many: an entry links to a single target.</span>
            </div>
          </div>
        </div>
        <div class="admin-modal-footer">
          <button class="admin-btn admin-btn-outline" onclick="closeRelationTypeEditor()">Cancel</button>
          <button class="admin-btn admin-btn-primary" onclick="saveRelationTypeFromForm('${rt ? rt.id : ''}')">
            <i class="fa-solid fa-floppy-disk"></i> Save
          </button>
        </div>
      </div>
    </div>
  `;

  const existing = document.getElementById('relation-type-modal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', form);
}

// ---- Close Relation Type Editor ----
function closeRelationTypeEditor() {
  const modal = document.getElementById('relation-type-modal');
  if (modal) modal.remove();
}

// ---- Save relation type from form ----
function saveRelationTypeFromForm(relationTypeId) {
  const nameInput = document.getElementById('rt-name');
  const fromSelect = document.getElementById('rt-from');
  const toSelect = document.getElementById('rt-to');
  const cardSelect = document.getElementById('rt-cardinality');

  const name = nameInput ? nameInput.value.trim() : '';
  const fromType = fromSelect ? fromSelect.value : '';
  const toType = toSelect ? toSelect.value : '';
  const cardinality = cardSelect ? cardSelect.value : 'many-to-many';

  if (!name) {
    CMS_API.toast('Name is required', 'error');
    return;
  }
  if (!fromType) {
    CMS_API.toast('From entity type is required', 'error');
    return;
  }
  if (!toType) {
    CMS_API.toast('To entity type is required', 'error');
    return;
  }
  if (fromType === toType) {
    CMS_API.toast('From and To cannot be the same type', 'error');
    return;
  }

  const data = CMS_API.getData();

  // Check name uniqueness (excluding self)
  const nameExists = data.relationTypes.some(rt =>
    rt.name === name && rt.id !== relationTypeId
  );
  if (nameExists) {
    CMS_API.toast(`Relation name "${name}" is already in use`, 'error');
    return;
  }

  const relationType = {
    id: relationTypeId || CMS_API.genId('rt'),
    name: name,
    fromType: fromType,
    toType: toType,
    cardinality: cardinality
  };

  CMS_API.saveRelationType(relationType);

  // Ensure all existing entries of the from type have this relation key
  const data2 = CMS_API.getData();
  const fromEntries = data2.entries[fromType] || [];
  fromEntries.forEach(entry => {
    if (!entry.relations) entry.relations = {};
    if (!entry.relations[name]) entry.relations[name] = [];
  });
  CMS_API.save(data2);

  CMS_API.toast(`Relation type "${name}" saved`);
  closeRelationTypeEditor();
  renderCurrentRoute();
}

// ---- Delete relation type ----
function deleteRelationType(id) {
  const data = CMS_API.getData();
  const rt = data.relationTypes.find(x => x.id === id);
  if (!rt) return;

  if (!confirm(`Delete relation type "${rt.name}"?\n\nThis will remove all connections using this relation. This cannot be undone.`)) {
    return;
  }

  CMS_API.deleteRelationType(id);
  CMS_API.toast(`Relation type "${rt.name}" deleted`);
  renderCurrentRoute();
}