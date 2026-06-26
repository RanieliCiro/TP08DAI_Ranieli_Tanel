CREATE TABLE IF NOT EXISTS provinces (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    full_name     VARCHAR(200),
    latitude      FLOAT,
    longitude     FLOAT,
    display_order INTEGER
);