 /* ============================================
   DiscoverLocal - Embedded Data
   All JSON data embedded as JS objects so the site
   works without a local server (file:// protocol)
   ============================================ */

const LOCAL_DATA = {

  // ---- Categories ----
  categories: [
    {
      "id": "restaurants",
      "name": "Restaurants",
      "icon": "fa-utensils",
      "bgColor": "#fff1f2",
      "iconColor": "#e11d48"
    },
    {
      "id": "nightlife",
      "name": "Nightlife",
      "icon": "fa-glass-cheers",
      "bgColor": "#fffbeb",
      "iconColor": "#d97706"
    },
    {
      "id": "home-services",
      "name": "Home Services",
      "icon": "fa-house-chimney",
      "bgColor": "#eff6ff",
      "iconColor": "#2563eb"
    },
    {
      "id": "beauty-spas",
      "name": "Beauty & Spas",
      "icon": "fa-spa",
      "bgColor": "#faf5ff",
      "iconColor": "#9333ea"
    },
    {
      "id": "auto-repair",
      "name": "Auto Repair",
      "icon": "fa-car-wrench",
      "bgColor": "#ecfdf5",
      "iconColor": "#059669"
    },
    {
      "id": "shopping",
      "name": "Shopping",
      "icon": "fa-bag-shopping",
      "bgColor": "#ecfeff",
      "iconColor": "#0891b2"
    },
    {
      "id": "fitness",
      "name": "Fitness",
      "icon": "fa-dumbbell",
      "bgColor": "#fff7ed",
      "iconColor": "#ea580c"
    },
    {
      "id": "hot-new",
      "name": "Hot & New",
      "icon": "fa-fire",
      "bgColor": "#eef2ff",
      "iconColor": "#4f46e5"
    }
  ],

  // ---- Popular Searches ----
  popularSearches: [
    { "emoji": "🍣", "label": "Sushi" },
    { "emoji": "☕", "label": "Craft Coffee" },
    { "emoji": "🍕", "label": "Pizza" },
    { "emoji": "🛠️", "label": "Electricians" },
    { "emoji": "💅", "label": "Nail Salons" }
  ],

  // ---- Business Summaries (for home page grid) ----
  businesses: [
    {
      "id": 1,
      "name": "The Rustic Spoon",
      "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "price": "$$",
      "rating": 4.5,
      "reviewCount": 324,
      "categories": ["American (New)", "Breakfast & Brunch"],
      "quote": "Absolutely amazing experience! The avocado smash toast and woodfire pizza are must-tries!",
      "status": "Open Now",
      "statusType": "open",
      "location": "Financial District",
      "photoCount": 124
    },
    {
      "id": 2,
      "name": "Sakura Omakase & Bar",
      "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "price": "$$$",
      "rating": 4.9,
      "reviewCount": 480,
      "categories": ["Japanese", "Sushi Bar"],
      "quote": "Fresh fish flown in daily from Tokyo. The chef's tasting menu is worth every penny!",
      "status": "Open Now",
      "statusType": "open",
      "location": "Japantown",
      "photoCount": 89
    },
    {
      "id": 3,
      "name": "Urban Grind Coffee Co.",
      "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "price": "$",
      "rating": 4.2,
      "reviewCount": 198,
      "categories": ["Coffee & Tea", "Bakery"],
      "quote": "Cozy spot with fast Wi-Fi and the best oat milk lattes in the Mission district.",
      "status": "Open Now",
      "statusType": "open",
      "location": "Mission District",
      "photoCount": 56
    },
    {
      "id": 4,
      "name": "Glow Beauty & Hair Studio",
      "image": "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "price": "$$",
      "rating": 4.8,
      "reviewCount": 156,
      "categories": ["Hair Salon", "Stylists"],
      "quote": "Elena did an astounding job with my balayage. Extremely polite staff and modern interior.",
      "status": "Closes 7 PM",
      "statusType": "closing",
      "location": "SoMa",
      "photoCount": 41
    },
    {
      "id": 5,
      "name": "Apex Auto & Brake Care",
      "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "price": "$$",
      "rating": 4.6,
      "reviewCount": 92,
      "categories": ["Auto Repair", "Mechanics"],
      "quote": "Honest diagnostic and fast service. Didn't try to upsell me on unnecessary repairs.",
      "status": "Open Now",
      "statusType": "open",
      "location": "Richmond",
      "photoCount": 19
    },
    {
      "id": 6,
      "name": "Iron Vault Fitness Club",
      "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "price": "$$",
      "rating": 4.7,
      "reviewCount": 214,
      "categories": ["Gyms", "Personal Trainers"],
      "quote": "State of the art free weight section, spacious turf, and non-crowded morning hours!",
      "status": "24/7 Open",
      "statusType": "open",
      "location": "Marina District",
      "photoCount": 68
    }
  ],

  // ---- Business Details (for individual business pages) ----
  businessDetails: {
    "1": {
      "id": 1,
      "name": "The Rustic Spoon",
      "price": "$$",
      "rating": 4.5,
      "reviewCount": 324,
      "categories": ["American (New)", "Breakfast & Brunch"],
      "claimed": true,
      "status": "Open Now",
      "statusType": "open",
      "hoursRange": "8:00 AM - 10:00 PM",
      "photos": [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1544025162-8315ea07b469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "photoCount": 124,
      "popularDishes": [
        {
          "name": "Avocado Smash Toast",
          "image": "https://images.unsplash.com/photo-1544025162-8315ea07b469?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 12,
          "reviewCount": 5
        },
        {
          "name": "Rustic Woodfire Pizza",
          "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 8,
          "reviewCount": 14
        },
        {
          "name": "Truffle Pasta",
          "image": "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 20,
          "reviewCount": 9
        }
      ],
      "amenities": [
        { "name": "Takes Reservations", "available": true },
        { "name": "Offers Delivery", "available": true },
        { "name": "Offers Takeout", "available": true },
        { "name": "No Drive-Thru", "available": false },
        { "name": "Outdoor Seating", "available": true },
        { "name": "Free Wi-Fi", "available": true }
      ],
      "reviews": [
        {
          "userName": "Sarah J.",
          "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 142,
          "reviewCount": 56,
          "rating": 5,
          "date": "2 days ago",
          "text": "Absolutely amazing experience! The rustic ambiance is perfect for a date night or a cozy brunch. I ordered the Avocado Smash Toast and it was the best I've had in the city. The staff was incredibly attentive despite it being a busy Saturday morning. Highly recommend booking a table in advance!",
          "photo": "https://images.unsplash.com/photo-1544025162-8315ea07b469?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "useful": 4,
          "funny": 1,
          "cool": 0
        },
        {
          "userName": "David M.",
          "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "Oakland, CA",
          "friends": 89,
          "reviewCount": 112,
          "rating": 4,
          "date": "1 month ago",
          "text": "Solid place for dinner. The woodfire pizza has a great crust, though it was slightly under-seasoned for my taste. The craft cocktails are where this place really shines. Try the smoky Old Fashioned! It gets quite loud indoors, so ask for patio seating if you want to hold a conversation.",
          "photo": null,
          "useful": 2,
          "funny": 0,
          "cool": 1
        }
      ],
      "website": "therusticspoon.com",
      "phone": "(415) 555-0198",
      "address": {
        "street": "123 Market St",
        "neighborhood": "Financial District",
        "city": "San Francisco, CA 94105"
      },
      "weeklyHours": [
        { "day": "Mon", "hours": "8:00 AM - 10:00 PM" },
        { "day": "Tue", "hours": "8:00 AM - 10:00 PM" },
        { "day": "Wed", "hours": "8:00 AM - 10:00 PM" },
        { "day": "Thu", "hours": "8:00 AM - 10:00 PM", "isToday": true },
        { "day": "Fri", "hours": "8:00 AM - 11:00 PM" },
        { "day": "Sat", "hours": "9:00 AM - 11:00 PM" },
        { "day": "Sun", "hours": "9:00 AM - 9:00 PM" }
      ]
    },

    "2": {
      "id": 2,
      "name": "Sakura Omakase & Bar",
      "price": "$$$",
      "rating": 4.9,
      "reviewCount": 480,
      "categories": ["Japanese", "Sushi Bar"],
      "claimed": true,
      "status": "Open Now",
      "statusType": "open",
      "hoursRange": "5:00 PM - 11:00 PM",
      "photos": [
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1617366010912-5a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611143669185-af224c206993?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1552896549-310e64ed3a1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1564115233859-1e9f9c3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "photoCount": 89,
      "popularDishes": [
        {
          "name": "Chef's Tasting Menu",
          "image": "https://images.unsplash.com/photo-1617366010912-5a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 32,
          "reviewCount": 28
        },
        {
          "name": "Otoro Nigiri",
          "image": "https://images.unsplash.com/photo-1611143669185-af224c206993?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 18,
          "reviewCount": 12
        },
        {
          "name": "Wagyu Tataki",
          "image": "https://images.unsplash.com/photo-1552896549-310e64ed3a1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 15,
          "reviewCount": 7
        }
      ],
      "amenities": [
        { "name": "Takes Reservations", "available": true },
        { "name": "Offers Delivery", "available": false },
        { "name": "Offers Takeout", "available": false },
        { "name": "Full Bar", "available": true },
        { "name": "Private Dining", "available": true },
        { "name": "Free Wi-Fi", "available": false }
      ],
      "reviews": [
        {
          "userName": "Emily T.",
          "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 230,
          "reviewCount": 89,
          "rating": 5,
          "date": "1 week ago",
          "text": "Fresh fish flown in daily from Tokyo. The chef's tasting menu is worth every penny! Each piece of nigiri was crafted with such precision and the flavors were out of this world. The sake pairing was also spot on. This is now my go-to spot for special occasions.",
          "photo": "https://images.unsplash.com/photo-1611143669185-af224c206993?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "useful": 12,
          "funny": 2,
          "cool": 5
        },
        {
          "userName": "James K.",
          "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Jose, CA",
          "friends": 54,
          "reviewCount": 201,
          "rating": 5,
          "date": "3 weeks ago",
          "text": "Best omakase in the Bay Area, hands down. The intimate counter seating lets you watch the chef work his magic. The otoro literally melted in my mouth. Book well in advance - only 8 seats at the counter!",
          "photo": null,
          "useful": 8,
          "funny": 0,
          "cool": 3
        }
      ],
      "website": "sakuraomakase.com",
      "phone": "(415) 555-0273",
      "address": {
        "street": "456 Japantown Ave",
        "neighborhood": "Japantown",
        "city": "San Francisco, CA 94115"
      },
      "weeklyHours": [
        { "day": "Mon", "hours": "Closed" },
        { "day": "Tue", "hours": "5:00 PM - 11:00 PM" },
        { "day": "Wed", "hours": "5:00 PM - 11:00 PM" },
        { "day": "Thu", "hours": "5:00 PM - 11:00 PM", "isToday": true },
        { "day": "Fri", "hours": "5:00 PM - 12:00 AM" },
        { "day": "Sat", "hours": "4:00 PM - 12:00 AM" },
        { "day": "Sun", "hours": "4:00 PM - 10:00 PM" }
      ]
    },

    "3": {
      "id": 3,
      "name": "Urban Grind Coffee Co.",
      "price": "$",
      "rating": 4.2,
      "reviewCount": 198,
      "categories": ["Coffee & Tea", "Bakery"],
      "claimed": true,
      "status": "Open Now",
      "statusType": "open",
      "hoursRange": "6:30 AM - 7:00 PM",
      "photos": [
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1453614510291-ff10845e1f7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1559054663-e8c1ab48b5e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1495474472287-4d71cddff5d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1442512591343-d1b6f7e1f7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "photoCount": 56,
      "popularDishes": [
        {
          "name": "Oat Milk Latte",
          "image": "https://images.unsplash.com/photo-1559054663-e8c1ab48b5e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 22,
          "reviewCount": 18
        },
        {
          "name": "Almond Croissant",
          "image": "https://images.unsplash.com/photo-1495474472287-4d71cddff5d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 9,
          "reviewCount": 11
        },
        {
          "name": "Cold Brew",
          "image": "https://images.unsplash.com/photo-1442512591343-d1b6f7e1f7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 14,
          "reviewCount": 7
        }
      ],
      "amenities": [
        { "name": "Offers Delivery", "available": true },
        { "name": "Offers Takeout", "available": true },
        { "name": "Free Wi-Fi", "available": true },
        { "name": "Outdoor Seating", "available": true },
        { "name": "Vegan Options", "available": true },
        { "name": "Parking Available", "available": false }
      ],
      "reviews": [
        {
          "userName": "Marcus L.",
          "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45c63?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 67,
          "reviewCount": 143,
          "rating": 4,
          "date": "5 days ago",
          "text": "Cozy spot with fast Wi-Fi and the best oat milk lattes in the Mission district. The baristas really know their craft. Only downside is limited seating during peak morning hours - get there before 8 AM if you want a table!",
          "photo": "https://images.unsplash.com/photo-1559054663-e8c1ab48b5e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "useful": 6,
          "funny": 1,
          "cool": 2
        },
        {
          "userName": "Priya N.",
          "avatar": "https://images.unsplash.com/photo-1534570185-6d8dcf3a3a3a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "Daly City, CA",
          "friends": 34,
          "reviewCount": 78,
          "rating": 5,
          "date": "2 weeks ago",
          "text": "Their almond croissant is to die for! Flaky, buttery, and not too sweet. The cold brew is smooth and never bitter. I come here every weekend to work remotely - great atmosphere and friendly staff.",
          "photo": null,
          "useful": 3,
          "funny": 0,
          "cool": 1
        }
      ],
      "website": "urbangrindcoffee.com",
      "phone": "(415) 555-0341",
      "address": {
        "street": "789 Valencia St",
        "neighborhood": "Mission District",
        "city": "San Francisco, CA 94110"
      },
      "weeklyHours": [
        { "day": "Mon", "hours": "6:30 AM - 7:00 PM" },
        { "day": "Tue", "hours": "6:30 AM - 7:00 PM" },
        { "day": "Wed", "hours": "6:30 AM - 7:00 PM" },
        { "day": "Thu", "hours": "6:30 AM - 7:00 PM", "isToday": true },
        { "day": "Fri", "hours": "6:30 AM - 8:00 PM" },
        { "day": "Sat", "hours": "7:00 AM - 8:00 PM" },
        { "day": "Sun", "hours": "7:00 AM - 6:00 PM" }
      ]
    },

    "4": {
      "id": 4,
      "name": "Glow Beauty & Hair Studio",
      "price": "$$",
      "rating": 4.8,
      "reviewCount": 156,
      "categories": ["Hair Salon", "Stylists"],
      "claimed": true,
      "status": "Closes 7 PM",
      "statusType": "closing",
      "hoursRange": "9:00 AM - 7:00 PM",
      "photos": [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1522337360787-8b1b5a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1562322140-8e8f1f7e3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1633679655155-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1595476086435-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "photoCount": 41,
      "popularDishes": [
        {
          "name": "Balayage Color",
          "image": "https://images.unsplash.com/photo-1522337360787-8b1b5a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 15,
          "reviewCount": 22
        },
        {
          "name": "Keratin Treatment",
          "image": "https://images.unsplash.com/photo-1562322140-8e8f1f7e3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 8,
          "reviewCount": 14
        },
        {
          "name": "Bridal Updo",
          "image": "https://images.unsplash.com/photo-1633679655155-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 12,
          "reviewCount": 9
        }
      ],
      "amenities": [
        { "name": "Takes Appointments", "available": true },
        { "name": "Walk-ins Welcome", "available": true },
        { "name": "Parking Available", "available": true },
        { "name": "Wheelchair Accessible", "available": true },
        { "name": "Gender-Neutral Restroom", "available": true },
        { "name": "Free Wi-Fi", "available": false }
      ],
      "reviews": [
        {
          "userName": "Amanda R.",
          "avatar": "https://images.unsplash.com/photo-1487412720901-e2ee2f1f3a3a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 98,
          "reviewCount": 45,
          "rating": 5,
          "date": "3 days ago",
          "text": "Elena did an astounding job with my balayage. Extremely polite staff and modern interior. The color came out exactly like the reference photo I showed her. The keratin treatment left my hair silky smooth for weeks. Worth every penny!",
          "photo": "https://images.unsplash.com/photo-1522337360787-8b1b5a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "useful": 7,
          "funny": 0,
          "cool": 3
        },
        {
          "userName": "Sophie C.",
          "avatar": "https://images.unsplash.com/photo-1544005313-94e2f3c1f3a3a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 41,
          "reviewCount": 67,
          "rating": 5,
          "date": "1 week ago",
          "text": "Got my bridal updo done here and it was perfect! Lasted the entire wedding day without a single bobby pin showing. The team made me feel so special on my big day. Highly recommend for any special occasion styling.",
          "photo": null,
          "useful": 5,
          "funny": 1,
          "cool": 4
        }
      ],
      "website": "glowbeautystudio.com",
      "phone": "(415) 555-0467",
      "address": {
        "street": "321 Folsom St",
        "neighborhood": "SoMa",
        "city": "San Francisco, CA 94105"
      },
      "weeklyHours": [
        { "day": "Mon", "hours": "Closed" },
        { "day": "Tue", "hours": "9:00 AM - 7:00 PM" },
        { "day": "Wed", "hours": "9:00 AM - 7:00 PM" },
        { "day": "Thu", "hours": "9:00 AM - 7:00 PM", "isToday": true },
        { "day": "Fri", "hours": "9:00 AM - 8:00 PM" },
        { "day": "Sat", "hours": "8:00 AM - 8:00 PM" },
        { "day": "Sun", "hours": "10:00 AM - 5:00 PM" }
      ]
    },

    "5": {
      "id": 5,
      "name": "Apex Auto & Brake Care",
      "price": "$$",
      "rating": 4.6,
      "reviewCount": 92,
      "categories": ["Auto Repair", "Mechanics"],
      "claimed": true,
      "status": "Open Now",
      "statusType": "open",
      "hoursRange": "7:30 AM - 6:00 PM",
      "photos": [
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1632823461550-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1597212720158-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1530268292-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542362566-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "photoCount": 19,
      "popularDishes": [
        {
          "name": "Brake Pad Replacement",
          "image": "https://images.unsplash.com/photo-1632823461550-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 5,
          "reviewCount": 12
        },
        {
          "name": "Full Diagnostic Service",
          "image": "https://images.unsplash.com/photo-1597212720158-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 3,
          "reviewCount": 8
        },
        {
          "name": "Oil Change & Filter",
          "image": "https://images.unsplash.com/photo-1530268292-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 7,
          "reviewCount": 15
        }
      ],
      "amenities": [
        { "name": "Takes Appointments", "available": true },
        { "name": "Walk-ins Welcome", "available": true },
        { "name": "Parking Available", "available": true },
        { "name": "Free Wi-Fi", "available": true },
        { "name": "Shuttle Service", "available": true },
        { "name": "EV Charging", "available": false }
      ],
      "reviews": [
        {
          "userName": "Robert H.",
          "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 23,
          "reviewCount": 34,
          "rating": 5,
          "date": "1 week ago",
          "text": "Honest diagnostic and fast service. Didn't try to upsell me on unnecessary repairs. They showed me the worn brake pads and explained exactly what needed replacing. My car was ready the same day. Found my new go-to mechanic!",
          "photo": "https://images.unsplash.com/photo-1632823461550-3a3a3a3a3a3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "useful": 9,
          "funny": 0,
          "cool": 2
        },
        {
          "userName": "Linda W.",
          "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "Richmond, CA",
          "friends": 56,
          "reviewCount": 89,
          "rating": 4,
          "date": "3 weeks ago",
          "text": "Great service and fair pricing. The free shuttle service was a lifesaver while my car was in the shop. Only wish they had EV charging stations. Overall a trustworthy shop that treats you right.",
          "photo": null,
          "useful": 4,
          "funny": 1,
          "cool": 0
        }
      ],
      "website": "apexautocare.com",
      "phone": "(415) 555-0582",
      "address": {
        "street": "654 Geary Blvd",
        "neighborhood": "Richmond",
        "city": "San Francisco, CA 94118"
      },
      "weeklyHours": [
        { "day": "Mon", "hours": "7:30 AM - 6:00 PM" },
        { "day": "Tue", "hours": "7:30 AM - 6:00 PM" },
        { "day": "Wed", "hours": "7:30 AM - 6:00 PM" },
        { "day": "Thu", "hours": "7:30 AM - 6:00 PM", "isToday": true },
        { "day": "Fri", "hours": "7:30 AM - 6:00 PM" },
        { "day": "Sat", "hours": "8:00 AM - 4:00 PM" },
        { "day": "Sun", "hours": "Closed" }
      ]
    },

    "6": {
      "id": 6,
      "name": "Iron Vault Fitness Club",
      "price": "$$",
      "rating": 4.7,
      "reviewCount": 214,
      "categories": ["Gyms", "Personal Trainers"],
      "claimed": true,
      "status": "24/7 Open",
      "statusType": "open",
      "hoursRange": "Open 24 Hours",
      "photos": [
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540497077202-7c9a3bb11b8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      "photoCount": 68,
      "popularDishes": [
        {
          "name": "Personal Training Session",
          "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 18,
          "reviewCount": 24
        },
        {
          "name": "Strength & Conditioning",
          "image": "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 12,
          "reviewCount": 16
        },
        {
          "name": "Group Fitness Classes",
          "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          "photoCount": 22,
          "reviewCount": 19
        }
      ],
      "amenities": [
        { "name": "24/7 Access", "available": true },
        { "name": "Free Parking", "available": true },
        { "name": "Showers & Lockers", "available": true },
        { "name": "Personal Training", "available": true },
        { "name": "Group Classes", "available": true },
        { "name": "Pool & Sauna", "available": false }
      ],
      "reviews": [
        {
          "userName": "Chris D.",
          "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45c63?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 78,
          "reviewCount": 56,
          "rating": 5,
          "date": "4 days ago",
          "text": "State of the art free weight section, spacious turf, and non-crowded morning hours! The equipment is always well-maintained and the staff is super friendly. 24/7 access is a game changer for my night shift schedule. Best gym in the Marina!",
          "photo": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          "useful": 11,
          "funny": 1,
          "cool": 4
        },
        {
          "userName": "Jasmine P.",
          "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          "location": "San Francisco, CA",
          "friends": 112,
          "reviewCount": 87,
          "rating": 4,
          "date": "2 weeks ago",
          "text": "Great gym with excellent group fitness classes. My trainer Mike really knows his stuff and helped me hit new PRs. Only reason for 4 stars is it gets pretty packed after 5 PM. Come before 4 PM or after 8 PM for the best experience.",
          "photo": null,
          "useful": 6,
          "funny": 0,
          "cool": 2
        }
      ],
      "website": "ironvaultfitness.com",
      "phone": "(415) 555-0693",
      "address": {
        "street": "987 Chestnut St",
        "neighborhood": "Marina District",
        "city": "San Francisco, CA 94133"
      },
      "weeklyHours": [
        { "day": "Mon", "hours": "Open 24 Hours" },
        { "day": "Tue", "hours": "Open 24 Hours" },
        { "day": "Wed", "hours": "Open 24 Hours" },
        { "day": "Thu", "hours": "Open 24 Hours", "isToday": true },
        { "day": "Fri", "hours": "Open 24 Hours" },
        { "day": "Sat", "hours": "Open 24 Hours" },
        { "day": "Sun", "hours": "Open 24 Hours" }
      ]
    }
  }
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
