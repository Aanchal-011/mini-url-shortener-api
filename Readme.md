# Mini URL Shortener API

## Description

A minimal API to shorten URLs, redirect users, track analytics, and support optional expiry.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose

## Endpoints

### POST /shorten

**Request**

```json
{
  "url": "https://example.com",
  "expiryDate": "2025-12-31T00:00:00Z"
}
```
