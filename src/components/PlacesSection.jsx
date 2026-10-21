import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

const places = [
  { id: 2, name: "Kajulu Hills", category: "Hicking", image: "public/images/place 2.png" },
  { id: 3, name: "Kit Mikayi", category: "Swimming", image: "public/images/place 3.png" },
  { id: 4, name: "Lake Victoria", category: "Boat Riding", image: "public/images/place 4.png" },
  { id: 5, name: "Karuma Falls", category: "Zip Lining", image: "public/images/place 5.png" },
  { id: 6, name: "Riat Hills", category: "Camping", image: "public/images/place 6.png" },
  { id: 1, name: "Show Ground", category: "Team building", image: "public/images/place 1.png" },
];

export default function PlacesSection() {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState("All");

  const categories = ["All", "Hicking", "Nature", "Adventure"];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || place.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <section
      id="discover"
      className="w-full bg-white px-5 py-12 sm:px-8 md:px-12 lg:px-20 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-[#292929] sm:text-3xl">
            Pick the place
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-[1.45] text-[#526d68]">
            Discover beautiful destinations, explore new adventures, and find
            the perfect place for your next unforgettable experience.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-[52px] min-w-0 flex-1 items-center gap-4 rounded-full bg-[#fafafa] px-5 shadow-[0_2px_5px_rgba(0,0,0,0.13)]">
            <Search
              className="h-6 w-6 shrink-0 text-[#176963]"
              strokeWidth={1.8}
            />

            <div className="flex h-[35px] min-w-0 flex-1 items-center rounded-full border border-[#528b85] bg-transparent px-5">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Looking for something?"
                aria-label="Search destinations"
                className="h-full border-0 bg-transparent p-0 text-xs shadow-none placeholder:text-[#a3a3a3] focus-visible:ring-0"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="ml-2 text-[#176963]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="h-[52px] shrink-0 gap-4 rounded-full bg-[#fafafa] px-6 text-xs font-medium text-[#176963] shadow-[0_2px_5px_rgba(0,0,0,0.13)] hover:bg-[#f0f5f4]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Apply filters
          </Button>
        </div>

        {/* Filter options */}
        {filtersOpen && (
          <div className="mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5eeec] bg-[#fafcfb] p-4">
            <span className="mr-2 text-sm font-semibold text-[#004f49]">
              Category
            </span>

            {categories.map((item) => (
              <Button
                key={item}
                type="button"
                variant="outline"
                onClick={() => setCategory(item)}
                className={`h-9 rounded-full px-4 text-xs ${
                  category === item
                    ? "border-[#004f49] bg-[#004f49] text-white hover:bg-[#003f3a] hover:text-white"
                    : "border-[#d9e5e2] bg-white text-[#526d68]"
                }`}
              >
                {item}
              </Button>
            ))}
          </div>
        )}

        {/* Destination cards */}
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-14">
            {filteredPlaces.map((place) => (
              <article key={place.id} className="group min-w-0">
                {/* Image card */}
                <div className="relative aspect-[1.42/1] overflow-hidden rounded-[22px] bg-[#e5ece9]">
                  {place.image ? (
                    <img
                      src={place.image}
                      alt={place.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#d9e6df] via-[#b7d1c2] to-[#8cb5f5]">
                      <span className="text-sm font-medium text-[#004f49]/60">
                        Destination photo
                      </span>
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />

                  {/* Category badge */}
                  <span className="absolute right-5 top-4 rounded-full bg-[#00554d] px-3 py-1 text-[9px] font-medium text-white">
                    {place.category}
                  </span>

                  {/* Destination details */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-sm font-bold text-white">
                      {place.name}
                    </h3>

                    <p className="mt-0.5 line-clamp-1 text-[10px] text-white/85">
                      A wonderful place to be, I got lost here
                    </p>
                  </div>
                </div>

                {/* Booking button */}
                <Button
                  type="button"
                  onClick={() => console.log("Selected destination:", place)}
                  className="mt-3 h-9 w-full rounded-full bg-[#004f49] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#003f3a]"
                >
                  Book to hike this place
                </Button>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#f7faf9] px-6 py-16 text-center">
            <Search className="mx-auto mb-3 h-8 w-8 text-[#528b85]" />

            <h3 className="font-semibold text-[#004f49]">No places found</h3>

            <p className="mt-2 text-sm text-[#696e6c]">
              Try a different search term or category.
            </p>

            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 rounded-full border-[#004f49] text-[#004f49]"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
