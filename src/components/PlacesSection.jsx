import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

const DEFAULT_DESCRIPTION = "A wonderful place to be, I got lost here";

const places = [
  { id: 1, name: "Kajulu Hills", category: "Hiking", image: "public/images/place 2.png" },
  { id: 2, name: "Kit Mikayi", category: "Swimming", image: "public/images/place 3.png" },
  { id: 3, name: "Lake Victoria", category: "Boat Riding", image: "public/images/place 4.png" },
  { id: 4, name: "Karuma Falls", category: "Zip Lining", image: "public/images/place 5.png" },
  { id: 5, name: "Riat Hills", category: "Camping", image: "public/images/place 6.png" },
  { id: 6, name: "Show Ground", category: "Team building", image: "public/images/place 1.png" },
];

export default function PlacesSection({ onSeeMore }) {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [activeId, setActiveId] = useState(places[0].id);

  // Categories come from the data so the filter chips always match the cards
  const categories = ["All", ...new Set(places.map((place) => place.category))];

  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || place.category === category;
    return matchesSearch && matchesCategory;
  });

  // If the open card gets filtered out, fall back to the first visible one
  const currentId = filteredPlaces.some((place) => place.id === activeId)
    ? activeId
    : filteredPlaces[0]?.id;

  const activeIndex = Math.max(
    0,
    filteredPlaces.findIndex((place) => place.id === currentId)
  );

  return (
    <section
      id="discover"
      className="w-full bg-white px-5 py-12 sm:px-8 md:px-12 lg:px-20 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-[#292929] sm:text-4xl">
            Pick the place
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-[1.45] text-[#526d68]">
            A trail to wander, a view worth the climb, or a new corner of the world waiting to be explored. Find a place that calls to you and let's make a day of it.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
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
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5eeec] bg-[#fafcfb] p-4">
            <span className="mr-2 text-sm font-semibold text-[#004f49]">
              Category
            </span>

            {categories.map((item) => (
              <Button
                key={item}
                type="button"
                variant="outline"
                onClick={() => setCategory(item)}
                className={`h-9 rounded-full px-4 text-xs ${category === item
                  ? "border-[#004f49] bg-[#004f49] text-white hover:bg-[#003f3a] hover:text-white"
                  : "border-[#d9e5e2] bg-white text-[#526d68]"
                  }`}
              >
                {item}
              </Button>
            ))}
          </div>
        )}

        {filteredPlaces.length > 0 ? (
          <>
            {/*
              Expanding gallery: the active card grows, the rest collapse into
              slim slices. Horizontal on md+, stacked vertically on mobile.
            */}
            <div className="flex h-[560px] flex-col md:h-[420px] md:flex-row">
              {filteredPlaces.map((place, index) => {
                const isActive = place.id === currentId;

                // The closer a card is to the open one, the higher it sits.
                // Each card therefore rests on top of the one beside it, on
                // both the left and the right of the open card.
                const stackOrder =
                  filteredPlaces.length - Math.abs(index - activeIndex);

                return (
                  <article
                    key={place.id}
                    style={{ zIndex: stackOrder }}
                    tabIndex={0}
                    aria-label={`${place.name}, ${place.category}`}
                    onMouseEnter={() => setActiveId(place.id)}
                    onFocus={() => setActiveId(place.id)}
                    onClick={() => setActiveId(place.id)}
                    className={`group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[22px] border-2 border-white bg-[#e5ece9] shadow-[0_2px_8px_rgba(0,0,0,0.18)] outline-none transition-[flex-grow] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-[#004f49] focus-visible:ring-offset-2 motion-reduce:transition-none ${index > 0 ? "-mt-5 md:-ml-5 md:mt-0" : ""
                      } ${isActive ? "grow-[7]" : "grow-[1]"} basis-0`}
                  >
                    {/* Photo */}
                    {place.image ? (
                      <img
                        src={place.image}
                        alt={isActive ? place.name : ""}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d9e6df] via-[#b7d1c2] to-[#8cb5f5]" />
                    )}

                    {/* Dark gradient so the text stays readable */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                        }`}
                    />

                    {/* Details only show on the open card */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-300 sm:p-5 ${isActive
                        ? "opacity-100 delay-200"
                        : "pointer-events-none opacity-0"
                        }`}
                      aria-hidden={!isActive}
                    >
                      <div className="flex justify-end">
                        <span className="rounded-full bg-[#00554d] px-3 py-1 text-[10px] font-medium text-white">
                          {place.category}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-2xl font-extrabold leading-tight text-white">
                          {place.name}
                        </h3>

                        <p className="mt-1 max-w-[16rem] text-xs leading-snug text-white/90">
                          {place.description ?? DEFAULT_DESCRIPTION}
                        </p>

                        <Button
                          type="button"
                          tabIndex={isActive ? 0 : -1}
                          onClick={(event) => {
                            event.stopPropagation();
                            console.log("Selected destination:", place);
                          }}
                          className="mt-4 h-10 w-full max-w-[16rem] rounded-full bg-[#004f49] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#003f3a]"
                        >
                          Book to hike this place
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* See more */}
            <Button
              type="button"
              onClick={onSeeMore}
              className="mt-10 h-10 rounded-full bg-[#004f49] px-7 text-xs font-semibold text-white transition-colors hover:bg-[#003f3a]"
            >
              Want to see more?
            </Button>
          </>
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