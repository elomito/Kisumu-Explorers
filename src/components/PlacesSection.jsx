import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

const DEFAULT_DESCRIPTION = "A wonderful place to be, I got lost here\nA wonderful place to be, I got lost here";

const places = [
  { id: 1, name: "Kajulu Hills", category: "Hiking", image: "/images/place 1.png" },
  { id: 2, name: "Kit Mikayi", category: "Swimming", image: "/images/place 2.png" },
  { id: 3, name: "Lake Victoria", category: "Boat Riding", image: "/images/place 3.png" },
  { id: 4, name: "Karuma Falls", category: "Zip Lining", image: "/images/place 4.png" },
  { id: 5, name: "Riat Hills", category: "Camping", image: "/images/place 5.png" },
  { id: 6, name: "Show Ground", category: "Team building", image: "/images/place 6.png" },
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
      className="w-full bg-[#f5f1e8] px-5 py-12 sm:px-8 md:px-12 lg:px-20 lg:py-16 text-[#262216]"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold leading-tight tracking-tight text-[#332d1b]">
            Pick the place
          </h2>

          <p className="mt-2.5 max-w-xl text-sm sm:text-base leading-relaxed text-[#635e4e]">
            A trail to wander, a view worth the climb, or a new corner of the world waiting to be explored. Find a place that calls to you and let's make a day of it.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-[52px] min-w-0 flex-1 items-center gap-3 rounded-full bg-[#eae3d5]/70 border border-[#d6ccb9] px-4 shadow-sm">
            <Search
              className="h-5 w-5 shrink-0 text-[#635e4e]"
              strokeWidth={2}
            />

            <div className="flex h-[36px] min-w-0 flex-1 items-center rounded-full border border-[#c4b9a4] bg-transparent px-4">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Looking for something?"
                aria-label="Search destinations"
                className="h-full border-0 bg-transparent p-0 text-xs sm:text-sm shadow-none placeholder:text-[#9e9685] text-[#332d1b] focus-visible:ring-0"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="ml-2 text-[#635e4e] hover:text-[#332d1b]"
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
            className="h-[52px] shrink-0 gap-3 rounded-full bg-[#eae3d5]/80 border border-[#d6ccb9] px-6 text-xs sm:text-sm font-medium text-[#332d1b] shadow-sm hover:bg-[#ded4c3] transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4 text-[#635e4e]" />
            Apply filters
          </Button>
        </div>

        {/* Filter options */}
        {filtersOpen && (
          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[#d6ccb9] bg-[#eae3d5]/50 p-4">
            <span className="mr-2 text-sm font-semibold text-[#332d1b]">
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
                    ? "border-[#332d1b] bg-[#332d1b] text-white hover:bg-[#242013] hover:text-white"
                    : "border-[#d6ccb9] bg-white/80 text-[#635e4e] hover:bg-white"
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
            <div className="flex h-[560px] flex-col md:h-[440px] md:flex-row">
              {filteredPlaces.map((place, index) => {
                const isActive = place.id === currentId;

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
                    className={`group relative min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-[24px] border-2 border-white bg-[#e2dcd0] shadow-[0_4px_14px_rgba(0,0,0,0.12)] outline-none transition-[flex-grow] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-[#332d1b] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                      index > 0 ? "-mt-5 md:-ml-5 md:mt-0" : ""
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

                    {/* Dark gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Details only show on the open card */}
                    <div
                      className={`absolute inset-0 flex flex-col justify-between p-5 transition-opacity duration-300 sm:p-6 ${
                        isActive
                          ? "opacity-100 delay-200"
                          : "pointer-events-none opacity-0"
                      }`}
                      aria-hidden={!isActive}
                    >
                      <div className="flex justify-end">
                        <span className="rounded-full bg-black/50 backdrop-blur-sm px-3.5 py-1 text-[11px] font-medium text-white shadow-sm">
                          {place.category}
                        </span>
                      </div>

                      <div className="min-w-0 space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white drop-shadow-sm">
                          {place.name}
                        </h3>

                        <p className="max-w-[18rem] text-xs leading-relaxed text-white/90 whitespace-pre-line drop-shadow-sm">
                          {place.description ?? DEFAULT_DESCRIPTION}
                        </p>

                        <Button
                          type="button"
                          tabIndex={isActive ? 0 : -1}
                          onClick={(event) => {
                            event.stopPropagation();
                            console.log("Selected destination:", place);
                          }}
                          className="mt-3 h-10 rounded-full bg-[#332d1b] hover:bg-[#242013] px-6 text-xs font-semibold text-white shadow-md transition-colors"
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
            <div className="mt-8">
              <Button
                type="button"
                onClick={onSeeMore}
                className="h-11 rounded-full bg-[#332d1b] hover:bg-[#242013] px-8 text-xs sm:text-sm font-semibold text-white shadow-md transition-colors"
              >
                Want to see more?
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl bg-[#eae3d5]/40 border border-[#d6ccb9] px-6 py-16 text-center">
            <Search className="mx-auto mb-3 h-8 w-8 text-[#635e4e]" />

            <h3 className="font-semibold text-[#332d1b]">No places found</h3>

            <p className="mt-2 text-sm text-[#635e4e]">
              Try a different search term or category.
            </p>

            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-4 rounded-full border-[#332d1b] text-[#332d1b] hover:bg-[#332d1b] hover:text-white"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}