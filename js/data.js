/* ============================================
   DiscoverLocal - Embedded Data
   All JSON data embedded as JS objects so the site
   works without a local server (file:// protocol)
   ============================================ */

const LOCAL_DATA = {

  // ---- Categories ----
  categories: [],

  // ---- Popular Searches ----
  popularSearches: [],

  // ---- Business Summaries (for home page grid) ----
  businesses: [],

  // ---- Business Details (for individual business pages) ----
  businessDetails: {}
};

/* ============================================
   Data Source Resolution
   If the CMS export (data/cms-data.json) is present,
   it becomes the source of truth. Otherwise we
   fall back to the hardcoded LOCAL_DATA above.
   ============================================ */

// Load CMS data from data/cms-data.json (pure JSON file)
// Uses synchronous XHR so it works on file:// protocol.
// The path is resolved relative to this script's location (js/data.js)
// so it works from any page (root, pages/, admin/).
let CMS_DATA = null;
try {
  // Determine the directory of this script (js/) to build the data path
  const scripts = document.getElementsByTagName('script');
  let scriptDir = '';
  for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src') || '';
    if (src.indexOf('data.js') !== -1) {
      scriptDir = src.substring(0, src.lastIndexOf('/') + 1);
      break;
    }
  }
  // From js/, the data folder is one level up: ../data/cms-data.json
  const dataPath = scriptDir + '../data/cms-data.json';

  const xhr = new XMLHttpRequest();
  xhr.open('GET', dataPath, false); // synchronous
  xhr.send(null);
  if (xhr.status === 200 || xhr.status === 0) {
    CMS_DATA = JSON.parse(xhr.responseText);
  }
} catch (e) {
  // Fall back to LOCAL_DATA if JSON file is missing or invalid
  CMS_DATA = null;
}

const SITE_DATA = CMS_DATA
  ? {
      categories: CMS_ADAPTER.buildCategories(CMS_DATA),
      businesses: CMS_ADAPTER.buildBusinesses(CMS_DATA),
      businessDetails: {},
      popularSearches: CMS_ADAPTER.buildPopularSearches()
    }
  : LOCAL_DATA;

// Build businessDetails map from CMS data
if (CMS_DATA) {
  (CMS_DATA.entries.business || []).forEach(biz => {
    SITE_DATA.businessDetails[biz.id] = CMS_ADAPTER.buildBusinessDetail(CMS_DATA, biz.id);
  });
}