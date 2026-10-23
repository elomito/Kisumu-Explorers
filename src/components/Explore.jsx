
export default function Explore() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-white px-6 py-16 text-[#191919] sm:px-10 lg:min-h-[740px] lg:px-0 lg:py-0"
    >
      <div className="relative mx-auto max-w-[1200px] lg:min-h-[740px]">
        {/* Heading and introduction */}
        <div className="relative z-10 lg:absolute lg:left-[7.5%] lg:top-[30px]">
          <h2 className="max-w-[510px] text-[clamp(3.2rem,5.2vw,4.4rem)] font-extrabold leading-[0.96] tracking-[-0.055em]">
            Go places
            <br />
            with us, have
            <br />
            the best
          </h2>

          <p className="mt-8 max-w-[390px] text-[12px] leading-[1.35] text-[#686868]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in
          </p>
        </div>

        {/* Landscape composition */}
        <div className="relative mt-12 aspect-[1.35/1] w-full lg:absolute lg:inset-x-0 lg:bottom-[11%] lg:mt-0 lg:aspect-auto lg:h-[600px]">
          <div className="landscape-shape absolute inset-0 overflow-hidden">
            {/* Replace with your landscape image */}
            <img
              src="/images/trails.png"
              alt="Panoramic view of the surrounding hills and countryside"
              className="h-full w-full object-cover object-center"
            />

          </div>
        </div>
      </div>
    </section>
  );
}
