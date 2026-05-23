CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    expedition TEXT NOT NULL,
    message TEXT DEFAULT '',
    departure_date TEXT DEFAULT '',
    from_moscow BOOLEAN DEFAULT FALSE,
    city TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT NOW()
);