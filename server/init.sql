CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS overlays (
    id SERIAL PRIMARY KEY,
    creator_user_id INT NOT NULL,
    channel_name VARCHAR(255) NOT NULL,
    channel_picture TEXT,
    stream_key TEXT UNIQUE NOT NULL,
    canvas_route TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (creator_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS invites (
    id SERIAL PRIMARY KEY,
    invite_token VARCHAR(255) NOT NULL UNIQUE,
    overlay_id INT NOT NULL REFERENCES overlays(id) ON DELETE CASCADE,
    expire_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 day',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS overlay_users (
    id SERIAL PRIMARY KEY,
    overlay_id INT NOT NULL,
    user_id INT NOT NULL,
    role TEXT NOT NULL,
    FOREIGN KEY (overlay_id) REFERENCES overlays(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (overlay_id, user_id)
);
