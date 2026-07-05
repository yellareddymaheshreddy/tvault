# API Documentation

T-Vault provides simple REST API endpoints for text storage and URL shortening.

## Base URL

```
Production: https://tsvault.vercel.app
Local Dev:  http://localhost:3000
```

---

## Text Storage API

### Store Text

**Endpoint:** `POST /api/text`

**Request Body:**
```json
{
  "key": "myUniqueKey",
  "text": "Hello, World!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "key": "myUniqueKey"
}
```

**Response (Error):**
```json
{
  "error": "Key and text are required"
}
```

**Example (curl):**
```bash
curl -X POST https://tsvault.vercel.app/api/text \
  -H "Content-Type: application/json" \
  -d '{"key":"test123","text":"My secret message"}'
```

### Retrieve Text

**Endpoint:** `GET /api/text?key={key}`

**Query Parameters:**
- `key` (required): The unique key used to store the text

**Response (Success):**
```json
{
  "text": "Hello, World!"
}
```

**Response (Not Found):**
```json
{
  "error": "No text found for this key"
}
```

**Example (curl):**
```bash
curl https://tsvault.vercel.app/api/text?key=test123
```

### Short Alias for Retrieval

**Endpoint:** `GET /api/t/{key}`

This is a shorthand for text retrieval.

**Example:**
```bash
curl https://tsvault.vercel.app/api/t/test123
```

---

## URL Shortening API

### Shorten URL

**Endpoint:** `POST /api/shorten`

**Request Body:**
```json
{
  "url": "https://example.com/very/long/path",
  "key": "short" // optional custom key
}
```

**Response (Success):**
```json
{
  "code": "short"
}
```

**Response (Error):**
```json
{
  "error": "URL is required"
}
```

**Example (curl):**
```bash
# Auto-generated code
curl -X POST https://tsvault.vercel.app/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/long/path"}'

# Custom code
curl -X POST https://tsvault.vercel.app/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/long/path","key":"mylink"}'
```

### Access Short URL

**Endpoint:** `GET /u/{code}`

Redirects to the original URL.

**Example:**
```
https://tsvault.vercel.app/u/short
→ Redirects to: https://example.com/very/long/path
```

---

## Rate Limits

Currently, there are **no enforced rate limits**. Please use the API responsibly.

> ⚠️ **Note:** Excessive abuse may result in IP blocking or key restrictions in the future.

---

## Data Retention

- All data expires after **24 hours** (86400 seconds)
- This is enforced via Redis TTL (Time To Live)
- No backups or recovery after expiration

---

## Error Handling

All API endpoints return standard HTTP status codes:

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 400 | Bad Request (missing/invalid params) |
| 404 | Not Found (key doesn't exist) |
| 500 | Internal Server Error |

---

## CORS

CORS is enabled for all origins. You can make requests from any domain.

---

## Authentication

**None required.** T-Vault is designed for public, anonymous use.

---

## SDK / Libraries

Currently, there are no official SDKs. You can use any HTTP client:

### JavaScript/TypeScript
```typescript
const response = await fetch('https://tsvault.vercel.app/api/text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'mykey', text: 'Hello' })
});
const data = await response.json();
```

### Python
```python
import requests

response = requests.post('https://tsvault.vercel.app/api/text', json={
    'key': 'mykey',
    'text': 'Hello'
})
data = response.json()
```

### Go
```go
import (
    "bytes"
    "encoding/json"
    "net/http"
)

body, _ := json.Marshal(map[string]string{
    "key":  "mykey",
    "text": "Hello",
})
resp, _ := http.Post("https://tsvault.vercel.app/api/text", "application/json", bytes.NewBuffer(body))
```

---

## Questions?

- Open an issue on [GitHub](https://github.com/yellareddymaheshreddy/tvault/issues)
- Check the [README](../README.md) for setup instructions

---

**Built with Next.js API Routes and Redis**
