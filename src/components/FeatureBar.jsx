import { MapPin, Headphones, ShieldCheck, BadgePercent } from "lucide-react";

// TODO: edit every line below so it matches what Kisumu Explorers really offers.
const features = [
  {
    id: "destinations",
    title: "Handpicked",
    subtitle: "destinations",
    icon: MapPin,
    headline: "Places we've actually been to",
    description:
      "Every spot on our list has been visited and checked by our team, so you get the best of Kisumu and the lakeshore, not just what shows up first online.",
    bullets: [
      "Lakeside: Dunga Beach, Hippo Point, sunset boat rides on Lake Victoria",
      "Wildlife & nature: Kisumu Impala Sanctuary, Ndere Island",
      "Culture & heritage: Kit Mikayi, Kisumu Museum, local fishing communities",
    ],
    cta: { label: "See destinations", href: "#discover" },
  },
  {
    id: "care",
    title: "24/7 Customer",
    subtitle: "Care",
    icon: Headphones,
    headline: "A real person, when you need one",
    description:
      "Questions before your trip or help during it: message us and a member of our team replies.",
    bullets: [
      "WhatsApp and phone line shown on every booking",
      "Replies within [X] hours (set your real response time)",
      "Help with changes, pickups and last-minute questions",
    ],
    cta: { label: "Chat on WhatsApp", href: "https://wa.me/254XXXXXXXXX" },
  },
  {
    id: "safety",
    title: "Safe & Trusted",
    subtitle: "Travels",
    icon: ShieldCheck,
    headline: "Your safety comes first",
    description:
      "Local guides who know the area, clear briefings, and basic safety gear on every outing.",
    bullets: [
      "Experienced local guides on every trip",
      "Life jackets provided on all boat activities",
      "First-aid kit carried and a briefing before you set off",
    ],
    cta: { label: "How we keep you safe", href: "#about" },
  },
  {
    id: "pricing",
    title: "Best Prices",
    subtitle: "Guarantee",
    icon: BadgePercent,
    headline: "Clear prices, no surprises",
    description:
      "You see the full price before you book. What we quote is what you pay.",
    bullets: [
      "No hidden fees: transport, entry and guide costs listed upfront",
      "Group and returning-traveler discounts",
      "Pay with M-Pesa, with flexible rescheduling",
    ],
    cta: { label: "Get a quote", href: "#contact" },
  },
];

export function FeatureBar({ onFeatureClick }) {
  return (
    <aside
      aria-label="Traveler Guarantees"
      className="w-full max-w-[16rem] rounded-2xl md:rounded-3xl bg-white/15 backdrop-blur-xl border border-white/25 px-4 py-3 md:px-5 md:py-4 shadow-2xl shadow-black/25 text-white select-none transition-all duration-300 hover:bg-white/20"
    >
      <div className="flex flex-col divide-y divide-white/15">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() =>
                onFeatureClick?.(
                  `${feature.title} ${feature.subtitle}`,
                  feature.description,
                  feature,
                )
              }
              className="flex items-center gap-3.5 text-left group w-full py-3.5 first:pt-1.5 last:pb-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 rounded-xl transition-all duration-200"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0 group-hover:bg-cyan-400 group-hover:border-cyan-300 transition-all duration-200 shadow-sm">
                <IconComponent className="w-5 h-5 stroke-[1.8] text-white group-hover:text-slate-950 transition-colors" />
              </div>

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