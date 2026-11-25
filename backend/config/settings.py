import os
from pathlib import Path

import dj_database_url
from django.templatetags.static import static
from django.urls import reverse_lazy

BASE_DIR = Path(__file__).resolve().parent.parent


def load_dotenv():
    """Tiny .env loader so no extra dependency is needed."""
    env_file = BASE_DIR / ".env"
    if not env_file.exists():
        return
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            os.environ.setdefault(key.strip(), value.strip())


load_dotenv()


def env_list(name, default=""):
    return [v.strip() for v in os.environ.get(name, default).split(",") if v.strip()]


DEBUG = os.environ.get("DJANGO_DEBUG", "False") == "True"
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-only-insecure-key")
if not DEBUG and SECRET_KEY == "dev-only-insecure-key":
    raise RuntimeError("Set DJANGO_SECRET_KEY when DJANGO_DEBUG is not True.")

# Where the admin lives. Change it in .env to something only your team knows.
ADMIN_URL = os.environ.get("ADMIN_URL", "team-portal").strip("/") + "/"

ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")
CSRF_TRUSTED_ORIGINS = env_list("CSRF_TRUSTED_ORIGINS")

USE_CLOUDINARY = bool(os.environ.get("CLOUDINARY_URL"))

INSTALLED_APPS = (
    # cloudinary_storage must come before staticfiles
    (["cloudinary_storage"] if USE_CLOUDINARY else [])
    + [
        "unfold",  # admin theme: must come before django.contrib.admin
        "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.contenttypes",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
    ]
    + (["cloudinary"] if USE_CLOUDINARY else [])
    + [
        "corsheaders",
        "rest_framework",
        "explorers",
    ]
)

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# An empty DATABASE_URL (as in .env.example) must fall back to SQLite.
DATABASE_URL = os.environ.get("DATABASE_URL") or f"sqlite:///{BASE_DIR / 'db.sqlite3'}"
DATABASES = {"default": dj_database_url.parse(DATABASE_URL, conn_max_age=600)}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Nairobi"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

STORAGES = {
    "default": {
        "BACKEND": (
            "cloudinary_storage.storage.MediaCloudinaryStorage"
            if USE_CLOUDINARY
            else "django.core.files.storage.FileSystemStorage"
        )
    },
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}
if DEBUG:
    STORAGES["staticfiles"] = {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- API ---
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
    "DEFAULT_AUTHENTICATION_CLASSES": [],  # public, read-only API; admin uses Django sessions
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_PAGINATION_CLASS": None,
    "DEFAULT_THROTTLE_CLASSES": [],
    "DEFAULT_THROTTLE_RATES": {"inquiry": "5/hour"},
}

CORS_ALLOWED_ORIGINS = env_list("CORS_ALLOWED_ORIGINS", "http://localhost:5173")
CORS_URLS_REGEX = r"^/api/.*$"

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True


# --- Admin look & feel (django-unfold) ---
# Colours come from the public site: orange #e75606 accent, warm brown/cream neutrals.
UNFOLD = {
    "SITE_TITLE": "Kisumu Explorers",
    "SITE_HEADER": "Kisumu Explorers",
    "SITE_SUBHEADER": "Website manager",
    "SITE_SYMBOL": "hiking",
    "SITE_URL": os.environ.get("FRONTEND_URL", "http://localhost:5173"),
    "STYLES": [lambda request: static("explorers/admin.css")],
    "BORDER_RADIUS": "12px",
    "COLORS": {
        "base": {
            "50": "oklch(98.5% .004 87)",
            "100": "oklch(95.9% .013 86.8)",
            "200": "oklch(91% .02 86)",
            "300": "oklch(85% .025 86)",
            "400": "oklch(70% .03 88)",
            "500": "oklch(55% .03 90)",
            "600": "oklch(47% .03 91)",
            "700": "oklch(39% .031 91.5)",
            "800": "oklch(29.8% .031 91.7)",
            "900": "oklch(24% .028 92)",
            "950": "oklch(18% .02 92)",
        },
        "primary": {
            "50": "oklch(97.5% .014 55)",
            "100": "oklch(95.2% .03 52)",
            "200": "oklch(90% .06 48)",
            "300": "oklch(83% .11 45)",
            "400": "oklch(73% .16 43)",
            "500": "oklch(67% .19 42)",
            "600": "oklch(63.9% .194 41.3)",
            "700": "oklch(55% .17 40)",
            "800": "oklch(46% .14 40)",
            "900": "oklch(39% .11 40)",
            "950": "oklch(27% .08 40)",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": "Website content",
                "separator": True,
                "items": [
                    {"title": "Places", "icon": "landscape", "link": reverse_lazy("admin:explorers_place_changelist")},
                    {"title": "Trails", "icon": "hiking", "link": reverse_lazy("admin:explorers_trail_changelist")},
                    {"title": "Photo gallery", "icon": "photo_library", "link": reverse_lazy("admin:explorers_galleryphoto_changelist")},
                    {"title": "Places we've been", "icon": "route", "link": reverse_lazy("admin:explorers_visitedlocation_changelist")},
                    {"title": "Categories", "icon": "label", "link": reverse_lazy("admin:explorers_category_changelist")},
                ],
            },
            {
                "title": "Messages",
                "separator": True,
                "items": [
                    {
                        "title": "Inquiries",
                        "icon": "mail",
                        "link": reverse_lazy("admin:explorers_inquiry_changelist"),
                        "badge": "explorers.admin.unhandled_inquiries",
                    },
                ],
            },
            {
                "title": "Team",
                "separator": True,
                "items": [
                    {"title": "Users", "icon": "person", "link": reverse_lazy("admin:auth_user_changelist")},
                    {"title": "Groups", "icon": "group", "link": reverse_lazy("admin:auth_group_changelist")},
                ],
            },
        ],
    },
}
