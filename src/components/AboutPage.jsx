import { ArrowRight, MapPin, DoorOpen, Users } from "lucide-react";
import { Button } from "./ui/button";

export default function AboutPage({ onNavigate, onOpenExplore, onOpenContact }) {
  return (
    <div className="bg-[#f5f1e8] text-[#262216] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[700px] w-full flex flex-col justify-between overflow-hidden pt-28 md:pt-36 pb-12 px-4 sm:px-6 lg:px-12 bg-slate-900">
        {/* Background photo */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/about-hero.png"
            alt="Explorers group at Kit Mikayi rock"
            className="w-full h-full object-cover object-top brightness-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto w-full my-auto py-10 md:py-16">
          <div className="max-w-2xl text-left space-y-5">
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.06]"
              style={{
                textShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.7)",
              }}
            >
              About Us
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg text-white/95 font-normal max-w-xl leading-relaxed"
              style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)" }}
            >
              We're a community of curious people finding peace in the
              outdoors. From fresh air walks to making memories, and stories
              worth sharing.
            </p>

            <div className="pt-3">
              <a
                href="#world-built"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#332d1b] font-semibold text-xs sm:text-sm shadow-lg hover:bg-white/90 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>Tell me more</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom space */}
        <div className="relative z-20" />
      </section>

      {/* Torn paper transition directly into #f5f1e8 */}
      <div className="pointer-events-none relative z-30 -mt-[7.5vw] w-full leading-[0]">
        <img
          src="/images/torn.png"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="block h-auto w-full select-none"
        />
      </div>

      {/* 2. A world built for curious explorers */}
      <section id="world-built" className="relative px-6 py-14 sm:px-10 lg:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-6 max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-[1.1] tracking-tight text-[#332d1b]">
              A world built for
              <br />
              curious explorers.
            </h2>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#332d1b] mb-2">
                The world is much bigger outside
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#635e4e]">
                A lot of us find ourselves indoors, stuck behind screens and
                trapped inside our routine. We believe that stepping outdoors
                and into nature brings a sense of wonder, connection with
                others, and joy in real life.
              </p>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[#635e4e]">
              Started in Kisumu and fed by curiosity, we make space for
              everyone to step into nature and enjoy the scenery. No need to
              be an expert. Just bring yourself.
            </p>
          </div>

          {/* Right Column: Cascading photos */}
          <div className="relative h-[320px] sm:h-[380px] w-full max-w-[460px] mx-auto">
            {/* Top photo */}
            <div className="absolute right-0 top-0 z-10 w-[72%] h-[68%] rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-[#e2dcd0]">
              <img
                src="/images/about-curious-top.png"
                alt="Friends hiking under green trees"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom overlapping photo */}
            <div className="absolute left-0 bottom-0 z-20 w-[58%] h-[60%] rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-[#e2dcd0]">
              <img
                src="/images/about-curious-bottom.png"
                alt="Hikers overlooking landscape summit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Badges row at bottom of section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 mt-6 border-t border-[#d8cfbe]/60">
          {/* Feature 1 */}
          <div className="flex flex-col items-start space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fbece1] text-[#e75606] flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6 stroke-[2]" />
            </div>
            <h4 className="text-base font-bold text-[#332d1b]">Rooted in Kisumu</h4>
            <p className="text-xs sm:text-sm text-[#635e4e] leading-relaxed">
              Born and inspired by Lake Victoria and its surrounding rocky hills.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-start space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fbece1] text-[#e75606] flex items-center justify-center shadow-sm">
              <DoorOpen className="w-6 h-6 stroke-[2]" />
            </div>
            <h4 className="text-base font-bold text-[#332d1b]">Open to everyone</h4>
            <p className="text-xs sm:text-sm text-[#635e4e] leading-relaxed">
              No experience needed, just curiosity and a pair of walking shoes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-start space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#fbece1] text-[#e75606] flex items-center justify-center shadow-sm">
              <Users className="w-6 h-6 stroke-[2]" />
            </div>
            <h4 className="text-base font-bold text-[#332d1b]">Better together</h4>
            <p className="text-xs sm:text-sm text-[#635e4e] leading-relaxed">
              New friends made on every trail, shared smiles and memories.
            </p>
          </div>
        </div>
      </section>

      {/* 3. More than a day out */}
      <section className="px-6 py-16 sm:px-10 lg:px-12 max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#332d1b] tracking-tight">
            More than a day out.
          </h2>
          <p className="text-sm sm:text-base text-[#635e4e] mt-2.5 max-w-xl leading-relaxed">
            It's not about going the farthest. It's about coming back with stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl bg-[#ede7dc]/70 border border-[#dcd2c0] p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#332d1b] mb-3">
                Places with something special.
              </h3>
              <p className="text-xs sm:text-sm text-[#635e4e] leading-relaxed">
                From quiet lakeside trails to dramatic rock summits, every trail is
                hand-picked for beauty, not just for endurance.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-[#ede7dc]/70 border border-[#dcd2c0] p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#332d1b] mb-3">
                Your pace. Your kind of escape.
              </h3>
              <p className="text-xs sm:text-sm text-[#635e4e] leading-relaxed">
                A gentle walk or a rewarding climb. Find an experience that leaves
                room to pause, take in the view, and enjoy the journey.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-[#ede7dc]/70 border border-[#dcd2c0] p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#332d1b] mb-3">
                New faces. A shared feeling.
              </h3>
              <p className="text-xs sm:text-sm text-[#635e4e] leading-relaxed">
                Come with friends or come on your own. There's a quiet bond
                between people who decide to disconnect and step outside
                together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-width Banner: Endless beauty. Unhurried moments. */}
      <section className="relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] flex items-center overflow-hidden my-6">
        <img
          src="/images/about-beauty.png"
          alt="Endless landscape view with hikers on rocky hill"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10 lg:px-12 py-12">
          <div className="max-w-xl space-y-4">
            <h2
              className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-md"
            >
              Endless beauty.
              <br />
              Unhurried moments.
            </h2>
            <p className="text-sm sm:text-base text-white/95 drop-shadow-sm">
              Take your time outdoors. Make it a day of it.
            </p>

            <div className="pt-2">
              <Button
                onClick={() => onOpenExplore?.()}
                className="h-11 rounded-full bg-white text-[#332d1b] font-semibold text-xs sm:text-sm px-6 shadow-md hover:bg-white/90 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Tell me more</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Strangers at the start. Friends by the finish. */}
      <section className="px-6 py-16 sm:px-10 lg:px-12 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#332d1b] tracking-tight leading-tight">
          Strangers at the start.
          <br />
          Friends by the finish.
        </h2>
        <p className="text-sm sm:text-base text-[#635e4e] max-w-xl mx-auto mt-3.5 leading-relaxed">
          Real conversations, belly laughter over packed lunches, and the shared
          high of reaching the summit together. That's the feeling that turns a
          hike into a memory.
        </p>

        {/* 3 Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 items-center">
          {/* Photo 1: Left */}
          <div className="rounded-2xl border-2 border-white shadow-md overflow-hidden aspect-[3/4] bg-[#e2dcd0] group">
            <img
              src="/images/about-gallery-1.png"
              alt="Rocky hill outcrop against blue sky"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Photo 2: Center Kit Mikayi */}
          <div className="rounded-2xl border-2 border-white shadow-xl overflow-hidden aspect-[3/4] bg-[#e2dcd0] sm:scale-105 group">
            <img
              src="/images/about-gallery-2.png"
              alt="Group in front of Kit Mikayi monument"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Photo 3: Right */}
          <div className="rounded-2xl border-2 border-white shadow-md overflow-hidden aspect-[3/4] bg-[#e2dcd0] group">
            <img
              src="/images/about-gallery-3.png"
              alt="Hikers relaxing and chatting on the rocks"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* View gallery button */}
        <div className="mt-12">
          <Button
            onClick={() => onOpenExplore?.()}
            className="h-11 rounded-full bg-[#332d1b] hover:bg-[#242013] text-white font-semibold text-xs sm:text-sm px-8 shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>View gallery</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Button>
        </div>
      </section>

      {/* 6. CTA: Your next story starts outside. */}
      <section className="bg-[#332d1b] text-white px-6 py-16 sm:px-10 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.08] tracking-tight text-white">
              Your next story
              <br />
              starts outside.
            </h2>
          </div>

          <div className="space-y-6 lg:justify-self-end">
            <p className="text-sm sm:text-base text-white/85 max-w-md leading-relaxed">
              Fresh air, new places, good people. You don't need to be an expert
              adventurer. Bring your curiosity. We'll take it from there.
            </p>

            <div>
              <button
                type="button"
                onClick={() => onOpenExplore?.()}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-[#332d1b] hover:bg-white/90 active:scale-[0.98] font-semibold text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
              >
                <span>Find your next escape</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

