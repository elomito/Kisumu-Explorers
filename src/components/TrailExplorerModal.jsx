import { useState, useEffect } from "react";
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

export function TrailExplorerModal({ isOpen, onClose, onSelectTrail, initialTrailId }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookedTrail, setBookedTrail] = useState(null);

  // When opened with a specific trail id, scroll/highlight that trail
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    if (isOpen && initialTrailId) {
      setHighlightedId(initialTrailId);
      setSelectedCategory("all");
      setBookedTrail(null);
    } else if (!isOpen) {
      setHighlightedId(null);
      setBookedTrail(null);
    }
  }, [isOpen, initialTrailId]);

  if (!isOpen) return null;

  const trails = [
    {
      id: "kajulu-hills",
      title: "Kajulu Hills Hiking Trail",
      category: "hiking",
      location: "Kajulu Hills, Kisumu",
      elevation: "1,580 m",
      difficulty: "Moderate",
      duration: "4–5 Hours",
      groupSize: "Min 10 Explorers",
      price: "KES 1,000 / person",
      rating: "4.95",
      reviews: 118,
      description:
        "Trek through the scenic Kajulu Hills overlooking Kisumu city and Lake Victoria. Enjoy breathtaking panoramic views and fresh highland air.",
      highlights: [
        "Panoramic views of Lake Victoria",
        "Experienced local guide",
        "Light refreshments included",
      ],
    },
    {
      id: "kit-mikayi",
      title: "Kit Mikayi Rock Adventure",
      category: "hiking",
      location: "Kit Mikayi, Kisumu West",
      elevation: "1,520 m",
      difficulty: "Easy to Moderate",
      duration: "3–4 Hours",
      groupSize: "Min 14 Explorers",
      price: "KES 1,800 / person",
      rating: "4.97",
      reviews: 203,
      description:
        "Visit the legendary Kit Mikayi – 'Stone of the First Wife' – a giant rock formation steeped in Luo culture and folklore. A must-see cultural landmark.",
      highlights: [
        "Cultural & historical site",
        "Local guide storytelling",
        "Family friendly",
      ],
    },
    {
      id: "lake-victoria",
      title: "Lake Victoria Boat Riding Experience",
      category: "boat-riding",
      location: "Dunga Beach, Kisumu",
      elevation: "1,135 m",
      difficulty: "Easy",
      duration: "2–3 Hours",
      groupSize: "Min 15 Explorers",
      price: "KES 1,500 / person",
      rating: "4.98",
      reviews: 312,
      description:
        "Cruise the calm waters of Africa's largest lake at sunset. Spot hippos, fish eagles and enjoy the golden horizon over Lake Victoria.",
      highlights: [
        "Sunset boat cruise",
        "Life jackets provided",
        "Wildlife & bird spotting",
      ],
    },
    {
      id: "kanyimon",
      title: "Kanyimon Sky Cycling",
      category: "sky-cycling",
      location: "Kanyimon, Kisumu",
      elevation: "1,490 m",
      difficulty: "Moderate",
      duration: "2–3 Hours",
      groupSize: "Min 10 Explorers",
      price: "KES 4,000 / person",
      rating: "4.93",
      reviews: 87,
      description:
        "Defy gravity on thrilling elevated sky cycles above the treetops. An unforgettable adrenaline-packed experience with scenic views of the Kisumu landscape.",
      highlights: [
        "Safety harness & gear provided",
        "Stunning aerial views",
        "Unique adventure activity",
      ],
    },
    {
      id: "riat-hills",
      title: "Riat Hills Camping Escape",
      category: "camping",
      location: "Riat Hills, Kisumu",
      elevation: "1,610 m",
      difficulty: "Easy",
      duration: "Overnight (24 hrs)",
      groupSize: "Min 15 Explorers",
      price: "KES 3,000 / person",
      rating: "4.91",
      reviews: 76,
      description:
        "Escape the city and camp under the stars at Riat Hills. Wake up to misty highland mornings and stunning views of Lake Victoria and the Kisumu skyline.",
      highlights: [
        "Bonfire & stargazing night",
        "Tents & sleeping gear included",
        "Breakfast served in the morning",
      ],
    },
    {
      id: "show-ground",
      title: "Show Ground Team Building",
      category: "team-building",
      location: "ASK Show Ground, Kisumu",
      elevation: "1,135 m",
      difficulty: "Easy",
      duration: "Full Day (8 hrs)",
      groupSize: "Min 20 Participants",
      price: "KES 2,000 / person",
      rating: "4.89",
      reviews: 54,
      description:
        "Strengthen team bonds through fun, structured outdoor activities at the Kisumu Show Ground. Perfect for corporate teams, schools and community groups.",
      highlights: [
        "Custom team activities",
        "Facilitator & MC included",
        "Lunch & refreshments provided",
      ],
    },
  ];

  const filteredTrails =
    selectedCategory === "all"
      ? trails
      : trails.filter((t) => t.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#262216]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#f5f1e8] border border-[#d6ccb9] rounded-3xl shadow-2xl overflow-hidden my-8 text-[#262216]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 md:px-8 md:py-6 border-b border-[#d6ccb9] flex items-center justify-between bg-[#eae3d5]">
          <div>
            <div className="flex items-center gap-2 text-[#635e4e] text-xs font-semibold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Curated Outdoor Adventures</span>
            </div>
            <h2
              id="modal-title"
              className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#332d1b]"
            >
              Explore Handpicked Expeditions
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#d6ccb9] hover:bg-[#c4b9a4] flex items-center justify-center transition-colors text-[#635e4e] hover:text-[#332d1b] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="px-6 md:px-8 py-3 bg-[#eae3d5]/60 border-b border-[#d6ccb9] flex items-center gap-2 overflow-x-auto">
          {[
            { id: "all", label: "All Destinations" },
            { id: "hiking", label: "Hiking" },
            { id: "boat-riding", label: "Boat Riding" },
            { id: "sky-cycling", label: "Sky Cycling" },
            { id: "camping", label: "Camping" },
            { id: "team-building", label: "Team Building" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#332d1b] text-white font-semibold shadow-sm"
                  : "bg-white/70 text-[#635e4e] border border-[#d6ccb9] hover:bg-white hover:text-[#332d1b]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content list */}
        <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto space-y-5">
          {bookedTrail ? (
            <div className="p-8 text-center bg-[#eae3d5] border border-[#d6ccb9] rounded-2xl animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#332d1b]/10 text-[#332d1b] flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold text-[#332d1b] mb-2">
                Expedition Reservation Started!
              </h3>
              <p className="text-[#635e4e] text-sm max-w-md mx-auto mb-6">
                You selected{" "}
                <strong className="text-[#332d1b]">{bookedTrail}</strong>. Our
                team has reserved your exploration slot and will reach out with
                packing list details.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setBookedTrail(null)}
                  className="rounded-full text-xs border-[#332d1b] text-[#332d1b] hover:bg-[#332d1b] hover:text-white"
                >
                  View More Places
                </Button>
                <Button
                  onClick={onClose}
                  className="rounded-full text-xs bg-[#332d1b] hover:bg-[#242013] text-white"
                >
                  Close & Continue
                </Button>
              </div>
            </div>
          ) : (
            filteredTrails.map((trail) => (
              <div
                key={trail.id}
                className={`group p-5 md:p-6 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                  highlightedId === trail.id
                    ? "bg-[#ded4c3] border-[#332d1b] ring-2 ring-[#332d1b]/30"
                    : "bg-white/60 hover:bg-white border-[#d6ccb9] hover:border-[#c4b9a4]"
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#9e9685]">
                    <span className="flex items-center gap-1 text-[#635e4e] font-medium">
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
                    <span className="flex items-center gap-1 text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      {trail.rating} ({trail.reviews})
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-[#332d1b] group-hover:text-[#242013] transition-colors">
                    {trail.title}
                  </h3>

                  <p className="text-[#635e4e] text-xs md:text-sm leading-relaxed">
                    {trail.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {trail.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium text-[#635e4e] bg-[#eae3d5] border border-[#d6ccb9] px-2.5 py-1 rounded-md"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#d6ccb9] shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-[#9e9685] block">
                      Starting from
                    </span>
                    <span className="text-xl md:text-2xl font-black text-[#332d1b]">
                      {trail.price}
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      setBookedTrail(trail.title);
                      onSelectTrail?.(trail.title);
                    }}
                    className="bg-[#332d1b] hover:bg-[#242013] text-white rounded-full px-5 py-2 text-xs md:text-sm font-semibold flex items-center gap-2 shadow-sm group-hover:shadow-md"
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
        <div className="px-6 py-4 md:px-8 bg-[#eae3d5] border-t border-[#d6ccb9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9e9685]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#635e4e]" />
            <span>
              All expeditions include experienced local guides & safety briefings
            </span>
          </div>
          <button
            onClick={onClose}
            className="hover:text-[#332d1b] transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
