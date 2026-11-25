# Frontend integration guide

The Django backend (`backend/`) now serves the content that is currently hardcoded in the React app. This guide lists what the frontend needs to change, section by section.

## Setup

- **Node:** Vite 8 needs Node `20.19+` or `22.12+`. Node 18 fails at startup. Using `nvm`: `nvm install 22 && nvm use 22`.
- **Backend URL:** the frontend reads `VITE_API_URL` and falls back to `http://localhost:8000/api`. Set it in production.
- **CORS:** add the frontend's origin to `CORS_ALLOWED_ORIGINS` in `backend/.env` (default `http://localhost:5173`).
- **Run the backend:** see `backend/README.md`. `python manage.py seed --images-dir ../public` loads the current places, trails and route stops.
- **Admin:** `http://localhost:8000/<ADMIN_URL>/` (default `team-portal`, set in `backend/.env`).

Suggested helpers (`src/lib/api.js`, plus a small hook that loads a list once and exposes `{ data, loading, error }`):

```js
const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export async function getJSON(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function postJSON(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
```

## Endpoints

Only items with "Show on website" ticked in the admin are returned. All lists are plain arrays (no pagination).

| Method | URL | Fields |
|---|---|---|
| GET | `/api/places/` | `id, name, category (string), description, image, thumbnail` |
| GET | `/api/trails/` | `id, title, category, location, elevation, difficulty, duration, groupSize, price, rating (string or null), reviews, description, highlights (string[]), image, thumbnail` |
| GET | `/api/gallery/` | `id, caption, category, place, featured, image, thumbnail`. Filters: `?featured=true`, `?category=Hiking`, `?place=<id>` |
| GET | `/api/visited/` | `id, name, order, date_visited, description, x, y, photo`. `x`/`y` are percentages across/down the route picture. Ordered by `order`. |
| POST | `/api/inquiries/` | body `{ name, email, groupSize, message, website }`. Returns `201 { ok: true }`. Limited to 5 per hour per IP (`429` after that). |

Image fields can be empty (`null`), so keep a fallback in the markup. `thumbnail` is a resized version when Cloudinary is enabled.

## Changes by file

### `PlacesSection.jsx`
- Delete the hardcoded `places` array and load `GET /places/`.
- `useState(places[0].id)` must become `useState(null)`. The list is empty on first render.
- `place.description ?? DEFAULT_DESCRIPTION` should be `||`, because the API returns `""` for a blank description.
- Add loading and error states. Category chips already derive from the data.

### `TrailExplorerModal.jsx`
- Delete the `trails` array and load `GET /trails/` the first time the modal opens. Hooks must stay above the `if (!isOpen) return null`.
- Field names match the old data. `id` is now a number.
- Derive the category tabs from the data (the old hardcoded tabs only knew summit/forest/coastal).
- `rating` can be `null`, so hide the star block when it is.

### `ContactDrawer.jsx`
- `handleSubmit` should `await postJSON("/inquiries/", formData)` and set `submitted` only on success.
- Add a sending state, a disabled button, and an error message (a `429` means too many requests).
- Add a hidden `website` input that stays empty. The backend silently drops submissions where it is filled in (spam trap).
- The default `groupSize` (`"2 people"`) matches no `<option>`. Use one of the option values, e.g. `"Duo (2)"`.

### `AboutPage.jsx` (gallery section)
- Load `GET /gallery/?featured=true` and render the first 3. Keep the current static images as a fallback until 3 photos are featured.

### `Explore.jsx` (route section)
- `public/images/trails.png` already has the route line and labelled dots drawn into the picture. Do not draw a second line over it.
- Load `GET /visited/` and place a hotspot button at `left: x%`, `top: y%` over each existing dot, showing name, date and note on hover or tap.
- To make the route fully data-driven, the designer must export the picture **without** the line and dots. Then draw a `<polyline>` through the `x,y` points in `order`, plus the dots.

### All fetched sections
- Handle loading, empty and error states so the page never looks broken when the backend is down.

## Content still to replace
The trail pop-up and contact form contain template text: "traveler.com", a `+1 (800) 555-HIKE` phone number, dollar prices, and the "Pacific Rim" style trail names and locations. Replace these with real Kisumu content in the admin and the markup.

## Suggested order
Places, contact form, trails, gallery, then the route hotspots. One branch and PR per section keeps reviews small.
