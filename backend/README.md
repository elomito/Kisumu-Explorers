# Kisumu Explorers – Backend (Django + DRF)

One backend, two faces:
- **Admin site** at `/team-portal/` (change with `ADMIN_URL` in `.env`) – for the team (add places, trails, photos, read inquiries).
- **Public JSON API** at `/api/` – read by the React site.

## Run locally
```bash
python -m venv venv && source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                   # set DJANGO_DEBUG=True for local dev
python manage.py migrate
python manage.py createsuperuser
python manage.py seed --images-dir ../Kisumu-Explorers-main/public   # optional: load current frontend data
python manage.py runserver
```
Admin: http://localhost:8000/team-portal/  ·  API: http://localhost:8000/api/

Images go to `media/` locally. Set `CLOUDINARY_URL` in `.env` and they go to Cloudinary instead (no code change).

## Endpoints
| Method | URL | Notes |
|---|---|---|
| GET | `/api/places/` | published places: `id, name, category, description, image, thumbnail` |
| GET | `/api/trails/` | `title, category, location, elevation, difficulty, duration, groupSize, price, rating, reviews, description, highlights[]` (same names as the React data) |
| GET | `/api/gallery/` | filters: `?featured=true` `?category=Hiking` `?place=<id>` |
| GET | `/api/visited/` | ordered dots for the illustration: `name, order, date_visited, x, y` (x/y are % of the image) |
| POST | `/api/inquiries/` | body: `{name, email, groupSize, message}`; 5 per hour per IP; honeypot field `website` must stay empty |

Only items with "Show on website" ticked are returned.

## Frontend wiring
```js
const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";
const places = await (await fetch(`${API}/places/`)).json();

// ContactDrawer submit:
await fetch(`${API}/inquiries/`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, groupSize, message }),
});
```
Add the frontend's URL to `CORS_ALLOWED_ORIGINS` in `.env`.

## Deploying
Set env vars: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`, `DATABASE_URL` (Postgres), `CLOUDINARY_URL`.
Build: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
Start: `gunicorn config.wsgi`

## Tests
`DJANGO_DEBUG=True python manage.py test`

## Not done yet
- Click-on-the-illustration helper for `VisitedLocation` x/y (admin currently takes the numbers).
- Admin user groups (e.g. "Editors" without access to Users).
