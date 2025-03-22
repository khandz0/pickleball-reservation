# 🏓 Pickleball Reservation API

A backend-focused RESTful API that allows users to register, log in, and find nearby pickleball courts using the Google Maps & Places APIs.

Perfect for backend development practice with authentication, external APIs, and clean REST architecture.

---

## 🚀 Features

- 🔐 **JWT Authentication** – Register and login with token-based security
- 📍 **Nearby Court Search** – Uses Google Places API to find courts based on address or coordinates
- 🧭 **Geocoding Support** – Converts human-friendly addresses into coordinates
- 🗺️ **RESTful Routing** – Clean separation of auth, court search, and user logic

---

## 🛠️ Tech Stack

- **Node.js** + **Express** – Server framework
- **PostgreSQL** – User data storage
- **Google Maps & Places API** – Geolocation and search
- **JWT** – Token-based authentication
- **Redis** _(optional)_ – Can be added for caching or rate limiting

---

## 📦 Project Structure

```
/routes
  └── auth.js         # Register/Login routes
  └── courts.js       # Search courts via address or coordinates

/config
  └── maps.js         # Google Maps API integration

/middleware
  └── authMiddleware.js  # Protects private routes

/models
  └── db.js           # PostgreSQL connection pool

.env                 # Secrets and credentials
server.js            # Express app entry point
```

---

## 🧪 API Endpoints

### Auth

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | Create a new user |
| POST   | `/auth/login`    | Get JWT token     |

### Courts

| Method | Endpoint                                    | Description                                 |
| ------ | ------------------------------------------- | ------------------------------------------- |
| GET    | `/courts/search?address=...`                | Find courts by address                      |
| GET    | `/courts/nearby?latitude=...&longitude=...` | Find courts near coordinates (requires JWT) |

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

   GOOGLE_MAPS_API_KEY=your_api_key
   ```

4. **Run the server**
   ```bash
   npm run dev
   ```

---

## ✅ Example Test

```bash
curl -X POST http://localhost:5001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com", "password": "secret"}'
```

---

## 📚 Future Improvements

- Court reservation system (with time slots)
- Admin portal for court management
- Redis caching for frequent locations
- Rate limiting using middleware

---

## 👨‍💻 Author

Built by Thien Khang Kieu as a RESTful API project.
