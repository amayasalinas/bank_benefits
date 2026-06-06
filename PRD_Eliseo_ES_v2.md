# Documento de Requisitos del Producto (PRD) — Eliseo v2 (Edición Integrada: Estrategia + Producto)

> **Estado del documento:** v2 integrada (junio 2026). Fusiona el PRD v1 (ajustado al código en `feat/ui-polish`) con el Blueprint Estratégico (`Blueprint_Estrategico_Eliseo_ES.md`, Partes I–IX). Coexiste con `PRD_Eliseo_ES.docx` (v1), que se conserva como histórico. Audiencia: equipo de producto/ingeniería + inversionistas.
>
> **Este `.md` es la fuente canónica.** El `.docx` se regenera desde aquí con `python create_prd_v2_es.py`.
>
> **Leyenda de estado:** ✅ Hecho · 🟡 Parcial · 🔲 Pendiente · 🆕 Nuevo en v2 (propuesto).

**Cambio de marco respecto a v1:** v1 describía *qué se construyó*. v2 ancla el producto a una tesis de negocio validable: a quién servimos (el Optimizador), por qué es defendible (neutralidad cross-bank), cuánto vale (premio económico real), y cómo el motor produce recomendaciones objetivas (normalización a pesos). El detalle de implementación, UX y datos de v1 se conserva y se mejora.

---

## 1. Resumen Ejecutivo, Tesis y KPIs

**Visión.** Eliseo es el asistente neutral de decisión de tarjetas para Colombia: conociendo todas las tarjetas que el usuario ya tiene, le dice qué tarjeta usar en cada compra para maximizar su beneficio —y cuál solicitar, conservar o cancelar—, mostrando el ahorro en pesos.

**Tesis de inversión (una línea).** No se invierte en un comparador de tarjetas; se invierte en la futura **capa neutral de decisión y demanda financiera de LatAm**, usando las tarjetas de crédito como cuña de entrada.

**Por qué ahora.** El pivote de "¿qué tarjeta solicitar?" (uso único, ya cubierto por Rankia/bancos) hacia "¿qué tarjeta usar ahora?" (uso recurrente → hábito → datos → moat) es el movimiento correcto. Viento de cola: Open Finance obligatorio en Colombia (Decreto 0368/2026).

**North Star Metric.** Transacciones Optimizadas = número de veces que un usuario consulta el recomendador antes de comprar, sin que se le pida (proxy directo de hábito y de valor entregado).

**KPIs (reordenados a la tesis):**

| KPI | Meta | Fuente |
|---|---|---|
| Consultas no provocadas / usuario activo / semana | ≥ 2 (hábito) | Parte V |
| Retención semana 4 (cohorte) | ≥ 40% | Parte V |
| Ahorro real confirmado / usuario / mes | ≥ $30–40k COP | Parte IV |
| Tarjetas agregadas / usuario (primera semana) | > 2.5 | v1 |
| Sesiones/semana en Recomendador u Ofertas | > 3 | v1 |
| CTR a CTA de afiliado (proxy de monetización CPA) | > 5% | v1 |
| Disposición a pagar premium (cuartil alto) | ≥ 25% | Parte IV |

---

## 2. Problema y Oportunidad de Mercado

**Problema.** Los colombianos con varias tarjetas dejan dinero sobre la mesa a diario: no saben qué tarjeta usar en cada compra, se pierden promociones que cambian cada semana, y dejan vencer millas y puntos. La información es opaca, dispersa y en letra pequeña; los comparadores existentes solo responden "¿cuál solicitar?".

**Mercado.** ~14.2M tarjetas de crédito en Colombia (en contracción). El comparador de "cuál solicitar" ya está ocupado (Rankia). La oportunidad no monetizada es el **uso recurrente en el punto de gasto**.

**Segmentación económica (hallazgo clave, Parte IV).** El premio por usuario no es homogéneo: simulación Monte Carlo da ahorro mediano ~$350–478k/año, pero concentrado en el gasto medio-alto. El usuario básico (≈35% del mercado) casi no captura valor recurrente (su único premio real es evitar la cuota de manejo, decisión de una sola vez). **Implicación: el producto y el GTM apuntan al Optimizador, no al masivo.**

| Perfil | Premio recompensas (mediana, año) |
|---|---|
| Básico | $90.000 ❌ (no sostiene hábito) |
| Profesional joven | $385.000 |
| Familia ingresos medios | $542.000 |
| Viajero frecuente | $725.000 |
| Premium multi-tarjeta | $1.503.000 |

---

## 3. ICP — "El Optimizador" (foco en crédito)

**Filtros duros:** gasto ≥ $2.5M COP/mes en tarjeta · ≥ 2 tarjetas de crédito · totalero (paga el total, no rota saldo) · interés activo en viajes/millas/cashback · potencial ≥ $400k/año de valor. (Débito: alcance secundario — sus recompensas son marginales; no es el foco.)

- **Demografía:** 28–45 años; urbano (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga); estrato 4–6; universitario/posgrado.
- **Ingresos:** $6–20M COP/mes.
- **Profesión:** profesionales corporativos, consultores, ingenieros/TI, médicos/abogados, finanzas, emprendedores digitales, freelancers de alto ingreso.
- **Comportamientos:** totalero; ≥2 tarjetas (a menudo una de millas + una de cashback/puntos); ya acumula y redime; viaja 1–3 veces/año; usa apps fintech; optimiza manual e incompletamente.
- **Motivaciones:** viajar con millas; "ganarle al sistema"; eficiencia/estatus; no dejar dinero sobre la mesa.
- **Frustraciones:** información dispersa; no saber qué tarjeta usar dónde; promos que se pierde; millas/puntos que vencen; cuotas que no sabe si valen la pena.

**Anti-ICP (no perseguir al inicio):** rotativos que financian (su problema es la tasa, no recompensas); usuarios de 1 tarjeta o gasto <$1.5M/mes; sin interés en optimizar.

> Reemplaza el ICP amplio de v1 ("25–45 bancarizados con múltiples tarjetas de crédito y débito") por el segmento donde el premio es real.

---

## 4. Propuesta de Valor y Posicionamiento

**Propuesta de valor.** "Recupera ~$40.000 al mes (+$450.000/año) en beneficios que hoy dejas sobre la mesa." Para viajeros/premium: $700k–1.5M/año.

**Posicionamiento.** *La Suiza de las tarjetas*: el único asistente que está del lado del usuario y compara TODAS sus tarjetas (de todos los bancos), no las de un emisor. Cada recomendación viene con el "por qué" en pesos.

---

## 5. Ventaja Competitiva y Moat (Parte III)

**El wedge estructural.** Un emisor único jamás puede ser un optimizador neutral entre todas tus tarjetas sin canibalizar su producto. Nu solo recomienda Nu; Bancolombia solo Bancolombia; RappiCard solo RappiCard.

**Matriz de amenazas:**

| Atacante | ¿Bloqueado por neutralidad? |
|---|---|
| Nu Colombia (5M clientes) | SÍ — mono-emisor |
| Bancolombia / Puntos Colombia | SÍ — coalición cerrada |
| RappiCard (emisor) | SÍ — mono-emisor (vía Davivienda) |
| Rappi (plataforma) / Nequi | NO — agregador horizontal = amenaza real |

**Las 5 capas del moat (se construyen, no se tienen):** (1) neutralidad estructural; (2) grafo de promociones fresco propietario + tabla VE opinada; (3) loop de datos cross-bank que se compone; (4) confianza/categoría; (5) velocidad y foco. Defensa contra el agregador horizontal = profundidad financiera + neutralidad creíble + llegar primero al loop de datos.

---

## 6. Alcance del Producto (MoSCoW, recortado al Optimizador)

**Must Have (MVP — "Esqueleto Andante"):**
- ✅ Autenticación (Registro / Inicio de sesión).
- ✅ Agregar tarjeta sin datos sensibles (banco/modelo + apodo + últimos 4 dígitos).
- ✅ Dashboard con tarjeta principal y métricas resumidas.
- ✅ Motor Recomendador por categoría.
- ✅ Vista de detalle de tarjeta con beneficios categorizados.
- 🔲 Perfil de pago (totalero/rotativo) en onboarding — gobierna la lógica del recomendador (§8).
- 🔲 Normalización a pesos efectivos (VE) en el recomendador — resuelve la Pregunta Abierta 9.1.

**Should Have:**
- ✅ Feed dinámico de Ofertas con vencimientos.
- ✅ Filtrado de Ofertas por Banco y Categoría.
- ✅ Niveles de confianza (Confirmado/Probable/Acción) en cada beneficio mostrado. *(Construido jun 2026 — UI/badge; el cálculo automático del nivel sigue pendiente del motor v2.)*
- ✅ CTA saliente rastreable en ofertas. *(Construido jun 2026: `Offer.url` + oferta clicable.)*
- ✅ "Destacados / Mejores del mercado" (afiliados). *(Construido jun 2026: ruta `/destacados` + CTA de afiliado.)*
- 🆕 Recomendaciones de portafolio (solicitar/conservar/cancelar, Parte II §6).

**Could Have:**
- 🔲 Notificaciones push para ofertas por vencer.
- 🔲 Beneficios geolocalizados (salas VIP, etc.).
- 🆕 Reporte semanal/mensual de ahorro real (gancho de retención).

**Won't Have (v1.0 → reafirmado):**
- Integración Open Finance en tiempo real (Fase 2, post-validación).
- Scraping automático de saldos de puntos/millas.

---

## 7. Personas y Tareas a Realizar (JTBD)

Personas detalladas vigentes en `.product/PERSONAS/` (Gloria Espinosa, Sandra Moreno, Sebastián Ríos). Arquetipo principal conservado de v1:

**Andrés (32), millennial tech.** 4 tarjetas (Nu, Bancolombia LifeMiles, RappiCard, Falabella). Viaja 3 veces/año. Quiere vuelos gratis pero olvida qué tarjeta da salas VIP o el mejor multiplicador.
- "Cuando voy a pagar en un restaurante, quiero ver cuál de mis 4 tarjetas me da el mejor beneficio, para no perder dinero."
- "Cuando planeo un viaje, quiero saber cuál de mis tarjetas da acceso gratis a salas VIP, para no pagar $30 USD."

> **Nota v2:** Andrés es totalero y de alto gasto → ICP Optimizador. Validar que las personas de `.product/PERSONAS/` cumplen los filtros duros del §3.

---

## 8. Requisitos Funcionales y Motor de Recomendación v2

### 8.1 Core: Gestionar Billetera (de v1, conservado)

Historia: Como usuario, quiero agregar una tarjeta seleccionando banco y modelo, para que la app sepa qué beneficios tengo.
- [x] Lista de bancos buscable (tradicionales y digitales).
- [x] Filtra modelos tras seleccionar banco.
- [x] Apodo (máx 40) y últimos 4 dígitos (máx 4) opcionales.
- [x] Guarda (user_id, card_id, nickname, last_four).
- 🔲 Captura `perfil_pago` (totalero/rotativo/mixto), gasto aproximado por categoría y preferencia (millas/cashback) en el onboarding.

### 8.2 Core: Motor de Recomendación v2 (🆕 reemplaza el algoritmo simple de v1)

Resuelve la Pregunta Abierta 9.1 de v1 ("¿cómo rankear 10% cashback vs x3 millas?"). El algoritmo de v1 (`VALUE_TYPE_WEIGHT × numeric_value`) no es objetivo ni comparable entre monedas.

**Principio:** todo beneficio se traduce a pesos colombianos efectivos esperados (COP_e) vía la tabla VE:

`VE_moneda = ValorRedención × p_red × (1 − breakage)` (Puntos Colombia ≈ $7; LifeMiles ≈ $15 conservador, con haircut por vigencia y por no-redención.)

**Tasa efectiva adimensional (el igualador):** `r_b(x) = unidades_por_peso_b(x) × VE_moneda(b)` → cashback y millas quedan directamente comparables.

**Bifurcación obligatoria por perfil de pago:**
- **Totalero:** interés = 0 → optimizar recompensa neta − cuota.
- **Rotativo:** el interés EA domina → priorizar tasa baja, NO recompensas. (Recomendar millas a un rotativo es malpráctica financiera y queda prohibido.)

**Score de dos capas:**
- **VEO** (Valor Económico Objetivo), neutral, en COP: `12·Σ g_x·R_efectiva(t,x) + Promos − CostoAnual − CostoInterés`. Siempre se muestra ("te deja ~$X/año").
- **UP** (Utilidad Personalizada) = VEO ajustado por preferencias, solo para ranking en UI. Elegibilidad = filtro duro.

**Criterios de aceptación (v2):**
- [x] Recupera tarjetas del usuario y beneficios por `category_id`.
- 🔲 Calcula `r` efectiva normalizada vía tabla VE (no pesos por tipo).
- 🔲 Aplica bifurcación totalero/rotativo.
- 🔲 Incorpora promociones vigentes (con vigencia, tope, canal, elegibilidad) y resuelve stacking (grupos exclusivos vs apilables).
- 🟡 Asigna nivel de confianza (Confirmado/Probable/Acción) a cada recomendación. *(UI construida jun 2026; la asignación automática del nivel sigue pendiente del motor/datos.)*
- [x] Resultados < 500 ms (meta NFR < 100 ms con índices y precálculo, §13).
- [x] Mensaje de respaldo si ninguna tarjeta tiene beneficio en la categoría.

### 8.3 Core: Ofertas Explorables (de v1)

- [x] Consulta promociones activas (`valid_until >= hoy` O NULL).
- [x] Filtros por banco y categoría (chips).
- ✅ CTA saliente rastreable al hacer clic en una oferta. *(Construido jun 2026: el tipo `Offer` ahora incluye `url`; la oferta es clicable con enlace saliente `rel="noopener"`.)*

### 8.4 🆕 Recomendaciones de Portafolio (Parte II §6)

- **Usar ahora:** argmax del beneficio marginal por transacción.
- **Solicitar:** `Valor(T∪{t}) − Valor(T) − cuota > 0`.
- **Cancelar:** contribución marginal < cuota (con aviso de impacto en historial crediticio).

---

## 9. Flujos Lógicos

**Flujo 1 — Agregar tarjeta (ruta feliz):** (de v1) banco → modelo → apodo → `POST /api/user-cards` → inserta en `cards_user` → redirige al dashboard con actualización optimista. 🔲 Tras la primera tarjeta, solicitar `perfil_pago` y gasto por categoría.

**Flujo 2 — Recomendador sin tarjetas:** (de v1) recuento de billetera = 0 → estado vacío con CTA a "Agregar tarjeta".

**Flujo 3 🆕 — Manejo de confianza/incertidumbre (Parte VIII):**
1. Usuario consulta "voy a comprar en [comercio]".
2. El motor filtra promos validadas y vigentes para sus tarjetas.
3. Asigna nivel: 🟢 Confirmado (doble fuente, aplica seguro) · 🟡 Probable (depende de segmento/elegibilidad — "confírmalo en tu app") · 🔵 Acción requerida (inscripción/diferir).
4. Nunca promete un beneficio condicionado a elegibilidad desconocida. Si el comercio/tarjeta no está validado → "te confirmo en X horas" (no inventar).

---

## 10. Requisitos de Datos (esquema escalable, Parte VI)

**Entidades clave (mejoradas vs v1):**
- Users / Banks / Cards / Merchants — maestras (identidad estable, UUID).
- 🆕 `card_versions` — atributos mutables versionados (cuota, EA, requisitos, cupos) con vigencia (`valid_during`) y EXCLUDE anti-solapamiento.
- 🆕 `benefits` versionados — (card_id, category, reward_type, rate, cap, exclusiones, valid_during). (v1 no versiona ni maneja topes.)
- 🆕 `ve_values` — tabla VE por programa de lealtad (columna generada `redemption × p_red × (1−breakage)`). No existe en v1; es indispensable para el recomendador v2.
- 🆕 `promotions` con vigencia temporal — (effect, channel, city, mcc, compra_min, tope, conditions JSONB, stacking_group, is_targeted, valid_during) + tablas N:N `promotion_cards`/`promotion_merchants`. (v1 tiene Offers plano sin condiciones/stacking.)
- `cards_user` (billetera) — (user_id, card_id, nickname, last_four, is_primary) + 🆕 cupo_disp, dia_corte, soft-delete `removed_at`.
- 🆕 `recommendations` — log inmutable (contexto → tarjeta → ahorro estimado → ¿seguida? → ahorro real). Métrica + dataset de ML futuro.

> ⚠️ **Bug heredado de v1 a resolver:** el front consulta tablas en inglés (`cards_user`, `cards`, `banks`, `benefits`) pero `supabase/schema.sql` define nombres en español (`user_cards`, `bancos`, `tarjetas`, `beneficios_*`) → contra Supabase real devuelve vacío. **Decisión v2:** unificar a un solo idioma de esquema (recomendado inglés para consistencia con `src/types/database.ts`) y migrar. El front puede seguir desacoplado con `VITE_USE_MOCKS=true` mientras tanto.

**Privacidad (de v1, reafirmado):** RLS por usuario en `cards_user`; no se recopilan PAN/CVV/fecha de vencimiento (fuera de alcance PCI-DSS). 🆕 Habeas Data (Ley 1581): consentimiento explícito, finalidad, RNBD — desde el día 1 al capturar gasto.

---

## 11. Estrategia de Datos / Ingesta (Parte VIII — resuelve Pregunta Abierta 9.2)

El ingreso manual no escala, pero mantener el grafo de promociones fresco y correcto **ES el moat** (Parte III). Operación:
- **Fuentes:** sitios/apps oficiales de bancos, newsletters, redes, y crowdsourcing de usuarios.
- **Cadencia:** revisión semanal del alcance (≈20 tarjetas × 20 comercios al inicio); diaria para promos que vencen <7 días.
- **Validación (regla de oro):** doble fuente + cuatro ojos antes de marcar 🟢 Confirmado. Sin validar = no existe para el motor.
- **SLA de frescura:** ninguna promo recomendada con verificación > 7 días.
- **Estados:** borrador → validada → vigente → por_vencer → expirada.
- **Evolución:** Fase 1 curación manual + validación → Fase 2 scraping semi-automatizado con validación humana → Fase 3 convenios/APIs/Open Finance.

---

## 12. Monetización por Fases y Unit Economics (Parte VII)

**Modelo por fases:**
- **Fase 1 (Años 1–3):** CPA/afiliación (CTA rastreable a apps bancarias) + premium de nicho. Fuente principal de ingresos al inicio.
- **Fase 2:** suscripción premium escalada + Open Finance.
- **Fase 3 (Años 4–7):** marketplace de ofertas (Card-Linked Offers) + B2B/licenciamiento del motor + inteligencia de mercado anonimizada. Aquí migra el 70%+ del valor.

**Hallazgo central:** el CPA es una trampa de techo bajo; el valor venture está en el marketplace + B2B sobre el dato cross-bank.

**Unit economics por escenario (Año 7):**

| | A Conservador | B Base | C Ambicioso |
|---|---|---|---|
| LTV/CAC | 0.22 ❌ | 1.88 ⚠️ | 6.95 ✅ |
| Margen bruto | 60% | 72% | 82% |
| Ingresos | $0.2M | $6.5M | $80.3M USD |
| Valoración | ~$1M | $26–52M | $321–643M USD |

Capital a PMF: $0.3–1.1M USD. Caso C es el único venture-grade y es capital-eficiente (~$3.7M de quema máx).

---

## 13. Requisitos No Funcionales (NFRs) y Stack

**Rendimiento:** TTI < 1.5 s en 3G; consultas del recomendador < 100 ms (vía índices + precálculo `user_best_card_by_category`).
**Escalabilidad:** lecturas vía Edge Functions/CDN de Supabase; objetivo 1.000 usuarios concurrentes (v1) → diseño de datos preparado para 1M (Parte VI: schemas por dominio, versionamiento, particionado).
**Seguridad:** AuthN con JWT Supabase; AuthZ con RLS Postgres; HTTPS/TLS 1.3. 🆕 Consentimientos Open Finance inmutables + secretos en Vault (Fase 2).
**Stack (de v1):** Frontend React (Vite) + Tailwind + Framer Motion en Vercel/Netlify. Backend/DB Supabase (Postgres, Auth, Edge Functions). 🆕 Evolución: ingesta de datos semi-automatizada, y futura extracción de dominios a servicios (los schemas ya están aislados).

---

## 14. Diseño y UX (Sistema Visual — conservado de v1)

**Principios:** mobile-first (`max-w-2xl`, nav inferior fija de 5 ítems, `pb-24`); limpio y suave (`rounded-2xl`, sombras violeta, jerarquía tipográfica); con vida (micro-animaciones Framer Motion, `layoutId`, `active:scale-95`).

**Color:** primario `eliseo` violeta (500 `#5B4CF5`, 600 `#4A3DE3`); éxito `mint` (`#10B981`); acento `coral` (`#FF6B57`); fondo `#F7F8FF`, superficie `#FFFFFF`, texto `#0F0F23`; gradientes por nivel de tarjeta (gold/platinum/black).

**Tipografía:** Inter. Títulos `text-2xl font-bold`; secciones `text-lg font-bold`; cuerpo `text-sm`; metadatos `text-xs`.

**Componentes (`index.css`):** `eliseo-card`, `eliseo-btn-primary/-secondary/-outline`, `input-field`, `glass` (nav con backdrop-blur); 🆕 `ConfidenceBadge` (niveles de confianza); iconos `lucide-react`.

**Inventario de pantallas:**

| Ruta | Pantalla | Estado |
|---|---|---|
| `/` | Landing | ✅ |
| `/auth` | Login / Registro | ✅ |
| `/dashboard` | Tarjeta principal + stats + categorías | ✅ |
| `/my-cards` | Lista de billetera | ✅ |
| `/add-card` | Alta en 3 pasos | ✅ |
| `/card-detail/:id` | Detalle + beneficios (🆕 con nivel de confianza) | ✅ |
| `/recommender` | Recomendador por categoría | ✅ (🔲 motor v2) |
| `/offers` | Feed de ofertas con filtros + 🆕 link saliente + nivel de confianza | ✅ |
| `/profile` | Perfil + privacidad | ✅ (🔲 perfil_pago) |
| `/destacados` | "Mejores del mercado" (afiliados) | ✅ *(construido jun 2026)* |

**Categorías (11):** General 🔧 · Cashback 💰 · Puntos/Millas 🏆 · Viajes ✈️ · Restaurantes 🍽️ · Entretenimiento 🎬 · Supermercados 🛒 · Combustible ⛽ · Streaming 📺 · Moda 👗 · Seguros 🛡️.

**Tono de voz:** español de Colombia, cercano, segunda persona; mensajes breves; estados vacíos siempre con CTA. 🆕 Todo mensaje de ahorro incluye su nivel de confianza y el "por qué" en pesos.

---

## 15. Roadmap, Gates Go/No-Go e Hipótesis sin Validar (Parte IX)

**Roadmap (12 meses):**
- **30 días:** motor manual (concierge) + primeros 15–30 usuarios del ICP. Validar que el dato se puede mantener.
- **90 días:** 100 usuarios; medir premio real, hábito, disposición a pagar. Go/No-Go grande.
- **6 meses:** producto semi-automatizado + 500–1.000 usuarios + primer ingreso.
- **12 meses:** seed + piloto de marketplace (CLO) + preparación Open Finance.

**Gate Go/No-Go (90 días, para invertir en software):** consultas no provocadas ≥2/sem **Y** retención sem-4 ≥40% **Y** premio mediano ≥$400k/año **Y** (WTP ≥25% en cuartil alto **o** CPA real confirmado). Si no → pivotar.

**Las 5 hipótesis NO validadas (por riesgo):**
1. 🔴🔴🔴 El premio económico real es suficiente (≥$400k/año en el Optimizador).
2. 🔴🔴 Existe hábito recurrente (consultas no provocadas).
3. 🔴🔴 Hay un motor de ingresos (CPA o suscripción).
4. 🔴 El dato de promociones se puede mantener fresco a escala (el moat).
5. 🟠 La migración a marketplace/B2B es ejecutable (define caso B vs C).

> ⚠️ **Nota de coherencia:** el Blueprint recomienda **validar 90 días con un concierge manual (WhatsApp) antes de construir software**. La app React (incluidos los features de §6 ya construidos) es producto de **Fase 1 post-validación**; se está desarrollando en paralelo por decisión del equipo.

---

## 16. Preguntas Abiertas (estado v2)

1. **9.1 Ranking del recomendador** → ✅ RESUELTO en v2 vía normalización VE a pesos + score de dos capas (§8.2). Pendiente: calibrar la tabla VE con datos reales de redención.
2. **9.2 Ingesta de datos** → 🟡 Estrategia definida (§11, operación de datos como moat). Pendiente: ejecutar y medir si es sostenible a 100 usuarios manuales.
3. **9.3 Reconciliación de esquema front↔BD** → 🔲 En curso — decisión v2: unificar a un solo idioma (inglés) y migrar.
4. 🆕 Calibración de `p_red`/`breakage` por programa con datos de redención reales.
5. 🆕 Política de elegibilidad de promos segmentadas ("clientes seleccionados") — cómo estimar `p_elegible`.

---

## Changelog v1 → v2

| Área | v1 | v2 |
|---|---|---|
| Marco | Spec táctico del producto construido | PRD integrado: estrategia + producto |
| ICP | Amplio (25–45, crédito+débito) | Estrecho: "El Optimizador" (alto gasto, totalero, crédito) |
| Recomendador | `VALUE_TYPE_WEIGHT × numeric_value` | Motor v2: normalización VE, totalero/rotativo, dos capas, promos con vigencia/stacking, niveles de confianza |
| Datos | Offers/Benefits planos | Versionado + tabla VE + promociones temporales (Parte VI) |
| Monetización | CTR a apps / afiliados | Fases CPA → marketplace (CLO) → B2B |
| Moat | Ausente | Neutralidad cross-bank + 5 capas + matriz de amenazas |
| Validación económica | Ausente | Premio segmentado (Parte IV) + gates Go/No-Go |
| Incertidumbre | No contemplada | Niveles Confirmado/Probable/Acción |
| North Star | "Transacciones Optimizadas" | Conservada, reanclada a hábito + ahorro real |
| Diseño/UX | Completo | Conservado íntegro |

---

> **Cambios registrados tras el draft v2 (jun 2026, rama `feat/ui-polish`):** se construyeron tres ítems que el v2 listaba como pendientes/propuestos — **Destacados** (`/destacados`), **CTA saliente en Ofertas** (`Offer.url` + oferta clicable) y la **UI de niveles de confianza** (`ConfidenceBadge` en CardDetail y Offers). El cálculo automático del nivel de confianza y el motor v2 (VE, totalero/rotativo) siguen pendientes.

> Documento de referencia completo: ver `Blueprint_Estrategico_Eliseo_ES.md` (Partes I–IX) en esta misma carpeta.
