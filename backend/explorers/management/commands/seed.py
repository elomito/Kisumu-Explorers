"""Load the places and trails that are currently hardcoded in the React app.

Usage:
    python manage.py seed --images-dir ../Kisumu-Explorers-main/public
"""
from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand

from explorers.models import Category, Place, Trail, TrailHighlight

PLACES = [
    ("Kajulu Hills", "Hiking", "images/kajulu hills.JPG"),
    ("Kit Mikayi", "Hiking", "images/place 1.png"),
    ("Lake Victoria", "Boat Riding", "images/lake victoria.jpg"),
    ("Kanyimon", "sky-cycling", "images/sky-cycling.JPG"),
    ("Riat Hills", "Camping", "images/camping.jpg"),
    ("Show Ground", "Team building", "images/team-building.jpg"),
]

TRAILS = [
    dict(title="Granite Ridge Summit Expedition", category="summit", location="Mt. Ololosok Pinnacle",
         elevation="2,840 m", difficulty="Moderate to Challenging", duration="6–8 Hours",
         group_size="Max 8 Explorers", price="$89 / person", rating="4.98", reviews=142,
         description="The iconic granite outcrop hike featured on traveler.com. Spectacular panoramic views, weathered rock boulders, and guided summit celebration.",
         highlights=["Rock scrambles with safety gear", "Pack lunch & hydration included", "Certified mountain guide"]),
    dict(title="High Alpine Sky Walk & Ridge Trek", category="summit", location="Grand Escarpment Range",
         elevation="3,120 m", difficulty="Challenging", duration="Full Day (10 hrs)",
         group_size="Max 6 Explorers", price="$125 / person", rating="4.95", reviews=98,
         description="A high-altitude trail over jagged ridge lines with cloud inversions and breathtaking 360-degree horizon views.",
         highlights=["Alpine sunrise start", "Satellite SOS tracking", "Professional photo package"]),
    dict(title="Emerald Gorge & Waterfall Valley", category="forest", location="Cascading River Canyon",
         elevation="1,450 m", difficulty="Easy to Moderate", duration="4 Hours",
         group_size="Max 12 Explorers", price="$65 / person", rating="4.92", reviews=210,
         description="Gentle trail through ancient temperate rainforest leading to crystal-clear natural mountain dipping pools.",
         highlights=["Waterfall swim stop", "Wildlife spotting guide", "Family friendly"]),
    dict(title="Wild Coast Headland & Sea Caves", category="coastal", location="Pacific Rim Headlands",
         elevation="420 m", difficulty="Moderate", duration="5 Hours",
         group_size="Max 10 Explorers", price="$79 / person", rating="4.96", reviews=167,
         description="Traverse sea bluffs, coastal tide pools, and dramatic ocean spray overlooks with marine life spotting.",
         highlights=["Tide pool exploration", "Sunset vista cliff lookout", "Binoculars provided"]),
]


class Command(BaseCommand):
    help = "Seed places and trails from the current frontend data."

    def add_arguments(self, parser):
        parser.add_argument("--images-dir", help="Path to the frontend 'public' folder (to upload place images).")

    def handle(self, *args, **opts):
        base = Path(opts["images_dir"]) if opts.get("images_dir") else None
        for order, (name, cat, rel) in enumerate(PLACES, start=1):
            category, _ = Category.objects.get_or_create(name=cat)
            place, created = Place.objects.get_or_create(
                name=name, defaults={"category": category, "order": order}
            )
            path = base / rel if base else None
            if created and path and path.exists():
                with path.open("rb") as fh:
                    place.image.save(path.name, File(fh), save=True)
            elif created:
                self.stdout.write(self.style.WARNING(f"No image for {name} - add one in the admin."))
        for order, data in enumerate(TRAILS, start=1):
            highlights = data.pop("highlights")
            trail, created = Trail.objects.get_or_create(title=data["title"], defaults={**data, "order": order})
            if created:
                TrailHighlight.objects.bulk_create(TrailHighlight(trail=trail, text=t) for t in highlights)
        self.stdout.write(self.style.SUCCESS("Seed complete."))
