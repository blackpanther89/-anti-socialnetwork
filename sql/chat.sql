DROP TABLE IF EXISTS chat;

CREATE TABLE chat(
    id SERIAL primary key,
    messages TEXT,
    userId INT not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
