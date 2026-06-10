# Documento de Requisitos del Producto (PRD) - Eliseo (Edición de PM Técnico)

> **Estado del documento:** ajustado al código en `feat/ui-polish` (junio 2026).
> Leyenda de implementación: ✅ Hecho · 🟡 Parcial · 🔲 Pendiente.

## 1. Resumen Ejecutivo y KPIs
**Visión:** Eliseo empodera a los consumidores colombianos para maximizar de manera sencilla el valor de sus tarjetas de crédito y débito proporcionando recomendaciones de tarjetas en tiempo real basadas en categorías, beneficios centralizados y descubrimiento activo de ofertas.
**Público Objetivo:** Colombianos bancarizados (25-45 años) que poseen múltiples tarjetas de pago y viajan, comen fuera o compran activamente, pero carecen de tiempo para hacer seguimiento a programas de lealtad y beneficios complejos.
**Métricas de Éxito (KPIs):**
*   **Adopción:** Promedio de >2.5 tarjetas agregadas por usuario durante su primera semana.
*   **Engagement:** >3 sesiones por semana por usuario activo accediendo a la pestaña de "Recomendador" u "Ofertas".
*   **Conversión (Proxy de Monetización):** >5% de tasa de clics (CTR) hacia enlaces de aplicaciones bancarias oficiales desde las secciones de "Destacados" u "Ofertas".
**Métrica North Star:** Número de "Transacciones Optimizadas" generadas (medido por cuántas veces un usuario revisa el recomendador antes de realizar una compra).

## 2. Definición del Alcance (MoSCoW)
*   **Must Have (MVP - El "Esqueleto Andante"):** 
    *   ✅ Autenticación de usuarios (Registro / Inicio de sesión).
    *   ✅ Mecanismo manual para agregar una tarjeta sin almacenar datos sensibles (Solo selección de Banco/modelo, más apodo opcional y últimos 4 dígitos).
    *   ✅ Panel de control (Dashboard) mostrando la tarjeta principal y métricas resumidas.
    *   ✅ Motor Recomendador basado en categorías (emparejando las tarjetas agregadas del usuario contra la base de beneficios).
    *   ✅ Vista de Detalle de Tarjeta mostrando beneficios categorizados.
*   **Should Have:** 
    *   ✅ Feed dinámico de Ofertas con fechas de vencimiento.
    *   ✅ Filtrado de Ofertas por Banco y Categoría.
    *   🔲 Destacar las tarjetas "Mejores del Mercado" (Destacados) para impulsar conversiones de afiliados. *(No existe pantalla ni ruta todavía.)*
*   **Could Have:** 
    *   🔲 Notificaciones push para ofertas a punto de expirar. *(Existían en `main` anterior; no están en el refactor actual.)*
    *   🔲 Beneficios geolocalizados (ej., "Estás cerca de un aeropuerto, aquí están tus beneficios de Salas VIP"). *(Ídem.)*
*   **Won't Have (v1.0):** 
    *   Integración directa de API con bancos para seguimiento del historial de transacciones en tiempo real (Open Banking).
    *   Extracción (scraping) automática del saldo de puntos/millas.

## 3. Personas de Usuario y Tareas a Realizar (JTBD)
> **Nota:** las personas detalladas y vigentes viven en `.product/PERSONAS/` (Gloria Espinosa, Sandra Moreno, Sebastián Ríos). El arquetipo "Andrés" de abajo se conserva como resumen del JTBD principal.

*   **Arquetipo principal (JTBD):** *Andrés (32), Millennial experto en tecnología.* Trabaja en tecnología/marketing. Tiene 4 tarjetas (Nu, Bancolombia LifeMiles, RappiCard, Falabella). Viaja 3 veces al año. Quiere obtener vuelos gratis pero olvida qué tarjeta le da acceso a salas VIP o el mejor multiplicador de millas.
*   **JTBD:** 
    *   "Cuando estoy esperando para pagar en un restaurante, quiero ver rápidamente cuál de mis 4 tarjetas me da el mejor cashback, para no perder dinero."
    *   "Cuando estoy planeando un viaje, quiero saber cuál de mis tarjetas ofrece acceso gratuito a salas VIP de aeropuertos, para poder esperar cómodamente sin pagar $30 USD."

## 4. Requisitos Funcionales (Historias de Usuario)

### 4.1. Core: Gestionar Billetera
*   **Historia:** Como usuario, quiero agregar una tarjeta a mi billetera digital seleccionando el banco y el modelo de la tarjeta, para que la aplicación sepa qué beneficios tengo.
*   **Criterios de Aceptación:**
    *   [x] El sistema muestra una lista de bancos (tradicionales y digitales) donde se puede buscar.
    *   [x] El sistema filtra los modelos de tarjetas inmediatamente después de seleccionar el banco.
    *   [x] El usuario puede ingresar opcionalmente una cadena (máx. 40 caracteres) para el Apodo, y numérica (máx. 4 caracteres) para los "Últimos 4 dígitos".
    *   [x] El sistema guarda el mapeo (user_id, card_id, nickname, last_four) en la base de datos.

### 4.2. Core: Motor de Recomendación
*   **Historia:** Como usuario, quiero seleccionar una categoría de gasto (ej., "Restaurantes") para que la aplicación clasifique mis tarjetas de mejor a peor para esa compra.
*   **Criterios de Aceptación:**
    *   [x] El sistema recupera todas las tarjetas vinculadas al usuario activo.
    *   [x] El sistema obtiene los beneficios de esas tarjetas que coinciden con el `category_id` seleccionado.
    *   [x] El sistema ordena las tarjetas basándose en un algoritmo de ponderación. *(Implementado en `Recommender.tsx` vía `VALUE_TYPE_WEIGHT` × `numeric_value`; ver pregunta abierta §9.1 sobre cómo ponderar cashback vs. millas.)*
    *   [x] Los resultados cargan en < 500ms.
    *   [x] Si ninguna tarjeta tiene beneficios específicos para la categoría, el sistema muestra un mensaje de respaldo enseñando al usuario a usar su tarjeta base principal.

### 4.3. Core: Ofertas Explorables
*   **Historia:** Como usuario, quiero filtrar las ofertas actuales del mercado por categoría o banco, para poder encontrar descuentos que pueda usar este fin de semana.
*   **Criterios de Aceptación:**
    *   [x] El sistema consulta la tabla de `Offers` (Ofertas) para promociones activas (`valid_until` >= hoy O `valid_until` es NULL).
    *   [x] El usuario puede alternar uno o múltiples chips/etiquetas de bancos para filtrar.
    *   [x] El usuario puede alternar chips/etiquetas de categorías para filtrar.
    *   [ ] 🔲 **Pendiente:** Hacer clic en una oferta abre una vista detallada con un enlace saliente directo y rastreable hacia el banco. *(Hoy la oferta no es clicable y el tipo `Offer` no tiene campo URL. Es el CTA del que depende el KPI de conversión.)*

## 5. Flujos Lógicos Principales

### Flujo 1: Agregar una Tarjeta (Ruta Feliz)
1. El usuario hace clic en "+" o "Agregar tarjeta".
2. El sistema recupera `SELECT id, name, logo FROM banks ORDER BY name`. El usuario selecciona el banco 'Bancolombia'.
3. El sistema recupera `SELECT * FROM cards WHERE bank_id = 'Bancolombia'`. El usuario selecciona 'Visa LifeMiles Platinum'.
4. El usuario ingresa el apodo "Mi tarjeta principal".
5. El usuario hace clic en "Guardar".
6. El frontend envía `POST /api/user-cards` con el payload `{ user_id: 'uuid', card_id: 'uuid', nickname: 'Mi tarjeta principal', is_primary: true/false }`.
7. El backend valida el payload e inserta en `cards_user`. Devuelve 200 OK.
8. El frontend redirige al Dashboard `/dashboard` y muestra la tarjeta recién agregada mediante una actualización optimista de la UI.

### Flujo 2: El Recomendador (Caso Extremo: Sin Tarjetas Agregadas)
1. El usuario navega a `/recommender` y selecciona "Combustible".
2. El sistema comprueba la billetera del usuario. Recuento de billetera = 0.
3. El sistema interrumpe el flujo y muestra un Estado Vacío: "Agrega tu primera tarjeta para obtener recomendaciones personalizadas."
4. El usuario hace clic en el CTA (Llamado a la acción) -> Redirige al flujo de Agregar Tarjeta.

## 6. Requisitos de Datos

### Entidades Clave
*   **Usuarios (Users):** `id` (UUID), `email`, `created_at`. (Manejado vía Supabase Auth).
*   **Bancos (Banks):** `id` (cadena/PK), `name`, `short_name`, `is_digital`, `logo_color`, `website`.
*   **Tarjetas (Cards):** `id` (PK), `bank_id` (FK), `name`, `franchise` (Visa/MC/Amex), `tier` (Classic, Gold, Black...), `type` (Credit/Debit).
*   **Beneficios (Benefits):** `id` (PK), `card_id` (FK), `category` (enum: viajes, restaurantes, etc.), `value_type` (cashback_percent, points_multiplier, etc.), `value` (numérico).
*   **Tarjetas_Usuario (Unión / Cards_User):** `id` (PK), `user_id` (FK), `card_id` (FK), `nickname`, `last_four`, `is_primary` (booleano).
*   **Ofertas (Offers):** `id` (PK), `bank_id` (FK), `title`, `description`, `category`, `valid_until` (timestamp). *(Pendiente agregar `url`/`link` saliente para el CTA de la §4.3.)*

> ⚠️ **Desajuste front ↔ BD a reconciliar:** el front consulta tablas en inglés (`cards_user`, `cards`, `banks`, `benefits`), pero `supabase/schema.sql` define nombres en español (`user_cards`, `bancos`, `tarjetas`, `beneficios_*`). Hasta unificar nombres, el front contra Supabase real devuelve datos vacíos. El contrato de tipos vive en `src/types/database.ts`. El front puede desarrollarse desacoplado con datos mock (`VITE_USE_MOCKS=true`).

### Privacidad
*   **Alcance de Datos:** Las políticas de Seguridad a Nivel de Fila (Row Level Security - RLS) deben garantizar que los usuarios SOLO puedan leer/escribir sus propios registros en `cards_user`.
*   **Datos Sensibles:** Se establece explícitamente que los números de tarjeta (PAN), fechas de vencimiento y CVV reales **NO** se recopilan ni procesan para evitar por completo el alcance de la normativa PCI-DSS.

## 7. Requisitos No Funcionales (NFRs)
*   **Rendimiento:** 
    *   Tiempo para ser Interactivo (TTI) < 1.5 segundos en redes móviles 3G.
    *   Las consultas a la base de datos para el Recomendador deben ejecutarse en < 100ms.
*   **Escalabilidad:** Escalado horizontal para lecturas a través de las Edge Functions/CDN de Supabase, soportando hasta 1,000 Usuarios Concurrentes.
*   **Seguridad:** Autenticación (AuthN) a través de JWT de Supabase. Autorización (AuthZ) administrada mediante RLS en Postgres. HTTPS/TLS 1.3 forzado en todas las conexiones.
*   **Mantenibilidad:** Interfaces estrictas de TypeScript para todos los mapeos de entidades de la base de datos. Mecanismo estandarizado de manejo de errores.

## 8. Restricciones Técnicas y Recomendación de Stack Tecnológico
*   **Restricciones:** El lanzamiento debe completarse rápidamente para probar el ajuste en el mercado (market fit). El presupuesto es limitado, requiriendo infraestructura de nivel gratuito (free-tier) o pago por uso.
*   **Stack Recomendado:**
    *   **Frontend:** React (Vite) + Tailwind CSS + Framer Motion (para glassmorphism y micro-animaciones). Alojado en Vercel o Netlify.
    *   **Backend/DB:** Supabase (PostgreSQL, Auth, Edge Functions). Elimina la necesidad de escribir APIs CRUD repetitivas (boilerplate) y ofrece capacidades en tiempo real y RLS desde el primer momento.

## 9. Preguntas Abiertas / Bloqueos
1.  **Lógica del Algoritmo Recomendador:** ¿Cómo clasificamos objetivamente una tarjeta que ofrece "10% de cashback" frente a una que ofrece "x3 Millas LATAM"? ¿El usuario necesita una pantalla de "Preferencias" para ponderar las millas frente al cashback?
2.  **Ingesta de Datos:** El ingreso manual de los Beneficios de las Tarjetas no es escalable. ¿Cuál es el proceso o herramienta para extraer datos (scraping) de los sitios web de los bancos y mantener actualizadas las tablas de `Offers` y `Benefits`?
3.  **Reconciliación de esquema:** unificar los nombres de tabla entre front (`cards_user`/`banks`/`benefits`) y BD (`user_cards`/`bancos`/`beneficios_*`) — ¿se renombra el esquema o se ajusta el front? (En curso.)

---

## 10. Diseño y UX (Sistema Visual)
> Sección añadida como base para el rediseño. Refleja el sistema actual en `tailwind.config.js` + `src/index.css`.

### 10.1 Principios
*   **Mobile-first**: contenedor centrado `max-w-2xl`, navegación inferior fija de 5 ítems (Inicio, Tarjetas, Recomendador, Ofertas, Perfil). El contenido reserva `pb-24` para no quedar tapado por el nav.
*   **Limpio y suave**: tarjetas redondeadas (`rounded-2xl`), sombras tenues de tinte violeta, mucho aire en blanco, jerarquía por peso tipográfico.
*   **Con vida**: micro-animaciones de entrada (fade + slide) con Framer Motion; indicador de nav animado (`layoutId`), `active:scale-95` en botones.

### 10.2 Color
*   **Primario `eliseo` (violeta):** 50 `#F0EFFE` · 100 `#E4E1FD` · 400 `#8577F5` · **500 `#5B4CF5` (acción principal)** · 600 `#4A3DE3`.
*   **Éxito `mint`:** 50 `#EAFBF5` · **500 `#10B981`**.
*   **Acento `coral` 500 `#FF6B57`** (alertas/realces).
*   **Fondo `background` `#F7F8FF`** · **Superficie `surface` `#FFFFFF`** · **Texto `#0F0F23`**.
*   **Gradientes:** `gradient-eliseo` (marca), y por nivel de tarjeta: `gradient-gold`, `gradient-platinum`, `gradient-black`, etc.

### 10.3 Tipografía
*   Fuente **Inter** (system-ui fallback). Títulos de página `text-2xl font-bold`; secciones `section-title` (`text-lg font-bold`); cuerpo `text-sm`; metadatos `text-xs`/`text-[10-11px]`.

### 10.4 Componentes (clases en `index.css`)
*   `eliseo-card` — contenedor blanco, `rounded-2xl`, sombra `card`, borde `eliseo-100/50`.
*   `eliseo-btn-primary` / `-secondary` / `-outline` — botones `rounded-xl`, `active:scale-95`.
*   `input-field` — input con `focus:ring-eliseo-300`.
*   `glass` — barra inferior con `backdrop-blur`.
*   Sombras: `card`, `card-hover`, `float`. Iconos: **lucide-react**.

### 10.5 Inventario de pantallas
| Ruta | Pantalla | Estado |
|---|---|---|
| `/` | Landing (hero + features) | ✅ |
| `/auth` | Login / Registro | ✅ |
| `/dashboard` | Tarjeta principal + stats + accesos rápidos + categorías | ✅ |
| `/my-cards` | Lista de tarjetas de la cartera | ✅ |
| `/add-card` | Alta en 3 pasos (banco → tarjeta → detalles) | ✅ |
| `/card-detail/:id` | Detalle + beneficios por categoría + eliminar/principal | ✅ |
| `/recommender` | Recomendador por categoría | ✅ |
| `/offers` | Feed de ofertas con filtros | 🟡 (falta detalle + link saliente) |
| `/profile` | Perfil + privacidad + cerrar sesión | ✅ |
| `/destacados` | "Mejores del mercado" | 🔲 (por diseñar) |

### 10.6 Categorías (11, definidas en `src/types/database.ts`)
General 🔧 · Cashback 💰 · Puntos/Millas 🏆 · Viajes ✈️ · Restaurantes 🍽️ · Entretenimiento 🎬 · Supermercados 🛒 · Combustible ⛽ · Streaming 📺 · Moda 👗 · Seguros 🛡️.

### 10.7 Tono de voz
Español de Colombia, cercano y claro, en segunda persona ("tus tarjetas", "elige una categoría"). Mensajes breves; estados vacíos siempre con un CTA. Acentuación correcta obligatoria.
