import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { FeatureBar } from "./FeatureBar";

const HERO_IMAGE_PATH = "/hero.png";

export function Hero({ onExploreClick, onFeatureClick }) {
  return (
    <div className="bg-[#f5f1e8]">
      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 md:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12"
      >
        <HeroBackground imageSrc={HERO_IMAGE_PATH} />

        {/* Hero copy on the left */}
        <div className="relative z-20 max-w-6xl mx-auto w-full my-auto py-8 md:py-14">
          <div className="max-w-2xl text-left space-y-6">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-white tracking-tight leading-[1.08]"
              style={{
                textShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.6)",
              }}
            >
              Discover Nature.
              <br />
              Find Your Escape.
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg text-white/95 font-normal max-w-lg leading-relaxed"
              style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}
            >
              Breathtaking places, unforgettable experiences
              <br />
              crafted just for you.
            </p>

            <div className="pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-3 px-6 md:px-7 py-3 md:py-3.5 rounded-full bg-[#332d1b] hover:bg-[#242013] active:bg-[#1a170d] text-white font-medium text-sm md:text-base shadow-lg shadow-black/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal feature bar positioned at bottom of hero */}
        <div className="relative z-20 w-full mt-auto pt-6 pb-4 flex justify-center">
          <FeatureBar onFeatureClick={onFeatureClick} />
        </div>
      </section>

      {/* Torn paper transition directly into #f5f1e8 section */}
      <div className="pointer-events-none relative z-30 -mt-[7.5vw] w-full leading-[0]">
        <img
          src="/images/torn.png"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="block h-auto w-full select-none"
        />
      </div>
    </div>
  );
}
