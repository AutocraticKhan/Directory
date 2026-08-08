/* ============================================
   DiscoverLocal Admin - API Layer
   CRUD helpers over CMS_STORE
   ============================================ */

const CMS_API = {

  // ---- Get current data ----
  getData() {
    return CMS_STORE.getData();
  },

  // ---- Save data + notify ----
  save(data) {
    CMS_STORE.saveData(data);
    return data;
  },

  // ---- Toast helper ----
  toast(message, type = 'success') {
    const container = document.getElementById('admin-toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `admin-toast ${type}`;
    el.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}"></i> ${message}`;
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.3s';
      setTimeout(() => el.remove(), 300);
    }, 2500);
  },

  // ---- Slugify ----
  slugify(text) {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  },

  // ---- Generate unique id ----
  genId(prefix) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  },

  // ---- Entity Type CRUD ----
  getEntityTypes() {
    return this.getData().entityTypes;
  },

  getEntityTypeBySlug(slug) {
    return this.getData().entityTypes.find(et => et.slug === slug);
  },

  saveEntityType(entityType) {
    const data = this.getData();
    const idx = data.entityTypes.findIndex(et => et.id === entityType.id);
    if (idx >= 0) {
      data.entityTypes[idx] = entityType;
    } else {
      data.entityTypes.push(entityType);
      // Ensure entries array exists for this type
      if (!data.entries[entityType.slug]) data.entries[entityType.slug] = [];
    }
    this.save(data);
    return entityType;
  },

  deleteEntityType(id) {
    const data = this.getData();
    const et = data.entityTypes.find(x => x.id === id);
    if (!et) return false;

    // Remove related relation types
    data.relationTypes = data.relationTypes.filter(rt =>
      rt.fromType !== et.slug && rt.toType !== et.slug
    );

    // Remove entries
    delete data.entries[et.slug];

    // Remove references in other entries' relations
    Object.keys(data.entries).forEach(slug => {
      data.entries[slug].forEach(entry => {
        if (entry.relations) {
          Object.keys(entry.relations).forEach(relName => {
            entry.relations[relName] = entry.relations[relName].filter(id => {
              // Keep ids that don't belong to the deleted type
              return !this.entryBelongsToType(data, id, et.slug);
            });
          });
        }
      });
    });

    data.entityTypes = data.entityTypes.filter(x => x.id !== id);
    this.save(data);
    return true;
  },

  entryBelongsToType(data, entryId, typeSlug) {
    const entries = data.entries[typeSlug] || [];
    return entries.some(e => e.id === entryId);
  },

  // ---- Relation Type CRUD ----
  getRelationTypes() {
    return this.getData().relationTypes;
  },

  saveRelationType(relationType) {
    const data = this.getData();
    const idx = data.relationTypes.findIndex(rt => rt.id === relationType.id);
    if (idx >= 0) {
      data.relationTypes[idx] = relationType;
    } else {
      data.relationTypes.push(relationType);
    }
    this.save(data);
    return relationType;
  },

  deleteRelationType(id) {
    const data = this.getData();
    const rt = data.relationTypes.find(x => x.id === id);
    if (!rt) return false;

    // Remove relation references from all entries of the from type
    const fromEntries = data.entries[rt.fromType] || [];
    fromEntries.forEach(entry => {
      if (entry.relations && entry.relations[rt.name]) {
        delete entry.relations[rt.name];
      }
    });

    data.relationTypes = data.relationTypes.filter(x => x.id !== id);
    this.save(data);
    return true;
  },

  // ---- Entry CRUD ----
  getEntries(typeSlug) {
    const data = this.getData();
    return data.entries[typeSlug] || [];
  },

  getEntry(typeSlug, entryId) {
    const data = this.getData();
    const entries = data.entries[typeSlug] || [];
    return entries.find(e => e.id === entryId) || null;
  },

  saveEntry(typeSlug, entry) {
    const data = this.getData();
    if (!data.entries[typeSlug]) data.entries[typeSlug] = [];
    const idx = data.entries[typeSlug].findIndex(e => e.id === entry.id);
    if (idx >= 0) {
      data.entries[typeSlug][idx] = entry;
    } else {
      data.entries[typeSlug].push(entry);
    }
    this.save(data);
    return entry;
  },

  deleteEntry(typeSlug, entryId) {
    const data = this.getData();
    data.entries[typeSlug] = (data.entries[typeSlug] || []).filter(e => e.id !== entryId);

    // Remove references from other entries' relations
    Object.keys(data.entries).forEach(slug => {
      data.entries[slug].forEach(entry => {
        if (entry.relations) {
          Object.keys(entry.relations).forEach(relName => {
            entry.relations[relName] = entry.relations[relName].filter(id => id !== entryId);
          });
        }
      });
    });

    this.save(data);
    return true;
  },

  // ---- Entry display name helper ----
  getEntryDisplayName(typeSlug, entry) {
    if (!entry) return 'Unnamed';
    const et = this.getEntityTypeBySlug(typeSlug);
    if (!et) return entry.id;

    // Find first text attribute to use as display name
    const nameAttr = et.attributes.find(a => a.type === 'text');
    if (nameAttr && entry.attributeValues[nameAttr.name] !== undefined) {
      return entry.attributeValues[nameAttr.name] || entry.id;
    }

    // Fallback: first non-empty attribute value
    for (const attr of et.attributes) {
      const val = entry.attributeValues[attr.name];
      if (val !== undefined && val !== null && val !== '') {
        return String(val);
      }
    }
    return entry.id;
  },

  // ---- Import ----
  importFile() {
    const input = document.getElementById('admin-import-input');
    if (!input) return;
    input.value = '';
    input.click();
  },

  handleImportFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = CMS_STORE.importFromJS(e.target.result);
        this.toast('Import successful! Data loaded from file.');
        // Re-render current route
        if (typeof renderCurrentRoute === 'function') renderCurrentRoute();
      } catch (err) {
        this.toast('Import failed: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
  }
};