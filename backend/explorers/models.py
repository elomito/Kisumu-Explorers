from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=60, unique=True, help_text="e.g. Hiking, Camping, Boat Riding")

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Place(models.Model):
    name = models.CharField(max_length=120)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="places")
    image = models.ImageField(upload_to="places/")
    description = models.TextField(blank=True, help_text="Shown when someone opens the place card.")
    is_published = models.BooleanField("Show on website", default=True)
    order = models.PositiveIntegerField("Display order", default=0, help_text="Smaller numbers show first.")

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Trail(models.Model):
    title = models.CharField(max_length=160)
    category = models.CharField(max_length=40, help_text="Filter group, e.g. summit, forest, coastal")
    location = models.CharField(max_length=160)
    elevation = models.CharField(max_length=40, blank=True, help_text='e.g. "2,840 m"')
    difficulty = models.CharField(max_length=60, blank=True)
    duration = models.CharField(max_length=60, blank=True, help_text='e.g. "6-8 Hours"')
    group_size = models.CharField(max_length=60, blank=True, help_text='e.g. "Max 8 Explorers"')
    price = models.CharField(max_length=60, blank=True, help_text='Shown as typed, e.g. "KES 2,500 / person"')
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    reviews = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="trails/", blank=True)
    is_published = models.BooleanField("Show on website", default=True)
    order = models.PositiveIntegerField("Display order", default=0)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title


class TrailHighlight(models.Model):
    trail = models.ForeignKey(Trail, on_delete=models.CASCADE, related_name="highlights")
    text = models.CharField(max_length=160)

    def __str__(self):
        return self.text


class GalleryPhoto(models.Model):
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=200, blank=True)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL, related_name="photos")
    place = models.ForeignKey(Place, null=True, blank=True, on_delete=models.SET_NULL, related_name="photos")
    is_featured = models.BooleanField("Featured", default=False, help_text="Show on the homepage / about page.")
    is_published = models.BooleanField("Show on website", default=True, help_text="Untick to hide without deleting.")
    order = models.PositiveIntegerField("Display order", default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.caption or f"Photo {self.pk}"


class VisitedLocation(models.Model):
    """A dot on the 'Go places with us' illustration. x/y are percentages of the image."""

    name = models.CharField(max_length=120)
    date_visited = models.DateField(null=True, blank=True)
    order = models.PositiveIntegerField(help_text="Position along the line: 1 is first, 2 second, ...")
    x_percent = models.DecimalField("Across (%)", max_digits=5, decimal_places=2, help_text="0 = left edge, 100 = right edge")
    y_percent = models.DecimalField("Down (%)", max_digits=5, decimal_places=2, help_text="0 = top edge, 100 = bottom edge")
    description = models.CharField(max_length=240, blank=True)
    photo = models.ForeignKey(GalleryPhoto, null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    is_published = models.BooleanField("Show on website", default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.order}. {self.name}"


class Inquiry(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    group_size = models.CharField(max_length=60, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    handled = models.BooleanField(default=False, help_text="Tick once someone has replied.")

    class Meta:
        verbose_name_plural = "inquiries"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.created_at:%d %b %Y})"
