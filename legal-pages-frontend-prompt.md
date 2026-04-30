# Legal Pages - Frontend Integration Prompt

Create a "Legal Pages" section in the admin panel for managing Privacy Policy and Terms of Service pages. The backend API is already built.

## API Endpoints

Base URL: `/api/legal`

| Method   | Endpoint             | Auth     | Description          |
|----------|----------------------|----------|----------------------|
| `GET`    | `/api/legal/`        | No       | Get all legal pages  |
| `GET`    | `/api/legal/{slug}`  | No       | Get page by slug     |
| `POST`   | `/api/legal/`        | Bearer   | Create legal page    |
| `PUT`    | `/api/legal/{slug}`  | Bearer   | Update legal page    |
| `DELETE` | `/api/legal/{slug}`  | Bearer   | Delete legal page    |

Slugs: `privacy-policy`, `terms-of-service`

## Request / Response Examples

### POST /api/legal/ (Create)

```json
{
  "slug": "privacy-policy",
  "title": "Privacy Policy",
  "content": "<div style='font-family: Arial;'><h1>Privacy Policy</h1><p>Content here...</p></div>"
}
```

### PUT /api/legal/privacy-policy (Update)

```json
{
  "title": "Privacy Policy",
  "content": "<div>Updated HTML content</div>"
}
```

### GET /api/legal/privacy-policy (Response)

```json
{
  "id": 1,
  "slug": "privacy-policy",
  "title": "Privacy Policy",
  "content": "<div>...</div>",
  "created_at": "2026-04-30T12:00:00Z",
  "updated_at": "2026-04-30T13:00:00Z"
}
```

## Admin Panel Requirements

### 1. Sidebar

- Add "Legal Pages" menu item to admin sidebar navigation (icon: `Scale` or `FileText` from Lucide)

### 2. Legal Pages List Page (`/admin/legal`)

- Display all legal pages in a table/card list
- Columns: Title, Slug, Last Updated
- "+ Add Page" button (top right, green)
- Each row has Edit and Delete action buttons
- If no pages exist, show empty state: "No legal pages yet. Create Privacy Policy and Terms of Service."

### 3. Create Page (`/admin/legal/create`)

- **Title** — text input
- **Slug** — select/dropdown with two options: `privacy-policy`, `terms-of-service` (disable already existing slugs)
- **Content** — large `<textarea>` for raw HTML input (monospace font, min-height 400px)
- Save button → `POST /api/legal/`

### 4. Edit Page (`/admin/legal/edit/:slug`)

- Load existing page data via `GET /api/legal/{slug}`
- **Title** — text input (pre-filled)
- **Slug** — read-only display
- **Content** — large `<textarea>` with raw HTML (pre-filled, monospace font, min-height 400px)
- Save button → `PUT /api/legal/{slug}`

### 5. Public Pages (Frontend website)

- `GET /api/legal/privacy-policy` → render HTML content on `/privacy-policy` page
- `GET /api/legal/terms-of-service` → render HTML content on `/terms-of-service` page
- Use `dangerouslySetInnerHTML` (React) or `v-html` (Vue) to render the raw HTML content

## Content textarea styling

```css
textarea.legal-content {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  min-height: 400px;
  width: 100%;
  padding: 12px;
  border: 1px solid #333;
  background: #1a1a2e;
  color: #e0e0e0;
  border-radius: 8px;
  resize: vertical;
}
```

## Auth Header

All admin endpoints require Bearer token:

```
Authorization: Bearer <access_token>
```
