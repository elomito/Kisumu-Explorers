import { MapPin, Headphones, ShieldCheck, BadgePercent } from "lucide-react";

export function FeatureBar({ onFeatureClick }) {
  const features = [
    {
      id: "destinations",
      title: "Handpicked",
      subtitle: "destinations",
      description:
        "Curated mountain summits, national park hidden gems, and pristine backcountry trails verified by expert local guides.",
      icon: MapPin,
    },
    {
      id: "care",
      title: "24/7 Customer",
      subtitle: "Care",
      description:
        "Dedicated wilderness travel advisors and live trail support available around the clock via satellite dispatch and phone.",
      icon: Headphones,
    },
    {
      id: "safety",
      title: "Safe & Trusted",
      subtitle: "Travels",
      description:
        "Certified Wilderness First Responders, full equipment inspection, real-time weather monitoring, and verified trail safety.",
      icon: ShieldCheck,
    },
    {
      id: "pricing",
      title: "Best Prices",
      subtitle: "Guarantee",
      description:
        "Transparent group adventure pricing with zero hidden fees, early-bird expedition discounts, and flexible cancellation policies.",
      icon: BadgePercent,
    },
  ];

  return (
    <aside
      aria-label="Traveler Guarantees"
      className="w-full max-w-5xl mx-auto rounded-2xl md:rounded-3xl bg-white/15 backdrop-blur-xl border border-white/25 px-5 py-4 md:px-8 md:py-5 shadow-2xl shadow-black/25 text-white select-none transition-all duration-300 hover:bg-white/20"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() =>
                onFeatureClick?.(
                  `${feature.title} ${feature.subtitle}`,
                  feature.description,
                )
              }
              className={`flex items-center gap-3.5 text-left group p-1.5 md:px-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded-xl transition-all duration-200 ${
                idx !== 0 ? "pt-3 md:pt-1.5" : ""
              }`}
            >
              {/* Outer Pin / Icon Capsule */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0 group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:border-cyan-300 transition-all duration-200 shadow-sm">
                <IconComponent className="w-5 h-5 stroke-[1.8] text-white group-hover:text-slate-950 transition-colors" />
              </div>

              {/* Text lines */}
              <div className="flex flex-col">
                <span className="text-xs md:text-sm font-semibold tracking-tight leading-tight text-white/95 group-hover:text-white">
                  {feature.title}
                </span>
                <span className="text-xs md:text-sm font-medium leading-tight text-white/80 group-hover:text-white/95">
                  {feature.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
