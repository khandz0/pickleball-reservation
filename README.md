# 🏓 Pickleball Reservation API

A backend-focused RESTful API that allows users to register, log in, and find nearby pickleball courts using the Google Maps & Places APIs, and reserve courts with admin-level management features.

Perfect for backend development practice with authentication, access control, database relationships, and external API integration.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Token-based login and route protection
- 🧑‍💼 **Admin Role Support** – Admins can manage users and reservations
- 📍 **Nearby Court Search** – Uses Google Places API to find courts by address or coordinates
- 🧭 **Geocoding Support** – Converts friendly addresses into coordinates
- 🗺️ **Reservation System** – Users can create, view, update, or delete their bookings
- ❌ **Double Booking Prevention** – Blocks reservation for the same court and time
- ✅ **Admin-Only Routes** – View all users/reservations and delete any user or booking

---

## 🛠️ Tech Stack

- **Node.js** + **Express** – RESTful API framework
- **PostgreSQL** – User and reservation data
- **JWT** – User authentication
- **Google Maps & Places API** – Location and place search
- **cURL** – API testing in terminal

---

## 📦 Project Structure

```
/routes
  └── auth.js           # Register/Login routes
  └── courts.js         # Court search routes
  └── reservations.js   # User reservation routes
  └── adminRoutes.js    # Admin-only user & reservation control

/config
  └── maps.js           # Google Maps API logic

/middleware
  └── authMiddleware.js # Verifies JWT and adds user info

/models
  └── db.js             # PostgreSQL connection pool

.env                   # Secrets and credentials
server.js              # Express server entry point
```

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint         | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/auth/register` | Create a new user  |
| POST   | `/auth/login`    | Log in & get token |

---

### 📍 Courts

| Method | Endpoint                                    | Description                                 |
| ------ | ------------------------------------------- | ------------------------------------------- |
| GET    | `/courts/search?address=...`                | Find courts by address                      |
| GET    | `/courts/nearby?latitude=...&longitude=...` | Find courts near coordinates (JWT required) |

---

### 📅 Reservations (User)

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| GET    | `/reservations`     | View logged-in user's reservations |
| POST   | `/reservations`     | Create new reservation             |
| PUT    | `/reservations/:id` | Update reservation                 |
| DELETE | `/reservations/:id` | Cancel reservation                 |

---

### 🧑‍💼 Admin

| Method | Endpoint                  | Description                         |
| ------ | ------------------------- | ----------------------------------- |
| GET    | `/admin/reservations`     | View all reservations (admin only)  |
| DELETE | `/admin/reservations/:id` | Delete any reservation (admin only) |
| GET    | `/admin/users`            | View all users (admin only)         |
| DELETE | `/admin/users/:id`        | Delete any user (admin only)        |

---

## ⚙️ Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/pickleball-reservation.git
cd pickleball-reservation
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up `.env`**

```env
PORT=5001
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
DB_NAME=pickleball_reservations

JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_api_key
```

4. **Run the server**

```bash
npm run dev
```

---

## 🧪 Example Test

### Register a new user

```bash
curl -X POST http://localhost:5001/auth/register   -H "Content-Type: application/json"   -d '{"name": "Alice", "email": "alice@example.com", "password": "secret"}'
```

### Book a reservation

```bash
curl -X POST http://localhost:5001/reservations   -H "Authorization: Bearer YOUR_TOKEN"   -H "Content-Type: application/json"   -d '{
    "court_name": "Golden Gate Park Court",
    "court_address": "123 Park Ave, San Francisco, CA",
    "reservation_time": "2025-04-01T10:00:00Z"
  }'
```

---

## 📚 Future Ideas

- Front-end UI for public and admin use
- Add court images (via Places API photos)
- Email confirmation (via Mailgun or SendGrid)
- Time slot display & selection UI
- Deploy to Railway / Render for public access

---

## 👨‍💻 Author

Built by Thien Khang Kieu as a backend portfolio project.
