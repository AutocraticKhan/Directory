/* ============================================
   DiscoverLocal CMS - Adapter Layer
   Converts the generic CMS data model
   (entityTypes / relationTypes / entries)
   into the exact shapes the frontend renderers
   expect (categories, businesses, businessDetails).
   ============================================ */

const CMS_ADAPTER = {

  // ---- Resolve an entry by id across all types ----
  findEntry(data, id) {
    if (!data || !data.entries) return null;
    for (const typeSlug in data.entries) {
      const entry = data.entries[typeSlug].find(e => e.id === id);
      if (entry) return entry;
    }
    return null;
  },

  // ---- Get the entity type slug for an entry id ----
  findTypeSlug(data, id) {
    if (!data || !data.entries) return null;
    for (const typeSlug in data.entries) {
      if (data.entries[typeSlug].some(e => e.id === id)) return typeSlug;
    }
    return null;
  },

  // ---- Resolve related entries for a relation ----
  resolveRelation(data, entry, relationName) {
    const ids = (entry.relations && entry.relations[relationName]) || [];
    return ids.map(id => this.findEntry(data, id)).filter(Boolean);
  },

  // ---- Get attribute value by name (case-insensitive) ----
  getAttr(entry, name, fallback) {
    if (!entry || !entry.attributeValues) return fallback;
    const keys = Object.keys(entry.attributeValues);
    const key = keys.find(k => k.toLowerCase() === String(name).toLowerCase());
    const val = key ? entry.attributeValues[key] : undefined;
    return val !== undefined && val !== null && val !== '' ? val : fallback;
  },

  // ---- Parse JSON string attribute (richtext stored as JSON) ----
  parseJSONAttr(entry, name, fallback) {
    const val = this.getAttr(entry, name, null);
    if (val === null || val === undefined) return fallback;
    if (typeof val === 'object') return val;
    try { return JSON.parse(val); } catch (e) { return fallback; }
  },

  // ---- Build categories array for home page ----
  buildCategories(data) {
    const cats = (data.entries && data.entries.category) || [];
    return cats.map(cat => ({
      id: cat.id,
      name: this.getAttr(cat, 'Name', 'Unnamed'),
      icon: this.getAttr(cat, 'Icon', 'fa-circle'),
      bgColor: this.getAttr(cat, 'Background Color', '#f3f4f6'),
      iconColor: this.getAttr(cat, 'Icon Color', '#6b7280')
    }));
  },

  // ---- Build business summary array for home page grid ----
  buildBusinesses(data) {
    const bizs = (data.entries && data.entries.business) || [];
    return bizs.map(biz => {
      // Resolve category names via has_category relation
      const catEntries = this.resolveRelation(data, biz, 'has_category');
      const categories = catEntries.map(c => this.getAttr(c, 'Name', '')).filter(Boolean);

      const photoEntries = this.resolveRelation(data, biz, 'has_photo');
      const photoCount = this.getAttr(biz, 'Photo Count', photoEntries.length);

      return {
        id: biz.id,
        name: this.getAttr(biz, 'Name', 'Unnamed Business'),
        image: this.getAttr(biz, 'Image', ''),
        price: this.getAttr(biz, 'Price', ''),
        rating: Number(this.getAttr(biz, 'Rating', 0)),
        reviewCount: Number(this.getAttr(biz, 'Review Count', 0)),
        categories: categories,
        quote: this.getAttr(biz, 'Quote', ''),
        status: this.getAttr(biz, 'Status', ''),
        statusType: this.getAttr(biz, 'Status Type', 'open'),
        location: this.getAttr(biz, 'Location', ''),
        photoCount: Number(photoCount)
      };
    });
  },

  // ---- Build business detail object for detail page ----
  buildBusinessDetail(data, id) {
    const bizs = (data.entries && data.entries.business) || [];
    const biz = bizs.find(b => b.id === id || String(b.id) === String(id));
    if (!biz) return null;

    // Categories
    const catEntries = this.resolveRelation(data, biz, 'has_category');
    const categories = catEntries.map(c => this.getAttr(c, 'Name', '')).filter(Boolean);

    // Photos
    const photoEntries = this.resolveRelation(data, biz, 'has_photo');
    const photos = photoEntries.map(p => this.getAttr(p, 'URL', '')).filter(Boolean);

    // Dishes
    const dishEntries = this.resolveRelation(data, biz, 'features_dish');
    const popularDishes = dishEntries.map(d => ({
      name: this.getAttr(d, 'Name', ''),
      image: this.getAttr(d, 'Image', ''),
      photoCount: Number(this.getAttr(d, 'Photo Count', 0)),
      reviewCount: Number(this.getAttr(d, 'Review Count', 0))
    }));

    // Amenities
    const amenityEntries = this.resolveRelation(data, biz, 'has_amenity');
    const amenities = amenityEntries.map(a => ({
      name: this.getAttr(a, 'Name', ''),
      available: Boolean(this.getAttr(a, 'Available', true))
    }));

    // Reviews
    const reviewEntries = this.resolveRelation(data, biz, 'has_review');
    const reviews = reviewEntries.map(r => ({
      userName: this.getAttr(r, 'User Name', 'Anonymous'),
      avatar: this.getAttr(r, 'Avatar', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'),
      location: this.getAttr(r, 'Location', ''),
      friends: Number(this.getAttr(r, 'Friends', 0)),
      reviewCount: Number(this.getAttr(r, 'Review Count', 0)),
      rating: Number(this.getAttr(r, 'Rating', 0)),
      date: this.getAttr(r, 'Date', ''),
      text: this.getAttr(r, 'Text', ''),
      photo: this.getAttr(r, 'Photo', null),
      useful: Number(this.getAttr(r, 'Useful', 0)),
      funny: Number(this.getAttr(r, 'Funny', 0)),
      cool: Number(this.getAttr(r, 'Cool', 0))
    }));

    // Address + weekly hours (stored as JSON strings)
    const address = this.parseJSONAttr(biz, 'Address', {});
    const weeklyHours = this.parseJSONAttr(biz, 'Weekly Hours', []);

    return {
      id: biz.id,
      name: this.getAttr(biz, 'Name', 'Unnamed Business'),
      price: this.getAttr(biz, 'Price', ''),
      rating: Number(this.getAttr(biz, 'Rating', 0)),
      reviewCount: Number(this.getAttr(biz, 'Review Count', 0)),
      categories: categories,
      claimed: Boolean(this.getAttr(biz, 'Claimed', false)),
      status: this.getAttr(biz, 'Status', ''),
      statusType: this.getAttr(biz, 'Status Type', 'open'),
      hoursRange: this.getAttr(biz, 'Hours Range', ''),
      photos: photos,
      photoCount: Number(this.getAttr(biz, 'Photo Count', photos.length)),
      popularDishes: popularDishes,
      amenities: amenities,
      reviews: reviews,
      website: this.getAttr(biz, 'Website', ''),
      phone: this.getAttr(biz, 'Phone', ''),
      address: address,
      weeklyHours: weeklyHours
    };
  },

  // ---- Build popular searches (static, from LOCAL_DATA) ----
  buildPopularSearches() {
    return (typeof LOCAL_DATA !== 'undefined' && LOCAL_DATA.popularSearches) || [];
  }
};