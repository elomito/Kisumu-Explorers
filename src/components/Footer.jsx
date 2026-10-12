const footerGroups = [
  {
    title: "Lorem ipsum dolor",
    links: [
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
    ],
  },
  {
    title: "Lorem ipsum dolor",
    links: [
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
    ],
  },
  {
    title: "Lorem ipsum dolor",
    links: [
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
      "Lorem ipsum dolor",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e5e5e5] bg-white px-6 pb-3 pt-12 text-[#333333] sm:px-10 lg:px-0">
      <div className="mx-auto max-w-[922px]">
        {/* Footer columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
          {/* Brand */}
          <div className="max-w-[220px]">
            <a href="/" className="mb-3 flex items-center gap-2">
              <span className="h-9 w-9 shrink-0 rounded-full bg-[#00dce8]" />
              <span className="whitespace-nowrap text-[17px] font-bold tracking-[-0.6px] text-[#292929]">
                traveler.com
              </span>
            </a>

            <p className="max-w-[190px] text-[10px] leading-[1.35] text-[#737373]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore
            </p>
          </div>

          {/* Link groups */}
          {footerGroups.map((group, index) => (
            <div key={index} className="flex flex-col items-start">
              <h3 className="mb-[9px] text-[11px] font-bold leading-4 text-[#292929]">
                {group.title}
              </h3>

              <ul className="flex flex-col gap-[5px]">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-[11px] leading-[14px] text-[#505050] transition-colors hover:text-[#00cbd7]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-14 border-t border-[#d4d4d4]" />

        {/* Copyright */}
        <div className="mx-auto max-w-[440px] pt-4 text-center">
          <p className="text-[10px] leading-[1.3] text-[#c5c5c5]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
        </div>
      </div>
    </footer>
  );
}
