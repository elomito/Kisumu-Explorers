import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { FeatureBar } from "./FeatureBar";

const HERO_IMAGE_PATH = "/hero.png";

export function Hero({ onExploreClick, onFeatureClick }) {
  return (
    <div className="bg-white">
      <section
        id="home"
        className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 lg:px-12"
      >
        <HeroBackground imageSrc={HERO_IMAGE_PATH} />

        {/* Hero row: copy on the left, feature card on the right */}
        <div className="relative z-20 max-w-6xl mx-auto w-full my-auto py-12 md:py-16 flex items-center justify-between gap-10">
          <div className="max-w-2xl text-left space-y-6">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-black text-white tracking-tight leading-[1.06]"
              style={{
                textShadow:
                  "0 4px 18px rgba(59, 57, 57, 0.65), 0 2px 6px rgba(66, 65, 65, 0.8)",
              }}
            >
              Discover Nature.
              <br />
              Find Your Escape.
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl text-white/95 font-normal max-w-xl leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)" }}
            >
              Breathtaking places, unforgettable experiences
              <br />
              crafted just for you.
            </p>

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

          {/* Desktop: vertical feature card on the right */}
          <div className="hidden lg:block shrink-0">
            <FeatureBar onFeatureClick={onFeatureClick} />
          </div>
        </div>

        {/* Mobile / tablet: card sits below the copy */}
        <div className="relative z-40 w-full mt-4 flex justify-center lg:hidden">
          <FeatureBar onFeatureClick={onFeatureClick} />
        </div>
      </section>

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