from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

admin.site.site_header = "Kisumu Explorers"
admin.site.site_title = "Kisumu Explorers Admin"
admin.site.index_title = "Manage the website"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("explorers.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
