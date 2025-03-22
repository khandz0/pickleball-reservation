CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE courts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

-- CREATE TABLE reservations (
--     id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(id),
--     court_id INTEGER REFERENCES courts(id),
--     reservation_time TIMESTAMP NOT NULL
-- );

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  court_name TEXT NOT NULL,
  court_address TEXT NOT NULL,
  reservation_time TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
