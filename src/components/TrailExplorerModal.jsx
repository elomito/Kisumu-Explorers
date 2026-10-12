import { useState } from "react";
import {
  X,
  MapPin,
  Clock,
  Users,
  Star,
  ArrowRight,
  Check,
  Shield,
  Compass,
} from "lucide-react";
import { Button } from "./ui/button";

export function TrailExplorerModal({ isOpen, onClose, onSelectTrail }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookedTrail, setBookedTrail] = useState(null);

  if (!isOpen) return null;

  const trails = [
    {
      id: "granite-ridge",
      title: "Granite Ridge Summit Expedition",
      category: "summit",
      location: "Mt. Ololosok Pinnacle",
      elevation: "2,840 m",
      difficulty: "Moderate to Challenging",
      duration: "6–8 Hours",
      groupSize: "Max 8 Explorers",
      price: "$89 / person",
      rating: "4.98",
      reviews: 142,
      description:
        "The iconic granite outcrop hike featured on traveler.com. Spectacular panoramic views, weathered rock boulders, and guided summit celebration.",
      highlights: [
        "Rock scrambles with safety gear",
        "Pack lunch & hydration included",
        "Certified mountain guide",
      ],
    },
    {
      id: "alpine-crest",
      title: "High Alpine Sky Walk & Ridge Trek",
      category: "summit",
      location: "Grand Escarpment Range",
      elevation: "3,120 m",
      difficulty: "Challenging",
      duration: "Full Day (10 hrs)",
      groupSize: "Max 6 Explorers",
      price: "$125 / person",
      rating: "4.95",
      reviews: 98,
      description:
        "A high-altitude trail over jagged ridge lines with cloud inversions and breathtaking 360-degree horizon views.",
      highlights: [
        "Alpine sunrise start",
        "Satellite SOS tracking",
        "Professional photo package",
      ],
    },
    {
      id: "emerald-valley",
      title: "Emerald Gorge & Waterfall Valley",
      category: "forest",
      location: "Cascading River Canyon",
      elevation: "1,450 m",
      difficulty: "Easy to Moderate",
      duration: "4 Hours",
      groupSize: "Max 12 Explorers",
      price: "$65 / person",
      rating: "4.92",
      reviews: 210,
      description:
        "Gentle trail through ancient temperate rainforest leading to crystal-clear natural mountain dipping pools.",
      highlights: [
        "Waterfall swim stop",
        "Wildlife spotting guide",
        "Family friendly",
      ],
    },
    {
      id: "coastal-cliffs",
      title: "Wild Coast Headland & Sea Caves",
      category: "coastal",
      location: "Pacific Rim Headlands",
      elevation: "420 m",
      difficulty: "Moderate",
      duration: "5 Hours",
      groupSize: "Max 10 Explorers",
      price: "$79 / person",
      rating: "4.96",
      reviews: 167,
      description:
        "Traverse sea bluffs, coastal tide pools, and dramatic ocean spray overlooks with marine life spotting.",
      highlights: [
        "Tide pool exploration",
        "Sunset vista cliff lookout",
        "Binoculars provided",
      ],
    },
  ];

  const filteredTrails =
    selectedCategory === "all"
      ? trails
      : trails.filter((t) => t.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden my-8 text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-white/10 flex items-center justify-between bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Curated Outdoor Adventures</span>
            </div>
            <h2
              id="modal-title"
              className="text-2xl md:text-3xl font-bold tracking-tight text-white"
            >
              Explore Handpicked Expeditions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white/80 hover:text-white cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="px-6 md:px-8 py-3 bg-slate-900/60 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          {[
            { id: "all", label: "All Destinations" },
            { id: "summit", label: "Summit & Peaks" },
            { id: "forest", label: "Forest & Waterfalls" },
            { id: "coastal", label: "Coastal Overlooks" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                  : "bg-white/10 text-white/80 hover:bg-white/15 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content list */}
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto space-y-5">
          {bookedTrail ? (
            <div className="p-8 text-center bg-teal-950/40 border border-teal-500/30 rounded-2xl animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Expedition Reservation Started!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto mb-6">
                You selected{" "}
                <strong className="text-teal-300">{bookedTrail}</strong>. Our
                wilderness travel advisor has reserved your exploration slot and
                will reach out with packing list details.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setBookedTrail(null)}
                  className="rounded-full text-xs"
                >
                  View More Hikes
                </Button>
                <Button
                  variant="default"
                  onClick={onClose}
                  className="rounded-full text-xs"
                >
                  Close & Continue
                </Button>
              </div>
            </div>
          ) : (
            filteredTrails.map((trail) => (
              <div
                key={trail.id}
                className="group p-5 md:p-6 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 hover:border-cyan-400/50 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-cyan-300 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {trail.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {trail.duration}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {trail.groupSize}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      {trail.rating} ({trail.reviews})
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {trail.title}
                  </h3>

                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                    {trail.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {trail.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-slate-400 block">
                      Starting from
                    </span>
                    <span className="text-xl md:text-2xl font-black text-white">
                      {trail.price}
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      setBookedTrail(trail.title);
                      onSelectTrail?.(trail.title);
                    }}
                    className="bg-[#034d44] hover:bg-[#046156] text-white rounded-full px-5 py-2 text-xs md:text-sm font-semibold flex items-center gap-2 group-hover:shadow-lg group-hover:shadow-teal-950/40"
                  >
                    <span>Reserve Hike</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 md:px-8 bg-slate-950/70 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>
              All expeditions include verified mountain guides & satellite
              tracking
            </span>
          </div>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
