# Documento de Requisitos del Producto (PRD) — Eliseo v3 (Edición Validada: Estrategia + Producto + Evidencia de Mercado)

> **Estado del documento:** v3 (junio 2026) · **actualizado 11-jun-2026** tras el despliegue a producción. Evoluciona el PRD v2 con tres insumos nuevos: (1) **validación de datos de mercado contra fuentes públicas** (jun 2026, ver §18 Referencias), (2) **benchmark internacional 2025–2026** de la categoría (MaxRewards, CardPointers, Kudos, Uthrive, AwardWallet, Curve), y (3) **absorción del contenido crítico** del `Blueprint_Estrategico_Eliseo_ES.md` y de `customer-voice-analysis.md` que el v2 dejaba por referencia. `PRD_Eliseo_ES_v2.md` se conserva como histórico.
>
> **Actualización 11-jun-2026 (estados sincronizados con producción):** el rediseño v2 "verde bosque" (prototipo Claude Design) está EN PRODUCCIÓN en Vercel y GitHub Pages, conectado a Supabase real (esquema + seed + migración v2 aplicados). El motor v2 (tabla VE, bifurcación totalero/rotativo, niveles de confianza) está implementado. Se sumó el **paquete de claridad UX** con patrones de MaxRewards (onboarding por objetivos, checklist de activación, estados vacíos que enseñan, bloques de confianza, carrusel en landing, multi-add de tarjetas). Ver Changelog al final.
>
> **Este `.md` es la fuente canónica.** Audiencia: equipo de producto/ingeniería + inversionistas. El documento es autocontenido: se sostiene solo, sin necesidad de leer el Blueprint.
>
> **Leyenda de estado:** ✅ Hecho · 🟡 Parcial · 🔲 Pendiente · 🆕 Nuevo en v3 (propuesto).
>
> **Regla de evidencia (nueva en v3):** toda cifra lleva fuente (§18) o se marca explícitamente como **[HIPÓTESIS]** pendiente de validación. Un PRD que mezcla datos y deseos sin distinguirlos no sirve ni al equipo ni al inversionista.

**Cambio de marco respecto a v2:** v2 ancló el producto a una tesis de negocio validable. v3 **verifica esa tesis contra el mercado real** (jun 2026): corrige las cifras que estaban desactualizadas o mal calibradas (mercado de tarjetas, valor de LifeMiles), confirma las que se sostienen (Decreto 0368, Nu 5M, espacio competitivo vacío), e incorpora las lecciones de los jugadores internacionales que ya recorrieron este camino — incluyendo los que murieron en el intento.

---

## 1. Resumen Ejecutivo, Tesis y KPIs

**Visión.** Eliseo es el asistente neutral de decisión de tarjetas para Colombia: conociendo todas las tarjetas que el usuario ya tiene, le dice qué tarjeta usar en cada compra para maximizar su beneficio —y cuál solicitar, conservar o cancelar—, mostrando el ahorro en pesos.

**Tesis de inversión (una línea).** No se invierte en un comparador de tarjetas; se invierte en la futura **capa neutral de decisión y demanda financiera de LatAm**, usando las tarjetas de crédito como cuña de entrada.

**Validación externa de la tesis (jun 2026).** La investigación de mercado confirma tres pilares y corrige uno:
- ✅ **El espacio está vacío en LatAm.** No existe ningún optimizador de uso ("qué tarjeta usar en cada compra") en Colombia ni en la región; solo comparadores de adquisición (Rankia, ComparaBien). Eliseo sería **first-mover regional** de una categoría ya validada en EEUU (Kudos: Series A de US$10.2M con QED Investors; CardPointers: rentable; MaxRewards: US$4M).
- ✅ **El viento de cola regulatorio es real.** Decreto 0368 del 7-abr-2026: Open Finance **obligatorio** para todas las entidades vigiladas por la SFC, con APIs operativas estimadas hacia fines de 2027/2028.
- ✅ **La categoría monetiza.** Modelos probados: suscripción US$50–110/año (CardPointers, MaxRewards, AwardWallet) y afiliación CPA que sostiene apps gratuitas (Kudos, Uthrive).
- ⚠️ **El mercado ya no está en contracción** (corrección a v2): ~15.5M tarjetas vigentes (SFC, may 2026) y originaciones creciendo +31% interanual desde mediados de 2025, primer crecimiento en 10 trimestres. El timing mejora: entran tarjetahabientes nuevos que no conocen sus beneficios.

**Por qué ahora.** El pivote de "¿qué tarjeta solicitar?" (uso único, ya cubierto) hacia "¿qué tarjeta usar ahora?" (uso recurrente → hábito → datos → moat) sigue siendo el movimiento correcto. Y hay una ventana: cuando el Open Finance esté operativo (~2027/28) y las redes de pago desplieguen comercio agéntico (Visa Intelligent Commerce), los incumbentes intentarán internalizar la recomendación. Llegar antes con el grafo de promociones y la confianza del usuario es la carrera.

**North Star Metric.** Transacciones Optimizadas = número de veces que un usuario consulta el recomendador antes de comprar, sin que se le pida (proxy directo de hábito y de valor entregado).

**KPIs:**

| KPI | Meta | Fuente |
|---|---|---|
| Consultas no provocadas / usuario activo / semana | ≥ 2 (hábito) | Blueprint Parte V |
| Retención semana 4 (cohorte) | ≥ 40% | Blueprint Parte V |
| Ahorro real confirmado / usuario / mes | ≥ $30–40k COP | Blueprint Parte IV |
| Tarjetas agregadas / usuario (primera semana) | > 2.5 | v1 |
| Sesiones/semana en Recomendador u Ofertas | > 3 | v1 |
| CTR a CTA de afiliado (proxy de monetización CPA) | > 5% | v1 |
| Disposición a pagar premium (cuartil alto) | ≥ 25% | Blueprint Parte IV |
| 🆕 Tiempo de consulta en punto de venta | < 10 s (umbral de abandono, §9) | Voz del cliente |
| 🆕 Frescura del dato recomendado | 100% promos con verificación ≤ 7 días | §11 |

---

## 2. Problema y Oportunidad de Mercado

**Problema.** Los colombianos con varias tarjetas dejan dinero sobre la mesa a diario: no saben qué tarjeta usar en cada compra, se pierden promociones que cambian cada semana, y dejan vencer millas y puntos. La información es opaca, dispersa y en letra pequeña; los comparadores existentes solo responden "¿cuál solicitar?".

**Dimensión del desperdicio (proxies globales — no existe dato público para Colombia, se declara como proxy):** entre el 26% y el 30% de los puntos de lealtad ganados no se redimen cada año; en programas de viajes/aerolíneas el *breakage* llega al 70–85%; Gartner estimó >US$140 mil millones en puntos sin gastar solo en EEUU. No hay razón para creer que Colombia es mejor: la fragmentación multi-banco y la opacidad de condiciones lo agravan. **[HIPÓTESIS a medir en el piloto: % de beneficios capturados vs disponibles por usuario.]**

**Mercado (cifras corregidas, jun 2026).** **~15.5M de tarjetas de crédito vigentes** en las 28 entidades vigiladas por la SFC (may 2026; líderes: Bancolombia 2.7M, Falabella 1.85M, Davivienda 1.67M). Tras ~10 trimestres de contracción (2023–2024), las originaciones crecen **+31% interanual** desde el trimestre jun–ago 2025 (TransUnion), concentradas en perfiles de bajo riesgo — exactamente el perfil del ICP de Eliseo. El comparador de "cuál solicitar" ya está ocupado (Rankia, ComparaBien). La oportunidad no monetizada es el **uso recurrente en el punto de gasto**.

**El competidor real es la resignación (hallazgo de voz del cliente).** La reacción emocional dominante del segmento no es rabia activa sino frustración resignada ("ay, ya qué"): el usuario ya normalizó perder beneficios. Implicaciones de producto y GTM:
1. El primer momento de valor debe ser **inmediato y sorprendente** (≤60 segundos desde el registro: "no sabía que tenía eso").
2. La adquisición no se compra con pauta: depende del **boca a boca** y de comunidades donde el dolor sí está activo (millas, viajeros, finanzas personales).

**Segmentación económica (Monte Carlo, Blueprint Parte IV — 200.000 muestras).** El premio por usuario no es homogéneo: la simulación da un ahorro mediano de ~$350–478k COP/año (caso central), concentrado en el gasto medio-alto. El usuario básico (≈35% del mercado) casi no captura valor recurrente: su único premio real es evitar la cuota de manejo, decisión de una sola vez. **Implicación: el producto y el GTM apuntan al Optimizador, no al masivo.**

| Perfil | Premio recompensas (mediana, año) |
|---|---|
| Básico | $90.000 ❌ (no sostiene hábito) |
| Profesional joven | $385.000 |
| Familia ingresos medios | $542.000 |
| Viajero frecuente | $725.000 |
| Premium multi-tarjeta | $1.503.000 |

> 🆕 **Nota de calibración v3:** estas medianas se calcularon con LifeMiles a $15 COP/milla. Con el valor de mercado real para redención en vuelos (~$43–65 COP/milla, §8.2), el premio de los perfiles intensivos en millas (Viajero, Premium) está **subestimado** — la tesis económica es más fuerte de lo que el v2 afirmaba, siempre que el usuario redima en vuelos. Recalibrar el Monte Carlo con la tabla VE corregida es tarea del piloto.

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

### 3.1 🆕 Las tres personas dentro del ICP: dolor, disposición a pagar y dealbreakers

El v2 trataba al Optimizador como homogéneo. Las personas investigadas (`.product/PERSONAS/`) muestran que la **barrera de activación y la monetización difieren radicalmente** dentro del segmento:

| | **Sebastián Ríos** (Power User) | **Sandra Moreno** (Pragmatista) | **Gloria Espinosa** (Escéptica) |
|---|---|---|---|
| Dolor | 9/10 | 5/10 | 3/10 |
| Tarjetas / cuotas | 5 tarjetas · $380k/mes | 2 tarjetas · $64k/mes | 3 tarjetas · $78k/mes |
| Cómo llega | Busca activamente; ya intentó Excel | Recomendación social (una amiga ahorró) | Solo si alguien cercano la usa hace meses |
| Qué necesita ver | Precisión absoluta y respuesta <5 s | **Pesos ahorrados en el primer mes** (no puntos ni %) | Qué datos NO se piden + prueba social |
| Dealbreaker | Una recomendación errada → pierde confianza | Pedir datos de tarjeta antes de dar valor → abandona | Pedir número de tarjeta = fuga inmediata (le clonaron una) |
| Churn trigger | Datos desactualizados | <$30k de ahorro en 30 días → desinstala | Cualquier señal de riesgo |
| Disposición a pagar | $30k/mes si ahorra >$100k/mes | <$15k/mes y solo con ROI demostrado | $0 (ya paga cuota de manejo) |
| Rol en el GTM | **Champion**: ya es "el Google de tarjetas" de su grupo | Masa media: llega por WhatsApp/reels/podcast, no por Google | Validadora tardía: entra cuando hay reviews 4.5+ |

**Implicaciones de diseño:** (a) el onboarding nunca pide datos sensibles ni dinero antes de mostrar valor; (b) el ahorro siempre se comunica en pesos del primer mes; (c) la precisión del dato es existencial — ver riesgos de abandono.

### 3.2 🆕 Riesgos de abandono por etapa del hábito (voz del cliente)

| Etapa | Riesgo | Implicación |
|---|---|---|
| **D1–D7** (primer alivio) | Un beneficio desactualizado **destruye la confianza de forma irreversible** | El pipeline de frescura (§11) es requisito del MVP, no mejora futura |
| **S2–S4** (cambio de hábito) | Fricción >10 segundos en el punto de compra → el usuario deja de consultar | Presupuesto de fricción de la consulta: <10 s extremo a extremo (§9) |
| **M2+** (hábito formado) | El modelo mental se "congela" y la app deja de ser necesaria… hasta que la información cambia y el usuario no se entera | El gancho de retención es el **cambio**: alertas de promos nuevas/vencidas y reporte de ahorro |

> El riesgo M2+ es el mismo que casi mata el modelo de suscripción de MaxRewards ("el usuario aprende y se va"): la retención no vive en el recomendador estático sino en el flujo de novedades. Ver mitigación en §12.

---

## 4. Propuesta de Valor y Posicionamiento

**Propuesta de valor.** "Recupera ~$40.000 al mes (+$450.000/año) en beneficios que hoy dejas sobre la mesa." Para viajeros/premium: $700k–1.5M/año.

**Posicionamiento.** *La Suiza de las tarjetas*: el único asistente que está del lado del usuario y compara TODAS sus tarjetas (de todos los bancos), no las de un emisor. Cada recomendación viene con el "por qué" en pesos.

**🆕 Cláusula de transparencia (blindaje de la neutralidad).** La neutralidad cross-bank es el activo central y es frágil cuando se monetiza por afiliación. Eliseo adopta desde el día 1 el estándar de transparencia de Kudos: *"Ganamos una comisión si solicitas una tarjeta a través de Eliseo, pero la recomendación de qué tarjeta usar en cada compra nunca se ve afectada por esa comisión."* Reglas operativas:
1. El motor "usar ahora" (§8) **no tiene ningún input comercial**: solo VE, promos vigentes y perfil del usuario.
2. Las recomendaciones de "solicitar" muestran siempre el cálculo completo (`Valor(T∪{t}) − Valor(T) − cuota`) aunque la tarjeta ganadora no pague CPA.
3. Todo CTA con comisión se etiqueta visiblemente como afiliado.

---

## 5. Ventaja Competitiva, Competencia y Moat

### 5.1 El wedge estructural

Un emisor único jamás puede ser un optimizador neutral entre todas tus tarjetas sin canibalizar su producto. Nu solo recomienda Nu; Bancolombia solo Bancolombia; RappiCard solo RappiCard.

### 5.2 Competencia local (validada contra mercado, jun 2026)

| Jugador | Qué hace | ¿Compite con "qué tarjeta usar"? |
|---|---|---|
| Rankia Colombia | Comparador editorial + afiliación para **adquisición** | NO — uso único, no recurrente |
| ComparaBien Colombia | Comparador de productos financieros (origen peruano) | NO — adquisición |
| Puntos Colombia | Programa de coalición (Bancolombia–Éxito), app propia | NO — mono-coalición, no compara |
| Nu Colombia | **5M clientes (may 2026)**, TC producto core (Morada/NuControl/Abrecaminos), 1M con primera TC | NO hoy — mono-emisor; sí valida apetito por UX financiera superior |
| Glim (B2B) | Consolidación de beneficios corporativos fragmentados | NO compite, pero **valida** que el mercado colombiano adopta consolidadores de beneficios |
| Finerio | Infraestructura B2B de Open Finance/agregación | NO compite — **posible proveedor** puente pre-Decreto (§11) |

**Conclusión validada:** no existe ningún optimizador de uso en Colombia ni se encontró ninguno en LatAm. El espacio "MaxRewards/Kudos para LatAm" está vacío. (Ausencia de evidencia tras búsqueda exhaustiva; revalidar trimestralmente en Crunchbase/ProductHunt.)

### 5.3 🆕 Benchmark internacional 2025–2026 (la categoría ya existe y monetiza)

| | MaxRewards (US) | CardPointers (US) | Kudos (US) | Uthrive (US) | AwardWallet (US) |
|---|---|---|---|---|---|
| Recomienda tarjeta por comercio/categoría | Sí | Sí | Sí (checkout online) | Sí | Parcial |
| Pide credenciales bancarias | **Sí (conectores propios)** | **No** | No | Sí (agregador) | Login a programas |
| Ayuda en punto de venta físico | Parcial | **Sí** (pase Apple Wallet, geolocalización "AutoPilot", Siri) | No | Alertas post-compra | No |
| Auto-activación de ofertas del banco | Sí (8 emisores) | Sí (vía extensión, sin credenciales) | No | Sí | No |
| Asistente IA conversacional | No | Sí (on-device) | Sí (MariaGPT) | No | No |
| Precio | US$108–240/año | US$90/año | **Gratis** | Gratis | US$50/año |
| Modelo de ingresos | Suscripción | Suscripción + afiliados | Afiliación tarjetas + comercios | Afiliación | Suscripción + B2B |
| Tracción | US$4M; críticas de ejecución | Bootstrapped, **rentable**, equipo de 1 | **Series A US$10.2M (QED)**, 200k usuarios en 18 meses | n/d | 815k usuarios, 630 programas |

**Lecciones directas para Eliseo:**
1. **El modelo sin credenciales gana (CardPointers).** La decisión de Eliseo de no capturar PAN/credenciales no es solo una postura de seguridad: es la arquitectura del único jugador rentable de la categoría. MaxRewards levantó US$4M, construyó scrapers con credenciales y cosechó bloqueos antifraude, desactivación de 2FA y reviews de "good idea, poor execution".
2. **La afiliación sostiene apps gratis (Kudos, Uthrive).** El patrón "Dream Wallet" de Kudos (recomendar la tarjeta que falta según gasto real) es exactamente la Recomendación de Portafolio de Eliseo (§8.4) — y es su fuente de ingresos #1.
3. **La base de reglas curada ES el producto.** Los errores de datos de MaxRewards (mostrar 1x donde era 3x) son la crítica más repetida de la categoría. Coincide con el riesgo D1–D7 de la voz del cliente (§3.2).
4. **Cementerio de la categoría:** Wallaby (absorbida y apagada, 2014), Birch Finance (absorbida, 2018) — pioneros sin modelo de ingresos. **Curve (UK)**: emitió tarjeta física propia, quemó cientos de millones y fue vendida a Lloyds por £120M, por debajo de su última valoración (nov 2025). **Regla: Eliseo no emite instrumento de pago; se queda en la capa de recomendación.**

### 5.4 Matriz de amenazas (ampliada)

| Atacante | ¿Bloqueado por neutralidad? |
|---|---|
| Nu Colombia (5M clientes) | SÍ — mono-emisor |
| Bancolombia / Puntos Colombia | SÍ — coalición cerrada |
| RappiCard (emisor) | SÍ — mono-emisor (vía Davivienda) |
| Rappi (plataforma) / Nequi | **NO — agregador horizontal = amenaza real** |
| 🆕 Redes de pago con IA (Visa Intelligent Commerce, comercio agéntico; bancos con recompensas personalizadas por IA) | PARCIAL — pueden internalizar la recomendación, pero ningún banco dirá "paga esto con la tarjeta de la competencia". La defensa sigue siendo cross-bank + llegar primero |
| 🆕 Kudos/CardPointers expandiéndose a LatAm | NO estructural — pero su barrera es la base de reglas local (bancos colombianos, condiciones en español, promos efímeras), que es justo el moat a construir ya |

### 5.5 Las 5 capas del moat (se construyen, no se tienen)

(1) neutralidad estructural; (2) grafo de promociones fresco propietario + tabla VE opinada; (3) loop de datos cross-bank que se compone; (4) confianza/categoría; (5) velocidad y foco. Defensa contra el agregador horizontal = profundidad financiera + neutralidad creíble + llegar primero al loop de datos.

---

## 6. Alcance del Producto (MoSCoW, recortado al Optimizador)

**Must Have (MVP — "Esqueleto Andante"):**
- ✅ Autenticación (Registro / Inicio de sesión). *(Supabase Auth con confirmación de correo; mensajes de error específicos.)*
- ✅ Agregar tarjeta sin datos sensibles (banco/modelo + apodo + últimos 4 dígitos). *(11-jun: con **multi-selección** — varias tarjetas del mismo banco en una pasada.)*
- ✅ Dashboard con tarjeta principal y métricas resumidas. *(v2: héroe de potencial estimado + checklist de activación.)*
- ✅ Motor Recomendador — **por comercio** con monto ajustable y "La usé" (v2; supera el "por categoría" del v1).
- ✅ Vista de detalle de tarjeta con beneficios categorizados (% efectivo + confianza por categoría).
- ✅ Perfil de pago (totalero/rotativo) en onboarding — capturado en AddCard y persistido (`cards_user.payment_profile`); gobierna la bifurcación del recomendador (§8). *(Construido 10-jun-2026.)*
- ✅ Normalización a pesos efectivos (VE) en el recomendador — `src/lib/ve.ts` + adaptador `walletView.ts` con VE dual para LifeMiles (§8.2). *(Construido 10-jun-2026; calibración con redenciones reales pendiente.)*

**Should Have:**
- ✅ Feed dinámico de Ofertas con vencimientos (datos reales de `offers`; urgencia visual ≤7 días).
- ✅ Filtrado de Ofertas por Banco y Categoría.
- ✅ Niveles de confianza (Confirmado/Probable/Acción) en cada beneficio mostrado. *(11-jun: el nivel se deriva de `benefits.confidence`/`offers.confidence` de la BD; la asignación es curaduría humana, no motor automático — por diseño de §11.)*
- ✅ CTA saliente rastreable en ofertas (`offers.url`, link real con `rel="noopener"`).
- ✅ "Destacados / Mejores del mercado" (afiliados) — tabla `featured_cards` real, cláusula de transparencia (§4) y etiqueta "Enlace de afiliado". *(Construido 10-jun-2026.)*
- 🟡 Recomendaciones de portafolio (solicitar/conservar/cancelar, §8.4) — patrón validado por Kudos "Dream Wallet" como motor de ingresos #1 de la categoría. *(Parcial 11-jun: MyCards muestra la alerta "Revisa tu X: aporta $Y/año pero su cuota suma $Z — considera cancelarla" cuando hay dato de cuota; falta el módulo completo solicitar/cancelar.)*

**Could Have (Fase 1.5, post-gate de 90 días):**
- 🔲 Notificaciones push para ofertas por vencer.
- 🔲 Reporte semanal/mensual de ahorro real (gancho de retención + mitigación del churn "aprende y se va").
- 🆕 **"Card Value" anti-cuota de manejo:** cuánto valor extrajo el usuario de cada tarjeta vs su cuota de manejo anual ("esta tarjeta te costó $348k y te devolvió $520k"). Bajo esfuerzo sobre datos ya capturados; resuena fuerte en Colombia donde la cuota de manejo es el dolor más visible, y alimenta directamente la recomendación de cancelar/conservar. *(El insumo `cards.fee_month` ya existe en la BD; falta poblarlo con datos curados.)*
- 🆕 **Reporte de ahorro compartible** (validación social: "este mes ahorré $180k usando las tarjetas correctas") — el loop viral que el GTM por boca a boca necesita (§2).

**🆕 Paquete de claridad UX (construido 11-jun-2026 — patrones de MaxRewards, ver `Capturas de pantallas_MAXREWARDS/`):**
- ✅ **Onboarding por objetivos** (`/goals`): "¿Qué quieres lograr?" (millas/cashback/puntos/explorar) → `user_metadata.reward_goal`. Personaliza el copy del Dashboard y desempata el ranking SOLO cuando hay <5% de diferencia de ahorro (la capa UP del §8.2 — nunca altera el ahorro mostrado).
- ✅ **Checklist de activación** en Dashboard: 5 pasos con barra de progreso (cuenta → 1ª tarjeta → 2ª tarjeta → 1ª consulta → ofertas). Ataca directamente el riesgo de abandono D1–D7 (§3.2).
- ✅ **Estados vacíos que enseñan:** el recomendador sin tarjetas muestra una recomendación de ejemplo etiquetada EJEMPLO en vez de un vacío genérico.
- ✅ **Bloques de confianza** (TrustNotes) en registro y alta de tarjeta: nunca pedimos el número completo / no vendemos datos (Ley 1581) / solo tú ves tus tarjetas.
- ✅ **Landing con carrusel** de 3 value props (recomendación de ejemplo, ofertas, valor anual) — la app se ve funcionando antes de pedir el registro.
- ✅ **Multi-add de tarjetas:** selección múltiple por banco con un solo guardado — clave para el ICP de ≥2 tarjetas.

**Won't Have (v1.0 → reafirmado con evidencia):**
- Integración Open Finance en tiempo real (Fase 2, post-validación; APIs obligatorias operativas ~2027/28).
- **Captura de credenciales bancarias o scraping de saldos de puntos/millas** — lección MaxRewards (§5.3): es la trampa mortal de la categoría.
- 🆕 **Instrumento de pago propio** (tarjeta física/virtual agregadora) — lección Curve (§5.3): quema capital y sale de la capa donde está el valor.

---

## 7. Personas y Tareas a Realizar (JTBD)

Personas detalladas vigentes en `.product/PERSONAS/` (Gloria Espinosa, Sandra Moreno, Sebastián Ríos) — síntesis comparativa en §3.1. Arquetipo narrativo conservado de v1:

**Andrés (32), millennial tech.** 4 tarjetas (Nu, Bancolombia LifeMiles, RappiCard, Falabella). Viaja 3 veces/año. Quiere vuelos gratis pero olvida qué tarjeta da salas VIP o el mejor multiplicador.
- "Cuando voy a pagar en un restaurante, quiero ver cuál de mis 4 tarjetas me da el mejor beneficio, para no perder dinero."
- "Cuando planeo un viaje, quiero saber cuál de mis tarjetas da acceso gratis a salas VIP, para no pagar $30 USD."

**🆕 JTBD completo (voz del cliente) — el trabajo no es solo funcional:**
- **Funcional primario:** "En el punto de compra, quiero saber cuál tarjeta me da el mejor beneficio, para no dejar plata sobre la mesa."
- **Funcional secundario:** "Quiero ver qué me da cada cuota de manejo que pago, para decidir si cancelo."
- **Emocional (dominante):** "Quiero sentir control de mis finanzas y no sentirme tonto pagando por beneficios que no uso."
- **Social:** "Quiero ser el del grupo que sabe qué tarjeta usar en cada situación."

**🆕 Necesidades latentes (territorio sin mapear — nadie las atiende hoy):**
1. **"¿Debería cancelar esta tarjeta?"** — con uso real: "te cuesta $X, te genera $Y; pierdes $Z/mes; cancélala". Los bancos estructuralmente no pueden dar esta respuesta. Eliseo sí (§8.4).
2. **"¿Qué tarjeta nueva me conviene?"** sin que parezca venta encubierta — la transparencia del §4 es la condición de posibilidad.
3. **Consolidación de fechas de corte y pago** entre 3+ tarjetas (valor oculto, no es dolor declarado).
4. **Alertas contextuales por geolocalización** ("estás en un restaurante: tu Mastercard Gold tiene 15% aquí") — estado ideal del JTBD funcional (roadmap Fase 2, §15).
5. **Validación social del ahorro** (compartible) — el loop viral (§6 Could Have).

---

## 8. Requisitos Funcionales y Motor de Recomendación v2

### 8.1 Core: Gestionar Billetera (de v1, conservado)

Historia: Como usuario, quiero agregar una tarjeta seleccionando banco y modelo, para que la app sepa qué beneficios tengo.
- [x] Lista de bancos buscable (tradicionales y digitales) — catálogo real de 13 bancos.
- [x] Filtra modelos tras seleccionar banco (catálogo real de 64 tarjetas) y permite **selección múltiple** (11-jun).
- [x] Apodo (máx 40) y últimos 4 dígitos (máx 4) opcionales.
- [x] Guarda (user_id, card_id, nickname, last_four) con RLS por usuario.
- ✅ Captura `perfil_pago` (totalero/rotativo) en el alta — persiste en `cards_user.payment_profile`. *(10-jun-2026.)*
- ✅ Captura preferencia de recompensa (millas/cashback/puntos) en `/goals` → `user_metadata.reward_goal`. *(11-jun-2026.)*
- 🔲 Captura gasto aproximado por categoría (hoy el VEO usa el perfil de gasto default del ICP, etiquetado "estimado").

### 8.2 Core: Motor de Recomendación v2 (determinista; tabla VE recalibrada en v3)

Resuelve la Pregunta Abierta 9.1 de v1 ("¿cómo rankear 10% cashback vs x3 millas?"). El algoritmo de v1 (`VALUE_TYPE_WEIGHT × numeric_value`) no es objetivo ni comparable entre monedas.

**Principio:** todo beneficio se traduce a pesos colombianos efectivos esperados (COP_e) vía la tabla VE:

`VE_moneda = ValorRedención × p_red × (1 − breakage)`

**🆕 Tabla VE recalibrada (jun 2026, con fuentes §18):**

| Programa | ValorRedención base | Notas |
|---|---|---|
| Puntos Colombia | **≈ $7 COP/punto** ✅ | Validado: acumulación 1 pto/$700; redención de referencia ~$7 (varía por canje, mín. 200 pts, no efectivo) |
| LifeMiles — redención en vuelos | **≈ $43–65 COP/milla** (1.2–1.8¢ US, TRM ~$3.588) | El v2 asumía $15: **subvaloraba la milla 3–4x.** En business internacional supera 2.4–3¢ |
| LifeMiles — redención no aérea (comercios, "paga con millas") | ≈ $15–25 COP/milla | El antiguo valor del v2 solo es válido como **piso** para canje no aéreo |

**Regla de modelado:** el VE de millas depende del comportamiento de redención del usuario. Default conservador para usuario sin historial: piso no aéreo con `p_red` castigado. Si el usuario declara que redime en vuelos (onboarding/perfil): valor aéreo. **Esto cambia recomendaciones**: para un viajero, x3 LifeMiles a $50/milla vence a 2% cashback en casi toda categoría — con $15 perdía. Calibrar `p_red` y `breakage` por programa con datos reales de redención del piloto (proxies globales de breakage: 20–30% retail, 70–85% viajes).

**Tasa efectiva adimensional (el igualador):** `r_b(x) = unidades_por_peso_b(x) × VE_moneda(b)` → cashback y millas quedan directamente comparables.

**Bifurcación obligatoria por perfil de pago:**
- **Totalero:** interés = 0 → optimizar recompensa neta − cuota.
- **Rotativo:** el interés EA domina → priorizar tasa baja, NO recompensas. (Recomendar millas a un rotativo es malpráctica financiera y queda prohibido.)

**Score de dos capas:**
- **VEO** (Valor Económico Objetivo), neutral, en COP: `12·Σ g_x·R_efectiva(t,x) + Promos − CostoAnual − CostoInterés`. Siempre se muestra ("te deja ~$X/año").
- **UP** (Utilidad Personalizada) = VEO ajustado por preferencias, solo para ranking en UI. Elegibilidad = filtro duro.

**🆕 Sin ML en Fase 1 (explícito, del Blueprint Parte II).** El motor es **determinista**: reglas + tabla VE + resolución de promos (CSP para stacking) + validación manual del dato. El ML entra solo en Fase 2+, cuando exista el dataset de `recommendations` con ahorro real y, post-Open Finance, transacciones reales. Esto es una ventaja, no una carencia: explicabilidad total ("por qué esta tarjeta: $X de cashback + $Y de promo − $Z de cuota") y cero costo de inferencia.

**Criterios de aceptación (v2/v3 — actualizados 11-jun-2026):**
- [x] Recupera tarjetas del usuario y beneficios por categoría (hook `useUserCards` + adaptador `walletView`).
- ✅ Calcula `r` efectiva normalizada vía tabla VE (no pesos por tipo) — implementado en `src/lib/ve.ts` + `walletView.ts` con la tabla recalibrada y VE dual para LifeMiles. Las meta-categorías de acumulación base (puntos/cashback "en todas las compras") alimentan la tasa general. El VEO anual solo cuenta acumulación recurrente (los descuentos situacionales rankean pero no inflan el estimado). *(Smoke test ejecutable: `scripts/smoke-engine.ts`.)*
- ✅ Aplica bifurcación totalero/rotativo — los rotativos van al final del ranking con advertencia; recomendar millas a un rotativo queda bloqueado por diseño.
- 🟡 Incorpora promociones vigentes por comercio (overlay con boost, nota y confianza). *(Parcial: 10 comercios + 4 promos demo como constantes front marcadas "Probable" — falta tabla `merchants`/`merchant_promos` con vigencia/tope/canal y resolución de stacking.)*
- ✅ Asigna nivel de confianza (Confirmado/Probable/Acción) a cada recomendación, derivado de la curaduría (`benefits.confidence`); sin dato → "Probable" (nunca se promete lo no validado).
- [x] Resultados < 500 ms (cálculo en cliente sobre la billetera; meta NFR < 100 ms, §13).
- [x] Mensaje de respaldo si ninguna tarjeta tiene beneficio en la categoría; tarjetas sin datos muestran "datos en camino", nunca 0% engañoso.
- ✅ Capa UP (preferencias): la meta del usuario (`reward_goal`) desempata SOLO con <5% de diferencia de ahorro y se señala con "Va con tu meta". El VEO mostrado nunca cambia. *(11-jun-2026.)*

### 8.3 Core: Ofertas Explorables (de v1)

- [x] Consulta promociones activas (`valid_until >= hoy` O NULL).
- [x] Filtros por banco y categoría (chips).
- ✅ CTA saliente rastreable al hacer clic en una oferta. *(Construido jun 2026.)*

### 8.4 Recomendaciones de Portafolio (validado por el patrón Kudos "Dream Wallet")

- **Usar ahora:** argmax del beneficio marginal por transacción.
- **Solicitar:** `Valor(T∪{t}) − Valor(T) − cuota > 0`.
- **Cancelar:** contribución marginal < cuota (con aviso de impacto en historial crediticio).
- 🆕 Toda recomendación de "solicitar" cumple la cláusula de transparencia (§4): cálculo visible, etiqueta de afiliado, y el ranking no depende de la comisión.

---

## 9. Flujos Lógicos

**Flujo 1 — Agregar tarjeta (ruta feliz, actualizado 11-jun):** banco → modelos (multi-selección con contador) → detalles (1 tarjeta: apodo/últimos 4/perfil; varias: resumen + perfil de pago único) → inserta en `cards_user` (con `payment_profile`; la primera queda como principal) → dashboard con toast.

**Flujo 1b 🆕 — Onboarding de usuario nuevo (11-jun):** registro → (confirmación de correo si aplica) → `/goals` ("¿Qué quieres lograr?") → alta de tarjetas multi-add → dashboard con checklist de activación guiando los pasos restantes.

**Flujo 2 — Recomendador sin tarjetas:** billetera = 0 → recomendación de ejemplo etiquetada EJEMPLO ("así se ve una recomendación") + CTA a "Agregar mi primera tarjeta". *(Antes: vacío genérico.)*

**Flujo 3 — Manejo de confianza/incertidumbre:**
1. Usuario consulta "voy a comprar en [comercio]".
2. El motor filtra promos validadas y vigentes para sus tarjetas.
3. Asigna nivel: 🟢 Confirmado (doble fuente, aplica seguro) · 🟡 Probable (depende de segmento/elegibilidad — "confírmalo en tu app") · 🔵 Acción requerida (inscripción/diferir).
4. Nunca promete un beneficio condicionado a elegibilidad desconocida. Si el comercio/tarjeta no está validado → "te confirmo en X horas" (no inventar).

**🆕 Presupuesto de fricción del flujo de consulta (requisito de producto, no solo NFR):** la consulta en punto de venta debe resolverse en **<10 segundos extremo a extremo** (abrir app → respuesta accionable), porque ese es el umbral medido de abandono del hábito (§3.2). Implicaciones: la respuesta a "¿con qué pago aquí?" debe estar a ≤2 taps desde el ícono; el dashboard prioriza la acción "consultar" sobre la contemplación de métricas; candidato natural a widget/acceso directo en Fase 2 (pase de Google Wallet, §15).

---

## 10. Requisitos de Datos (esquema escalable)

**Entidades clave:**
- Users / Banks / Cards / Merchants — maestras (identidad estable, UUID).
- `card_versions` — atributos mutables versionados (cuota, EA, requisitos, cupos) con vigencia (`valid_during`) y EXCLUDE anti-solapamiento.
- `benefits` versionados — (card_id, category, reward_type, rate, cap, exclusiones, valid_during).
- `ve_values` — tabla VE por programa de lealtad (columna generada `redemption × p_red × (1−breakage)`). 🆕 v3: soporta **VE dual por programa** (contexto de redención: aéreo/no-aéreo) para LifeMiles (§8.2).
- `promotions` con vigencia temporal — (effect, channel, city, mcc, compra_min, tope, conditions JSONB, stacking_group, is_targeted, valid_during) + tablas N:N `promotion_cards`/`promotion_merchants`.
- `cards_user` (billetera) — (user_id, card_id, nickname, last_four, is_primary) + cupo_disp, dia_corte, soft-delete `removed_at`.
- `recommendations` — log inmutable (contexto → tarjeta → ahorro estimado → ¿seguida? → ahorro real). Métrica + dataset de ML futuro.

> ✅ **RESUELTO (10-jun-2026):** el desajuste histórico de esquema front↔BD quedó cerrado. Se aplicaron en Supabase real, en orden: `migration.sql` (tablas en inglés: banks/cards/benefits/franchise_benefits/cards_user/offers con RLS), `seed.sql` (13 bancos, 64 tarjetas, 71 beneficios) y `migration_v2.sql` (aditiva: `cards.fee_month`, `cards_user.payment_profile`, `benefits.confidence`, `offers.url`/`confidence`, tabla `featured_cards` con 3 destacados). Verificado por REST con flujo completo (insert de billetera + RLS por usuario). Las tablas viejas del v1 (`user_cards`, `promotions`) quedaron intactas y sin uso — pueden eliminarse en una limpieza futura coordinada. Pendiente de datos: poblar `cards.fee_month` y validar/ampliar `offers` (`seed_offers.sql` disponible).

**Privacidad (reafirmado y reforzado por benchmark):** RLS por usuario en `cards_user`; no se recopilan PAN/CVV/fecha de vencimiento ni credenciales bancarias (fuera de alcance PCI-DSS; lección MaxRewards §5.3; dealbreaker de Gloria §3.1). Habeas Data (Ley 1581): consentimiento explícito, finalidad, RNBD — desde el día 1 al capturar gasto.

---

## 11. Estrategia de Datos / Ingesta

El ingreso manual no escala, pero mantener el grafo de promociones fresco y correcto **ES el moat** — y también el principal costo operativo (riesgo #3, §16). El benchmark lo confirma: los errores de datos son la crítica #1 de la categoría (§5.3) y el dato desactualizado en la primera semana destruye la confianza de forma irreversible (§3.2).

**🆕 Restricción estructural (validada):** no existirá API bancaria obligatoria hasta ~fines de 2027/2028 (Decreto 0368: cronograma SFC en 6 meses + 12 de cumplimiento + prórroga única de 6). **Toda la Fase 1 opera sin APIs de bancos**: curación manual + scraping ligero de fuentes públicas. Puente opcional pre-Decreto: agregadores B2B ya operativos (p. ej. Finerio) para verificación de gasto de usuarios que lo consientan — evaluar costo/beneficio tras el gate de 90 días.

**Operación:**
- **Fuentes:** sitios/apps oficiales de bancos, newsletters, redes, y crowdsourcing de usuarios.
- **Cadencia:** revisión semanal del alcance (≈20 tarjetas × 20 comercios al inicio); diaria para promos que vencen <7 días.
- **Validación (regla de oro):** doble fuente + cuatro ojos antes de marcar 🟢 Confirmado. Sin validar = no existe para el motor.
- **SLA de frescura:** ninguna promo recomendada con verificación > 7 días.
- **Estados:** borrador → validada → vigente → por_vencer → expirada.
- **Evolución:** Fase 1 curación manual + validación → Fase 2 scraping semi-automatizado con validación humana → Fase 3 convenios/APIs/Open Finance (post-2027).

---

## 12. Monetización por Fases y Unit Economics

**Modelo por fases:**
- **Fase 1 (Años 1–3):** CPA/afiliación (CTA rastreable a apps bancarias) + premium de nicho. Fuente principal de ingresos al inicio.
- **Fase 2:** suscripción premium escalada + Open Finance.
- **Fase 3 (Años 4–7):** marketplace de ofertas (Card-Linked Offers) + B2B/licenciamiento del motor + inteligencia de mercado anonimizada. Aquí migra el 70%+ del valor. (Mercado CLO global: US$9.2–9.4 mil millones en 2025, CAGR ~13% — la ola que Mastercard/Visa ya están montando con commerce media.)

**🆕 Estado de validación de cada motor de ingresos (regla de evidencia):**

| Motor | Evidencia | Estado |
|---|---|---|
| CPA por originación | Modelo dominante de la categoría (Kudos, Uthrive); referencia regional: LifeMiles paga hasta US$200/lead en afiliados. **Pero el CPA de bancos colombianos NO es público.** | **[HIPÓTESIS — la más frágil del plan]**. Acción concreta pre-gate: cotizar con 2–3 redes (Admitad LatAm, Impact, Cityads) y/o 1 banco directo |
| Suscripción premium | Banda validada internacional: US$50–110/año (AwardWallet $50, CardPointers $90, MaxRewards $108). Solo funciona si el ahorro demostrado ≥5x el precio | Plausible para cuartil alto (Sebastián paga $30k/mes ≈ US$85/año); WTP de Sandra/Gloria ≈ 0 → premium es nicho, no masivo |
| CLO / marketplace | Mercado global creciendo 13% anual; sin datos LatAm públicos | Fase 3; requiere escala |

**🆕 Riesgo de churn estructural del premium ("aprende y se va"):** MaxRewards migró a facturación **solo anual** porque el usuario optimiza una vez, interioriza el mapa y cancela. Mitigaciones de Eliseo: (a) facturación anual desde el día 1; (b) el valor recurrente vive en el **cambio** (promos nuevas, vencimientos, reporte mensual de ahorro — §6 Could Have), no en el mapa estático; (c) el reporte de ahorro compartible convierte la retención en adquisición.

**Unit economics por escenario (Año 7, del Blueprint Parte VII):**

| | A Conservador | B Base | C Ambicioso |
|---|---|---|---|
| LTV/CAC | 0.22 ❌ | 1.88 ⚠️ | 6.95 ✅ |
| Margen bruto | 60% | 72% | 82% |
| Ingresos | $0.2M | $6.5M | $80.3M USD |
| Valoración | ~$1M | $26–52M | $321–643M USD |

Capital a PMF: $0.3–1.1M USD. Caso C es el único venture-grade y es capital-eficiente (~$3.7M de quema máx). **[Los tres escenarios dependen del CPA hipotético: recalcular tras cotización real.]**

---

## 13. Requisitos No Funcionales (NFRs) y Stack

**Rendimiento:** TTI < 1.5 s en 3G; consultas del recomendador < 100 ms (vía índices + precálculo `user_best_card_by_category`). 🆕 Consulta en punto de venta <10 s extremo a extremo (presupuesto de fricción, §9).
**🆕 Frescura del dato (NFR de producto):** 100% de promos recomendadas con verificación ≤7 días; 0 beneficios mostrados en estado "borrador"; medible vía panel de operación de datos.
**Escalabilidad:** lecturas vía Edge Functions/CDN de Supabase; objetivo 1.000 usuarios concurrentes (v1) → diseño de datos preparado para 1M (schemas por dominio, versionamiento, particionado).
**Seguridad:** AuthN con JWT Supabase; AuthZ con RLS Postgres; HTTPS/TLS 1.3. Consentimientos Open Finance inmutables + secretos en Vault (Fase 2).
**Stack (actualizado 11-jun):** Frontend React 18 + TypeScript (Vite) con design system propio en CSS (variables oklch) + Tailwind utilitario; animaciones CSS puras (Framer Motion y lucide-react fueron eliminados — bundle 22% más liviano). Deploy en Vercel (producción) y GitHub Pages (alterno). Backend/DB Supabase (Postgres + RLS, Auth con user_metadata). Evolución: ingesta de datos semi-automatizada, y futura extracción de dominios a servicios.

---

## 14. Diseño y UX (Sistema Visual v2 "verde bosque" — EN PRODUCCIÓN desde 10-jun-2026)

> El sistema violeta/Inter del v1 fue reemplazado por completo por el diseño del prototipo de Claude Design ("La Suiza de las tarjetas": tinta + papel + verde bosque). El prototipo de referencia vive en `ELISEO V2/` (repo propio: `eliseo-prototype`).

**Principios:** mobile-first (shell `.app` fullscreen 100dvh, columna de 480px centrada en desktop, nav inferior de 5 ítems con FAB central al recomendador); editorial y cálido (papel/tinta, esquinas `--r` 16–30px, sombras suaves); con vida (animaciones CSS `fade-up`/`pop-in`/`shimmer` — sin librerías de animación).

**Color (variables oklch en `src/index.css`):** marca verde bosque `--brand`/`--brand-deep` (botones, FAB); neutrales cálidos `--paper`/`--surface`/`--ink`; confianza `--ok`/`--warn`/`--info` con tints; premium `--gold`; superficies héroe oscuras `--hero-a #1c3a2c`/`--hero-b` con acento `--hero-accent #9ad9b0` (landing, héroe del dashboard, resultado del recomendador).

**Tipografía:** Schibsted Grotesk (display/cuerpo, 400–900) + IBM Plex Mono (números tabulares, etiquetas `eyebrow`, metadatos).

**Componentes (`src/components/v2/`):** Icon (44 SVG propios de línea), ConfidenceBadge, GlyphTile, RewardChip, CardVisual (tratamiento matte con borde de acento del banco), ScreenHeader, Section, Btn, Wordmark, Toast, MiniStat, Fact, ChipRow, TrustNotes, SampleRecommendation, ActivationChecklist.

**Inventario de pantallas (estado real en producción):**

| Ruta | Pantalla | Estado |
|---|---|---|
| `/` | Landing con carrusel de 3 value props + dots | ✅ |
| `/auth` | Login / Registro (toggle, confirmación de correo, TrustNotes) | ✅ |
| `/goals` 🆕 | Onboarding por objetivos ("¿Qué quieres lograr?") | ✅ *(11-jun)* |
| `/dashboard` | Héroe de potencial estimado + checklist de activación + categorías + teaser destacados | ✅ |
| `/my-cards` | Billetera con CardVisual + alerta de portafolio ("Revisa tu X") | ✅ |
| `/add-card` | Alta en 3 pasos con **multi-selección** y perfil de pago | ✅ |
| `/card-detail/:id` | Hechos clave (VEO/cuota/recompensa/perfil) + % efectivo por categoría con confianza + perks | ✅ |
| `/recommender` | **Por comercio**: búsqueda, monto ajustable, resultado estrella con "por qué en pesos", promo, "La usé" | ✅ motor v2 |
| `/offers` | Feed real con filtros, urgencia de vencimiento y link saliente | ✅ |
| `/profile` | Perfil real (nombre/correo/meta), stats, privacidad, signOut | ✅ |
| `/destacados` | `featured_cards` real + cláusula de transparencia + etiqueta de afiliado | ✅ |

**Categorías (11):** General 🔧 · Cashback 💰 · Puntos/Millas 🏆 · Viajes ✈️ · Restaurantes 🍽️ · Entretenimiento 🎬 · Supermercados 🛒 · Combustible ⛽ · Streaming 📺 · Moda 👗 · Seguros 🛡️.

**Tono de voz:** español de Colombia, cercano, segunda persona; mensajes breves; estados vacíos siempre con CTA — y desde el 11-jun, **estados vacíos que enseñan** (muestran la UI de ejemplo, patrón MaxRewards). Todo mensaje de ahorro incluye su nivel de confianza y el "por qué" en pesos. El ahorro siempre se expresa en **pesos del período** ("este mes te recuperé $43.500"), nunca solo en puntos o porcentajes — requisito de Sandra (§3.1). Todo estimado se etiqueta "estimado"; lo no validado dice "Probable" o "datos en camino", nunca un dato inventado.

---

## 15. Roadmap, Gates Go/No-Go y GTM

**Roadmap (12 meses):**
- **30 días:** motor manual (concierge) + primeros 15–30 usuarios del ICP. Validar que el dato se puede mantener. 🆕 Acción paralela: **cotizar CPA real** con redes de afiliación (Admitad LatAm, Impact) — desbloquea el supuesto más frágil sin escribir código.
- **90 días:** 100 usuarios; medir premio real, hábito, disposición a pagar. **Go/No-Go grande.**
- **6 meses:** producto semi-automatizado + 500–1.000 usuarios + primer ingreso.
- **12 meses:** seed + piloto de marketplace (CLO) + preparación Open Finance.

**🆕 Detalle del concierge (Blueprint Parte V — el v2 lo mencionaba sin operativa):** Wizard of Oz por WhatsApp, sin código: onboarding manual de tarjetas, consultas en vivo respondidas por humano (<5 min), reportes semanales proactivos de ahorro, test de precio al final. Presupuesto ≈ $10M COP. Su función no es solo validar demanda: es **aprender el costo real de mantener el dato fresco** (riesgo #3) con 20 tarjetas × 20 comercios antes de automatizar nada.

**Gate Go/No-Go (90 días, para invertir en software):** consultas no provocadas ≥2/sem **Y** retención sem-4 ≥40% **Y** premio mediano ≥$400k/año **Y** (WTP ≥25% en cuartil alto **o** CPA real confirmado). Si no → pivotar.

**🆕 Roadmap de features por fase (benchmark internacional, asignados por esfuerzo/impacto — ninguno entra al MVP):**

| Feature (inspiración) | Fase | Racional |
|---|---|---|
| Card Value anti-cuota (MaxRewards) | 1.5 (Could Have, §6) | Bajo esfuerzo, dolor local máximo (cuota de manejo), alimenta cancelar/conservar |
| Reporte de ahorro compartible | 1.5 (Could Have, §6) | Loop viral del GTM boca a boca |
| **Pase de Google Wallet / Apple Wallet** con "tu mejor tarjeta aquí" (CardPointers) | 2 | Resuelve el punto de venta físico sin integración bancaria; Google Wallet primero (Android >75% del mercado colombiano); ataca directamente el presupuesto de <10 s |
| Recomendación por geolocalización ("estás en Éxito → usa X") (CardPointers AutoPilot) | 2 | El momento de mayor valor percibido; requiere base de comercios madura |
| Asistente IA conversacional ("¿con qué pago el mercado?") (Kudos MariaGPT) | 2 | Barato sobre una base de reglas bien estructurada; narrativa fuerte para prensa/inversionistas en la ola de comercio agéntico |
| Tracking de bonos de bienvenida y metas de gasto | 2 | Encaja con afiliación (el bono es el gancho del CPA) |
| Alertas de vencimiento de millas/puntos (AwardWallet) | 2 | Retención; dato semi-estático, fácil de curar |
| CLO / cashback adicional en comercios (Kudos Boost) | 3 | Ya estaba en plan de monetización; requiere escala y convenios |

**🆕 GTM (validado por voz del cliente + benchmark):**
- **Canal #1: comunidades de millas y finanzas personales** (foros, grupos de Facebook/WhatsApp de viajeros, subreddits colombianos) — ICP puro, CAC ~$0. La palanca que hizo crecer a CardPointers fue **revenue share con creadores de contenido de puntos/millas**; en Colombia la comunidad existe y nadie la ha monetizado con una app.
- **Canal #2: el reporte de ahorro compartible** como loop viral (Sandra llega porque una amiga mostró "ahorré $180k").
- **NO paid media al inicio**: quema presupuesto en el segmento Básico que no sostiene hábito (§2).

---

## 16. 🆕 Riesgos Críticos (ordenados por letalidad, con mitigaciones)

| # | Riesgo | Severidad | Mitigación |
|---|---|---|---|
| 1 | **Monetización CPA no probada con bancos colombianos** — todo el caso de ingresos Fase 1 descansa en un CPA sin fuente pública | 🔴🔴🔴 | Cotizar con redes de afiliación en los primeros 30 días (§15); test de WTP premium en el concierge como plan B; recalcular unit economics con el dato real |
| 2 | **Costo operativo del dato** — mantener promos efímeras frescas puede comerse el margen; además un dato errado en D1–D7 destruye la confianza irreversiblemente | 🔴🔴 | El concierge mide el costo real por tarjeta×comercio antes de escalar; SLA de frescura como NFR (§13); regla doble-fuente (§11); niveles de confianza visibles (nunca prometer lo no validado) |
| 3 | **Adopción del hábito en punto de venta** — el usuario debe actuar justo cuando menos quiere fricción | 🔴🔴 | Presupuesto <10 s (§9); pase de Wallet en Fase 2; geolocalización en Fase 2; gate de 90 días mide exactamente esto (consultas no provocadas) |
| 4 | **Regulatorio** — Habeas Data (Ley 1581), protección al consumidor, y el riesgo de parecer intermediación financiera sin licencia SFC | 🔴 | Sin PAN/credenciales (fuera de PCI); consentimiento y RNBD desde el día 1; Eliseo informa y recomienda, no intermedia ni capta; revisión legal antes del lanzamiento público |
| 5 | **Competencia de agregadores horizontales** (Rappi, Nequi) y, desde 2026, redes/bancos con IA (comercio agéntico) internalizando la recomendación | 🔴 | El wedge bloquea a mono-emisores pero no a agregadores: la defensa es velocidad (llegar primero al grafo de promos + confianza), profundidad financiera y neutralidad verificable (§4) |
| 6 | **Churn estructural del premium** ("el usuario aprende y se va", evidencia MaxRewards) | 🟠 | Facturación anual; retención anclada al cambio (promos nuevas, reporte mensual); afiliación como motor principal (no depende de suscripción) |
| 7 | **Mercado de tarjetas** — el v2 lo listaba como riesgo de contracción; corregido: el mercado crece de nuevo (+31% originaciones) | 🟢 degradado | Monitorear trimestralmente; la recuperación concentrada en bajo riesgo favorece al ICP |

**Las 5 hipótesis NO validadas (por riesgo, actualizadas):**
1. 🔴🔴🔴 El premio económico real es suficiente (≥$400k/año en el Optimizador). *(La recalibración de LifeMiles sugiere que está subestimado para viajeros — a confirmar en piloto.)*
2. 🔴🔴 Existe hábito recurrente (consultas no provocadas).
3. 🔴🔴 Hay un motor de ingresos (CPA o suscripción). *(Acción concreta definida: cotización en 30 días.)*
4. 🔴 El dato de promociones se puede mantener fresco a escala (el moat).
5. 🟠 La migración a marketplace/B2B es ejecutable (define caso B vs C).

> ⚠️ **Nota de coherencia (actualizada 11-jun):** el Blueprint recomienda **validar 90 días con el concierge manual (WhatsApp) antes de construir software**. Por decisión del equipo, la app se construyó en paralelo y **ya está en producción** (Vercel + Supabase). Esto no reemplaza el gate de 90 días: las 5 hipótesis siguen sin validar y la app es ahora la herramienta para validarlas con los primeros 15–30 usuarios del ICP (en lugar del WhatsApp puro). El riesgo asumido: capital de construcción gastado antes de validar demanda — mitigado porque el costo fue marginal (desarrollo propio sobre el prototipo).

---

## 17. Preguntas Abiertas (estado v3)

1. **Ranking del recomendador** → ✅ RESUELTO E IMPLEMENTADO (10-jun): normalización VE + score de dos capas en producción (§8.2). Pendiente solo calibrar `p_red`/`breakage` con redenciones reales del piloto.
2. **Ingesta de datos** → 🟡 Estrategia definida (§11) + restricción estructural confirmada (sin APIs hasta ~2027/28). Pendiente: ejecutar y medir costo real a 100 usuarios manuales. 🆕 Próximo paso técnico: migrar comercios/promos de constantes front a tablas `merchants`/`merchant_promos` con vigencia y validación.
3. **Reconciliación de esquema front↔BD** → ✅ RESUELTO (10-jun): esquema en inglés aplicado a Supabase real con seed completo y migración aditiva v2 (§10).
4. **Calibración de `p_red`/`breakage` por programa** → 🟡 v3 aporta proxies globales (20–30% retail, 70–85% viajes); falta el dato propio del piloto.
5. **Política de elegibilidad de promos segmentadas** ("clientes seleccionados") — cómo estimar `p_elegible`.
6. **CPA real de bancos colombianos** — la incógnita más cara del plan; acción: cotizar Admitad LatAm / Impact / banco directo en los primeros 30 días.
7. **¿Agregador puente (Finerio) pre-Open Finance?** — evaluar costo/beneficio tras el gate de 90 días, solo si la verificación de gasto demuestra mover la aguja de retención.
8. **Vigilancia competitiva** — revalidar trimestralmente que el espacio LatAm sigue vacío (Crunchbase/ProductHunt) y monitorear despliegue de comercio agéntico de Visa/Mastercard en la región.
9. 🆕 **Correo transaccional** — el SMTP integrado de Supabase limita ~2 confirmaciones/hora (incidente 10-jun, mitigado con mensajes específicos). Decidir antes del piloto: desactivar confirmación de correo (fricción cero, suficiente para 15–30 usuarios) o configurar SMTP propio (Resend/Brevo).
10. 🆕 **Datos por curar (dueña de BD):** poblar `cards.fee_month` (activa Card Value y la recomendación de cancelar), validar/ampliar `offers` (`seed_offers.sql` listo), y a futuro `featured_cards.welcome_bonus` (bono de bienvenida cuantificado, patrón MaxRewards).

---

## Changelog v2 → v3

| Área | v2 | v3 |
|---|---|---|
| Evidencia | Cifras sin fuente, mezcla datos/supuestos | Regla de evidencia: toda cifra con fuente (§18) o marcada [HIPÓTESIS] |
| Mercado | ~14.2M tarjetas "en contracción" | ~15.5M (SFC may 2026), en recuperación (+31% originaciones); riesgo de mercado degradado |
| Tabla VE | LifeMiles ≈ $15 COP/milla | VE dual: $43–65 (vuelos) / $15–25 (no aéreo); premio de viajeros estaba subestimado 3–4x |
| Open Finance | "Decreto 0368/2026" sin implicación operativa | Confirmado + cronograma (~2027/28) → Fase 1 explícitamente sin APIs; Finerio como puente opcional |
| Competencia | Matriz local genérica | Local validada (espacio vacío) + benchmark internacional completo + cementerio de la categoría (Wallaby, Birch, Curve) + amenaza comercio agéntico |
| Personas | Referencia a `.product/PERSONAS/` | Tabla comparativa integrada (dolor/WTP/dealbreakers) + riesgos de abandono por etapa |
| Monetización | Fases CPA → CLO → B2B | Igual + estado de validación por motor, CPA marcado como hipótesis más frágil con acción concreta, banda premium validada (US$50–110/año), mitigación churn "aprende y se va" |
| Neutralidad | Posicionamiento "Suiza" | + Cláusula de transparencia operativa (estándar Kudos) que blinda el motor de los ingresos CPA |
| Roadmap | 12 meses + gates | Igual + features de benchmark asignados por fase (Wallet pass, geolocalización, IA conversacional, Card Value) sin inflar el MVP |
| Riesgos | 5 hipótesis al final | Sección propia: 7 riesgos ordenados por letalidad con mitigaciones + concierge detallado con presupuesto |
| GTM | Implícito | Explícito: comunidades de millas + creadores con revenue share + loop viral del reporte compartible; NO paid media |
| Fricción | NFR de latencia técnica | + Presupuesto de fricción de producto: <10 s en punto de venta (umbral de abandono) |

---

## Actualización 11-jun-2026 — del papel a producción

| Hito | Estado |
|---|---|
| Rediseño v2 "verde bosque" (prototipo Claude Design → app real) | ✅ En producción (Vercel + GitHub Pages), 10 pantallas TSX, bundle −22% |
| Esquema Supabase real | ✅ Aplicado y verificado: 13 bancos · 64 tarjetas · 71 beneficios · 3 destacados · RLS probado |
| Motor v2 (tabla VE, totalero/rotativo, confianza) | ✅ Implementado (`ve.ts`, `walletView.ts`, `recommend.ts`) + smoke test |
| Perfil de pago y preferencia de recompensa | ✅ Capturados y persistidos (`payment_profile`, `reward_goal`) |
| Recomendador por comercio con "La usé" | ✅ En producción (promos demo en front, pendiente tabla) |
| Paquete claridad UX (6 patrones MaxRewards) | ✅ Goals · checklist activación · estados vacíos que enseñan · TrustNotes · carrusel · multi-add |
| Incidente registro (rate limit SMTP Supabase) | 🟡 Mitigado con mensajes específicos; decisión SMTP/confirmación pendiente (§17.9) |
| Datos por curar | 🔲 `fee_month`, ofertas validadas, `welcome_bonus` (§17.10) |

**Lo próximo que importa (sin cambiar la estrategia):** ejecutar el gate de 90 días con la app como vehículo — reclutar 15–30 usuarios del ICP en comunidades de millas, medir consultas no provocadas/retención/premio real, y cotizar el CPA con redes de afiliación (la hipótesis más frágil, §16).

---

## 18. 🆕 Referencias (validación jun 2026)

**Mercado Colombia:**
- Tarjetas vigentes (~15.5M, SFC): gestionsolidaria.com/2026/05/19 — "28 entidades crediticias alcanzaron 15.556.546 tarjetas"
- Originaciones +31% YoY: noticias.transunion.co — "Las originaciones de crédito crecen en todos los productos" · portafolio.co — "Por primera vez en 10 trimestres crecen las originaciones de tarjetas"
- Decreto 0368 de 2026 (texto oficial): dapre.presidencia.gov.co/normativa — DECRETO 0368 del 07-abr-2026 · superfinanciera.gov.co — "Finanzas abiertas obligatorias" · garrigues.com — análisis del marco obligatorio
- Nu Colombia 5M clientes (may 2026): larepublica.co, eltiempo.com, portafolio.co

**Valores de redención:**
- Puntos Colombia ≈ $7 COP/punto: ayuda.puntoscolombia.com · es-us.finanzas.yahoo.com
- LifeMiles 1.2–1.8¢ US/milla (vuelos): nerdwallet.com — "Avianca LifeMiles guide" · ingenierodemillas.com — "El valor de las millas"

**Breakage (proxies globales):** antavo.com (Global Customer Loyalty Report) · voucherify.io — loyalty breakage benchmarks · rivo.io — redemption rate benchmarks

**Benchmark internacional:**
- MaxRewards: help.maxrewards.com (pricing/tiers/annual-only) · techcrunch.com (seed 2021) · lazypoints.com (review 2025)
- CardPointers: cardpointers.com · 9to5mac.com (CardPointers 7) · subclub.com y revenuecat.com (caso de negocio bootstrapped)
- Kudos: techcrunch.com (Series A US$10.2M, may 2024) · support.joinkudos.com ("How does Kudos make money")
- Uthrive: uthrive.club · AwardWallet: awardwallet.com/pricing
- Curve→Lloyds (£120M, nov 2025): bankingdive.com · pymnts.com
- Wallaby: crunchbase.com · Birch Finance: cbinsights.com
- CLO US$9.2–9.4B (2025): dataintelo.com · marketintelo.com · getkard.com
- Comercio agéntico: corporate.visa.com — Visa Intelligent Commerce · pymnts.com — "Banks use AI to make credit card rewards more personal"
- CPA referencia LifeMiles (US$200/lead): getlasso.co/niche/credit-cards

> Documentos internos de referencia: `Blueprint_Estrategico_Eliseo_ES.md` (Partes I–IX), `Benchmark de Aplicaciones de Beneficios de Tarjetas.pdf`, `customer-voice-analysis.md`, `.product/PERSONAS/` — en esta misma carpeta.
