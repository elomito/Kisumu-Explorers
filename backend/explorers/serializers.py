from rest_framework import serializers

from .models import GalleryPhoto, Inquiry, Place, Trail, VisitedLocation


def image_urls(request, image):
    """Return (full url, thumbnail url). Thumbnail uses Cloudinary resizing when available."""
    if not image:
        return None, None
    url = image.url
    if url.startswith("/") and request is not None:
        url = request.build_absolute_uri(url)
    thumb = url
    if "res.cloudinary.com" in url and "/upload/" in url:
        thumb = url.replace("/upload/", "/upload/w_600,q_auto,f_auto/", 1)
    return url, thumb


class ImageMixin(serializers.Serializer):
    image = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()

    def get_image(self, obj):
        return image_urls(self.context.get("request"), obj.image)[0]

    def get_thumbnail(self, obj):
        return image_urls(self.context.get("request"), obj.image)[1]


class PlaceSerializer(ImageMixin, serializers.ModelSerializer):
    category = serializers.CharField(source="category.name")

    class Meta:
        model = Place
        fields = ["id", "name", "category", "description", "image", "thumbnail"]


class TrailSerializer(ImageMixin, serializers.ModelSerializer):
    groupSize = serializers.CharField(source="group_size")
    highlights = serializers.SlugRelatedField(many=True, read_only=True, slug_field="text")

    class Meta:
        model = Trail
        fields = [
            "id", "title", "category", "location", "elevation", "difficulty",
            "duration", "groupSize", "price", "rating", "reviews",
            "description", "highlights", "image", "thumbnail",
        ]


class GalleryPhotoSerializer(ImageMixin, serializers.ModelSerializer):
    category = serializers.CharField(source="category.name", default=None)
    place = serializers.CharField(source="place.name", default=None)
    featured = serializers.BooleanField(source="is_featured")

    class Meta:
        model = GalleryPhoto
        fields = ["id", "caption", "category", "place", "featured", "image", "thumbnail"]


class VisitedLocationSerializer(serializers.ModelSerializer):
    x = serializers.DecimalField(source="x_percent", max_digits=5, decimal_places=2, coerce_to_string=False)
    y = serializers.DecimalField(source="y_percent", max_digits=5, decimal_places=2, coerce_to_string=False)
    photo = serializers.SerializerMethodField()

    class Meta:
        model = VisitedLocation
        fields = ["id", "name", "order", "date_visited", "description", "x", "y", "photo"]

    def get_photo(self, obj):
        if obj.photo_id:
            return image_urls(self.context.get("request"), obj.photo.image)[1]
        return None


class InquirySerializer(serializers.ModelSerializer):
    groupSize = serializers.CharField(source="group_size", required=False, allow_blank=True)
    # Honeypot: real people never see/fill this. Bots usually do.
    website = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Inquiry
        fields = ["name", "email", "groupSize", "message", "website"]

    def create(self, validated_data):
        validated_data.pop("website", None)
        return super().create(validated_data)
