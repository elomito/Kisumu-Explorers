import { Button } from "./ui/button";

export default function AdventureShowcase() {
  return (
    <section
      id="about"
      className="relative w-full overflow-x-clip bg-white font-sans text-[#252525]"
    >
      {/* Top section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:min-h-[420px] lg:grid-cols-2 lg:gap-12 lg:px-20 lg:py-14">
        {/* Text content */}
        <div className="relative z-10 max-w-[450px] -mt-[50%]">
          <h2 className="mb-5 text-[40px] font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-[40px]">
            The world is much bigger outside
          
          </h2>

          <p className="max-w-[410px] text-sm leading-[1.48] text-[#696e6c] sm:text-[18px]">
            From quiet trails and lakeside sunsets to fun and exciting road trips, there's more to discover just beyond the everyday. We bring curious explorers together to experience the outdoors, one adventure at a time.
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
          <div className="absolute bottom-[-40%] left-[-20%] z-10 h-[91%] w-[67%] overflow-hidden rounded-xl border-[3px] border-white bg-[#dce9e6]">
            <img
              src="/images/boat.png"
              alt="Boat on the lake"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right photo */}
          <div className="absolute right-[-40%] top-[13%] z-20 h-[85%] w-[61%] overflow-hidden rounded-xl border-[3px] border-white bg-[#dce9e6]">
            <img
              src="/images/portrait.png"
              alt="Portrait"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Main center photo */}
          <div className="absolute left-[18%] top-0 z-30 h-[109%] w-[68%] overflow-hidden rounded-xl border-[3px] border-white bg-[#dce9e6] shadow-sm">
            <img
              src="/images/friends.png"
              alt="Friends enjoying a day together"
              className="h-full w-full object-cover"
            />
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
          <img
            src="/images/group.png"
            alt="Our group together"
            className="absolute bottom-0 left-0 w-full max-w-none object-contain object-bottom lg:-bottom-10 lg:-left-10 lg:w-[75%]"
          />
        </div>

        {/* Bottom text */}
        <div className="relative z-20 max-w-[540px] py-10 pb-16 lg:py-10 lg:pb-20 left-[-10%]">
          <h2 className="mb-5 text-[28px] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#004f49] sm:text-[45px]">
            Go places with us, have the
            <br className="hidden sm:block" /> best adventure
          </h2>

          <p className="text-sm leading-[1.55] text-[#526d68] sm:text-[18px]">
           There's something special about discovering a new place, taking the scenic route, and sharing the moment with people who love the outdoors as much as you do. Whether it's your first trail or your next weekend escape, Kisumu Explorers is about making room for new experiences, new friendships, and stories worth telling.
          </p>
        </div>
      </div>
    </section>
  );
}