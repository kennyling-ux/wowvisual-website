/**
 * Portfolio items (§7.3). Seeded from the public YouTube channel
 * (youtube.com/@wowvisualofficial, Oct 2026): IDs and titles are real.
 *
 * [CONFIRM] category for every item (inferred from the video title),
 * [CONFIRM] client names (left empty rather than guessed — the card hides an empty client),
 * [CONFIRM] which 6 to feature on the home page, and English titles where wanted.
 *
 * To add a video: copy a line, paste the YouTube ID (the part after "v=" or
 * "youtu.be/"), set title / category, and `featured: true` to show it on home.
 */

export const categories = ["Commercial", "Corporate", "Event", "Social", "Motion"] as const;
export type Category = (typeof categories)[number];

export type WorkItem = {
  slug: string;
  title: string;
  client: string;
  category: Category;
  youtubeId: string;
  year?: number;
  featured?: boolean; // shows on home
  thumbnail?: string; // optional custom thumbnail in /public/work
};

export const work: WorkItem[] = [
  {
    slug: "xxell-corporate-video",
    title: "Xxell Corporate Video",
    client: "",
    category: "Corporate",
    youtubeId: "eLljJlXoEis",
    featured: true,
  },
  {
    slug: "aquila-award-night-2026",
    title: "Aquila Award Night 2026",
    client: "",
    category: "Event",
    youtubeId: "VQY-Bkm3nSE",
    year: 2026,
    featured: true,
  },
  {
    slug: "xiang-ge-steamed-rice",
    title: "祥哥干蒸饭",
    client: "",
    category: "Commercial",
    youtubeId: "f8CiYaB2Hds",
    featured: true,
  },
  {
    slug: "abs-x-strategic",
    title: "ABS x STRATEGIC",
    client: "",
    category: "Corporate",
    youtubeId: "2bkhO-uLXTc",
    featured: true,
  },
  {
    slug: "bryan-30sec",
    title: "Bryan 30sec",
    client: "",
    category: "Social",
    youtubeId: "bUChY8Wv6y4",
    featured: true,
  },
  {
    slug: "apple-annual-dinner-2026",
    title: "Apple Annual Dinner 2026",
    client: "",
    category: "Event",
    youtubeId: "1Hj1a5Ht-Ns",
    year: 2026,
    featured: true,
  },
  {
    slug: "jiangsu-tourism-promo",
    title: "江苏文旅推广",
    client: "",
    category: "Commercial",
    youtubeId: "7RQYE4-G4NA",
  },
  {
    slug: "apple-touch-chengdu",
    title: "Apple Touch@Chengdu 4D3N",
    client: "",
    category: "Social",
    youtubeId: "s2hef-bCteA",
  },
  {
    slug: "apple-2026-xiang-lu",
    title: "Apple 2026想旅",
    client: "",
    category: "Commercial",
    youtubeId: "JelKR6v1gds",
    year: 2026,
  },
  {
    slug: "dhl-event-2026",
    title: "DHL Event 2026",
    client: "",
    category: "Event",
    youtubeId: "M0-OHeIOVcU",
    year: 2026,
  },
  {
    slug: "2606-business-school",
    title: "2606出海商学院",
    client: "",
    category: "Corporate",
    youtubeId: "KVhPVFlqm2U",
  },
  {
    slug: "ace-ascend-academy",
    title: "ACE Ascend Academy",
    client: "",
    category: "Corporate",
    youtubeId: "doAhA3Ys6x8",
  },
  {
    slug: "kingsbee-sport-day",
    title: "Kingsbee Sport Day",
    client: "",
    category: "Event",
    youtubeId: "o7Na8Xala-4",
  },
  {
    slug: "apple-company-trip-2026",
    title: "Apple Company Trip 2026",
    client: "",
    category: "Event",
    youtubeId: "cakYqGPBBiU",
    year: 2026,
  },
  {
    slug: "rachel-neo-supremacy-2026",
    title: "Rachel Neo Supremacy 2026",
    client: "",
    category: "Event",
    youtubeId: "c6Plte9EpEE",
    year: 2026,
  },
  {
    slug: "fbs-realty-annual-dinner-2026",
    title: "FBS Realty Annual Dinner 2026",
    client: "",
    category: "Event",
    youtubeId: "Ksx4RypPAkU",
    year: 2026,
  },
  {
    slug: "diamond-point-team-building",
    title: "Diamond Point Team Building",
    client: "",
    category: "Event",
    youtubeId: "POAShyfQrDw",
  },
  {
    slug: "rcbb-installation-night",
    title: "RCBB Installation Night",
    client: "",
    category: "Event",
    youtubeId: "Uj9lg_byuFQ",
  },
  {
    slug: "rskl-sport-day-2026",
    title: "RSKL Sport Day 2026",
    client: "",
    category: "Event",
    youtubeId: "j4Y6clUe5WE",
    year: 2026,
  },
  {
    slug: "guan-gong-dinner-2026",
    title: "关公晚宴2026",
    client: "",
    category: "Event",
    youtubeId: "xNxq1MOvsjg",
    year: 2026,
  },
  {
    slug: "amateur-club-dinner-2026",
    title: "业余俱乐部晚宴2026",
    client: "",
    category: "Event",
    youtubeId: "B0C7ax9nqvk",
    year: 2026,
  },
  {
    slug: "benson-summer",
    title: "Benson & Summer",
    client: "",
    category: "Event",
    youtubeId: "2KEeV7dWeMA",
  },
  {
    slug: "mitm-travel-fair-2024",
    title: "MITM 旅游展2024",
    client: "",
    category: "Event",
    youtubeId: "vHaRwWDsy48",
    year: 2024,
  },
  {
    slug: "mid-autumn",
    title: "中秋节 圆 忆",
    client: "",
    category: "Social",
    youtubeId: "qTOv32yQo4A",
  },
];

export const featuredWork = work.filter((w) => w.featured);

/** Categories that actually have work, in canonical order (drives the filter chips). */
export const usedCategories = categories.filter((c) => work.some((w) => w.category === c));

export const workCopy = {
  home: {
    eyebrow: "Selected work",
    title: "Featured productions",
    viewAll: "View all work",
  },
  page: {
    title: "Our work",
    intro:
      "Commercials, corporate films, events and social content — a selection of recent productions. Tap any film to watch.", // [CONFIRM]
    all: "All",
    filterLabel: "Filter by category",
    empty: "No films in this category yet.",
  },
  card: { play: "Play", watch: "Watch" },
  modal: { close: "Close video", loading: "Loading video" },
};
