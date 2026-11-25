import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
  Shield,
  Search,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "./ui/button";

/* Data */
const trails = [
  {
    id: "kajulu-hills",
    title: "Kajulu Hills",
    subtitle: "Hiking Trail",
    category: "hiking",
    location: "Kajulu Hills, Kisumu",
    elevation: "1,580 m",
    difficulty: "Moderate",
    duration: "4–5 hrs",
    groupSize: "Min 10",
    price: "KES 1,000",
    priceLabel: "per person",
    rating: "4.95",
    reviews: 118,
    image: "/images/kajulu hills.JPG",
    description:
      "Trek through the scenic Kajulu Hills overlooking Kisumu city and Lake Victoria. Enjoy breathtaking panoramic views and fresh highland air.",
    highlights: [
      "Panoramic views of Lake Victoria",
      "Experienced local guide",
      "Light refreshments included",
    ],
    tag: "Popular",
  },
  {
    id: "kit-mikayi",
    title: "Kit Mikayi",
    subtitle: "Rock Adventure",
    category: "hiking",
    location: "Kisumu West",
    elevation: "1,520 m",
    difficulty: "Easy to Moderate",
    duration: "3–4 hrs",
    groupSize: "Min 14",
    price: "KES 1,800",
    priceLabel: "per person",
    rating: "4.97",
    reviews: 203,
    image: "/images/place 1.png",
    description:
      "Visit the legendary Kit Mikayi – 'Stone of the First Wife' – a giant rock formation steeped in Luo culture and folklore.",
    highlights: [
      "Cultural & historical site",
      "Local guide storytelling",
      "Family friendly",
    ],
    tag: "Cultural",
  },
  {
    id: "lake-victoria",
    title: "Lake Victoria",
    subtitle: "Boat Riding",
    category: "boat-riding",
    location: "Dunga Beach, Kisumu",
    elevation: "1,135 m",
    difficulty: "Easy",
    duration: "2–3 hrs",
    groupSize: "Min 15",
    price: "KES 1,500",
    priceLabel: "per person",
    rating: "4.98",
    reviews: 312,
    image: "/images/lake victoria.jpg",
    description:
      "Cruise the calm waters of Africa's largest lake at sunset. Spot hippos, fish eagles and enjoy the golden horizon.",
    highlights: [
      "Sunset boat cruise",
      "Life jackets provided",
      "Wildlife & bird spotting",
    ],
    tag: "Best Seller",
  },
  {
    id: "kanyimon",
    title: "Kanyimon",
    subtitle: "Sky Cycling",
    category: "sky-cycling",
    location: "Kanyimon, Kisumu",
    elevation: "1,490 m",
    difficulty: "Moderate",
    duration: "2–3 hrs",
    groupSize: "Min 10",
    price: "KES 4,000",
    priceLabel: "per person",
    rating: "4.93",
    reviews: 87,
    image: "/images/sky-cycling.JPG",
    description:
      "Defy gravity on thrilling elevated sky cycles above the treetops. An unforgettable adrenaline-packed experience.",
    highlights: [
      "Safety harness & gear provided",
      "Stunning aerial views",
      "Unique adventure activity",
    ],
    tag: "Thrill",
  },
  {
    id: "riat-hills",
    title: "Riat Hills",
    subtitle: "Camping Escape",
    category: "camping",
    location: "Riat Hills, Kisumu",
    elevation: "1,610 m",
    difficulty: "Easy",
    duration: "Overnight",
    groupSize: "Min 15",
    price: "KES 3,000",
    priceLabel: "per person",
    rating: "4.91",
    reviews: 76,
    image: "/images/camping.jpg",
    description:
      "Escape the city and camp under the stars at Riat Hills. Wake up to misty highland mornings and stunning views of Lake Victoria.",
    highlights: [
      "Bonfire & stargazing night",
      "Tents & sleeping gear included",
      "Breakfast served in the morning",
    ],
    tag: "Overnight",
  },
  {
    id: "show-ground",
    title: "Show Ground",
    subtitle: "Team Building",
    category: "team-building",
    location: "ASK Show Ground, Kisumu",
    elevation: "1,135 m",
    difficulty: "Easy",
    duration: "Full Day",
    groupSize: "Min 20",
    price: "KES 2,000",
    priceLabel: "per person",
    rating: "4.89",
    reviews: 54,
    image: "/images/team-building.jpg",
    description:
      "Strengthen team bonds through fun, structured outdoor activities. Perfect for corporate teams, schools and community groups.",
    highlights: [
      "Custom team activities",
      "Facilitator & MC included",
      "Lunch & refreshments provided",
    ],
    tag: "Groups",
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "hiking", label: "Hiking" },
  { id: "boat-riding", label: "Boat Riding" },
  { id: "sky-cycling", label: "Sky Cycling" },
  { id: "camping", label: "Camping" },
  { id: "team-building", label: "Team Building" },
];

/* Card */
function TrailCard({ trail, highlighted, onReserve }) {
  return (
    <article
      id={`trail-${trail.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 cursor-pointer
        ${highlighted
          ? "ring-2 ring-[#332d1b] shadow-xl"
          : "shadow-sm hover:shadow-xl"
        }`}
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <img
          src={trail.image}
          alt={trail.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* tag badge */}
        {trail.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-[#332d1b]/90 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {trail.tag}
          </span>
        )}

        {/* rating */}
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-[#332d1b]">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          {trail.rating}
        </span>

        {/* title over image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/70 mb-0.5">
            {trail.subtitle}
          </p>
          <h2 className="text-xl font-extrabold text-white leading-tight drop-shadow-sm">
            {trail.title}
          </h2>
        </div>

        {/* hover CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <button
            onClick={() => onReserve(trail)}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#332d1b] shadow-lg hover:bg-[#f5f1e8] transition-colors"
          >
            Reserve <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#9e9685]">
          <span className="flex items-center gap-1 text-[#635e4e]">
            <MapPin className="w-3 h-3" /> {trail.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {trail.duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" /> {trail.groupSize}
          </span>
        </div>

        {/* description */}
        <p className="text-xs text-[#635e4e] leading-relaxed line-clamp-2 flex-1">
          {trail.description}
        </p>

        {/* highlights */}
        <div className="flex flex-wrap gap-1.5">
          {trail.highlights.map((h, i) => (
            <span
              key={i}
              className="text-[10px] font-medium text-[#635e4e] bg-[#f5f1e8] border border-[#e2d9cb] px-2 py-0.5 rounded-full"
            >
              ✓ {h}
            </span>
          ))}
        </div>

        {/* footer: price + button */}
        <div className="flex items-center justify-between pt-3 border-t border-[#e2d9cb]">
          <div>
            <p className="text-[10px] text-[#9e9685]">From</p>
            <p className="text-lg font-black text-[#332d1b] leading-none">
              {trail.price}
            </p>
            <p className="text-[10px] text-[#9e9685]">{trail.priceLabel}</p>
          </div>
          <button
            onClick={() => onReserve(trail)}
            className="rounded-full bg-[#332d1b] hover:bg-[#242013] text-white px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            Reserve <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* Page */
export default function DiscoverPage({ initialTrailId, onOpenContact }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [bookedTrail, setBookedTrail] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    if (initialTrailId) {
      setHighlightedId(initialTrailId);
      setSelectedCategory("all");
      const timer = setTimeout(() => {
        const el = document.getElementById(`trail-${initialTrailId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [initialTrailId]);

  const filtered = trails.filter((t) => {
    const matchCat =
      selectedCategory === "all" || t.category === selectedCategory;
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleReserve = (trail) => {
    setBookedTrail(trail.title);
    setHighlightedId(null);
    bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      id="discover"
      className="w-full min-h-screen bg-[#f5f1e8] text-[#262216]"
    >
      {/* Hero banner */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "320px" }}
      >
        <img
          src="/images/kajulu-falls.jpg"
          alt="Kisumu landscape"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#332d1b]/70 via-[#332d1b]/50 to-[#f5f1e8]" />
        <div className="relative z-10 flex flex-col items-start justify-end h-full px-5 pb-10 pt-32 sm:px-10 md:px-16 lg:px-24 max-w-6xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
            Kisumu Explorers
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-tight text-white mb-3 drop-shadow-md">
            Upcoming Adventures
          </h1>
          <p className="max-w-lg text-sm sm:text-base text-white/85 leading-relaxed">
            Handpicked expeditions around Kisumu, from sunrise
            hikes and lake cruises to sky cycling and overnight camping escapes.
          </p>
        </div>
      </div>

      {/* Filter bar (sticky) */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#f5f1e8]/95 backdrop-blur-md border-b border-[#d6ccb9] shadow-sm">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 md:px-16 lg:px-24 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* search */}
          <div className="flex h-10 items-center gap-2 rounded-full bg-white border border-[#d6ccb9] px-3.5 shadow-sm w-full sm:w-auto sm:min-w-[220px]">
            <Search className="h-4 w-4 shrink-0 text-[#9e9685]" strokeWidth={2} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search adventures…"
              className="bg-transparent flex-1 text-xs text-[#332d1b] placeholder:text-[#9e9685] outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-[#9e9685] hover:text-[#332d1b]">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* divider */}
          <div className="hidden sm:block h-6 w-px bg-[#d6ccb9]" />

          {/* category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#332d1b] text-white shadow-sm"
                    : "bg-white text-[#635e4e] border border-[#d6ccb9] hover:border-[#332d1b] hover:text-[#332d1b]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-5 sm:px-10 md:px-16 lg:px-24 py-10">

        {/* Booking confirmation banner */}
        <div ref={bannerRef} />
        {bookedTrail && (
          <div className="mb-8 p-6 flex flex-col sm:flex-row items-center gap-4 bg-[#eae3d5] border border-[#d6ccb9] rounded-2xl animate-in slide-in-from-top-4 duration-300">
            <div className="w-12 h-12 shrink-0 rounded-full bg-[#332d1b]/10 text-[#332d1b] flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base font-bold text-[#332d1b]">Reservation Started!</h3>
              <p className="text-sm text-[#635e4e]">
                You selected <strong className="text-[#332d1b]">{bookedTrail}</strong>. Our team will reach out shortly with details.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setBookedTrail(null)}
                className="rounded-full border border-[#332d1b] text-[#332d1b] px-4 py-2 text-xs font-semibold hover:bg-[#332d1b] hover:text-white transition-colors"
              >
                View More
              </button>
              <button
                onClick={() => onOpenContact?.()}
                className="rounded-full bg-[#332d1b] text-white px-4 py-2 text-xs font-semibold hover:bg-[#242013] transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}

        {/* Result count on mobile */}
        <p className="lg:hidden text-xs text-[#9e9685] mb-5">
          {filtered.length} adventure{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Card grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trail) => (
              <TrailCard
                key={trail.id}
                trail={trail}
                highlighted={highlightedId === trail.id}
                onReserve={handleReserve}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#eae3d5]/40 border border-[#d6ccb9] px-6 py-20 text-center">
            <Search className="mx-auto mb-3 h-8 w-8 text-[#9e9685]" />
            <h3 className="font-semibold text-[#332d1b]">No adventures found</h3>
            <p className="mt-2 text-sm text-[#635e4e]">
              Try a different search or category.
            </p>
            <button
              onClick={() => { setSearch(""); setSelectedCategory("all"); }}
              className="mt-4 rounded-full border border-[#332d1b] text-[#332d1b] px-6 py-2 text-xs font-semibold hover:bg-[#332d1b] hover:text-white transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 py-6 border-t border-[#d6ccb9] text-xs text-[#9e9685]">
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#635e4e]" />
            Experienced local guides on every trip
          </span>
          <span className="hidden sm:block w-px h-4 bg-[#d6ccb9]" />
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            Rated 4.9 / 5 by our explorers
          </span>
          <span className="hidden sm:block w-px h-4 bg-[#d6ccb9]" />
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#635e4e]" />
            Free cancellation up to 48 hrs before
          </span>
        </div>
      </div>
    </div>
  );
}
