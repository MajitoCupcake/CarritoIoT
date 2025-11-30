
-- 2. Tabla de Órdenes Reales (La Comanda)
CREATE TABLE IF NOT EXISTS ordenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_nombre VARCHAR(100),
    descripcion_pedido TEXT NOT NULL,
    total DECIMAL(10,2) DEFAULT 0.00,
    estatus ENUM('pendiente', 'cocinando', 'listo', 'entregado') DEFAULT 'pendiente',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INSERCIÓN DE DATOS DE PRUEBA (SEMILLA)
-- =============================================

-- Primero limpiamos si ya había datos basura (Opcional, cuidado en producción)
-- TRUNCATE TABLE menu; 
-- TRUNCATE TABLE ordenes;

-- 3. Llenamos el Menú con variedad
INSERT INTO menu (tipo, nombre_plato, descripcion, precio) VALUES 
-- Desayunos
('desayuno', 'Huevos Divorciados', 'Dos huevos estrellados, uno con salsa verde y otro roja, separados por frijoles', 55.00),
('desayuno', 'Chilaquiles Rojos', 'Totopos bañados en salsa roja, con pollo deshebrado, crema, queso y cebolla', 65.00),
('desayuno', 'Molletes Clásicos', 'Mitades de bolillo con frijoles refritos y queso manchego gratinado. Incluye pico de gallo', 45.00),
('desayuno', 'Jugo Verde', 'Nopal, piña, apio, perejil y naranja. Recién hecho', 25.00),
('desayuno', 'Café de Olla', 'Tradicional café mexicano con canela y piloncillo', 20.00),

-- Comidas
('comida', 'Chicharrón en Salsa Verde', 'Guisado casero acompañado de frijoles de la olla y arroz rojo', 65.00),
('comida', 'Milanesa de Pollo', 'Empanizada crujiente, servida con papas a la francesa y ensalada fresca', 75.00),
('comida', 'Enchiladas Suizas', 'Tres enchiladas rellenas de pollo, bañadas en salsa verde cremosa y gratinadas', 80.00),
('comida', 'Sopa Azteca', 'Caldillo de jitomate con tiritas de tortilla frita, aguacate, queso panela y crema', 45.00),
('comida', 'Tacos Dorados de Pollo', 'Orden de 4 flautas con lechuga, crema, queso y salsa', 60.00),
('comida', 'Agua de Jamaica', 'Litro de agua fresca natural', 20.00),
('comida', 'Flan Napolitano', 'Rebanada de postre casero con caramelo', 30.00);

-- 4. Simulamos algunas Órdenes (Para probar la API de Caja y Cocina)
INSERT INTO ordenes (cliente_nombre, descripcion_pedido, total, estatus, fecha_registro) VALUES 
('Juan Pérez', '1x Chilaquiles Rojos, 1x Café de Olla', 85.00, 'entregado', NOW() - INTERVAL 2 HOUR),
('María Gonzalez', '2x Milanesa de Pollo, 2x Agua de Jamaica', 190.00, 'listo', NOW() - INTERVAL 1 HOUR),
('Pedro Sola', '1x Sopa Azteca, 1x Tacos Dorados', 105.00, 'cocinando', NOW() - INTERVAL 30 MINUTE),
('Luisa Lane', '1x Enchiladas Suizas, 1x Flan Napolitano', 110.00, 'pendiente', NOW());




CREATE TABLE historial_chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_chat_telegram VARCHAR(50),
    nombre_usuario VARCHAR(100),
    mensaje_usuario TEXT,
    respuesta_ia TEXT,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1. Tabla para el Menú Diario (Así Doña Mari lo cambia fácil)
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('desayuno', 'comida') NOT NULL,
    nombre_plato VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE
);