# 🧑‍💼 Admin Manual — Pickleball Reservation API

This guide explains how to use all admin-only features of the Pickleball Reservation API, including managing users and reservations.

---

## 🔐 How to Make a User an Admin

1. Open your PostgreSQL terminal:

```bash
psql -U your_db_user -d pickleball_reservations
```

2. Promote a user to admin by email:

```sql
UPDATE users SET is_admin = true WHERE email = 'user@example.com';
```

3. Exit:

```sql
\q
```

✅ That user is now an admin and can access admin-only endpoints.

---

## 🧑‍💼 Admin-Only Routes

> All admin routes require a valid JWT token with `is_admin: true`.

### 🔎 View All Users

```http
GET /admin/users
```

**Example:**

```bash
curl http://localhost:5001/admin/users   -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

### 🗑️ Delete a User by ID

This also deletes all their reservations.

```http
DELETE /admin/users/:id
```

**Example:**

```bash
curl -X DELETE http://localhost:5001/admin/users/7   -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

### 📋 View All Reservations

```http
GET /admin/reservations
```

**Example:**

```bash
curl http://localhost:5001/admin/reservations   -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

### ❌ Delete Any Reservation

```http
DELETE /admin/reservations/:id
```

**Example:**

```bash
curl -X DELETE http://localhost:5001/admin/reservations/3   -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## 🧪 How to Test Admin Endpoints

1. Register a new user (if needed)
2. Promote them to admin in PostgreSQL
3. Login as admin and copy the token
4. Use the token in `Authorization: Bearer YOUR_TOKEN_HERE` header

---

## 🛡 Notes

- Admins can perform any action, but must protect their token.
- You may restrict deleting other admins by modifying logic in `adminRoutes.js`.
- Consider adding audit logs or confirmations for destructive actions.

---

Built for managing pickleball reservations with secure admin access.
