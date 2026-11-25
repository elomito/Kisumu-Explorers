from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter(trailing_slash=True)
router.register("places", views.PlaceViewSet, basename="place")
router.register("trails", views.TrailViewSet, basename="trail")
router.register("gallery", views.GalleryPhotoViewSet, basename="gallery")
router.register("visited", views.VisitedLocationViewSet, basename="visited")
router.register("inquiries", views.InquiryViewSet, basename="inquiry")

urlpatterns = router.urls
