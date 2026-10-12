import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { FeatureBar } from "./FeatureBar";

// Placeholder path to your hero image. Replace this with your image path (e.g., '/IMG_3641 1.png', '/hero.png')
const HERO_IMAGE_PATH = "/hero.png";

export function Hero({ onExploreClick, onFeatureClick }) {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 lg:px-12"
    >
      {/* Background Image Placeholder */}
      <HeroBackground imageSrc={HERO_IMAGE_PATH} />

      {/* Main Hero Copy - Aligned Left as in Design */}
      <div className="relative z-20 max-w-6xl mx-auto w-full my-auto py-12 md:py-16">
        <div className="max-w-2xl text-left space-y-6">
          {/* Main Display Headline */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-extrabold text-white tracking-tight leading-[1.06]"
            style={{
              textShadow:
                "0 4px 18px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(0, 0, 0, 0.8)",
            }}
          >
            Discover Nature.
            <br />
            Find Your Escape.
          </h1>

          {/* Subtitle */}
          <p
            className="text-base sm:text-lg md:text-xl text-white/95 font-normal max-w-xl leading-relaxed"
            style={{
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            Breathtaking places, unforgettable experiences
            <br />
            crafted just for you.
          </p>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-3 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-[#034d44] hover:bg-[#046156] active:bg-[#023b34] text-white font-semibold text-base md:text-lg shadow-xl shadow-teal-950/40 hover:shadow-teal-900/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <span>Explore Now</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Floating Feature Bar from the Design */}
      <div className="relative z-20 w-full mt-auto pt-6">
        <FeatureBar onFeatureClick={onFeatureClick} />
      </div>
    </section>
  );
}
