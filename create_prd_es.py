from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

title = doc.add_heading('Documento de Requisitos del Producto (PRD) - Eliseo (Edición de PM Técnico)', 0)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER

doc.add_heading('1. Resumen Ejecutivo y KPIs', level=1)
doc.add_paragraph('Visión: Eliseo empodera a los consumidores colombianos para maximizar de manera sencilla el valor de sus tarjetas de crédito y débito proporcionando recomendaciones de tarjetas en tiempo real basadas en categorías, beneficios centralizados y descubrimiento activo de ofertas.', style='List Bullet')
doc.add_paragraph('Público Objetivo: Colombianos bancarizados (25-45 años) que poseen múltiples tarjetas de pago y viajan, comen fuera o compran activamente, pero carecen de tiempo para hacer seguimiento a programas de lealtad y beneficios complejos.', style='List Bullet')
doc.add_paragraph('Métricas de Éxito (KPIs):', style='List Bullet')
doc.add_paragraph('Adopción: Promedio de >2.5 tarjetas agregadas por usuario durante su primera semana.', style='List Number 2')
doc.add_paragraph('Engagement: >3 sesiones por semana por usuario activo accediendo a la pestaña de "Recomendador" u "Ofertas".', style='List Number 2')
doc.add_paragraph('Conversión (Proxy de Monetización): >5% de tasa de clics (CTR) hacia enlaces de aplicaciones bancarias oficiales desde las secciones de "Destacados" u "Ofertas".', style='List Number 2')
doc.add_paragraph('Métrica North Star: Número de "Transacciones Optimizadas" generadas (medido por cuántas veces un usuario revisa el recomendador antes de realizar una compra).', style='List Bullet')

doc.add_heading('2. Definición del Alcance (MoSCoW)', level=1)
doc.add_paragraph('Must Have (MVP - El "Esqueleto Andante"):', style='List Bullet')
doc.add_paragraph('Autenticación de usuarios (Registro / Inicio de sesión).', style='List Number 2')
doc.add_paragraph('Mecanismo manual para agregar una tarjeta sin almacenar datos sensibles (Solo selección de BIN/Banco, más apodo opcional y últimos 4 dígitos).', style='List Number 2')
doc.add_paragraph('Panel de control (Dashboard) mostrando la tarjeta principal y métricas resumidas.', style='List Number 2')
doc.add_paragraph('Motor Recomendador basado en categorías (emparejando las tarjetas agregadas del usuario contra una base de datos de beneficios estática).', style='List Number 2')
doc.add_paragraph('Vista de Detalle de Tarjeta mostrando beneficios categorizados.', style='List Number 2')

doc.add_paragraph('Should Have:', style='List Bullet')
doc.add_paragraph('Feed dinámico de Ofertas con fechas de vencimiento.', style='List Number 2')
doc.add_paragraph('Filtrado de Ofertas por Banco y Categoría.', style='List Number 2')
doc.add_paragraph('Destacar las tarjetas "Mejores del Mercado" (Destacados) para impulsar conversiones de afiliados.', style='List Number 2')

doc.add_paragraph('Could Have:', style='List Bullet')
doc.add_paragraph('Notificaciones push para ofertas a punto de expirar.', style='List Number 2')
doc.add_paragraph('Beneficios geolocalizados (ej., "Estás cerca de un aeropuerto, aquí están tus beneficios de Salas VIP").', style='List Number 2')

doc.add_paragraph('Won\'t Have (v1.0):', style='List Bullet')
doc.add_paragraph('Integración directa de API con bancos para seguimiento del historial de transacciones en tiempo real (Open Banking).', style='List Number 2')
doc.add_paragraph('Extracción (scraping) automática del saldo de puntos/millas.', style='List Number 2')

doc.add_heading('3. Personas de Usuario y Tareas a Realizar (JTBD)', level=1)
doc.add_paragraph('Persona Principal: Andrés (32), Millennial experto en tecnología. Trabaja en tecnología/marketing. Tiene 4 tarjetas (Nu, Bancolombia LifeMiles, RappiCard, Falabella). Viaja 3 veces al año. Quiere obtener vuelos gratis pero olvida qué tarjeta le da acceso a salas VIP o el mejor multiplicador de millas.', style='List Bullet')
doc.add_paragraph('JTBD:', style='List Bullet')
doc.add_paragraph('"Cuando estoy esperando para pagar en un restaurante, quiero ver rápidamente cuál de mis 4 tarjetas me da el mejor cashback, para no perder dinero."', style='List Number 2')
doc.add_paragraph('"Cuando estoy planeando un viaje, quiero saber cuál de mis tarjetas ofrece acceso gratuito a salas VIP de aeropuertos, para poder esperar cómodamente sin pagar $30 USD."', style='List Number 2')

doc.add_heading('4. Requisitos Funcionales (Historias de Usuario)', level=1)

doc.add_heading('4.1. Core: Gestionar Billetera', level=2)
doc.add_paragraph('Historia: Como usuario, quiero agregar una tarjeta a mi billetera digital seleccionando el banco y el modelo de la tarjeta, para que la aplicación sepa qué beneficios tengo.', style='List Bullet')
doc.add_paragraph('Criterios de Aceptación:', style='List Bullet')
doc.add_paragraph('[ ] El sistema muestra una lista de bancos (tradicionales y digitales) donde se puede buscar.', style='List Number 2')
doc.add_paragraph('[ ] El sistema filtra los modelos de tarjetas inmediatamente después de seleccionar el banco.', style='List Number 2')
doc.add_paragraph('[ ] El usuario puede ingresar opcionalmente una cadena (máx. 40 caracteres) para el Apodo, y numérica (máx. 4 caracteres) para los "Últimos 4 dígitos".', style='List Number 2')
doc.add_paragraph('[ ] El sistema guarda el mapeo (user_id, card_id, nickname, last_four) en la base de datos.', style='List Number 2')

doc.add_heading('4.2. Core: Motor de Recomendación', level=2)
doc.add_paragraph('Historia: Como usuario, quiero seleccionar una categoría de gasto (ej., "Restaurantes") para que la aplicación clasifique mis tarjetas de mejor a peor para esa compra.', style='List Bullet')
doc.add_paragraph('Criterios de Aceptación:', style='List Bullet')
doc.add_paragraph('[ ] El sistema recupera todas las tarjetas vinculadas al usuario activo.', style='List Number 2')
doc.add_paragraph('[ ] El sistema obtiene los beneficios de esas tarjetas que coinciden con el category_id seleccionado.', style='List Number 2')
doc.add_paragraph('[ ] El sistema ordena las tarjetas basándose en un algoritmo de ponderación (ej., 5% cashback > 3% cashback > x2 puntos).', style='List Number 2')
doc.add_paragraph('[ ] Los resultados cargan en < 500ms.', style='List Number 2')
doc.add_paragraph('[ ] Si ninguna tarjeta tiene beneficios específicos para la categoría, el sistema muestra un mensaje de respaldo enseñando al usuario a usar su tarjeta base principal.', style='List Number 2')

doc.add_heading('4.3. Core: Ofertas Explorables', level=2)
doc.add_paragraph('Historia: Como usuario, quiero filtrar las ofertas actuales del mercado por categoría o banco, para poder encontrar descuentos que pueda usar este fin de semana.', style='List Bullet')
doc.add_paragraph('Criterios de Aceptación:', style='List Bullet')
doc.add_paragraph('[ ] El sistema consulta la tabla de Offers (Ofertas) para promociones activas (valid_until >= hoy O valid_until es NULL).', style='List Number 2')
doc.add_paragraph('[ ] El usuario puede alternar uno o múltiples chips/etiquetas de bancos para filtrar.', style='List Number 2')
doc.add_paragraph('[ ] El usuario puede alternar chips/etiquetas de categorías para filtrar.', style='List Number 2')
doc.add_paragraph('[ ] Hacer clic en una oferta abre una vista detallada con un enlace saliente directo y rastreable hacia el banco.', style='List Number 2')

doc.add_heading('5. Flujos Lógicos Principales', level=1)

doc.add_heading('Flujo 1: Agregar una Tarjeta (Ruta Feliz)', level=2)
doc.add_paragraph('1. El usuario hace clic en "+" o "Agregar tarjeta".', style='List Number')
doc.add_paragraph('2. El sistema recupera SELECT id, name, logo FROM banks ORDER BY name. El usuario selecciona el banco "Bancolombia".', style='List Number')
doc.add_paragraph('3. El sistema recupera SELECT * FROM cards WHERE bank_id = "Bancolombia". El usuario selecciona "Visa LifeMiles Platinum".', style='List Number')
doc.add_paragraph('4. El usuario ingresa el apodo "Mi tarjeta principal".', style='List Number')
doc.add_paragraph('5. El usuario hace clic en "Guardar".', style='List Number')
doc.add_paragraph('6. El frontend envía POST /api/user-cards con el payload { user_id: "uuid", card_id: "uuid", nickname: "Mi tarjeta principal", is_primary: true/false }.', style='List Number')
doc.add_paragraph('7. El backend valida el payload e inserta en cards_user. Devuelve 200 OK.', style='List Number')
doc.add_paragraph('8. El frontend redirige al Dashboard /dashboard y muestra la tarjeta recién agregada mediante una actualización optimista de la UI.', style='List Number')

doc.add_heading('Flujo 2: El Recomendador (Caso Extremo: Sin Tarjetas Agregadas)', level=2)
doc.add_paragraph('1. El usuario navega a /recommender y selecciona "Combustible".', style='List Number')
doc.add_paragraph('2. El sistema comprueba la billetera del usuario. Recuento de billetera = 0.', style='List Number')
doc.add_paragraph('3. El sistema interrumpe el flujo y muestra un Estado Vacío: "Agrega tu primera tarjeta para obtener recomendaciones personalizadas."', style='List Number')
doc.add_paragraph('4. El usuario hace clic en el CTA (Llamado a la acción) -> Redirige al flujo de Agregar Tarjeta.', style='List Number')

doc.add_heading('6. Requisitos de Datos', level=1)
doc.add_paragraph('Entidades Clave:', style='List Bullet')
doc.add_paragraph('Usuarios (Users): id (UUID), email, created_at. (Manejado vía Supabase Auth).', style='List Number 2')
doc.add_paragraph('Bancos (Banks): id (cadena/PK), name, short_name, is_digital, logo_color, website.', style='List Number 2')
doc.add_paragraph('Tarjetas (Cards): id (PK), bank_id (FK), name, franchise (Visa/MC/Amex), tier (Classic, Gold, Black...), type (Credit/Debit).', style='List Number 2')
doc.add_paragraph('Beneficios (Benefits): id (PK), card_id (FK), category (enum: viajes, restaurantes, etc.), value_type (cashback_percent, points_multiplier, etc.), value (numérico).', style='List Number 2')
doc.add_paragraph('Tarjetas_Usuario (Unión / Cards_User): id (PK), user_id (FK), card_id (FK), nickname, last_four, is_primary (booleano).', style='List Number 2')
doc.add_paragraph('Ofertas (Offers): id (PK), bank_id (FK), title, description, category, valid_until (timestamp).', style='List Number 2')

doc.add_paragraph('Privacidad:', style='List Bullet')
doc.add_paragraph('Alcance de Datos: Las políticas de Seguridad a Nivel de Fila (Row Level Security - RLS) deben garantizar que los usuarios SOLO puedan leer/escribir sus propios registros en cards_user.', style='List Number 2')
doc.add_paragraph('Datos Sensibles: Se establece explícitamente que los números de tarjeta (PAN), fechas de vencimiento y CVV reales NO se recopilan ni procesan para evitar por completo el alcance de la normativa PCI-DSS.', style='List Number 2')

doc.add_heading('7. Requisitos No Funcionales (NFRs)', level=1)
doc.add_paragraph('Rendimiento:', style='List Bullet')
doc.add_paragraph('Tiempo para ser Interactivo (TTI) < 1.5 segundos en redes móviles 3G.', style='List Number 2')
doc.add_paragraph('Las consultas a la base de datos para el Recomendador deben ejecutarse en < 100ms.', style='List Number 2')
doc.add_paragraph('Escalabilidad: Escalado horizontal para lecturas a través de las Edge Functions/CDN de Supabase, soportando hasta 1,000 Usuarios Concurrentes.', style='List Bullet')
doc.add_paragraph('Seguridad: Autenticación (AuthN) a través de JWT de Supabase. Autorización (AuthZ) administrada mediante RLS en Postgres. HTTPS/TLS 1.3 forzado en todas las conexiones.', style='List Bullet')
doc.add_paragraph('Mantenibilidad: Interfaces estrictas de TypeScript para todos los mapeos de entidades de la base de datos. Mecanismo estandarizado de manejo de errores.', style='List Bullet')

doc.add_heading('8. Restricciones Técnicas y Recomendación de Stack Tecnológico', level=1)
doc.add_paragraph('Restricciones: El lanzamiento debe completarse rápidamente para probar el ajuste en el mercado (market fit). El presupuesto es limitado, requiriendo infraestructura de nivel gratuito (free-tier) o pago por uso.', style='List Bullet')
doc.add_paragraph('Stack Recomendado:', style='List Bullet')
doc.add_paragraph('Frontend: React (Vite) + Tailwind CSS + Framer Motion (para glassmorphism y micro-animaciones). Alojado en Vercel o Netlify.', style='List Number 2')
doc.add_paragraph('Backend/DB: Supabase (PostgreSQL, Auth, Edge Functions). Elimina la necesidad de escribir APIs CRUD repetitivas (boilerplate) y ofrece capacidades en tiempo real y RLS desde el primer momento.', style='List Number 2')

doc.add_heading('9. Preguntas Abiertas / Bloqueos', level=1)
doc.add_paragraph('1. Lógica del Algoritmo Recomendador: ¿Cómo clasificamos objetivamente una tarjeta que ofrece "10% de cashback" frente a una que ofrece "x3 Millas LATAM"? ¿El usuario necesita una pantalla de "Preferencias" para ponderar las millas frente al cashback?', style='List Number')
doc.add_paragraph('2. Ingesta de Datos: El ingreso manual de los Beneficios de las Tarjetas no es escalable. ¿Cuál es el proceso o herramienta para extraer datos (scraping) de los sitios web de los bancos y mantener actualizadas las tablas de Offers y Benefits?', style='List Number')

doc.save('PRD_Eliseo_ES.docx')
print("Document generated successfully.")
