from rest_framework import mixins, status, viewsets
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from .models import GalleryPhoto, Inquiry, Place, Trail, VisitedLocation
from .serializers import (
    GalleryPhotoSerializer, InquirySerializer, PlaceSerializer,
    TrailSerializer, VisitedLocationSerializer,
)


class PlaceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        return Place.objects.filter(is_published=True).select_related("category")


class TrailViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TrailSerializer

    def get_queryset(self):
        return Trail.objects.filter(is_published=True).prefetch_related("highlights")


class GalleryPhotoViewSet(viewsets.ReadOnlyModelViewSet):
    """Filters: ?featured=true  ?category=Hiking  ?place=<place id>"""

    serializer_class = GalleryPhotoSerializer

    def get_queryset(self):
        qs = GalleryPhoto.objects.filter(is_published=True).select_related("category", "place")
        params = self.request.query_params
        if params.get("featured") == "true":
            qs = qs.filter(is_featured=True)
        if params.get("category"):
            qs = qs.filter(category__name__iexact=params["category"])
        if params.get("place"):
            qs = qs.filter(place_id=params["place"])
        return qs


class VisitedLocationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = VisitedLocationSerializer

    def get_queryset(self):
        return VisitedLocation.objects.filter(is_published=True).select_related("photo")


class InquiryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Inquiry.objects.none()
    serializer_class = InquirySerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "inquiry"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Honeypot filled in -> pretend success, save nothing.
        if serializer.validated_data.get("website"):
            return Response({"ok": True}, status=status.HTTP_201_CREATED)
        serializer.save()
        return Response({"ok": True}, status=status.HTTP_201_CREATED)
