from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Category, GalleryPhoto, Inquiry, Place, Trail, TrailHighlight, VisitedLocation,
)


def preview(obj, field="image", size=60):
    img = getattr(obj, field)
    if not img:
        return "-"
    return format_html(
        '<img src="{}" style="height:{}px;border-radius:6px;object-fit:cover;">', img.url, size
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    search_fields = ["name"]


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "photo", "order", "is_published"]
    list_editable = ["order", "is_published"]
    list_filter = ["category", "is_published"]
    search_fields = ["name", "description"]
    readonly_fields = ["photo"]

    @admin.display(description="Photo")
    def photo(self, obj):
        return preview(obj)


class HighlightInline(admin.TabularInline):
    model = TrailHighlight
    extra = 3
    verbose_name = "highlight"


@admin.register(Trail)
class TrailAdmin(admin.ModelAdmin):
    list_display = ["title", "location", "difficulty", "price", "order", "is_published"]
    list_editable = ["order", "is_published"]
    list_filter = ["category", "is_published"]
    search_fields = ["title", "location"]
    inlines = [HighlightInline]


@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display = ["photo", "caption", "category", "place", "is_featured", "is_published", "order"]
    list_editable = ["is_featured", "is_published", "order"]
    list_filter = ["is_featured", "is_published", "category", "place"]
    search_fields = ["caption"]
    readonly_fields = ["photo"]
    actions = ["publish", "hide", "feature"]

    @admin.display(description="Photo")
    def photo(self, obj):
        return preview(obj)

    @admin.action(description="Show selected photos on the website")
    def publish(self, request, queryset):
        queryset.update(is_published=True)

    @admin.action(description="Hide selected photos from the website")
    def hide(self, request, queryset):
        queryset.update(is_published=False)

    @admin.action(description="Mark selected photos as featured")
    def feature(self, request, queryset):
        queryset.update(is_featured=True)


@admin.register(VisitedLocation)
class VisitedLocationAdmin(admin.ModelAdmin):
    list_display = ["order", "name", "date_visited", "x_percent", "y_percent", "is_published"]
    list_display_links = ["name"]
    list_editable = ["is_published"]
    ordering = ["order"]


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ["created_at", "name", "email", "group_size", "handled"]
    list_editable = ["handled"]
    list_filter = ["handled", "created_at"]
    search_fields = ["name", "email", "message"]
    readonly_fields = ["name", "email", "group_size", "message", "created_at"]
    actions = ["mark_handled"]

    def has_add_permission(self, request):
        return False

    @admin.action(description="Mark selected inquiries as handled")
    def mark_handled(self, request, queryset):
        queryset.update(handled=True)
