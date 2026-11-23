import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { FeatureBar } from "./FeatureBar";

const HERO_IMAGE_PATH = "/images/hero.png";

export function Hero({ onExploreClick, onFeatureClick }) {
  return (
    <div className="bg-[#f5f3e8]">
      <section
        id="home"
        data-nav-bg="dark"
        className="relative flex min-h-screen w-full items-center overflow-hidden px-4 pt-28 pb-24 sm:px-6 md:pt-32 md:pb-[10vw] lg:px-12"
      >
        <HeroBackground imageSrc={HERO_IMAGE_PATH} />

        {/* Row: left-aligned copy + vertical card on the right */}
        <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-10">
          {/* Copy: left aligned, nudged in with a little padding */}
          <div className="max-w-2xl space-y-6 text-left lg:pl-6 xl:pl-10">
            <h1
              className="text-5xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-9xl md:text-6xl lg:text-[70px]"
              style={{
                textShadow:
                  "0 4px 18px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(0, 0, 0, 0.8)",
              }}
            >
              Discover Nature.
              <br />
              Find Your Escape.
            </h1>

            <p
              className="max-w-xl text-base font-normal leading-relaxed text-white/95 sm:text-lg md:text-xl"
              style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.7)" }}
            >
              Breathtaking places, unforgettable experiences
              <br />
              crafted just for you.
            </p>

            <div className="pt-2">
              <button
  onClick={onExploreClick}
  className="inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#332d1b] px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-black/40 transition-all duration-200 hover:scale-[1.02] hover:bg-[#242013] hover:shadow-black/60 active:scale-[0.98] active:bg-[#1a170d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:px-8 md:py-4 md:text-lg"
>
  <span>Explore Now</span>
  <ArrowRight className="h-5 w-5 stroke-[2.5]" />
</button>
            </div>
          </div>

          {/* Desktop: vertical feature card on the right */}
          <div className="hidden shrink-0 lg:block">
            <FeatureBar onFeatureClick={onFeatureClick} layout="vertical" />
          </div>
        </div>

        {/* Mobile / tablet: card under the copy */}
        <div className="absolute inset-x-4 bottom-6 z-40 sm:inset-x-6 lg:hidden">
          <FeatureBar onFeatureClick={onFeatureClick} layout="grid" />
        </div>
      </section>

      {/* Torn edge */}
      <div className="pointer-events-none relative z-30 -mt-[8vw] w-full leading-[0]">
        <img
          src="/images/torn-edge-beige.svg"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="block h-auto w-full select-none"
        />
      </div>
    </div>
  );
}