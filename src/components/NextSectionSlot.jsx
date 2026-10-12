import { Mountain, Compass, MapPin, Sparkles, Plus } from "lucide-react";

export function NextSectionSlot({ onOpenExplore }) {
  return (
    <section
      id="about"
      className="relative py-20 px-6 lg:px-12 bg-slate-950 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>Next In The Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready for Your Next Destination
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl">
              From rocky granite peaks to alpine ridges and hidden gorge trails,
              every expedition is planned with certified guides and premium
              safety standards.
            </p>
          </div>

          <button
            onClick={onOpenExplore}
            className="self-start md:self-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs md:text-sm font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Browse Featured Hikes</span>
          </button>
        </div>

        {/* Modular Preview Cards ready for upcoming section attachments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 hover:border-cyan-400/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Mountain className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Summit Ridge Trekking
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ascend towering granite crags and iconic rocky horizons with our
              certified alpine leaders.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 hover:border-teal-400/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Off-the-Beaten-Path
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore secret wilderness reserves and remote backcountry paths
              away from tourist crowds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3 hover:border-amber-400/40 transition-colors border-dashed border-white/20 flex flex-col justify-center items-center text-center p-8 bg-slate-900/40">
            <div className="w-10 h-10 rounded-full bg-white/5 text-slate-400 flex items-center justify-center mb-1">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-white/90">
              Attach Next Design
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Upload the next screen (destinations, gallery, itinerary, or
              booking) to expand the site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
