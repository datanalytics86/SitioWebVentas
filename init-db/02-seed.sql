-- Seed initial categories
INSERT INTO categories (name, slug, description, icon, order_index) VALUES
('Clases y Educación', 'clases-educacion', 'Clases particulares, tutorías y formación', '📚', 1),
('Carpintería', 'carpinteria', 'Servicios de carpintería y ebanistería', '🔨', 2),
('Servicios Profesionales', 'servicios-profesionales', 'Servicios profesionales diversos', '💼', 3),
('Hogar y Reparaciones', 'hogar-reparaciones', 'Servicios para el hogar', '🏠', 4),
('Belleza y Bienestar', 'belleza-bienestar', 'Servicios de belleza y cuidado personal', '💅', 5);

-- Seed subcategories for Clases y Educación
INSERT INTO categories (name, slug, description, parent_id, order_index)
SELECT 'Idiomas', 'idiomas', 'Clases de idiomas', id, 1 FROM categories WHERE slug = 'clases-educacion'
UNION ALL
SELECT 'Matemáticas', 'matematicas', 'Clases de matemáticas', id, 2 FROM categories WHERE slug = 'clases-educacion'
UNION ALL
SELECT 'Música', 'musica', 'Clases de música e instrumentos', id, 3 FROM categories WHERE slug = 'clases-educacion'
UNION ALL
SELECT 'Programación', 'programacion', 'Clases de programación y desarrollo', id, 4 FROM categories WHERE slug = 'clases-educacion';

-- Seed subcategories for Carpintería
INSERT INTO categories (name, slug, description, parent_id, order_index)
SELECT 'Muebles a medida', 'muebles-medida', 'Fabricación de muebles personalizados', id, 1 FROM categories WHERE slug = 'carpinteria'
UNION ALL
SELECT 'Restauración', 'restauracion', 'Restauración de muebles', id, 2 FROM categories WHERE slug = 'carpinteria'
UNION ALL
SELECT 'Instalaciones', 'instalaciones', 'Instalación de muebles y carpintería', id, 3 FROM categories WHERE slug = 'carpinteria';

-- Create a demo admin user (password: Admin123!)
INSERT INTO users (email, password_hash, full_name, role, email_verified)
VALUES (
    'admin@servicios.com',
    '$2a$10$YourHashedPasswordHere',
    'Administrador Sistema',
    'admin',
    true
);

-- Note: In production, generate password hashes using bcrypt with proper rounds
