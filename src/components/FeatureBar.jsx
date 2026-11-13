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
      className="w-full max-w-4xl mx-auto rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 px-4 py-3 sm:px-6 sm:py-3.5 shadow-2xl shadow-black/20 text-white select-none transition-all duration-300"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <button
              key={feature.id}
              type="button"
              onClick={() =>
                onFeatureClick?.(
                  `${feature.title} ${feature.subtitle}`,
                  feature.description
                )
              }
              className={`flex items-center gap-3 text-left group w-full py-2.5 px-3 sm:px-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded-xl transition-all duration-200 hover:bg-white/10 ${
                idx % 2 === 1 ? "pl-4" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <IconComponent className="w-4 h-4 stroke-[2] text-white" />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-[13px] font-semibold tracking-tight leading-tight text-white/95">
                  {feature.title}
                </span>
                <span className="text-[11px] sm:text-xs font-normal leading-tight text-white/80">
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
