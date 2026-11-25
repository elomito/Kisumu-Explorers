import io

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from django.core.cache import cache
from PIL import Image
from rest_framework.test import APITestCase

from .models import Category, GalleryPhoto, Inquiry, Place, Trail, TrailHighlight, VisitedLocation


def fake_image(name="t.jpg"):
    buf = io.BytesIO()
    Image.new("RGB", (10, 10), "green").save(buf, "JPEG")
    return SimpleUploadedFile(name, buf.getvalue(), content_type="image/jpeg")


@override_settings(MEDIA_ROOT="/tmp/ke-test-media")
class ApiTests(APITestCase):
    def setUp(self):
        cache.clear()
        self.cat = Category.objects.create(name="Hiking")

    def test_only_published_places(self):
        Place.objects.create(name="A", category=self.cat, image=fake_image(), is_published=True)
        Place.objects.create(name="B", category=self.cat, image=fake_image(), is_published=False)
        data = self.client.get("/api/places/").json()
        self.assertEqual([p["name"] for p in data], ["A"])
        self.assertEqual(data[0]["category"], "Hiking")
        self.assertTrue(data[0]["image"].startswith("http"))

    def test_trail_shape_matches_frontend(self):
        t = Trail.objects.create(title="T", category="summit", location="L", group_size="Max 8", rating="4.9")
        TrailHighlight.objects.create(trail=t, text="Guide")
        d = self.client.get("/api/trails/").json()[0]
        self.assertEqual(d["groupSize"], "Max 8")
        self.assertEqual(d["highlights"], ["Guide"])

    def test_gallery_flags_and_filters(self):
        GalleryPhoto.objects.create(image=fake_image(), caption="feat", is_featured=True)
        GalleryPhoto.objects.create(image=fake_image(), caption="plain")
        GalleryPhoto.objects.create(image=fake_image(), caption="hidden", is_published=False)
        self.assertEqual(len(self.client.get("/api/gallery/").json()), 2)
        feat = self.client.get("/api/gallery/?featured=true").json()
        self.assertEqual([p["caption"] for p in feat], ["feat"])

    def test_visited_ordered_with_xy(self):
        VisitedLocation.objects.create(name="Two", order=2, x_percent=60, y_percent=30)
        VisitedLocation.objects.create(name="One", order=1, x_percent=10.5, y_percent=80)
        d = self.client.get("/api/visited/").json()
        self.assertEqual([v["name"] for v in d], ["One", "Two"])
        self.assertEqual(d[0]["x"], 10.5)

    def test_inquiry_saved_and_honeypot(self):
        r = self.client.post("/api/inquiries/", {"name": "Amina", "email": "a@x.com", "groupSize": "2 people", "message": "Hi"}, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertEqual(Inquiry.objects.get().group_size, "2 people")
        r = self.client.post("/api/inquiries/", {"name": "Bot", "email": "b@x.com", "website": "spam.com"}, format="json")
        self.assertEqual(r.status_code, 201)
        self.assertEqual(Inquiry.objects.count(), 1)

    def test_inquiry_validation_and_throttle(self):
        self.assertEqual(self.client.post("/api/inquiries/", {"name": "x", "email": "bad"}, format="json").status_code, 400)
        for _ in range(6):
            r = self.client.post("/api/inquiries/", {"name": "x", "email": "x@x.com"}, format="json")
        self.assertEqual(r.status_code, 429)

    def test_api_is_read_only(self):
        self.assertEqual(self.client.post("/api/places/", {}, format="json").status_code, 405)

    def test_admin_requires_login(self):
        self.assertEqual(self.client.get("/admin/").status_code, 302)
