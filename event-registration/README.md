# 🎉 TechFest 2025 — Event Registration Website

A full-stack event registration web app built with **HTML/CSS/JS + Node.js + Express + MongoDB**.

---

## 📁 Project Structure

```
event-registration/
├── frontend/
│   ├── index.html       ← User-facing registration page
│   ├── admin.html       ← Admin dashboard
│   ├── style.css        ← All styles
│   ├── app.js           ← Registration form logic
│   └── admin.js         ← Admin panel logic
│
└── backend/
    ├── server.js        ← Express entry point
    ├── .env             ← Environment variables
    ├── package.json
    ├── models/
    │   └── Registration.js    ← Mongoose schema
    ├── routes/
    │   └── registrationRoutes.js
    └── controllers/
        └── registrationController.js
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v16 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

---

### 2. Start MongoDB

```bash
# On Windows (if installed as a service, it may already be running)
net start MongoDB

# On macOS/Linux
mongod
# or if using Homebrew:
brew services start mongodb-community
```

---

### 3. Install Backend Dependencies

```bash
cd event-registration/backend
npm install
```

---

### 4. Configure Environment (Optional)

The `.env` file is already configured with defaults:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/event_registration
```

Change `MONGO_URI` if your MongoDB runs on a different port or requires authentication.

---

### 5. Start the Backend Server

```bash
# From the backend/ folder:
npm start

# For auto-reload during development:
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

---

### 6. Open the Frontend

Since the frontend uses plain HTML/JS, just open the files in your browser:

**Option A — Open directly:**
```
Double-click: frontend/index.html
```

**Option B — Use VS Code Live Server:**
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

> ⚠️ The frontend makes API calls to `http://localhost:5000`. Make sure the backend is running first.

---

## 🌐 REST API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/register` | Register a new user |
| `GET` | `/api/registrations` | Fetch all registrations |
| `DELETE` | `/api/registration/:id` | Delete a registration by ID |

### POST `/api/register` — Request Body
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "9876543210",
  "event": "AI & ML Summit"
}
```

### GET `/api/registrations` — Response
```json
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

---

## ✅ Features

### User Side
- Responsive homepage with 3 featured events
- Event cards with dates, descriptions, and "Register Now" buttons
- Smart registration form with live frontend validation
- Duplicate email prevention (frontend + backend)
- Success message after registration
- Loading and error states

### Admin Side
- Dashboard with registration count stats per event
- Searchable/filterable table of all registrations
- Delete registrations with confirmation modal
- Refresh button to reload data

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Fonts | Syne + DM Sans (Google Fonts) |

---

## 📦 MongoDB Collection

**Collection:** `registrations`

| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required, 2–100 chars |
| `email` | String | Required, unique |
| `phone` | String | Required, 10 digits |
| `event` | String | Required |
| `createdAt` | Date | Auto-set |

---

## 🚀 Quick Start Summary

```bash
# 1. Start MongoDB
mongod

# 2. Install & run backend
cd backend && npm install && npm start

# 3. Open frontend in browser
open frontend/index.html
```
