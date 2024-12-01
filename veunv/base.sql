-- Create a table for users (clients and drivers)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50),  -- "client" or "driver"
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create a table for taxi rides
CREATE TABLE rides (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES users(id),
  driver_id INTEGER REFERENCES users(id),
  start_location VARCHAR(255),
  end_location VARCHAR(255),
  status VARCHAR(50),  -- "requested", "accepted", "completed", "canceled"
  price DECIMAL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Install PostGIS:
-- You need to install the PostGIS extension to add support for spatial types like GEOGRAPHY.

-- Run the following command to install PostGIS:

CREATE EXTENSION postgis;


CREATE TABLE drivers(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  price VARCHAR(20),
  geolocation GEOGRAPHY(Point, 4326)
);
