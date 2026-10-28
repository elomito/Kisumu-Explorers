// Social icons are drawn inline so the footer has no icon-library dependency
function Instagram({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function Facebook({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.1 2 10.4 3.5 10.4 6.3v2.2H7.5v3.7h2.9V22H14v-9.8h2.8l.5-3.7H14z" />
    </svg>
  );
}

function Twitter({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function TikTokIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Twitter", href: "#", Icon: Twitter },
];

// Placeholder wording, replace with your real pages
const footerGroups = [
  {
    title: "Explore",
    links: [
      "Destinations",
      "Hiking",
      "Camping",
      "Boat riding",
      "Team building",
      "Routes & maps",
    ],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Partners", "Contact"],
  },
  {
    title: "Community",
    links: ["What's new", "Support", "Membership", "Merchandise"],
  },
];

const legalLinks = ["Privacy Policy", "Terms", "Cookie Policy"];

export default function Footer() {
  return (
    <footer className="w-full bg-[#003d2d] px-6 pb-6 pt-12 text-white sm:px-10 lg:px-0">
      <div className="mx-auto max-w-[922px]">
        {/* Footer columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
          {/* Brand and socials */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2.5">
              <span className="h-9 w-9 shrink-0 rounded-full bg-[#00e5f0]" />
              <span className="whitespace-nowrap text-[17px] font-semibold tracking-[-0.3px] text-white">
                kisumuexplorers.com
              </span>
            </a>

            <p className="mt-6 text-[11px] font-medium leading-4 text-white">
              Connect with us
            </p>

            <ul className="mt-3 flex items-center gap-3.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#003d2d] transition-colors hover:bg-[#00e5f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link groups */}
          {footerGroups.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="flex flex-col items-start"
            >
              <h3 className="mb-3 text-[12px] font-bold leading-4 text-white">
                {group.title}
              </h3>

              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[11px] leading-[14px] text-white/85 transition-colors hover:text-[#00e5f0] focus-visible:text-[#00e5f0]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-14 border-t border-white/20" />

        {/* Legal links */}
        <ul className="flex flex-wrap items-center justify-center gap-x-2 pt-5 text-center text-[10px] leading-[1.3] text-white/50">
          {legalLinks.map((link, index) => (
            <li key={link} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">•</span>}
              <a
                href="#"
                className="transition-colors hover:text-white/90 focus-visible:text-white/90"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}