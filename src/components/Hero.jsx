
import {
  ArrowDown,
  ArrowRight,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";

import { HeroBackground } from "./HeroBackground";
import { FeatureBar } from "./FeatureBar";

const HERO_IMAGE_PATH = "/hero.png";

export function Hero({ onExploreClick, onFeatureClick }) {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[780px] min-h-screen w-full flex-col overflow-hidden bg-[#10291f] px-4 pb-6 pt-28 text-white sm:px-6 sm:pt-32 lg:px-10 lg:pb-8"
    >
      {/* Cinematic landscape */}
      <HeroBackground imageSrc={HERO_IMAGE_PATH} />

      {/* Extra atmosphere and colour grading */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#071810]/85 via-[#071810]/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#071810]/80 via-transparent to-[#071810]/30" />

      {/* Subtle editorial texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.2'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative vertical label */}
      <div className="pointer-events-none absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/65 xl:flex">
        <span className="h-px w-10 bg-white/50" />
        Out here, life feels different
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 items-center py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.09] px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-md sm:mb-9">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#c5f36a] text-[#173b25]">
              <Compass size={14} strokeWidth={2.2} />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/95 sm:text-xs">
              Your outdoors, reimagined
            </span>

            <Sparkles
              size={14}
              className="ml-1 text-[#c5f36a]"
              aria-hidden="true"
            />
          </div>

          {/* Main headline */}
          <h1 className="max-w-4xl text-[clamp(3.5rem,9vw,7.8rem)] font-semibold leading-[0.91] tracking-[-0.065em] text-white [text-wrap:balance]">
            Find your
            <br />
            <span className="font-display font-medium italic tracking-[-0.065em] text-[#c5f36a]">
              wild.
            </span>
            <span className="ml-2 inline-block text-white/80">Live</span>
            <br className="hidden sm:block" />
            <span className="font-display font-medium italic tracking-[-0.055em] text-white">
              a little more.
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="mt-7 max-w-lg text-sm leading-7 text-white/80 sm:mt-8 sm:text-base sm:leading-8 md:text-lg">
            From winding trails and quiet lakesides to breathtaking
            viewpoints, discover the kind of adventure that stays with
            you long after the journey ends.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
            <button
              type="button"
              onClick={onExploreClick}
              className="group inline-flex min-h-[56px] items-center justify-center gap-4 rounded-full bg-[#c5f36a] px-7 py-4 text-sm font-bold text-[#183320] shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:bg-[#d5ff8c] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#173b25]"
            >
              <span>Explore adventures</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#183320] text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </button>

            <a
              href="#discover"
              className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white/90 transition hover:text-[#c5f36a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5f36a]"
            >
              <MapPin size={17} className="text-[#c5f36a]" />
              Discover places
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Small brand signature */}
          <div className="mt-10 flex items-center gap-3 sm:mt-12">
            <span className="h-px w-10 bg-[#c5f36a]/80" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-xs">
              Breathe deep. Step outside. Feel alive.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col gap-5">
        <div className="flex items-center justify-between border-t border-white/20 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 sm:text-xs">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#c5f36a] shadow-[0_0_12px_#c5f36a]" />
            Made for the curious
          </span>

          <a
            href="#adventures"
            className="group flex items-center gap-2 transition hover:text-white"
          >
            Scroll to explore
            <ArrowDown
              size={14}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>

        <FeatureBar onFeatureClick={onFeatureClick} />
      </div>
    </section>
  );
}

export default Hero;
