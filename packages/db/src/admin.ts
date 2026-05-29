import { himachalTravelState, localMarketMatrix, scarTravelProducts } from "@scar/domain";

export type TravelProductView = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  duration: string;
  region: string;
  startingPriceInr: number;
  emotionalOutcome: string;
  image: string;
  href: string;
  highlights: string[];
};

export type PublicRegion = {
  id?: string;
  slug: string;
  name: string;
  title: string;
  summary: string;
  bestSeason?: string | null;
  howToReach?: string | null;
  routeReality?: string | null;
  tourismCategories: string[];
};

export type PublicTravelBookChapter = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  status: string;
  regionSlug: string;
  regionName: string;
};

export type PublicGroundRule = {
  id: string;
  ruleType: string;
  title: string;
  zone: string;
  statusLabel: string;
  summary: string;
  cost?: string | null;
  timing?: string | null;
  verificationStatus: string;
  publishStatus: string;
  regionSlug: string;
  regionName: string;
};

export type PublicMediaAsset = {
  id: string;
  url: string;
  mediaType: string;
  alt?: string | null;
  caption?: string | null;
  tags: string[];
};

export type PublicPlace = {
  id: string;
  slug: string;
  name: string;
  placeType: string;
  summary: string;
  latitude?: number | null;
  longitude?: number | null;
  status: string;
  regionSlug: string;
  regionName: string;
  mediaAssets: PublicMediaAsset[];
};

export type PublicRouteStop = {
  id: string;
  sequence: number;
  label: string;
  notes?: string | null;
};

export type PublicTravelRoute = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: string;
  regionSlug: string;
  regionName: string;
  stops: PublicRouteStop[];
};

export type PublicTripSummary = TravelProductView & {
  status?: string;
};

export type PublicRegionDetails = PublicRegion & {
  stateName: string;
  places: PublicPlace[];
  routes: PublicTravelRoute[];
  chapters: PublicTravelBookChapter[];
  groundRules: PublicGroundRule[];
  mediaAssets: PublicMediaAsset[];
  travelProducts: PublicTripSummary[];
};

export type PublicStateBook = {
  slug: string;
  name: string;
  framing: string;
  regions: PublicRegion[];
};

export type PublicTripProductDetail = TravelProductView & {
  status: string;
  itineraryDays: Array<{
    dayNumber: number;
    title: string;
    route: string;
    experience: string;
    focus: string;
    highlights: string[];
  }>;
  serviceItems: Array<{
    label: string;
    title: string;
    body: string;
  }>;
  mediaAssets: PublicMediaAsset[];
};

export type HomepageSettings = {
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroImageUrl: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type AdminDashboardData = { counts: Record<string, number> };
export type AdminSourceRecord = Record<string, unknown>;
export type AdminTripProduct = PublicTripProductDetail;
export type AdminRegionRecord = PublicRegion & { id: string; status: string; updatedAt: Date; chapterCount: number; ruleCount: number };
export type AdminBookingInquiry = Record<string, unknown>;
export type AdminMediaAsset = PublicMediaAsset;
export type AdminTravelBookChapter = PublicTravelBookChapter & { updatedAt: Date };
export type AdminGroundRule = PublicGroundRule & { updatedAt: Date };
export type AdminStateBook = { id: string; slug: string; name: string; framing: string; status: string; updatedAt: Date };
export type AdminPlaceRecord = PublicPlace & { updatedAt: Date };
export type AdminTravelRouteRecord = PublicTravelRoute & { updatedAt: Date };
export type AdminOperatorRecord = Record<string, unknown>;
export type AdminVehicleRecord = Record<string, unknown>;
export type AdminLocalAssetRecord = Record<string, unknown>;
export type AdminAvailabilityRecord = Record<string, unknown>;
export type AdminAuditRecord = Record<string, unknown>;

const regionSlug = "kullu-lahaul";
const regionName = "Kullu-Lahaul";

const homepage: HomepageSettings = {
  heroEyebrow: "SCAR Travel Architecture",
  heroTitle: "Scars to Remove, Recreate the World.",
  heroBody:
    "A living travel book where shared departures, local ground reality, cinematic destination previews and personal customization work as one journey system.",
  heroImageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85",
  primaryCtaLabel: "Plan my trip",
  primaryCtaHref: "/customer",
  secondaryCtaLabel: "Explore travel book",
  secondaryCtaHref: "/travel-book"
};

const mediaAssets: PublicMediaAsset[] = [
  {
    id: "demo-media-hero",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
    mediaType: "image",
    alt: "Himalayan mountain valley",
    caption: "Demo destination visual",
    tags: ["mountain", "travel-book", "demo"]
  }
];

const publishedRegions: PublicRegion[] = himachalTravelState.regions.map((region) => ({
  id: `demo-region-${region.slug}`,
  slug: region.slug,
  name: region.name,
  title: region.title,
  summary: region.description,
  bestSeason: "March to June, September to November",
  howToReach: "Shared road departure to the valley hub, then local movement by chapter.",
  routeReality: "Mountain weather, guide rules and local transport handoffs are visible before planning.",
  tourismCategories: region.focus
}));

function marketRuleToGroundRule(item: {
  title: string;
  zone: string;
  status: string;
  summary: string;
  cost?: string;
  timing?: string;
  sourceType: string;
}, index: number): PublicGroundRule {
  return {
    id: `demo-rule-${index + 1}`,
    ruleType: item.sourceType.toUpperCase().replaceAll(" ", "_"),
    title: item.title,
    zone: item.zone,
    statusLabel: item.status,
    summary: item.summary,
    cost: item.cost ?? null,
    timing: item.timing ?? null,
    verificationStatus: "Demo",
    publishStatus: "Published",
    regionSlug,
    regionName
  };
}

const groundRules: PublicGroundRule[] = [
  ...localMarketMatrix.localTransportRules,
  ...localMarketMatrix.selfDriveRestrictions,
  ...localMarketMatrix.horsemanOptions,
  ...localMarketMatrix.trekkingGuideRequirements,
  ...localMarketMatrix.campingRules,
  ...localMarketMatrix.campingSupplyPoints,
  ...localMarketMatrix.localCharges,
  ...localMarketMatrix.allowedZones,
  ...localMarketMatrix.dangerZones
].map(marketRuleToGroundRule);

const places: PublicPlace[] = [
  {
    id: "demo-place-naggar",
    slug: "naggar",
    name: "Naggar Heritage Base",
    placeType: "retreat-village",
    summary: "A soft arrival base for village walks, art estate routes, temples and quiet stays.",
    latitude: 32.11,
    longitude: 77.16,
    status: "Published",
    regionSlug,
    regionName,
    mediaAssets
  },
  {
    id: "demo-place-lahaul",
    slug: "lahaul-sky-belt",
    name: "Lahaul Sky Belt",
    placeType: "high-mountain-zone",
    summary: "Open-sky travel chapters for stillness, monastery visits, local vehicles and weather-aware planning.",
    latitude: 32.58,
    longitude: 77.03,
    status: "Published",
    regionSlug,
    regionName,
    mediaAssets
  }
];

const routes: PublicTravelRoute[] = [
  {
    id: "demo-route-shared-arrival",
    slug: "shared-arrival",
    title: "Delhi / Chandigarh to Kullu-Manali",
    summary: "Shared departure reaches the hub, then each traveler moves into their selected local chapter.",
    status: "Published",
    regionSlug,
    regionName,
    stops: ["Delhi", "Chandigarh", "Mandi", "Manali hub"].map((label, index) => ({
      id: `demo-stop-${index + 1}`,
      sequence: index + 1,
      label,
      notes: index === 3 ? "Personal routes begin here." : "Shared movement."
    }))
  }
];

const chapters: PublicTravelBookChapter[] = [
  {
    id: "demo-chapter-ground",
    slug: "ground-reality",
    title: "Ground Reality Before Movement",
    summary: "Transport limits, guide needs, camping rules and charges are surfaced before arrival.",
    body: "This public demo uses representative content only. Production records and internal data are not published.",
    status: "Published",
    regionSlug,
    regionName
  }
];

function toProductDetail(product: TravelProductView): PublicTripProductDetail {
  return {
    ...product,
    status: "Published",
    itineraryDays: [
      {
        dayNumber: 1,
        title: "Shared arrival and soft landing",
        route: "Delhi / Chandigarh to Kullu-Manali hub",
        experience: "Travelers arrive together and shift into a slower rhythm before personal chapters begin.",
        focus: "Arrival",
        highlights: ["Shared departure", "Mountain entry", "Welcome check-in"]
      },
      {
        dayNumber: 2,
        title: "Personal travel-book chapter",
        route: product.region,
        experience: product.tagline,
        focus: product.emotionalOutcome,
        highlights: product.highlights
      }
    ],
    serviceItems: [
      { label: "INCLUSION", title: "Shared route planning", body: "Demo itinerary planning, visible route stages and public-safe travel-book content." },
      { label: "EXCLUSION", title: "Production operations", body: "Private records, internal ledgers and secure data are intentionally excluded from this public showcase." }
    ],
    mediaAssets
  };
}

const productDetails = scarTravelProducts.map((product) => toProductDetail(product));

const regionDetails: PublicRegionDetails = {
  ...publishedRegions[0],
  stateName: himachalTravelState.name,
  places,
  routes,
  chapters,
  groundRules,
  mediaAssets,
  travelProducts: scarTravelProducts.map((product) => ({ ...product, status: "Published" }))
};

export async function getHomepageSettings(): Promise<HomepageSettings> {
  return homepage;
}

export async function getPublishedRegions(): Promise<PublicRegion[]> {
  return publishedRegions;
}

export async function getPublishedStateBook(slug = "himachal-pradesh"): Promise<PublicStateBook | null> {
  if (slug !== "himachal-pradesh") {
    return null;
  }

  return {
    slug: himachalTravelState.slug,
    name: himachalTravelState.name,
    framing: himachalTravelState.framing,
    regions: publishedRegions
  };
}

export async function getPublishedRegionBySlug(slug: string): Promise<PublicRegionDetails | null> {
  return slug === regionSlug ? regionDetails : null;
}

export async function getPublishedTripProducts(): Promise<TravelProductView[]> {
  return [...scarTravelProducts];
}

export async function getPublishedTripProductBySlug(slug: string): Promise<PublicTripProductDetail | null> {
  const aliases: Record<string, string> = {
    "recreate-yourself": "recreate-yourself-kullu-lahaul",
    "sky-release": "bir-sky-release",
    "living-heritage": "naggar-living-heritage"
  };
  const normalized = aliases[slug] ?? slug;

  return productDetails.find((product) => product.slug === normalized) ?? null;
}

export async function getPublishedGroundRulesByRegionSlug(slug: string, ruleTypes?: string[]): Promise<PublicGroundRule[]> {
  if (slug !== regionSlug) {
    return [];
  }

  if (!ruleTypes?.length) {
    return groundRules;
  }

  return groundRules.filter((rule) => ruleTypes.includes(rule.ruleType));
}

export async function getPublishedTravelBookData(): Promise<PublicRegionDetails[]> {
  return [regionDetails];
}

export async function getPublishedTravelBookChapter(slug: string): Promise<PublicTravelBookChapter | null> {
  return chapters.find((chapter) => chapter.slug === slug) ?? null;
}

export async function getPublicSourceRecords() {
  return [
    {
      placeSlug: "himachal-pradesh/kullu-lahaul",
      sourceKind: "public demo",
      sourceName: "Sanitized travel-book sample",
      url: "https://himachaltourism.gov.in/",
      title: "Public destination baseline",
      summary: "Representative public-safe source context for the showcase build.",
      trustLevel: "demo",
      seedMode: "manual-demo"
    }
  ];
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  return { counts: {} };
}

export async function getAdminStateBook(): Promise<AdminStateBook | null> {
  return null;
}

export async function getAdminRegions(): Promise<AdminRegionRecord[]> {
  return [];
}

export async function getAdminPlaces(): Promise<AdminPlaceRecord[]> {
  return [];
}

export async function getAdminTravelRoutes(): Promise<AdminTravelRouteRecord[]> {
  return [];
}

export async function getAdminTravelBookChapters(): Promise<AdminTravelBookChapter[]> {
  return [];
}

export async function getAdminGroundRules(): Promise<AdminGroundRule[]> {
  return [];
}

export async function getAdminSourceRecords(): Promise<AdminSourceRecord[]> {
  return [];
}

export async function getAdminTripProducts(): Promise<AdminTripProduct[]> {
  return productDetails;
}

export async function getAdminBookingInquiries(): Promise<AdminBookingInquiry[]> {
  return [];
}

export async function getAdminMediaAssets(): Promise<AdminMediaAsset[]> {
  return [];
}

export async function getAdminOperators(): Promise<AdminOperatorRecord[]> {
  return [];
}

export async function getAdminVehicles(): Promise<AdminVehicleRecord[]> {
  return [];
}

export async function getAdminLocalAssets(): Promise<AdminLocalAssetRecord[]> {
  return [];
}

export async function getAdminAvailabilityWindows(): Promise<AdminAvailabilityRecord[]> {
  return [];
}

export async function getAdminAuditLogs(): Promise<AdminAuditRecord[]> {
  return [];
}
