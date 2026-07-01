-- ============================================================
-- Catálogo de Restauración Profesional
-- Schema principal PostgreSQL
-- Entidad: Parques Nacionales Naturales de Colombia - DTPA
-- ============================================================

DROP TABLE IF EXISTS species_references CASCADE;
DROP TABLE IF EXISTS species_experiences CASCADE;
DROP TABLE IF EXISTS species_images CASCADE;
DROP TABLE IF EXISTS publications CASCADE;
DROP TABLE IF EXISTS protected_area_species CASCADE;
DROP TABLE IF EXISTS protected_areas CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================================
-- ÁREAS PROTEGIDAS
-- ============================================================

CREATE TABLE protected_areas (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    region VARCHAR(150),
    department VARCHAR(150),
    municipality VARCHAR(150),
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ESPECIES POR ÁREA PROTEGIDA
-- ============================================================

CREATE TABLE protected_area_species (
    id SERIAL PRIMARY KEY,
    protected_area_id INTEGER NOT NULL REFERENCES protected_areas(id) ON DELETE CASCADE,

    common_name VARCHAR(180) NOT NULL,
    scientific_name VARCHAR(220) NOT NULL,
    family VARCHAR(180),
    category VARCHAR(150),

    ecosystem VARCHAR(180),
    conservation_status VARCHAR(120),
    propagation_method VARCHAR(180),

    description TEXT,
    habitat TEXT,
    distribution TEXT,
    flowering_period VARCHAR(180),
    fruiting_period VARCHAR(180),
    ecological_importance TEXT,
    restoration_use TEXT,
    care_recommendations TEXT,
    observations TEXT,

    latitude NUMERIC(10,6),
    longitude NUMERIC(10,6),

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_species_per_area UNIQUE (protected_area_id, scientific_name)
);

-- ============================================================
-- IMÁGENES DE ESPECIES
-- ============================================================

CREATE TABLE species_images (
    id SERIAL PRIMARY KEY,
    species_id INTEGER NOT NULL REFERENCES protected_area_species(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption VARCHAR(255),
    author VARCHAR(180),
    is_cover BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- EXPERIENCIAS DE PROPAGACIÓN
-- ============================================================

CREATE TABLE species_experiences (
    id SERIAL PRIMARY KEY,
    species_id INTEGER NOT NULL REFERENCES protected_area_species(id) ON DELETE CASCADE,

    title VARCHAR(250) NOT NULL,
    experience_year INTEGER,
    location VARCHAR(200),
    nursery_name VARCHAR(200),
    responsible_person VARCHAR(180),

    objective TEXT,
    methodology TEXT,
    results TEXT,
    lessons_learned TEXT,
    observations TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- REFERENCIAS BIBLIOGRÁFICAS
-- ============================================================

CREATE TABLE species_references (
    id SERIAL PRIMARY KEY,
    species_id INTEGER NOT NULL REFERENCES protected_area_species(id) ON DELETE CASCADE,

    title TEXT NOT NULL,
    authors TEXT,
    publication_year INTEGER,
    source TEXT,
    url TEXT,
    notes TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PUBLICACIONES GENERADAS
-- HTML OFFLINE Y PDF
-- ============================================================

CREATE TABLE publications (
    id SERIAL PRIMARY KEY,
    protected_area_id INTEGER NOT NULL REFERENCES protected_areas(id) ON DELETE CASCADE,

    version VARCHAR(50) NOT NULL,
    title VARCHAR(250) NOT NULL,

    html_path TEXT,
    pdf_path TEXT,

    species_count INTEGER NOT NULL DEFAULT 0,
    generated_by VARCHAR(180),
    generated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    notes TEXT,

    CONSTRAINT unique_publication_version_per_area UNIQUE (protected_area_id, version)
);

-- ============================================================
-- USUARIOS
-- Se deja preparada para administración futura
-- ============================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    password_hash TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- CONFIGURACIÓN GENERAL
-- ============================================================

CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ÍNDICES
-- ============================================================

CREATE INDEX idx_species_area ON protected_area_species(protected_area_id);
CREATE INDEX idx_species_common_name ON protected_area_species(common_name);
CREATE INDEX idx_species_scientific_name ON protected_area_species(scientific_name);
CREATE INDEX idx_species_family ON protected_area_species(family);
CREATE INDEX idx_species_category ON protected_area_species(category);

CREATE INDEX idx_images_species ON species_images(species_id);
CREATE INDEX idx_experiences_species ON species_experiences(species_id);
CREATE INDEX idx_references_species ON species_references(species_id);
CREATE INDEX idx_publications_area ON publications(protected_area_id);

-- ============================================================
-- DATOS INICIALES
-- ============================================================

INSERT INTO protected_areas (
    code,
    name,
    category,
    region,
    department,
    municipality,
    description
) VALUES
(
    'PNN-SAN',
    'Parque Nacional Natural Sanquianga',
    'Parque Nacional Natural',
    'Dirección Territorial Pacífico',
    'Nariño',
    'Mosquera, Olaya Herrera, La Tola y El Charco',
    'Área protegida del Pacífico colombiano con ecosistemas de manglar, estuarios y alta importancia para procesos de restauración ecológica.'
),
(
    'PNN-UTR',
    'Parque Nacional Natural Utría',
    'Parque Nacional Natural',
    'Dirección Territorial Pacífico',
    'Chocó',
    'Bahía Solano y Nuquí',
    'Área protegida del Pacífico colombiano con ecosistemas marino-costeros, bosques húmedos tropicales y procesos de conservación y restauración.'
);

INSERT INTO settings (setting_key, setting_value, description)
VALUES
('institution_name', 'Parques Nacionales Naturales de Colombia - Dirección Territorial Pacífico', 'Nombre institucional usado en los catálogos.'),
('primary_color', '#71b956', 'Color verde institucional.'),
('secondary_color', '#2cab87', 'Color turquesa institucional.'),
('text_color', '#000000', 'Color principal de texto.');

CREATE TABLE IF NOT EXISTS protected_area_species (

    id SERIAL PRIMARY KEY,

    protected_area_id INTEGER NOT NULL,

    species_id INTEGER NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_pas_area
        FOREIGN KEY (protected_area_id)
        REFERENCES protected_areas(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pas_species
        FOREIGN KEY (species_id)
        REFERENCES species(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_area_species
        UNIQUE(protected_area_id, species_id)

);
