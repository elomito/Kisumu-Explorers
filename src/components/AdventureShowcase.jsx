import { Button } from "./ui/button";

export default function AdventureShowcase() {
  return (
    <section
      id="about"
      className="relative w-full overflow-x-clip bg-[#f5f1e8] font-sans text-[#262216]"
    >
      {/* Top section */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-12 pb-16 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-20 lg:pb-24">
        {/* Text content */}
        <div className="relative z-10 max-w-[520px]">
          <h2 className="mb-6 text-10xl sm:text-4xl lg:text-[48px] font-extrabold leading-[1.08] tracking-tight text-[#332d1b]">
            The world is much bigger outside
          </h2>

          <p className="max-w-[470px] text-base sm:text-[20px] leading-relaxed text-[#635e4e]">
            From quiet trails and lakeside sunsets to fun and exciting road trips, there's more to discover just beyond the everyday. We bring curious explorers together to experience the outdoors, one adventure at a time.
          </p>
        </div>

        {/* Overlapping photo collage */}
        <div className="relative mx-auto h-[340px] sm:h-[420px] lg:h-[480px] w-full max-w-[420px] sm:max-w-[560px] lg:max-w-[600px] lg:justify-self-end">
          {/* Left photo: Boat on lake */}
          <div className="absolute -left-[20%] -bottom-40 z-10 h-[80%] w-[60%] overflow-hidden rounded-2xl">
            <img
              src="/images/boat.png"
              alt="Boat on the lake"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Center photo: Friends on rocks */}
          <div className="absolute left-[22%] top-0 z-20 h-[100%] w-[70%] overflow-hidden rounded-2xl">
            <img
              src="/images/friends.png"
              alt="Friends enjoying a day together"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right photo: Portrait */}
          <div className="absolute -right-50 top-[12%] z-10 h-[75%] w-[50%] overflow-hidden rounded-2xl">
            <img
              src="/images/portrait.png"
              alt="Portrait"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom section: Group photo & Story */}
      <div className="relative isolate overflow-hidden">
        {/* Soft earthy background gradient matching the design */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, #f5f1e8 0%, rgba(200, 190, 172, 0.4) 30%, rgba(135, 126, 110, 0.75) 75%, #f5f1e8 100%)",
          }}
        />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-10 lg:py-20">
          {/* Group photo with organic brush outline */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[680px]">
              <img
                src="/images/group.png"
                alt="Our group together"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Bottom text */}
          <div className="relative z-20 max-w-[540px]">
            <h2 className="mb-5 text-2xl sm:text-3xl lg:text-[44px] font-extrabold leading-[1.1] tracking-tight text-[#332d1b]">
              Go places with us, have the
              <br />
              best adventure
            </h2>

            <p className="text-base sm:text-[17px] leading-relaxed text-[#524d3e]">
              There's something special about discovering a new place, taking the scenic route, and sharing the moment with people who love the outdoors as much as you do. Whether it's your first trail or your next weekend escape, Kisumu Explorers is about making room for new experiences, new friendships, and stories worth telling.
            </p>

            <Button
              asChild
              className="mt-8 h-12 rounded-full bg-[#332d1b] px-8 text-sm font-semibold text-white shadow-md hover:bg-[#242013] transition-colors"
            >
              <a href="#discover">Discover places</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}