DROP TABLE IF EXISTS species_images CASCADE;
DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS ecosystems CASCADE;
DROP TABLE IF EXISTS propagation_methods CASCADE;
DROP TABLE IF EXISTS conservation_status CASCADE;
DROP TABLE IF EXISTS families CASCADE;

CREATE TABLE families (
    id SERIAL PRIMARY KEY,
    scientific_name VARCHAR(150) NOT NULL UNIQUE,
    common_name VARCHAR(150),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conservation_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE propagation_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE ecosystems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE species (
    id SERIAL PRIMARY KEY,

    common_name VARCHAR(150) NOT NULL,
    scientific_name VARCHAR(180) NOT NULL UNIQUE,

    family_id INTEGER REFERENCES families(id),

    ecosystem_id INTEGER REFERENCES ecosystems(id),

    propagation_method_id INTEGER REFERENCES propagation_methods(id),

    conservation_status_id INTEGER REFERENCES conservation_status(id),

    description TEXT,

    habitat TEXT,

    distribution TEXT,

    flowering_period VARCHAR(120),

    fruiting_period VARCHAR(120),

    ecological_importance TEXT,

    restoration_use TEXT,

    observations TEXT,

    latitude NUMERIC(10,6),

    longitude NUMERIC(10,6),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE species_images (

    id SERIAL PRIMARY KEY,

    species_id INTEGER NOT NULL REFERENCES species(id) ON DELETE CASCADE,

    image_url TEXT NOT NULL,

    caption VARCHAR(255),

    cover BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
