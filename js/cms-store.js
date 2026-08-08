/* ============================================
   DiscoverLocal CMS - LocalStorage JSON Store
   The CMS "database". Seeds from LOCAL_DATA on
   first load, persists to localStorage, and can
   export/import the data as a JS file.
   ============================================ */

const CMS_STORE_KEY = 'discoverlocal_cms_data_v1';

const CMS_STORE = {
  // ---- Core data access ----
  getData() {
    const raw = localStorage.getItem(CMS_STORE_KEY);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* fall through */ }
    }
    return this.seed();
  },

  saveData(data) {
    localStorage.setItem(CMS_STORE_KEY, JSON.stringify(data));
  },

  // ---- Reset to seed ----
  reset() {
    const data = this.seed();
    this.saveData(data);
    return data;
  },

  // ---- Seed from LOCAL_DATA ----
  seed() {
    const data = {
      entityTypes: [],
      relationTypes: [],
      entries: {}
    };

    // ---- Entity Types ----
    data.entityTypes = [
      {
        id: 'et_business',
        name: 'Business',
        slug: 'business',
        description: 'A local business listing',
        attributes: [
          { id: 'attr_name', name: 'Name', type: 'text', required: true },
          { id: 'attr_image', name: 'Image', type: 'image', required: true },
          { id: 'attr_price', name: 'Price', type: 'text', required: false },
          { id: 'attr_rating', name: 'Rating', type: 'number', required: false },
          { id: 'attr_reviewCount', name: 'Review Count', type: 'number', required: false },
          { id: 'attr_quote', name: 'Quote', type: 'text', required: false },
          { id: 'attr_status', name: 'Status', type: 'text', required: false },
          { id: 'attr_statusType', name: 'Status Type', type: 'text', required: false },
          { id: 'attr_location', name: 'Location', type: 'text', required: false },
          { id: 'attr_photoCount', name: 'Photo Count', type: 'number', required: false },
          { id: 'attr_claimed', name: 'Claimed', type: 'boolean', required: false },
          { id: 'attr_hoursRange', name: 'Hours Range', type: 'text', required: false },
          { id: 'attr_website', name: 'Website', type: 'text', required: false },
          { id: 'attr_phone', name: 'Phone', type: 'text', required: false },
          { id: 'attr_address', name: 'Address', type: 'richtext', required: false },
          { id: 'attr_weeklyHours', name: 'Weekly Hours', type: 'richtext', required: false }
        ]
      },
      {
        id: 'et_category',
        name: 'Category',
        slug: 'category',
        description: 'A browse category shown on the home page',
        attributes: [
          { id: 'attr_cat_name', name: 'Name', type: 'text', required: true },
          { id: 'attr_cat_icon', name: 'Icon', type: 'text', required: false },
          { id: 'attr_cat_bgColor', name: 'Background Color', type: 'text', required: false },
          { id: 'attr_cat_iconColor', name: 'Icon Color', type: 'text', required: false }
        ]
      },
      {
        id: 'et_amenity',
        name: 'Amenity',
        slug: 'amenity',
        description: 'An amenity or feature a business offers',
        attributes: [
          { id: 'attr_amenity_name', name: 'Name', type: 'text', required: true },
          { id: 'attr_amenity_available', name: 'Available', type: 'boolean', required: false }
        ]
      },
      {
        id: 'et_review',
        name: 'Review',
        slug: 'review',
        description: 'A customer review for a business',
        attributes: [
          { id: 'attr_review_userName', name: 'User Name', type: 'text', required: true },
          { id: 'attr_review_avatar', name: 'Avatar', type: 'image', required: false },
          { id: 'attr_review_location', name: 'Location', type: 'text', required: false },
          { id: 'attr_review_friends', name: 'Friends', type: 'number', required: false },
          { id: 'attr_review_reviewCount', name: 'Review Count', type: 'number', required: false },
          { id: 'attr_review_rating', name: 'Rating', type: 'number', required: false },
          { id: 'attr_review_date', name: 'Date', type: 'text', required: false },
          { id: 'attr_review_text', name: 'Text', type: 'richtext', required: false },
          { id: 'attr_review_photo', name: 'Photo', type: 'image', required: false },
          { id: 'attr_review_useful', name: 'Useful', type: 'number', required: false },
          { id: 'attr_review_funny', name: 'Funny', type: 'number', required: false },
          { id: 'attr_review_cool', name: 'Cool', type: 'number', required: false }
        ]
      },
      {
        id: 'et_dish',
        name: 'Dish',
        slug: 'dish',
        description: 'A popular dish or service item',
        attributes: [
          { id: 'attr_dish_name', name: 'Name', type: 'text', required: true },
          { id: 'attr_dish_image', name: 'Image', type: 'image', required: false },
          { id: 'attr_dish_photoCount', name: 'Photo Count', type: 'number', required: false },
          { id: 'attr_dish_reviewCount', name: 'Review Count', type: 'number', required: false }
        ]
      },
      {
        id: 'et_photo',
        name: 'Photo',
        slug: 'photo',
        description: 'A photo of a business',
        attributes: [
          { id: 'attr_photo_url', name: 'URL', type: 'image', required: true }
        ]
      }
    ];

    // ---- Relation Types ----
    data.relationTypes = [
      { id: 'rt_has_category', name: 'has_category', fromType: 'business', toType: 'category', cardinality: 'many-to-many' },
      { id: 'rt_has_amenity', name: 'has_amenity', fromType: 'business', toType: 'amenity', cardinality: 'many-to-many' },
      { id: 'rt_features_dish', name: 'features_dish', fromType: 'business', toType: 'dish', cardinality: 'many-to-many' },
      { id: 'rt_has_review', name: 'has_review', fromType: 'business', toType: 'review', cardinality: 'many-to-many' },
      { id: 'rt_has_photo', name: 'has_photo', fromType: 'business', toType: 'photo', cardinality: 'many-to-many' }
    ];

    // ---- Entries ----
    data.entries = { business: [], category: [], amenity: [], review: [], dish: [], photo: [] };

    // Seed categories
    (LOCAL_DATA.categories || []).forEach(cat => {
      data.entries.category.push({
        id: `cat_${cat.id}`,
        attributeValues: {
          'Name': cat.name,
          'Icon': cat.icon,
          'Background Color': cat.bgColor,
          'Icon Color': cat.iconColor
        },
        relations: {}
      });
    });

    // Seed businesses + related entries
    (LOCAL_DATA.businesses || []).forEach(biz => {
      const detail = LOCAL_DATA.businessDetails && LOCAL_DATA.businessDetails[String(biz.id)];
      const bizId = `biz_${biz.id}`;

      // Business entry
      const bizEntry = {
        id: bizId,
        attributeValues: {
          'Name': biz.name,
          'Image': biz.image,
          'Price': biz.price,
          'Rating': biz.rating,
          'Review Count': biz.reviewCount,
          'Quote': biz.quote,
          'Status': biz.status,
          'Status Type': biz.statusType,
          'Location': biz.location,
          'Photo Count': biz.photoCount,
          'Claimed': detail ? detail.claimed : false,
          'Hours Range': detail ? detail.hoursRange : '',
          'Website': detail ? detail.website : '',
          'Phone': detail ? detail.phone : '',
          'Address': detail ? JSON.stringify(detail.address || {}) : '{}',
          'Weekly Hours': detail ? JSON.stringify(detail.weeklyHours || []) : '[]'
        },
        relations: {
          'has_category': [],
          'has_amenity': [],
          'features_dish': [],
          'has_review': [],
          'has_photo': []
        }
      };

      // Categories
      (biz.categories || []).forEach(catName => {
        const catEntry = data.entries.category.find(c => c.attributeValues['Name'] === catName);
        if (catEntry) bizEntry.relations['has_category'].push(catEntry.id);
      });

      // Amenities
      if (detail && detail.amenities) {
        detail.amenities.forEach(am => {
          let amenityEntry = data.entries.amenity.find(a => a.attributeValues['Name'] === am.name);
          if (!amenityEntry) {
            amenityEntry = {
              id: `amenity_${data.entries.amenity.length + 1}`,
              attributeValues: { 'Name': am.name, 'Available': am.available },
              relations: {}
            };
            data.entries.amenity.push(amenityEntry);
          }
          bizEntry.relations['has_amenity'].push(amenityEntry.id);
        });
      }

      // Dishes
      if (detail && detail.popularDishes) {
        detail.popularDishes.forEach(dish => {
          const dishEntry = {
            id: `dish_${data.entries.dish.length + 1}`,
            attributeValues: {
              'Name': dish.name,
              'Image': dish.image,
              'Photo Count': dish.photoCount,
              'Review Count': dish.reviewCount
            },
            relations: {}
          };
          data.entries.dish.push(dishEntry);
          bizEntry.relations['features_dish'].push(dishEntry.id);
        });
      }

      // Reviews
      if (detail && detail.reviews) {
        detail.reviews.forEach(rev => {
          const reviewEntry = {
            id: `review_${data.entries.review.length + 1}`,
            attributeValues: {
              'User Name': rev.userName,
              'Avatar': rev.avatar,
              'Location': rev.location,
              'Friends': rev.friends,
              'Review Count': rev.reviewCount,
              'Rating': rev.rating,
              'Date': rev.date,
              'Text': rev.text,
              'Photo': rev.photo || '',
              'Useful': rev.useful,
              'Funny': rev.funny,
              'Cool': rev.cool
            },
            relations: {}
          };
          data.entries.review.push(reviewEntry);
          bizEntry.relations['has_review'].push(reviewEntry.id);
        });
      }

      // Photos
      if (detail && detail.photos) {
        detail.photos.forEach(photoUrl => {
          const photoEntry = {
            id: `photo_${data.entries.photo.length + 1}`,
            attributeValues: { 'URL': photoUrl },
            relations: {}
          };
          data.entries.photo.push(photoEntry);
          bizEntry.relations['has_photo'].push(photoEntry.id);
        });
      }

      data.entries.business.push(bizEntry);
    });

    return data;
  },

  // ---- Export as pure JSON content ----
  exportJSON() {
    const data = this.getData();
    return JSON.stringify(data, null, 2);
  },

  // ---- Download export ----
  downloadExport() {
    const content = this.exportJSON();
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cms-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // ---- Import from a JSON file content ----
  importFromJS(content) {
    let data;
    // Support both pure JSON and legacy `window.CMS_DATA = {...};` format
    const trimmed = content.trim();
    if (trimmed.startsWith('{')) {
      data = JSON.parse(trimmed);
    } else {
      const match = content.match(/window\.CMS_DATA\s*=\s*(\{[\s\S]*\});?\s*$/);
      if (!match) throw new Error('Invalid CMS export file format');
      data = JSON.parse(match[1]);
    }
    if (!data.entityTypes || !data.relationTypes || !data.entries) {
      throw new Error('CMS file is missing required sections');
    }
    this.saveData(data);
    return data;
  }
};