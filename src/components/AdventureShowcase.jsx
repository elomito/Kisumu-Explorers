// import React, { useState } from "react";
// import {
//   ArrowRight,
//   Compass,
//   Shield,
//   Users,
//   MapPin,
//   Sparkles,
// } from "lucide-react";

// /**
//  * Image Placeholder Paths:
//  * Place your images in the `public/` directory and update these paths:
//  */
// export const SHOWCASE_IMAGES = {
//   // Top collage: boat excursion
//   boat: "/adventures/lake-boat.jpg",
//   // Top collage: friends on granite rocks (center card)
//   rocks: "/adventures/summit-friends.jpg",
//   // Top collage: outdoor selfie (right card)
//   selfie: "/adventures/outdoor-selfie.jpg",
//   // Bottom organic shape: full group hike crew
//   groupCrew: "/adventures/hike-crew.jpg",
// };

// export function AdventureShowcase({ onDiscoverClick }) {
//   // Graceful fallback tracker for placeholder images
//   const [imgErrors, setImgErrors] = useState({});

//   const handleImgError = (key) => {
//     setImgErrors((prev) => ({ ...prev, [key]: true }));
//   };

//   return (
//     <section
//       id="about"
//       className="relative w-full bg-white text-slate-900 overflow-hidden py-20 md:py-28"
//     >
//       <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 space-y-28 md:space-y-36">
//         {/* =========================================================================
//             BLOCK 1: Top Asymmetric 3-Image Collage & Value Proposition
//             ========================================================================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
//           {/* Left Text Column */}
//           <div className="lg:col-span-5 space-y-6 text-left">
//             <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
//               Go places with us, have the best adventure
//             </h2>

//             <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
//               We curate extraordinary wilderness expeditions, summit treks, and
//               secluded waterway journeys designed for explorers who crave
//               authentic nature. Led by seasoned wilderness guides with
//               uncompromising safety standards, every journey leaves lasting
//               memories and deep connections.
//             </p>

//             <div className="pt-2">
//               <button
//                 onClick={onDiscoverClick}
//                 className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#034d44] hover:bg-[#046156] active:bg-[#023b34] text-white font-medium text-sm md:text-base shadow-lg shadow-teal-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
//               >
//                 <span>Discover places</span>
//               </button>
//             </div>
//           </div>

//           {/* Right Stepped Asymmetric Collage */}
//           <div className="lg:col-span-7 relative">
//             <div className="grid grid-cols-12 gap-4 items-center">
//               {/* 1. Left Lower Card: Boat / Lake Excursion */}
//               <div className="col-span-4 self-end pt-12">
//                 <div className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10 border border-slate-100 bg-slate-100 group transition-transform duration-300 hover:-translate-y-1">
//                   {!imgErrors.boat ? (
//                     <img
//                       src={SHOWCASE_IMAGES.boat}
//                       alt="Scenic boat lake trip"
//                       onError={() => handleImgError("boat")}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       referrerPolicy="no-referrer"
//                     />
//                   ) : (
//                     /* Fallback Scenic Graphic */
//                     <div className="w-full h-full bg-gradient-to-t from-sky-200 via-sky-100 to-sky-50 p-4 flex flex-col justify-end text-sky-900">
//                       <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center mb-2 shadow-sm">
//                         <Compass className="w-4 h-4 text-teal-700" />
//                       </div>
//                       <span className="text-xs font-bold">Lake Excursion</span>
//                       <span className="text-[10px] text-sky-700">
//                         Tranquil Waterways
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* 2. Center Dominant Card: Summit Friends on Granite Boulder */}
//               <div className="col-span-5">
//                 <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 border-2 border-white bg-slate-100 group transition-transform duration-300 hover:-translate-y-1.5 z-10">
//                   {!imgErrors.rocks ? (
//                     <img
//                       src={SHOWCASE_IMAGES.rocks}
//                       alt="Friends resting on granite summit boulder"
//                       onError={() => handleImgError("rocks")}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       referrerPolicy="no-referrer"
//                     />
//                   ) : (
//                     /* Fallback Scenic Graphic */
//                     <div className="w-full h-full bg-gradient-to-t from-stone-400 via-stone-300 to-amber-100 p-5 flex flex-col justify-end text-slate-900">
//                       <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center mb-2 shadow-sm">
//                         <Users className="w-5 h-5 text-teal-800" />
//                       </div>
//                       <span className="text-sm font-bold">
//                         Granite Peak Trek
//                       </span>
//                       <span className="text-xs text-slate-700">
//                         Guided Summit Ascent
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* 3. Right Overlapping Card: Happy Outdoor Selfie */}
//               <div className="col-span-3 self-center">
//                 <div className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg shadow-slate-900/10 border border-slate-100 bg-slate-100 group transition-transform duration-300 hover:-translate-y-1">
//                   {!imgErrors.selfie ? (
//                     <img
//                       src={SHOWCASE_IMAGES.selfie}
//                       alt="Outdoor adventure smile"
//                       onError={() => handleImgError("selfie")}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                       referrerPolicy="no-referrer"
//                     />
//                   ) : (
//                     /* Fallback Graphic */
//                     <div className="w-full h-full bg-gradient-to-t from-emerald-200 via-emerald-100 to-teal-50 p-3 flex flex-col justify-end text-emerald-950">
//                       <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center mb-1.5 shadow-sm">
//                         <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
//                       </div>
//                       <span className="text-[11px] font-bold">
//                         Trail Memories
//                       </span>
//                       <span className="text-[9px] text-emerald-800">
//                         Lifelong Bonds
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* =========================================================================
//             BLOCK 2: Bottom Inverted Organic Cutout & Dark Teal Headline
//             ========================================================================= */}
//         <div className="relative pt-6">
//           {/* Subtle Ambient Background Scrim matching the design's bottom-right teal gradient */}
//           <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-gradient-to-tl from-[#034d44]/35 via-[#034d44]/10 to-transparent rounded-3xl pointer-events-none -z-0" />

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
//             {/* Left Column: Organic Trail Blob Cutout with Group Photo */}
//             <div className="lg:col-span-6 relative flex justify-center items-center">
//               {/* Organic Fluid Silhouette Container */}
//               <div className="relative w-full max-w-md md:max-w-lg aspect-[4/4.2]">
//                 {/* SVG Decorative Trail Doodles / Line Accents (from design) */}
//                 <svg
//                   className="absolute inset-0 w-full h-full pointer-events-none z-20"
//                   viewBox="0 0 500 520"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   {/* Winding mountain contour line */}
//                   <path
//                     d="M 50 120 C 100 40, 200 60, 260 140 C 320 220, 420 180, 450 260 C 470 320, 420 420, 350 460"
//                     stroke="#ffffff"
//                     strokeWidth="4"
//                     strokeDasharray="6 6"
//                     opacity="0.8"
//                   />
//                   {/* Carabiner / trail pin doodle on right */}
//                   <path
//                     d="M 425 365 C 435 360, 445 375, 435 385 L 420 400 C 410 410, 400 395, 410 385 Z"
//                     stroke="#ffffff"
//                     strokeWidth="3.5"
//                     fill="rgba(255,255,255,0.2)"
//                   />
//                   {/* Contour hook motif bottom-left */}
//                   <path
//                     d="M 40 440 C 20 460, 45 490, 65 470 C 85 450, 75 425, 55 435"
//                     stroke="#00e5db"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     opacity="0.8"
//                   />
//                 </svg>

//                 {/* Masked Organic Masked Canvas */}
//                 <div
//                   className="w-full h-full overflow-hidden shadow-2xl shadow-teal-950/20 bg-slate-100 group transition-transform duration-500 hover:scale-[1.01]"
//                   style={{
//                     borderRadius: "42% 58% 62% 38% / 46% 40% 60% 54%",
//                   }}
//                 >
//                   {!imgErrors.groupCrew ? (
//                     <img
//                       src={SHOWCASE_IMAGES.groupCrew}
//                       alt="Adventure group hiking together under forest canopy"
//                       onError={() => handleImgError("groupCrew")}
//                       className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
//                       referrerPolicy="no-referrer"
//                     />
//                   ) : (
//                     /* Fallback Scenic Graphic matching group under trees */
//                     <div className="w-full h-full bg-gradient-to-t from-teal-900 via-emerald-800 to-sky-700 p-8 flex flex-col justify-end text-white">
//                       <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
//                         <Users className="w-6 h-6 text-cyan-300" />
//                       </div>
//                       <h4 className="text-xl font-bold">The Expedition Crew</h4>
//                       <p className="text-xs text-white/80 max-w-xs mt-1">
//                         Guided group departures through ancient highland trees
//                         and rocky boulder summits.
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column: Inverted Headline in Dark Teal & Narrative Prose */}
//             <div className="lg:col-span-6 space-y-6 text-left">
//               <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#034d44] tracking-tight leading-[1.15]">
//                 Go places with us, have the best adventure
//               </h2>

//               <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
//                 Whether scaling majestic rock ridges with lifelong companions or
//                 setting off on your first wilderness trail, traveler.com pairs
//                 you with top-rated local hosts and verified trail logistics. We
//                 take care of route mapping, safety inspections, and permit
//                 access so you can fully immerse in the wild.
//               </p>

//               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200/80">
//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#034d44] flex items-center justify-center shrink-0">
//                     <Shield className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <span className="text-xs font-bold text-slate-900 block">
//                       Verified Safety
//                     </span>
//                     <span className="text-[11px] text-slate-500">
//                       First responder guides
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#034d44] flex items-center justify-center shrink-0">
//                     <MapPin className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <span className="text-xs font-bold text-slate-900 block">
//                       Hidden Trails
//                     </span>
//                     <span className="text-[11px] text-slate-500">
//                       Zero tourist crowds
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Button } from "./ui/button";

export default function AdventureShowcase() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-white font-sans text-[#252525]"
    >
      {/* Top section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:min-h-[420px] lg:grid-cols-2 lg:gap-12 lg:px-20 lg:py-14">
        {/* Text content */}
        <div className="relative z-10 max-w-[450px]">
          <h2 className="mb-5 text-[30px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-[34px]">
            Go places with us, have
            <br className="hidden sm:block" /> the best adventure
          </h2>

          <p className="max-w-[410px] text-sm leading-[1.48] text-[#696e6c]">
            Discover new places, meet amazing people, and make memories that
            last a lifetime. From hidden gems to unforgettable adventures, we
            make every journey worth taking.
          </p>

          <Button
            asChild
            className="mt-6 h-[42px] min-w-[200px] rounded-full bg-[#004f49] px-7 text-sm font-semibold text-white hover:bg-[#003f3a]"
          >
            <a href="#discover">Discover places</a>
          </Button>
        </div>

        {/* Overlapping photo collage */}
        <div className="relative mx-auto aspect-[1.35/1] w-full max-w-[500px] lg:justify-self-end">
          {/* Left photo */}
          <div className="absolute bottom-[1%] left-0 z-10 h-[61%] w-[37%] overflow-hidden rounded-xl border-[3px] border-white bg-[#dce9e6]">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#dce9e6] to-[#8cb5f5] text-xs text-[#004f49]/70">
              Boat photo
            </div>
          </div>

          {/* Right photo */}
          <div className="absolute right-0 top-[13%] z-20 h-[55%] w-[31%] overflow-hidden rounded-xl border-[3px] border-white bg-[#dce9e6]">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#8cb5f5] to-[#dce9e6] text-xs text-[#004f49]/70">
              Portrait
            </div>
          </div>

          {/* Main center photo */}
          <div className="absolute left-[24%] top-0 z-30 h-[79%] w-[48%] overflow-hidden rounded-xl border-[3px] border-white bg-[#dce9e6] shadow-sm">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#c9d9d2] via-[#8cb5f5] to-[#b8a68e] text-xs text-[#004f49]/70">
              Friends photo
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="relative isolate grid grid-cols-1 items-center gap-0 px-6 pt-6 sm:px-10 lg:min-h-[480px] lg:grid-cols-2 lg:gap-12 lg:px-16 lg:pt-9">
        {/* Gradient background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-[70%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(204,221,218,0.8) 40%, #004f49 100%)",
          }}
        />

        {/* Group photo */}
        <div className="relative min-h-[330px] sm:min-h-[400px] lg:min-h-[460px]">
          {/* Decorative blue shapes */}
          <div className="absolute left-[15%] top-0 h-[55%] w-[55%] rotate-[-12deg] rounded-[45%] bg-[#8cb5f5]" />
          <div className="absolute bottom-[10%] right-[4%] h-[40%] w-[28%] rotate-[20deg] rounded-[40%] bg-[#8cb5f5]" />

          {/* Replace this div with your group photo */}
          <div
            className="absolute inset-0 z-10 overflow-hidden bg-gradient-to-br from-[#8cb5f5] via-[#a6c5ef] to-[#004f49]"
            style={{
              clipPath:
                "polygon(18% 0%,38% 0%,47% 9%,60% 4%,69% 17%,84% 13%,100% 37%,91% 55%,100% 68%,80% 91%,71% 100%,56% 95%,44% 100%,31% 91%,19% 98%,8% 81%,0% 66%,8% 46%,0% 36%)",
            }}
          >
            <div className="flex h-full items-center justify-center text-sm font-medium text-white/80">
              Your group photo
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <div className="relative z-20 max-w-[540px] py-10 pb-16 lg:py-10 lg:pb-20">
          <h2 className="mb-5 text-[28px] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#004f49] sm:text-[32px]">
            Go places with us, have the
            <br className="hidden sm:block" /> best adventure
          </h2>

          <p className="text-sm leading-[1.55] text-[#526d68]">
            Every adventure tells a story. We bring people together through
            shared experiences, beautiful destinations, and the joy of
            discovering something new. Whether it is a weekend escape or a
            journey into the unknown, there is always something waiting to be
            explored.
          </p>
        </div>
      </div>
    </section>
  );
}