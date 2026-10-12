const locations = [
  { x: 20, y: 69, label: "zone01kisumu", side: "left" },
  { x: 32, y: 58, label: "zone01kisumu", side: "left" },
  { x: 41, y: 44, label: "zone01kisumu", side: "left" },
  { x: 47, y: 46, label: "zone01kisumu", side: "right" },
  { x: 55, y: 32, label: "zone01kisumu", side: "right" },
  { x: 62, y: 49, label: "zone01kisumu", side: "right" },
  { x: 85, y: 36, label: "zone01kisumu", side: "right" },
];

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
        <div className="relative mt-12 aspect-[1.35/1] w-full lg:absolute lg:inset-x-0 lg:bottom-[11%] lg:mt-0 lg:aspect-auto lg:h-[440px]">
          <div className="landscape-shape absolute inset-0 overflow-hidden bg-[#244c75]">
            {/* Replace with your landscape image */}
            <img
              src="/images/about-landscape.jpg"
              alt="Panoramic view of the surrounding hills and countryside"
              className="h-full w-full object-cover object-center"
            />

            {/* Subtle overlay to blend the route with the landscape */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

            {/* GPS route */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1000 440"
              preserveAspectRatio="none"
              fill="none"
              aria-label="Route connecting locations across the landscape"
              role="img"
            >
              <path
                d="
                  M205 305
                  L195 286 204 278 250 278 290 280
                  306 268 313 248 355 250 365 270
                  382 265 388 238 365 219 360 193
                  380 184 405 204 430 202
                  445 190 450 150 466 139
                  492 135 505 120 520 131
                  530 156 545 169 542 185
                  530 202 538 218 555 225
                  570 220 584 198 580 181
                  590 171 603 178 610 197
                  620 207 625 190 635 183
                  632 169 645 157 666 152
                  685 158 696 175 712 179
                  725 171 730 155 744 151
                  754 160 748 173 738 179
                  742 192 755 203 768 198
                  778 184 791 195 804 189
                  815 174
                "
                stroke="#00E5ED"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Location pins */}
            {locations.map((location, index) => (
              <div
                key={`${location.x}-${index}`}
                className="absolute z-10"
                style={{
                  left: `${location.x}%`,
                  top: `${location.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="block h-[18px] w-[18px] rounded-full bg-white shadow-sm sm:h-5 sm:w-5" />

                <span
                  className={`absolute top-1/2 w-max -translate-y-1/2 whitespace-nowrap text-[9px] font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] sm:text-[10px] ${
                    location.side === "left" ? "right-5" : "left-5"
                  }`}
                >
                  {location.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
