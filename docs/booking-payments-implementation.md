# Booking and M-Pesa Payments: Implementation Specification

**Status:** Approved implementation specification  
**Version:** 1.0  
**Product:** Kisumu Explorers  
**Payment provider:** Paystack (Kenya, M-Pesa only for v1)

## 1. Purpose

This document specifies how to add bookable experiences, scheduled departures, online M-Pesa payment, customer/staff notifications, and an authenticated operations dashboard to the existing React/Vite website. It is the implementation contract for the first release.

The repository currently contains only a Vite/React frontend. Both existing placeholder booking controls—the “Reserve Hike” button in `src/components/TrailExplorerModal.jsx` (which sets local UI state) and the “Book to hike this place” button in `src/components/PlacesSection.jsx` (which logs to the console)—do not create a booking or contact a payment service. The existing trail entries and USD prices are sample content and must not be treated as real inventory or prices.

## 2. Goals and scope

### Included in v1

- Staff-managed experiences with KES per-person prices.
- Staff-managed future departures, start times, seat capacity, and open/closed state.
- Customer checkout with name, email, Safaricom number, selected departure, and party size.
- Atomic temporary seat holds and server-calculated totals.
- Paystack M-Pesa charge initiation and asynchronous payment confirmation.
- Customer-facing pending, success, failure, and expired states.
- Invited staff accounts and a protected operations dashboard.
- Booking/payment emails to customers and booking/payment alerts to staff.
- Booking cancellation records, audit history, webhook reconciliation, and operational health checks.

### Explicitly out of scope for v1

- Card, Pesalink, Airtel Money, or any other payment channel.
- Customer accounts, saved payment methods, subscriptions, or payment plans.
- Automated or dashboard-triggered refunds. Staff handle exceptional payment/refund cases outside the product and record notes/status in the dashboard when necessary.
- Multi-currency pricing, discounts, promo codes, taxes, add-ons, split settlements, or variable pricing by party size.
- Automatic rescheduling, customer self-service cancellation, and integrations with external booking systems.
- A public staff sign-up page.

## 3. Product rules and defaults

| Rule | v1 behavior |
| --- | --- |
| Currency | KES only. Persist amounts as integer KES cents. Display amounts as whole KES unless fractional prices are introduced later. |
| Payment method | Paystack mobile money with provider `mpesa`; collect the payer's Safaricom number. |
| Checkout authorization | Backend starts the charge. Customer authorizes on their device using Safaricom's flow; the site never asks for an M-Pesa PIN or OTP. |
| Seat hold | Five minutes from booking creation. The Paystack M-Pesa authorization window is documented as 180 seconds; the extra time accommodates response delivery and customer return. |
| Party size | Integer from 1 through the departure's effective maximum party size (`departures.max_party_size_override` if set, otherwise `activities.max_party_size`), and no larger than remaining capacity. |
| Price | Experience's current active per-person price, snapshotted onto the booking when created. Quantity times price determines the amount. |
| Departure | Must be active, open, in the future, and have capacity at checkout. |
| Unpaid hold expiry | Expire booking and release capacity after five minutes, unless Paystack has reported a successful payment that requires staff review. |
| Cancellation | Staff-only in v1. Cancellation is recorded and seats are released. No refund is initiated or promised by the application. |
| Accounts | Only invited staff can access the dashboard. No anonymous or public account creation. |

The business must populate accurate experiences, descriptions, policies, departure dates, and prices before live launch. No existing sample price is to be copied into the production catalog without business confirmation.

## 4. Architecture

### 4.1 Components

1. **Web client:** Existing React 19/Vite app. Add public booking/checkout screens and an `/admin` application area using client-side routing. Configure SPA fallback rewrites (`/* -> /index.html`) on static hosts so direct navigation to `/admin/*` or `/bookings/*` does not 404. The client calls the API over HTTPS and never calls Paystack with a secret credential.
2. **API:** Standalone Node.js + TypeScript service using Express. Responsibilities include public catalog reads, booking creation, capacity enforcement, Paystack calls, webhook intake, admin authentication/operations, email outbox processing, and reconciliation.
3. **Database:** Managed PostgreSQL. Use Drizzle ORM and committed SQL migrations. PostgreSQL is the source of truth for catalog, capacity, booking, payment, staff, audit, webhook, and email state.
4. **Paystack:** Use the Paystack Charge API for M-Pesa. Configure a public HTTPS webhook endpoint for `charge.success` and any relevant charge-failure events supported by the account. Confirm exact event availability in the merchant dashboard during setup.
5. **Email:** Use a mail adapter driven by SMTP-compatible environment settings. Nodemailer is the initial transport implementation. Product code enqueues messages in PostgreSQL; a worker sends them and records delivery attempts.
6. **Hosting:** Deploy the API and managed PostgreSQL as managed services. The frontend may remain on its current host. Because admin sessions use `SameSite=Lax` cookies, browsers will not attach them to cross-site `fetch` requests; in deployed environments, host the frontend and API under the same registrable root domain (for example, `kisumuexplorers.com` and `api.kisumuexplorers.com`) or reverse-proxy `/api/*` from the frontend origin. In local development, proxy `/api` through Vite. Configure API origin, CORS allowlist, webhook URL, and secrets for each environment. No hosting vendor is assumed because the repository has no current deployment configuration.

### 4.2 Suggested repository layout

```text
src/
  features/booking/       # Public booking screens and API client
  features/admin/         # Admin login, catalog, departures, bookings
  lib/api-client.js       # Shared HTTP client and error handling
server/
  src/app.ts              # Express construction and middleware
  src/routes/             # Public, admin, webhook, health routes
  src/modules/            # Booking, catalog, payments, auth, email
  src/db/                 # Drizzle schema, connection, migrations
  src/workers/             # Outbox, hold expiry, payment reconciliation
  src/config/              # Environment parsing and validation
  test/                    # API, domain, webhook, and concurrency tests
```

The server can be a separate workspace/package with its own `package.json`, TypeScript config, migrations, and scripts. Do not place server secrets or Paystack calls in Vite client modules. Vite `VITE_*` variables are public and must never contain secrets.

### 4.3 Runtime processes

- **HTTP API process:** Serves JSON routes and accepts webhook requests.
- **Worker process:** Polls a PostgreSQL-backed email outbox; expires holds; periodically reconciles attempts that remain pending beyond the provider authorization window. The worker must be safe to run in more than one instance using row locks/claim tokens.
- **Database:** Managed PostgreSQL with automated backups and TLS connections.

No separate message broker is required for v1. PostgreSQL tables provide durable job/outbox state.

## 5. User flows

### 5.1 Customer booking and payment

1. Customer browses active experiences and chooses an available departure.
2. Customer selects party size and enters full name, email, and Safaricom number.
3. Client sends an idempotency key and the selected IDs/quantity to the API. It does not submit a trusted price or total.
4. API validates the inputs and availability, computes the total, and transactionally creates a booking plus five-minute seat hold. It snapshots the experience title and unit price.
5. API persists a payment attempt and unique Paystack reference before making the Paystack request. This allows timeouts to be reconciled without creating duplicate charges.
6. API calls `POST https://api.paystack.co/charge` with email, amount in KES cents, the reference, metadata containing only internal booking/attempt IDs, and `mobile_money: { provider: "mpesa", phone: "+254..." }`.
7. API returns the booking ID, safe status, hold expiry, and Paystack-provided customer authorization/display text when available. It must not expose secret keys or raw provider diagnostics.
8. Client displays instructions and waits. It may poll the booking status endpoint at a modest interval (for example, every 3 seconds for the first minute, then every 8 seconds until the hold expires). Polling never changes payment state.
9. Paystack sends an asynchronous webhook. API verifies its signature, durably stores/deduplicates the event, and queues processing. The handler acknowledges promptly after durable acceptance.
10. Processor verifies the Paystack transaction by reference and checks that status is successful, currency is KES, amount equals the persisted attempt amount, and reference maps to that attempt. In one DB transaction it confirms payment and booking, converts held seats to booked seats, writes an audit event, and enqueues emails.
11. Client polling receives the server's final state and displays confirmation/reference or a clear failure/expiry next step.

### 5.2 Payment failure, timeout, and late success

- Explicit provider failure marks the attempt failed; the booking is failed and the hold is released. The customer may start a new booking/payment attempt if the departure still has space.
- A timeout from Paystack while creating a charge is an **unknown outcome**, not a failure. Keep the attempt in `initiating`/`pending`, retain the hold until expiry, and query Paystack using the stored reference. Do not blindly create another charge.
- If no final status is received within the 180-second M-Pesa window, verify by reference. A confirmed failure releases seats. An inconclusive status remains pending for staff review and alerts operations if it outlives its hold.
- If a success arrives after the booking expired or its seats were released, do not automatically confirm a possibly oversold departure. Record the money as received, set the booking to `payment_review`, create a high-priority audit/operations alert, and prevent another payment attempt. Staff must contact the customer and resolve outside the automated booking path. No automatic refund is offered in v1.
- If duplicate events arrive, they must have no duplicate capacity changes or emails.

### 5.3 Staff operations

- Staff signs in at `/admin/login` and can view a dashboard with departures, bookings, outstanding payment reviews, and recent payment states.
- Staff can create/edit/archive experiences; create/edit/close departures; view/search/filter bookings; inspect payment references and event timeline; and cancel a booking with a required reason.
- Only the `admin` role may invite, disable, or change staff accounts. `staff` may operate catalog/departures/bookings but may not manage accounts.
- Cancellation records actor, time, and reason. For a paid booking, cancellation does not claim that money was refunded. Seats are released only if the departure has not started; after departure, cancellation is an administrative record with no capacity adjustment.
- Refund execution and Paystack-support correspondence stay outside the site. Dashboard notes may record resolution, but v1 has no “refund” action or refund status workflow.

## 6. Domain model and database

Use UUID primary keys generated by the application/database. Store timestamps in UTC (`timestamptz`). Add `created_at` and `updated_at` to mutable business records. Use foreign keys and restrictive deletes; archive catalog rows rather than deleting records referenced by bookings.

### 6.1 `activities`

- `id UUID PK`
- `slug TEXT UNIQUE NOT NULL`
- `title TEXT NOT NULL`
- `category TEXT NOT NULL DEFAULT 'general'` (supports `GET /activities` category filtering)
- `summary TEXT NOT NULL`
- `description TEXT NOT NULL`
- `location TEXT NOT NULL`
- `duration_minutes INTEGER NULL`
- `difficulty TEXT NULL`
- `image_url TEXT NULL`
- `price_kes_cents INTEGER NOT NULL CHECK (price_kes_cents > 0)`
- `max_party_size INTEGER NOT NULL CHECK (max_party_size > 0)`
- `status TEXT NOT NULL CHECK IN ('draft','active','archived')`
- timestamps
- Index `(status, category)`.

### 6.2 `departures`

- `id UUID PK`, `activity_id UUID FK activities`
- `starts_at TIMESTAMPTZ NOT NULL`, `ends_at TIMESTAMPTZ NULL`
- `capacity INTEGER NOT NULL CHECK (capacity > 0)`
- `booked_seats INTEGER NOT NULL DEFAULT 0 CHECK (booked_seats >= 0 AND booked_seats <= capacity)`
- `max_party_size_override INTEGER NULL CHECK (max_party_size_override > 0)` (effective max party size is `COALESCE(departures.max_party_size_override, activities.max_party_size)`)
- `status TEXT NOT NULL CHECK IN ('open','closed','cancelled')`
- `created_by UUID FK admin_users`, `updated_by UUID FK admin_users`, timestamps
- Index `(activity_id, starts_at, status)`.
- `booked_seats` is a materialized count of confirmed, non-cancelled seats. Active pending holds are computed from bookings under the departure lock; do not trust a client-supplied availability count.

### 6.3 `bookings`

- `id UUID PK`; `public_code TEXT UNIQUE NOT NULL` (unguessable, customer-safe lookup code)
- `departure_id UUID FK departures`
- `status TEXT NOT NULL CHECK IN ('pending_payment','confirmed','payment_failed','expired','payment_review','cancelled')`
- Customer snapshot: `customer_name`, normalized `customer_email`, `customer_phone_e164`
- Order snapshot: `activity_title`, `departure_starts_at`, `quantity`, `unit_price_kes_cents`, `total_kes_cents`, `currency CHAR(3) DEFAULT 'KES'`
- `hold_expires_at TIMESTAMPTZ NULL`; `confirmed_at`, `cancelled_at`, `cancellation_reason` nullable
- `idempotency_key TEXT NOT NULL`; `request_fingerprint TEXT NOT NULL`
- timestamps
- Unique `(idempotency_key)`. Index `(departure_id, status, hold_expires_at)` and `(customer_email, created_at DESC)`.

### 6.4 `payment_attempts`

- `id UUID PK`; `booking_id UUID FK bookings`
- `provider TEXT NOT NULL DEFAULT 'paystack'`; `reference TEXT UNIQUE NOT NULL`
- `status TEXT NOT NULL CHECK IN ('initiating','pending','success','failed','unknown','review')`
- `amount_kes_cents INTEGER NOT NULL`; `currency CHAR(3) NOT NULL DEFAULT 'KES'`
- `provider_transaction_id TEXT NULL`; `provider_channel TEXT NULL`
- `provider_status TEXT NULL`; `failure_code TEXT NULL`; `failure_message_safe TEXT NULL`
- `requested_at`, `last_verified_at`, `succeeded_at` nullable timestamps
- `provider_metadata JSONB NULL` restricted to non-sensitive fields useful for support (never store PIN/OTP; do not retain unnecessary full payloads)
- timestamps. Unique provider transaction ID when present.

### 6.5 Operations and security tables

- `admin_users`: UUID, normalized unique email, password hash, role (`admin` or `staff`), status (`invited`, `active`, `disabled`), invite token hash/expiry, password reset token hash/expiry, last login, timestamps.
- `admin_sessions`: opaque session-token hash, user FK, CSRF token hash, expiry, created/last-seen timestamps. Store only hashes of bearer/session tokens.
- `audit_events`: actor type/id, action, entity type/id, timestamp, request ID, and redacted JSON details. Append-only for application paths.
- `paystack_webhook_events`: unique event fingerprint, event type, reference, received time, processing status, attempt count, processed time, safe error summary, and minimal payload JSON needed for reconciliation. Unique event identity when Paystack provides one; additionally dedupe by event type/reference/payload hash.
- `email_outbox`: UUID, event key unique, recipient, template, safe template data, status (`queued`,`sending`,`sent`,`failed`), attempt count, next attempt, last error safe, sent time.
- `idempotency_records` may be folded into booking columns for booking creation; use a separate table if supporting idempotency for other mutations.

### 6.6 Amount, phone, and snapshots

- Convert KES to cents exactly with integer arithmetic. Never use floating-point for stored or compared money.
- Accept Kenyan phone input in common local forms, normalize to E.164 `+254...`, reject invalid/incomplete numbers, and display a masked form in admin lists.
- Booking title, departure time, unit price, quantity, and total are immutable snapshots after creation. Later catalog edits cannot change an existing payment amount or receipt.

## 7. Booking and payment state transitions

Booking status and payment attempt status are separate. Payment state is never inferred solely from booking status.

| Current booking | Event | Next booking | Seat effect |
| --- | --- | --- | --- |
| `pending_payment` | Verified successful payment before hold expiry, seats still held | `confirmed` | Remove active hold; increment `booked_seats` by quantity |
| `pending_payment` | Verified failure | `payment_failed` | Release hold |
| `pending_payment` | Hold expires, no confirmed success | `expired` | Release hold |
| `pending_payment` | Verified success but hold expired / no capacity assurance | `payment_review` | Do not increment booked seats automatically; alert staff |
| `payment_failed` / `expired` | Late verified success | `payment_review` | No automatic seat allocation; alert staff |
| `confirmed` | Staff cancellation before departure start | `cancelled` | Decrement booked seats exactly once |
| `confirmed` | Staff cancellation after departure start | `cancelled` | No seat adjustment |
| `payment_review` | Staff resolves by confirming if capacity exists | `confirmed` | Increment booked seats transactionally |
| `payment_review` | Staff records non-booking resolution | remains `payment_review` or `cancelled` with explicit note | No automatic refund operation |

Valid payment-attempt transitions: `initiating -> pending|success|failed|unknown`; `pending|unknown -> success|failed|review`; terminal `success` and `failed` cannot be overwritten by duplicate or contradictory events. Any contradiction is recorded for review, never silently applied.

All transitions must execute in database transactions and append an audit event. Email outbox entries are inserted in the same transaction as the business state change.

## 8. HTTP API contract

Prefix all routes with `/api/v1`. Use JSON, ISO-8601 UTC timestamps, UUID identifiers, and standard error shape:

```json
{
  "error": {
    "code": "DEPARTURE_FULL",
    "message": "This departure no longer has enough seats.",
    "requestId": "...",
    "details": {}
  }
}
```

Do not return stack traces, SQL errors, provider secret details, or full provider payloads. Validate all bodies/params with Zod and reject unknown fields on writes.

### 8.1 Public routes

| Method and path | Purpose |
| --- | --- |
| `GET /activities` | List active activities and currently bookable future departures. Supports category/search and cursor or page pagination. |
| `GET /activities/:slug` | Activity details with open departures and computed remaining seats. |
| `POST /bookings` | Create booking + seat hold + first M-Pesa attempt. Requires `Idempotency-Key` header. |
| `GET /bookings/:publicCode/status` | Return minimal status, amount, activity/departure snapshot, safe payment instructions/status, expiry, and `canRetry: boolean` (true only when `payment_failed` or `expired` and the departure remains open, future, and has capacity). Rate-limit and use high-entropy public code. |
| `POST /webhooks/paystack` | Verify signature and durably accept Paystack event. No session auth; strict signature verification is mandatory. |

`POST /bookings` request:

```json
{
  "departureId": "uuid",
  "quantity": 2,
  "customer": {
    "name": "Amina Example",
    "email": "amina@example.com",
    "phone": "+2547..."
  }
}
```

`Idempotency-Key` must be an unpredictable client-generated UUID. For a repeated key with an identical normalized request, return the original booking/payment response. If the same key is reused with a different request fingerprint, return `409 IDEMPOTENCY_KEY_REUSED`. A new attempt requires a new key and is permitted only when no unresolved active attempt exists.

Successful create response (`201` for new resource, `200` for idempotent replay):

```json
{
  "booking": {
    "publicCode": "opaque-code",
    "status": "pending_payment",
    "activityTitle": "...",
    "departureStartsAt": "...Z",
    "quantity": 2,
    "unitPriceKesCents": 500000,
    "totalKesCents": 1000000,
    "currency": "KES",
    "holdExpiresAt": "...Z"
  },
  "payment": {
    "status": "pending",
    "authorizationMessage": "Follow the M-Pesa prompt on your phone.",
    "displayText": "..."
  }
}
```

Only include Paystack `display_text` when returned, sanitize it as plain text, and provide a safe fallback instruction. Never return secret data.

### 8.2 Admin routes

All admin routes require a valid session, CSRF protection for mutations, and role authorization.

| Method/path | Purpose |
| --- | --- |
| `POST /admin/auth/login` | Authenticate invited/active staff; set secure session cookie |
| `POST /admin/auth/logout` | Revoke current session |
| `GET /admin/auth/me` | Current user and role |
| `POST /admin/auth/accept-invitation` | Set password with unexpired single-use invite token |
| `POST /admin/auth/request-password-reset` | Rate-limited generic request; emails single-use hashed reset token |
| `POST /admin/auth/reset-password` | Set new password with unexpired single-use reset token and revoke all sessions |
| `GET /admin/users` | Admin-only paginated list of staff accounts and invitation status |
| `POST /admin/users/invitations` | Admin-only invite |
| `PATCH /admin/users/:id` | Admin-only role change or account disable (revokes active sessions) |
| `GET/POST /admin/activities` | List/create activities |
| `GET/PATCH /admin/activities/:id` | Read/update/archive activity |
| `GET/POST /admin/departures` | List/create departures |
| `GET/PATCH /admin/departures/:id` | Read/update/close/cancel departure |
| `GET /admin/bookings` | Search/filter/paginate bookings by status, date, activity, email, or public code |
| `GET /admin/bookings/:id` | Booking, payment attempt, webhook, email, and audit timeline |
| `POST /admin/bookings/:id/cancel` | Cancel with required reason and capacity rules |
| `POST /admin/bookings/:id/resolve-payment-review` | Confirm booking only if seats remain, or record an external resolution note |
| `GET /admin/audit-events` | Filterable audit history |
| `GET /admin/dashboard/summary` | Counts for upcoming departures, pending payments, confirmed seats, and payment reviews |

Admin list routes must paginate and avoid exposing raw phone numbers except on a booking detail screen for authorized staff. All admin mutations require an audit record.

### 8.3 Status and error codes

Use HTTP `400` for malformed/invalid input, `401` unauthenticated, `403` unauthorized, `404` absent resource, `409` stale/full/conflicting state, `422` valid syntax but invalid business rule, `429` throttling, and `500/503` unexpected/transient service failures. Stable machine codes include `ACTIVITY_UNAVAILABLE`, `DEPARTURE_CLOSED`, `DEPARTURE_FULL`, `HOLD_EXPIRED`, `INVALID_PHONE`, `IDEMPOTENCY_KEY_REUSED`, `PAYMENT_PENDING`, and `PAYMENT_REVIEW_REQUIRED`.

## 9. Capacity concurrency and idempotency

### 9.1 Reserve seats

Within a DB transaction:

1. Lock the target departure row with `SELECT ... FOR UPDATE`.
2. Validate active activity/departure, future start time, and quantity constraints.
3. Expire stale holds for that departure (locking their booking rows consistently).
4. Calculate `available = capacity - booked_seats - sum(quantity for unexpired pending_payment bookings)`.
5. If insufficient, return `409 DEPARTURE_FULL`.
6. Insert booking snapshot with `hold_expires_at = now() + interval '5 minutes'`, payment attempt and idempotency key; commit before external Paystack call.

Every code path that changes booked seats, active hold, or booking capacity must lock the same departure row first. Use a consistent lock order (departure, booking, payment attempt) to avoid deadlocks.

### 9.2 Start Paystack charge safely

Persist the attempt/reference before the provider call. Use a cryptographically random reference with allowed Paystack characters and unique DB constraint. Include only internal UUIDs in metadata. If the provider call errors or times out, mark the attempt `unknown` and reconcile the same reference. Do not retry the charge creation automatically unless Paystack confirms no charge was created. Expose an API-level idempotency contract to prevent browser retries from making duplicate bookings/charges.

## 10. Paystack M-Pesa integration

### 10.1 Charge request

Server calls `POST https://api.paystack.co/charge` using HTTPS and `Authorization: Bearer <secret>`. Send:

```json
{
  "email": "customer@example.com",
  "amount": "1000000",
  "currency": "KES",
  "reference": "generated-unique-reference",
  "metadata": {
    "booking_id": "internal-uuid",
    "payment_attempt_id": "internal-uuid"
  },
  "mobile_money": {
    "provider": "mpesa",
    "phone": "+2547..."
  }
}
```

Amount is an integer string in the smallest KES unit as required by Paystack. The API must validate the provider response shape and persist only needed fields. A provider response such as `pay_offline` means awaiting customer authorization; it is not a successful payment.

### 10.2 Webhook security and processing

- Configure the current Paystack webhook signing secret from the Paystack dashboard. Prefer the current `Paystack-Signature` format. Read raw request bytes before JSON parsing.
- Verify timestamped signature per Paystack docs: parse `t` and all `v1` values (each `v1` entry may carry a key-ID prefix such as `v1=whk_3f9a1c2e:9d1b...`; strip any `<key_id>:` prefix before comparison and evaluate all `v1` entries to support secret rotation), reject timestamps outside a five-minute window, calculate HMAC-SHA512 over `t + "." + rawBody` with the complete webhook signing secret, and use constant-time comparison. Support the legacy `x-paystack-signature` HMAC only during an explicitly configured migration if the account still emits it; never accept unsigned events.
- Webhook path must be HTTPS in deployed environments. Optionally add Paystack IP allowlisting as defense in depth; signature verification remains required.
- Validate JSON shape, event name, payment reference, amount, currency, and provider transaction identifiers. Never trust metadata alone as proof.
- Insert the event durably with dedupe key before returning `200`. Return `401` on invalid signature; `400` for malformed payload; `200` for verified, durably accepted events even if background processing is queued. Do not hold the HTTP request open for email or reconciliation.
- Process `charge.success` by calling `GET /transaction/verify/:reference` server-side and compare expected amount, `KES`, successful status, and exact reference against DB state. Apply state transition and capacity update transactionally.
- Process explicit failure events only after matching the attempt and confirming final status; Paystack event availability varies, so scheduled verification is required for non-success outcomes.
- Store safe payload subset and processing outcome. Deduplicate by provider event identity when available and by stable event/reference/payload fingerprint. Duplicate delivery must be a no-op.
- Alert on invalid signatures, unmatched references, amount/currency mismatch, provider success after expiry, and repeated processing failures.

### 10.3 Reconciliation

Worker scans `initiating`, `pending`, and `unknown` attempts past configured thresholds. Verify via Paystack transaction verification by reference. Apply confirmed success/failure using the same transition service used by webhooks. Keep inconclusive cases pending/review and alert staff. Do not release a hold while provider state is ambiguous without recording a review case.

### 10.4 Payment availability and operations

Before production, merchant must enable Mobile Money/M-Pesa in Paystack dashboard, confirm account onboarding/settlement settings, configure webhook, verify test and live keys separately, and run M-Pesa test transactions. Customer authorization may require a live Safaricom number in production; never ask customers for their M-Pesa PIN or OTP. Paystack's M-Pesa customer/refund support process is outside automated v1.

## 11. Admin authentication and authorization

- Invitation flow: admin submits staff email/role; API creates single-use random token, stores only hash with expiry, and emails invitation link. Default expiry: 24 hours. Accepting sets password, activates account, consumes token, and appends audit event.
- Passwords: Argon2id hash with maintained library defaults; never log or email passwords. Enforce reasonable minimum length (at least 12 characters) and reject compromised/common passwords if a maintained local check is available. No MFA in v1; design session storage so MFA can be added later.
- Sessions: opaque random ID in `HttpOnly`, `Secure`, `SameSite=Lax` cookie, server-side hashed session, 8-hour absolute lifetime and 30-minute idle expiry. Rotate session after login and role change. Revoke on logout, account disable, and password reset. Because `SameSite=Lax` cookies are omitted on cross-site `fetch` requests, deploy the web app and API under the same registrable root domain or proxy `/api/*` via the frontend host.
- CSRF: require CSRF token for cookie-authenticated state-changing routes; validate `Origin`/`Referer` against configured application origin. CORS allowlist must be exact origins, not wildcard credentials.
- Rate-limit login, invitation acceptance, booking create, and status lookup. Generic login errors prevent account enumeration.
- Roles: `admin` manages users and all operations; `staff` manages experiences, departures, bookings, and payment-review notes, but not users/roles.
- Bootstrap first admin through a one-time CLI command or protected deployment job; never seed a known production password.

## 12. Email and outbox behavior

Use event-key uniqueness so repeated webhook delivery or retries cannot send duplicates.

| Trigger | Recipient | Content |
| --- | --- | --- |
| Booking created/payment pending | Customer | Experience/departure, party size, amount, masked phone, authorization instructions, expiry and support contact |
| Payment confirmed | Customer | Booking code, confirmed experience/departure, party size, amount and arrival details/policy |
| Payment failed or hold expired | Customer | State, whether seats were released, and how to try again/contact staff |
| New confirmed booking | Staff distribution | Booking code, experience/departure, quantity, amount, customer contact |
| Payment review or mismatch | Staff/admin | High-priority exception, reference, booking, safe failure context |
| Invitation | Invited staff | Single-use invite link and expiry |

Use branded templates with plain-text fallback. Configure sender name/address, SMTP host, port, user, password, TLS mode, and staff notification addresses in secrets/config. Retry transient failures with exponential backoff and jitter; cap attempts (for example 8) then mark dead-lettered and alert operations. Permanent address/template errors should not block booking state. Do not put sensitive payment details or full phone numbers in staff distribution email.

## 13. Frontend behavior

### Public experience

- Replace fake immediate reservation success with a checkout form/modal/page tied to selected activity and departure.
- Display KES prices and clearly show quantity and total before submission.
- Require name, valid email, Kenyan M-Pesa phone, and party size. Show inline validation and accessible labels/errors.
- Disable duplicate submission while request is in flight; reuse idempotency key after network retry for the same form submission.
- Show distinct states: editing, starting payment, awaiting M-Pesa prompt, confirmed, failed, expired, and staff review. Preserve safe booking code for support.
- Poll status without allowing client-side mutation. Provide a retry path only when API says retry is allowed and seats are available.
- Do not claim “reserved” until backend confirms payment. For pending authorization say “Awaiting M-Pesa confirmation.”

### Admin

- Add `/admin/login`, protected admin shell, dashboard overview, activities editor, departure manager, booking list/detail, and exception/review panel.
- Hide controls by role and enforce authorization again in API.
- Use confirmation dialogs for archive, close/cancel departure, and cancellation. Require reason for cancellation and review resolution.
- Show amounts with KES formatting, local date/time for display, UTC in APIs/storage, clear payment references, masked phone in lists, and full contact only in authorized detail.
- Add responsive layouts, keyboard support, loading/empty/error states, focus handling, and accessible status text.

## 14. Configuration and secrets

Required configuration (names may follow deployment platform conventions but must map to these settings):

```text
NODE_ENV
PORT
DATABASE_URL
APP_ORIGIN
PUBLIC_API_ORIGIN
PAYSTACK_SECRET_KEY
PAYSTACK_WEBHOOK_SIGNING_SECRET
PAYSTACK_API_BASE_URL=https://api.paystack.co
EMAIL_HOST
EMAIL_PORT
EMAIL_USER
EMAIL_PASSWORD
EMAIL_FROM_NAME
EMAIL_FROM_ADDRESS
STAFF_NOTIFICATION_EMAILS
SESSION_SECRET
INVITATION_BASE_URL
LOG_LEVEL
CHECKOUT_ENABLED=true
```

Validate all configuration at process startup and fail closed if required values are missing or malformed. `.env` and `.env.*` files are local-only and explicitly ignored in `.gitignore`; provide `.env.example` with empty placeholders, never real credentials. Use separate Paystack test/live credentials and separate DBs for local, staging, production. Rotate secrets through platform secret management and document rotation procedure.

## 15. Observability and support

- Structured JSON logs with request ID, route, duration, response status, booking UUID, attempt UUID, and Paystack reference when relevant. Redact authorization headers, cookies, passwords, invitation tokens, full phone, and email where not necessary.
- Metrics/alerts: API availability and latency; DB connection failures; webhook accepted/rejected/processing counts; pending attempts older than 3 minutes; holds older than 5 minutes; payment review count; email queue age/failures; available capacity consistency.
- Health routes: `/health/live` (process up) and `/health/ready` (DB reachable and migrations compatible). Do not expose secrets or detailed infrastructure to public health responses.
- Admin dashboard surfaces failed email and payment review state; it must not claim the customer was notified until outbox says sent.
- Maintain DB backups and test restoration before launch. Keep an operational runbook for webhook replay, provider verification, expired holds, email failure, and late-success resolution.

## 16. Testing and acceptance criteria

No production launch until all criteria below pass in a test environment.

### Domain and database tests

- Price computation uses integer cents, exact snapshot, and rejects tampered client totals.
- Quantity validation, inactive activity, closed/past departure, and insufficient capacity are rejected.
- Concurrent bookings for the final seats never exceed capacity.
- Expired holds release capacity exactly once. Confirmed/cancelled transitions update `booked_seats` exactly once.
- Cancellation before departure releases seats; after departure does not.
- Same idempotency key + same payload returns original booking; changed payload returns conflict.

### Paystack and webhook tests

- Charge request uses `provider=mpesa`, normalized phone, correct KES subunit amount, stored unique reference, and no client-controlled amount.
- `pay_offline` response is pending, not paid; display text is safely rendered.
- Valid current Paystack signature is accepted; invalid signature, stale timestamp, altered raw bytes, and missing signature are rejected.
- Duplicate webhook events do not duplicate confirmation, capacity, audits, or email.
- Success is verified against Paystack and matched on status, amount, currency, and reference.
- Failure, timeout/unknown response, delayed webhook, provider verification outage, and late success after expired hold behave per state table.
- Mismatched amount/currency/reference enters review and never confirms booking.

### Auth/admin/email tests

- Unauthenticated users cannot access admin routes; staff cannot invite/disable accounts; disabled users and expired sessions fail.
- CSRF, CORS, login throttling, invitation single-use/expiry, role checks, and audit records work.
- Customer/staff emails enqueue transactionally, deduplicate, retry transient errors, and do not block booking transitions.
- Sensitive values do not appear in logs, error responses, or email content.

### End-to-end acceptance

1. Staff invites an operator, creates an activity/price and departure/capacity.
2. Customer books available seats, sees KES total, submits Safaricom number, and gets M-Pesa prompt instructions.
3. A test payment success webhook is verified; customer sees confirmed booking, capacity updates, and customer/staff emails send once.
4. A failed/abandoned payment releases the hold and displays an accurate failure/expiry state.
5. Two customers racing for the final seats cannot both obtain holds.
6. Admin records cancellation with reason and sees the audit timeline; the UI does not promise a refund.
7. Payment review exception is visible to staff and never silently treated as booked or refunded.

## 17. Implementation sequence

1. Create server workspace, environment validation, PostgreSQL connection, migrations, health endpoints, logging, and local development instructions.
2. Implement domain schema, catalog/departure admin APIs, invitation/session auth, roles, and audit events.
3. Implement public activity/departure reads, booking idempotency, capacity locking, hold expiration worker, and basic customer checkout UI.
4. Implement Paystack charge initiation, safe timeout handling, webhook signature verification, event inbox, verification/reconciliation, and payment-review operations.
5. Implement email outbox and templates; wire confirmed/pending/failure/admin notifications.
6. Implement complete dashboard, booking search/detail, cancellation, and payment review resolution.
7. Run automated and end-to-end test plan in Paystack test environment; verify capacity race behavior and webhook replay.
8. Deploy staging API/database, configure HTTPS webhook, run Paystack ping/test flows, verify email deliverability and backups.
9. Enter actual catalog/prices/departures, configure live Paystack keys and webhook signing secret, bootstrap admin, verify M-Pesa is enabled, and perform a controlled live transaction.
10. Monitor first bookings and keep a rollback procedure: disable new checkout via server feature flag while preserving status lookup/admin access and reconciliation.

## 18. Launch checklist

- [ ] Business confirms actual activities, prices, capacities, departure times, booking/cancellation language, customer support contact, and arrival instructions.
- [ ] Paystack merchant account is approved/configured for Kenya and M-Pesa; test and live keys are stored only in secrets management.
- [ ] HTTPS frontend/API domains and exact CORS origins are configured.
- [ ] Paystack webhook URL uses HTTPS, subscribes to required charge events, verifies signatures, and has passed a signed test/ping.
- [ ] Database migrations, backups, restore path, connection limits, and monitoring are verified.
- [ ] Email sender/domain is configured and tested for customer and staff delivery.
- [ ] First admin is provisioned securely; invitation flow and access controls are tested.
- [ ] Payment verification, delayed/duplicate webhooks, hold expiry, and late-success alert paths are tested.
- [ ] Privacy notice and booking/cancellation terms reflect actual business policy.
- [ ] Staff knows how to find Paystack references, handle payment-review cases, and communicate cancellation/refund policy.

## 19. Paystack references

- [Charge API](https://paystack.com/docs/api/charge/) — M-Pesa `mobile_money` provider/phone fields and server-side charge endpoint.
- [Payment channels and mobile money](https://paystack.com/docs/payments/payment-channels/) — supported Kenya M-Pesa flow, asynchronous authorization, webhook and verification guidance.
- [Webhooks](https://paystack.com/docs/payments/webhooks/) — current timestamped `Paystack-Signature` raw-body verification and retry behavior.
- [API keys](https://paystack.com/docs/developer-tools/api-keys/) — test/live credentials and server-only secret handling.
- [Supported currencies](https://paystack.com/docs/api/) — KES and subunit representation.
- [Pay with M-PESA support article](https://support.paystack.com/en/articles/2128322) — merchant enablement and current M-Pesa refund support process.
