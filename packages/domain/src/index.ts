export type ScarRole = "customer" | "guides" | "drivers" | "vendors" | "admin";
export type ScarTheme = "spiritual" | "cultural" | "adventure" | "rural";
export type ScarPillar = ScarTheme;
export type TourismOperatingMode = "unified" | "separated";

export type ThemeAudioConfig = {
  ambient: string;
  cue: string;
  label: string;
};

export type ThemeConfig = {
  id: ScarTheme;
  label: string;
  portalName: string;
  palette: {
    canvas: string;
    panel: string;
    ink: string;
    muted: string;
    accent: string;
    line: string;
  };
  motion: {
    durationMs: number;
    easing: string;
    behavior: string;
  };
  radius: string;
  audio: ThemeAudioConfig;
};

export type RoleConfig = {
  id: ScarRole;
  label: string;
  href: `/${ScarRole}`;
  theme: ScarTheme;
  description: string;
};

export type TourismVerticalConfig = {
  id: ScarPillar;
  label: string;
  tourismName: string;
  travelerNeed: string;
  expression: string;
  operatingUnit: string;
  examples: string[];
};

export const scarThemes: Record<ScarTheme, ThemeConfig> = {
  spiritual: {
    id: "spiritual",
    label: "Spiritual",
    portalName: "Organic Minimalism",
    palette: {
      canvas: "27 25 34",
      panel: "45 41 58",
      ink: "243 238 255",
      muted: "184 176 204",
      accent: "127 86 255",
      line: "57 49 76"
    },
    motion: {
      durationMs: 760,
      easing: "cubic-bezier(.19,1,.22,1)",
      behavior: "slow fade and breath-like glide"
    },
    radius: "18px",
    audio: {
      ambient: "/audio/spiritual-wind-chimes.mp3",
      cue: "/audio/spiritual-bowl-cue.mp3",
      label: "Wind chimes and singing bowl"
    }
  },
  cultural: {
    id: "cultural",
    label: "Cultural",
    portalName: "Editorial Living Heritage",
    palette: {
      canvas: "8 7 15",
      panel: "18 14 31",
      ink: "245 239 255",
      muted: "164 148 184",
      accent: "180 98 255",
      line: "69 47 93"
    },
    motion: {
      durationMs: 560,
      easing: "cubic-bezier(.77,0,.175,1)",
      behavior: "ledger-like unfolding panels"
    },
    radius: "12px",
    audio: {
      ambient: "/audio/cultural-native-echoes.mp3",
      cue: "/audio/cultural-map-open.mp3",
      label: "Native flute and string echoes"
    }
  },
  adventure: {
    id: "adventure",
    label: "Adventure",
    portalName: "High-Octane Neo-Brutalism",
    palette: {
      canvas: "6 8 14",
      panel: "11 15 27",
      ink: "236 244 255",
      muted: "138 151 176",
      accent: "74 144 255",
      line: "28 37 62"
    },
    motion: {
      durationMs: 260,
      easing: "cubic-bezier(.34,1.56,.64,1)",
      behavior: "mechanical snap with recoil"
    },
    radius: "12px",
    audio: {
      ambient: "/audio/adventure-interface-bed.mp3",
      cue: "/audio/adventure-click.mp3",
      label: "Mechanical tactical interface clicks"
    }
  },
  rural: {
    id: "rural",
    label: "Rural",
    portalName: "Grounded Craft Authenticity",
    palette: {
      canvas: "12 10 8",
      panel: "20 16 12",
      ink: "255 244 231",
      muted: "165 145 124",
      accent: "205 126 45",
      line: "42 32 24"
    },
    motion: {
      durationMs: 620,
      easing: "cubic-bezier(.22,1,.36,1)",
      behavior: "soft gravity overshoot"
    },
    radius: "24px",
    audio: {
      ambient: "/audio/rural-nature-rustle.mp3",
      cue: "/audio/rural-soft-confirm.mp3",
      label: "Distant leaves and alpine village ambience"
    }
  }
};

export const scarRoles: RoleConfig[] = [
  {
    id: "customer",
    label: "Customer Canvas",
    href: "/customer",
    theme: "spiritual",
    description: "Architect and live a dynamic SCAR itinerary."
  },
  {
    id: "guides",
    label: "Guide Switchboard",
    href: "/guides",
    theme: "adventure",
    description: "Claim micro-bookings and verify field checklists."
  },
  {
    id: "drivers",
    label: "Driver Engine",
    href: "/drivers",
    theme: "adventure",
    description: "Coordinate routes, waypoints, passengers, and hazards."
  },
  {
    id: "vendors",
    label: "Asset Registry",
    href: "/vendors",
    theme: "rural",
    description: "Manage inventory, baseline prices, and availability."
  },
  {
    id: "admin",
    label: "Admin Ledger",
    href: "/admin",
    theme: "cultural",
    description: "Operate the live trip ledger and payment split matrix."
  }
];

export const scarTourismVerticals: TourismVerticalConfig[] = [
  {
    id: "spiritual",
    label: "Spiritual",
    tourismName: "Spiritual Tourism",
    travelerNeed: "mental peace, grief recovery, inner stillness",
    expression: "Silence, reflection, sacred rhythm and inner clarity",
    operatingUnit: "monasteries, meditation instructors, quiet retreat spaces",
    examples: ["Monk-led silence", "Singing bowl decompression", "Ridge meditation"]
  },
  {
    id: "cultural",
    label: "Cultural",
    tourismName: "Cultural Tourism",
    travelerNeed: "identity, heritage, memory, local context",
    expression: "Living heritage, slow observation and local storytelling",
    operatingUnit: "village historians, heritage hosts, local storytellers",
    examples: ["Heritage village walk", "Temple histories", "Craft and folklore sessions"]
  },
  {
    id: "adventure",
    label: "Adventure",
    tourismName: "Adventure Tourism",
    travelerNeed: "confidence, adrenaline, routine-breaking challenge",
    expression: "Aliveness, courage, release and joyful expression",
    operatingUnit: "mountaineers, pilots, rafting crews, safety marshals",
    examples: ["Paragliding", "Rope bridge reset", "High-altitude trekking"]
  },
  {
    id: "rural",
    label: "Rural",
    tourismName: "Rural Tourism",
    travelerNeed: "grounding, craft, food, village economy immersion",
    expression: "Grounded craft, food, village life and slow renewal",
    operatingUnit: "farmers, orchard owners, horsemen, village kitchens",
    examples: ["Organic farming", "Orchard immersion", "Terrace field breakfast"]
  }
];

export const scarUnifiedTourismModel = {
  label: "Unified SCAR Tourism",
  description:
    "One shared transport, safety, pricing, token, and ledger backbone that can carry all four tourism verticals in the same master trip.",
  operatingRule:
    "Treat the trip as one operational system until the staging destination, then separate each traveler into the tourism vertical that fits their intent."
};

export const scarSharedJourneyModel = {
  departure: "Shared Himalayan Departure",
  destinationHub: "Kullu-Manali Arrival Sanctuary",
  route: ["Delhi NCR", "Chandigarh", "Mandi", "Kullu", "Manali hub"],
  promise:
    "The journey begins together to remove the burden of long-distance travel. After arrival, every traveler moves into a personal rhythm shaped by their own vision.",
  travelerFreedom:
    "No waiting for the group, no forced checklist, no fixed package ceiling. Each experience can be added, removed or reshaped around the traveler."
};

export type ActivityAssignmentView = {
  id: string;
  time: string;
  title: string;
  pillar: ScarPillar;
  location: string;
  guide: string;
  status: "open" | "claimed" | "validated" | "cancelled";
};

export const demoAssignments: ActivityAssignmentView[] = [
  {
    id: "aa-monk-01",
    time: "06:20",
    title: "Silent ridge meditation",
    pillar: "spiritual",
    location: "Old Manali monastery ridge",
    guide: "Tenzin Dorje",
    status: "validated"
  },
  {
    id: "aa-farm-02",
    time: "10:40",
    title: "Organic orchard immersion",
    pillar: "rural",
    location: "Naggar village belt",
    guide: "Meera Thakur",
    status: "claimed"
  },
  {
    id: "aa-bir-03",
    time: "15:10",
    title: "Bir sky release experience",
    pillar: "adventure",
    location: "Bir landing grid",
    guide: "Aarav Rana",
    status: "open"
  }
];

export const himachalWaypoints = [
  "Delhi NCR pickup",
  "Chandigarh regroup point",
  "Mandi fuel and safety halt",
  "Kullu valley split",
  "Manali staging hub",
  "Monastery ridge drop",
  "Rafting staging point"
] as const;

export const travelBookCategories = [
  {
    id: "retreats",
    label: "Retreats",
    title: "Silence, healing and inward travel",
    description: "Mindful journeys framed around grounding, reflection, sacred spaces and emotional renewal."
  },
  {
    id: "shared-transit",
    label: "Shared Transit",
    title: "Arrive together, unfold separately",
    description: "Premium shared movement into the mountains before each traveler begins a personal route."
  },
  {
    id: "stays",
    label: "Boutique Stays",
    title: "Mountain homes with character",
    description: "Curated stays, village homes, monastery-linked rooms and slow-living properties."
  },
  {
    id: "field-guides",
    label: "Field Guides",
    title: "Local wisdom, not tourist scripts",
    description: "Monks, historians, farmers, pilots and mountain experts aligned to the traveler's state."
  },
  {
    id: "offline-book",
    label: "Ground Reality",
    title: "Offline market intelligence",
    description: "Local vehicles, guide rules, campsite charges, danger zones and ground-level travel restrictions."
  }
];

export const himachalTravelState = {
  slug: "himachal-pradesh",
  name: "Himachal Pradesh",
  framing: "A mountain state for silence, sacred circuits, village life and high-altitude release.",
  regions: [
    {
      slug: "kullu-lahaul",
      name: "Kullu-Lahaul",
      title: "Kullu-Lahaul Mindful Retreat",
      description: "A route from green valley culture into the still, open landscapes beyond Atal Tunnel.",
      focus: ["Grounding", "Cultural depth", "Stillness", "Awe", "Spiritual immersion", "Healing", "Joy"]
    },
    {
      slug: "spiti",
      name: "Spiti",
      title: "High Desert Silence",
      description: "Monasteries, cold desert villages, sky-wide roads and deep contemplative travel.",
      focus: ["Awe", "Monastic life", "Stargazing", "Resilience"]
    },
    {
      slug: "bir-billing",
      name: "Bir-Billing",
      title: "Sky, Monastery and Release",
      description: "A rare convergence of paragliding, Tibetan culture, cafes, craft and quiet practice.",
      focus: ["Joy", "Adventure", "Cultural pause", "Creative reset"]
    }
  ]
};

export const kulluLahaulRetreatBook = {
  title: "Kullu-Lahaul Mindful Retreat",
  subtitle: "Silence, spirituality and Himalayan stillness",
  route: "Delhi / Chandigarh -> Kullu -> Naggar -> Lahaul",
  chapters: [
    {
      title: "Arrival and Grounding",
      place: "Kullu -> Naggar",
      experience:
        "Leave behind the noise of everyday life and enter the slower rhythm of the valley. The arrival is intentionally soft, allowing the body to settle before the journey expands.",
      highlights: ["Scenic Himalayan drive", "Welcome tea", "Sunset valley walk", "Opening intention circle"],
      focus: "Grounding"
    },
    {
      title: "Culture and Heritage Immersion",
      place: "Naggar temples, art and village life",
      experience:
        "Move through old pathways, cedar shade, sacred architecture and local stories. The day is not about checking places off a list; it is about noticing what has endured.",
      highlights: ["Ancient temples", "Heritage walk", "Roerich Art Estate", "Himachali cuisine"],
      focus: "Cultural depth"
    },
    {
      title: "Waterfalls and Silence",
      place: "Jana village and forest trails",
      experience:
        "A day dedicated to quiet reconnection. Walk through pine forests, sit near water, journal without hurry and allow the mountains to lower the volume of the mind.",
      highlights: ["Forest trail", "Jana Waterfalls", "Guided silent sitting", "Nature journaling"],
      focus: "Stillness"
    },
    {
      title: "Crossing Into Lahaul",
      place: "Atal Tunnel, Tandi and open sky",
      experience:
        "Beyond the tunnel, the landscape changes into wide silence, barren mountain faces and vast sky. The journey opens into awe.",
      highlights: ["Atal Tunnel", "Chandra-Bhaga confluence", "Sunset meditation", "Stargazing"],
      focus: "Expansion and awe"
    },
    {
      title: "Monastery Immersion",
      place: "Himalayan monastic spaces",
      experience:
        "Spend meaningful time inside a monastery, observing rituals, listening deeply and entering the quiet rhythm of monastic life.",
      highlights: ["Monastery visit", "Meditation session", "Monk conversations", "Prayer flag experience"],
      focus: "Spiritual immersion"
    }
  ]
};

export type MarketStatus = "Allowed" | "Caution" | "Guide Required" | "Local Vehicle Only" | "Not Recommended" | "Seasonal";

export type LocalMarketItem = {
  title: string;
  zone: string;
  status: MarketStatus;
  summary: string;
  cost?: string;
  timing?: string;
  sourceType: "local vehicle" | "self-drive" | "horseman" | "trekking guide" | "camping" | "charge" | "safety" | "supply" | "emergency";
};

export const localMarketMatrix = {
  region: "Kullu-Lahaul",
  promise:
    "A ground-reality layer for first-time travelers: what locals know about movement, camping, guides, charges, risk and supply points before the traveler reaches the valley.",
  localTransportRules: [
    {
      title: "Local taxi handoff beyond sensitive village roads",
      zone: "Naggar inner village lanes",
      status: "Local Vehicle Only",
      summary: "Narrow heritage lanes are better handled by local drivers who know turns, parking pockets and village timings.",
      cost: "INR 600-1,200 short local movement",
      sourceType: "local vehicle"
    },
    {
      title: "Shared SUV to Manali hub, then local dispersal",
      zone: "Delhi / Chandigarh to Manali",
      status: "Allowed",
      summary: "Shared transit carries the group into the hub. After arrival, local movement splits by personal itinerary.",
      cost: "Shared base cost divided across travelers",
      sourceType: "local vehicle"
    }
  ] satisfies LocalMarketItem[],
  selfDriveRestrictions: [
    {
      title: "Avoid self-drive after dark on unfamiliar valley roads",
      zone: "Kullu to Lahaul approaches",
      status: "Not Recommended",
      summary: "Night driving becomes risky because of black ice pockets, blind bends, fatigue and low local visibility.",
      timing: "After sunset",
      sourceType: "self-drive"
    },
    {
      title: "Atal Tunnel crossing requires weather awareness",
      zone: "Solang to Sissu belt",
      status: "Seasonal",
      summary: "Snow, tunnel-side congestion and sudden weather changes can alter timing. Check same-day local conditions.",
      sourceType: "self-drive"
    }
  ] satisfies LocalMarketItem[],
  horsemanOptions: [
    {
      title: "Horsemen for meadow access and load support",
      zone: "Village-to-meadow trails",
      status: "Seasonal",
      summary: "Useful for luggage, slow travelers or uneven meadow approaches; availability depends on village schedules.",
      cost: "INR 800-2,500 depending distance/load",
      sourceType: "horseman"
    }
  ] satisfies LocalMarketItem[],
  trekkingGuideRequirements: [
    {
      title: "Guide required for forest-side trail extensions",
      zone: "Jana upper forest and remote trail branches",
      status: "Guide Required",
      summary: "First-time travelers should not enter unmarked forest branches without a local guide or verified route.",
      cost: "INR 1,500-3,500 per guided walk",
      sourceType: "trekking guide"
    }
  ] satisfies LocalMarketItem[],
  campingRules: [
    {
      title: "Do not camp inside dense forest without local permission",
      zone: "Jana and upper village forest belts",
      status: "Not Recommended",
      summary: "Wildlife movement, fire risk, water access and local restrictions make unsupported forest camping unsafe.",
      sourceType: "camping"
    },
    {
      title: "Use hosted village-edge camping for one-night stays",
      zone: "Naggar and Soyal village edge",
      status: "Allowed",
      summary: "Safer for first-time travelers because water, food, local contact and emergency exit are nearby.",
      cost: "INR 1,200-2,800 per person",
      sourceType: "camping"
    }
  ] satisfies LocalMarketItem[],
  campingSupplyPoints: [
    {
      title: "Last reliable supplies before quiet forest walks",
      zone: "Naggar market",
      status: "Allowed",
      summary: "Water, batteries, basic snacks, rain layers and simple medicines should be collected before leaving the market belt.",
      sourceType: "supply"
    }
  ] satisfies LocalMarketItem[],
  localCharges: [
    {
      title: "Bonfire and hosted-camp add-on charges",
      zone: "Village stays and meadow camps",
      status: "Caution",
      summary: "Bonfires, blankets, guide overtime, porter support and late-night vehicle calls may be billed separately.",
      cost: "INR 500-2,000 depending provider",
      sourceType: "charge"
    }
  ] satisfies LocalMarketItem[],
  dangerZones: [
    {
      title: "River edge after rain or late evening",
      zone: "Chandra-Bhaga and valley streams",
      status: "Not Recommended",
      summary: "Cold water, slippery stones and low light make unsupervised river-edge sitting unsafe.",
      sourceType: "safety"
    }
  ] satisfies LocalMarketItem[],
  allowedZones: [
    {
      title: "Hosted village-edge quiet camps",
      zone: "Naggar, Soyal, selected orchard edges",
      status: "Allowed",
      summary: "Best first step for travelers who want one night close to nature without losing local safety support.",
      sourceType: "camping"
    }
  ] satisfies LocalMarketItem[],
  emergencyContacts: [
    {
      title: "SCAR local field contact",
      zone: "Kullu-Lahaul route",
      status: "Allowed",
      summary: "Stored with the travel book so travelers know who to call when network and local clarity are weak.",
      timing: "Visible in saved book",
      sourceType: "emergency"
    }
  ] satisfies LocalMarketItem[],
  seasonalNotes: [
    {
      title: "Snow and landslide windows change the route logic",
      zone: "Atal Tunnel, Rohtang-side approaches, Lahaul roads",
      status: "Seasonal",
      summary: "The Travel Book should show seasonal warnings before travelers choose self-drive, camping or remote activities.",
      sourceType: "safety"
    }
  ] satisfies LocalMarketItem[]
};

export const travelBookChapters = [
  { label: "Stays", href: "/travel-book/himachal-pradesh/kullu-lahaul", detail: "Boutique stays, village homes and retreat bases" },
  { label: "Transport", href: "/travel-book/himachal-pradesh/kullu-lahaul/local-transport", detail: "Local vehicles, self-drive limits and route handoffs" },
  { label: "Guides", href: "/travel-book/himachal-pradesh/kullu-lahaul/guides", detail: "Trekking guides, horsemen and field experts" },
  { label: "Camping", href: "/travel-book/himachal-pradesh/kullu-lahaul/camping", detail: "Where to camp, where not to camp and what it costs" },
  { label: "Local Rules", href: "/travel-book/himachal-pradesh/kullu-lahaul/safety", detail: "Restricted, caution and guide-required zones" },
  { label: "Safety", href: "/travel-book/himachal-pradesh/kullu-lahaul/safety", detail: "Danger zones, emergency notes and seasonal warnings" },
  { label: "Experiences", href: "/customer", detail: "Turn ground reality into a personal itinerary" }
] as const;

export const travelBookPrepTimeline = [
  {
    phase: "Before you go",
    title: "Read local movement rules",
    detail: "Know where local vehicles, guides or permission may be needed before adding remote plans."
  },
  {
    phase: "On arrival",
    title: "Confirm the hub handoff",
    detail: "Shared transit ends at the hub; personal local movement begins from verified providers."
  },
  {
    phase: "Before camping",
    title: "Check allowed zones and supplies",
    detail: "Confirm water, weather, guide requirement, fire restrictions, local contact and exit route."
  },
  {
    phase: "After dark",
    title: "Avoid unknown movement",
    detail: "Night travel and river/forest edges are not treated as casual exploration for first-time travelers."
  }
] as const;

export const scarAudienceCollections = [
  {
    audience: "For first-time mountain travelers",
    title: "Know the ground before you arrive",
    href: "/travel-book",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    cards: ["Local vehicle rules", "Camping charges", "Guide-required trails"]
  },
  {
    audience: "For solo reset seekers",
    title: "Move quietly, safely and with clarity",
    href: "/customer",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    cards: ["Silent mornings", "Safe local movement", "Saved emergency notes"]
  },
  {
    audience: "For friends",
    title: "Adventure without group friction",
    href: "/travel-book/himachal-pradesh/kullu-lahaul/local-transport",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    cards: ["Rafting windows", "Shared SUV route", "Local taxi handoff"]
  },
  {
    audience: "For mindful couples",
    title: "Stay close to beauty, not crowds",
    href: "/states/himachal-pradesh/kullu-lahaul/mindful-retreat",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    cards: ["Boutique stays", "Sunset walks", "Quiet cafes"]
  },
  {
    audience: "For thrill-seekers",
    title: "Release, but with local intelligence",
    href: "/travel-book/himachal-pradesh/kullu-lahaul/safety",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
    cards: ["Paragliding", "River risk", "Weather windows"]
  }
] as const;

export const scarDestinationMedia = [
  {
    title: "Naggar",
    label: "Heritage village base",
    href: "/travel-book/himachal-pradesh/kullu-lahaul",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    detail: "Temples, art, village pathways and quiet valley stays."
  },
  {
    title: "Jana",
    label: "Forest and waterfall silence",
    href: "/travel-book/himachal-pradesh/kullu-lahaul/camping",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
    detail: "Forest trails, camping rules, supply points and safe return timing."
  },
  {
    title: "Lahaul",
    label: "High mountain expansion",
    href: "/travel-book/himachal-pradesh/kullu-lahaul/safety",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    detail: "Atal Tunnel, seasonal road logic, river caution and vast sky."
  }
] as const;

export type ScarSourceKind =
  | "official tourism"
  | "map/search"
  | "social signal"
  | "local provider"
  | "field verification"
  | "traveler media"
  | "safety note";

export type ScarSourceRecord = {
  placeSlug: string;
  sourceKind: ScarSourceKind;
  sourceName: string;
  url: string;
  title: string;
  summary: string;
  trustLevel: "source" | "cross-check" | "field-verified";
  seedMode: "no-api-url-capture" | "manual-ops-entry" | "future-provider-api";
};

export const scarSourceRecords: ScarSourceRecord[] = [
  {
    placeSlug: "himachal-pradesh/kullu-lahaul",
    sourceKind: "official tourism",
    sourceName: "State / destination tourism pages",
    url: "https://himachaltourism.gov.in/",
    title: "Official destination baseline",
    summary: "Used for state-level destination framing, public tourism categories and official place references before field verification.",
    trustLevel: "source",
    seedMode: "no-api-url-capture"
  },
  {
    placeSlug: "himachal-pradesh/kullu-lahaul",
    sourceKind: "map/search",
    sourceName: "Google Search / Maps references",
    url: "https://www.google.com/search?q=Kullu+Lahaul+travel+Naggar+Atal+Tunnel",
    title: "Discovery index for places and local operators",
    summary: "Stores public search/map URLs and extracted place candidates; ratings, reviews and exact business data require source review or provider permission.",
    trustLevel: "cross-check",
    seedMode: "no-api-url-capture"
  },
  {
    placeSlug: "himachal-pradesh/kullu-lahaul",
    sourceKind: "social signal",
    sourceName: "Instagram public post links",
    url: "https://www.instagram.com/explore/tags/himachalpradesh/",
    title: "Visual trend and activity signal",
    summary: "Stores public hashtag/profile URLs as inspiration signals. SCAR does not copy private content or bypass platform restrictions.",
    trustLevel: "cross-check",
    seedMode: "no-api-url-capture"
  },
  {
    placeSlug: "himachal-pradesh/kullu-lahaul",
    sourceKind: "social signal",
    sourceName: "Facebook local pages and groups",
    url: "https://www.facebook.com/search/pages/?q=Kullu%20Lahaul%20travel",
    title: "Local provider discovery signal",
    summary: "Captures public page URLs for human review, vendor outreach and later verified asset onboarding.",
    trustLevel: "cross-check",
    seedMode: "no-api-url-capture"
  },
  {
    placeSlug: "himachal-pradesh/kullu-lahaul/camping",
    sourceKind: "field verification",
    sourceName: "SCAR field notes",
    url: "scar://field-notes/kullu-lahaul/camping",
    title: "Camping permission and supply reality",
    summary: "Operator-owned notes for where first-time travelers should not camp, where hosted camping is safer, and what local charges may appear.",
    trustLevel: "field-verified",
    seedMode: "manual-ops-entry"
  }
] as const;

export const scarClassificationAtlas = [
  {
    label: "States",
    title: "Start with destination identity",
    detail: "Himachal becomes the first state book, then expands into regions, routes, stays, experiences and ground rules.",
    href: "/states"
  },
  {
    label: "Regions",
    title: "Group valleys by travel behavior",
    detail: "Kullu-Lahaul, Spiti and Bir-Billing are separated by movement pattern, safety logic and emotional purpose.",
    href: "/states/himachal-pradesh"
  },
  {
    label: "Experiences",
    title: "Spiritual, cultural, adventure and rural",
    detail: "The four tourism types stay visible as separate categories, while the shared transport and safety system treats them as one journey.",
    href: "/customer"
  },
  {
    label: "Ground Reality",
    title: "Local market knowledge before arrival",
    detail: "Local vehicles, horsemen, guides, camping charges, route risks and supply points become book chapters.",
    href: "/travel-book"
  }
] as const;

export const scarVisualizationLayers = [
  {
    label: "Hero motion",
    title: "Cinematic route-to-retreat opening",
    detail: "Video-like background movement, pulse points and shared-route overlays make the promise visible in the first viewport."
  },
  {
    label: "Classification grids",
    title: "Destination and experience taxonomy",
    detail: "A travel-site structure like major tourism boards: states, regions, road journeys, interests, articles and planning tools."
  },
  {
    label: "Book chapters",
    title: "Deep nested local pages",
    detail: "Each destination can open into transport, camping, guides, safety, costs, stays, rituals, cafes, routes and saved access."
  },
  {
    label: "Source intelligence",
    title: "Seed now, verify before publishing",
    detail: "No API is needed for the first seed stage: public URLs and field notes are stored, grouped and reviewed before becoming traveler-facing facts."
  }
] as const;

export type TravelProduct = {
  slug: string;
  title: string;
  category: "healing-trip" | "retreat" | "adventure-release" | "cultural-immersion";
  tagline: string;
  duration: string;
  region: string;
  startingPriceInr: number;
  emotionalOutcome: string;
  image: string;
  href: string;
  highlights: string[];
};

export const scarTravelProducts: TravelProduct[] = [
  {
    slug: "recreate-yourself-kullu-lahaul",
    title: "Recreate Yourself Trip",
    category: "healing-trip",
    tagline: "A shared Himalayan arrival that opens into silence, local wisdom and personal rebuilding.",
    duration: "7-9 days",
    region: "Kullu-Lahaul",
    startingPriceInr: 42000,
    emotionalOutcome: "clarity, nervous-system reset and self-return",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=85",
    href: "/trips/recreate-yourself",
    highlights: ["Silent arrival", "Monastery immersion", "Forest journaling", "Local safety book"]
  },
  {
    slug: "kullu-lahaul-mindful-retreat",
    title: "Kullu-Lahaul Mindful Retreat",
    category: "retreat",
    tagline: "Silence, spirituality and Himalayan stillness written like a living travel book.",
    duration: "9 days",
    region: "Naggar, Tandi, Udaipur",
    startingPriceInr: 52000,
    emotionalOutcome: "grounding, awe, healing and lightness",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
    href: "/states/himachal-pradesh/kullu-lahaul/mindful-retreat",
    highlights: ["Opening circle", "Sacred circuit", "Hot springs", "Joyful closure"]
  },
  {
    slug: "bir-sky-release",
    title: "Sky Release Journey",
    category: "adventure-release",
    tagline: "Adventure used as emotional release, not itinerary pressure.",
    duration: "4-5 days",
    region: "Bir-Billing",
    startingPriceInr: 26000,
    emotionalOutcome: "confidence, aliveness and routine break",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=85",
    href: "/trips/sky-release",
    highlights: ["Paragliding windows", "Monastery cafes", "Weather safety", "Shared transit"]
  },
  {
    slug: "naggar-living-heritage",
    title: "Living Heritage Reset",
    category: "cultural-immersion",
    tagline: "Move through art, temples, cedar paths and village memory at a slow human pace.",
    duration: "3-4 days",
    region: "Naggar",
    startingPriceInr: 21000,
    emotionalOutcome: "cultural depth, quiet attention and belonging",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
    href: "/trips/living-heritage",
    highlights: ["Roerich estate", "Village walk", "Cuisine session", "Quiet stay"]
  }
] as const;

export const travelAgencyPages = [
  { label: "Trips", href: "/trips", detail: "Bookable healing trips, retreats and experience-led journeys." },
  { label: "Experiences", href: "/experiences", detail: "Spiritual, cultural, adventure and rural activities." },
  { label: "Destinations", href: "/states", detail: "States, regions and route books." },
  { label: "Travel Book", href: "/travel-book", detail: "Local rules, safety, transport and ground reality." },
  { label: "About", href: "/about", detail: "SCAR philosophy and operating model." },
  { label: "Contact", href: "/contact", detail: "Inquiry, WhatsApp and operator onboarding." }
] as const;
