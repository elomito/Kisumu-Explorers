
export default function Explore() {
  return (
    <section
      id="explore"
      className="relative overflow-hidden bg-[#f5f1e8] px-6 pt-12 pb-20 sm:px-10 lg:px-12 text-[#262216]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading and introduction */}
        <div className="max-w-xl mb-10">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.02] tracking-tight text-[#332d1b]">
            Go places
            <br />
            with us, have
            <br />
            the best
          </h2>

          <p className="mt-6 max-w-[420px] text-sm sm:text-base leading-relaxed text-[#635e4e]">
            Fresh air, new places, good people. You don't need to be an expert adventurer or have everything figured out. Just bring your curiosity. We'll take it from there.
          </p>
        </div>

        {/* Landscape composition */}
        <div className="relative w-full max-w-5xl mx-auto flex justify-center">
          <img
            src="/images/trails.png"
            alt="Scenic trail map connecting Kisumu, Lake Victoria, and surrounding regions"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}

