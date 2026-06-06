# Blueprint Estratégico + Veredicto del Comité de Inversión — Fintech de Optimización de Tarjetas (Colombia)

## Contexto

El fundador desarrolla una fintech en Colombia para ayudar a las personas a **elegir y usar** las mejores tarjetas de crédito según sus hábitos. La hipótesis central a validar es un pivote de propuesta de valor:

> De **"¿Qué tarjeta debo solicitar?"** (comparador, mercado ya ocupado por Rankia) → hacia **"¿Qué tarjeta de las que ya tengo debo usar en esta compra para maximizar el beneficio?"** (asistente de decisión en el punto de gasto).

Monetización propuesta por fases: (1) CPA/afiliación con entidades, (2) suscripción premium al usuario, (3) APIs B2B + licenciamiento del motor + inteligencia de mercado anonimizada. Datos de tarjetas: híbrido (curación manual + scraping + validación humana → automatización → convenios/Open Finance). Datos de usuario: auto-reportado → Open Finance → híbrido.

Este documento es un **memo de comité de inversión (IC)** deliberadamente crítico, seguido del diseño de MVP y arquitectura de datos para validar con mínimo costo/riesgo. **No es un plan de código** — es la base de decisión antes de invertir tiempo/dinero.

> Nota de proceso: el directorio de trabajo (`/Users/isabelcorredor/Documents/Antigravity`) contiene trabajo no relacionado (auditorías de taxis, pico y placa). Este es un proyecto greenfield; no hay código que reutilizar.

---

## 1. Veredicto del IC en una línea

**Wedge (cuña de entrada) excelente, mercado colombiano demasiado delgado para ser venture-scale por sí solo, y la monetización Fase 1 (CPA) es la suposición más frágil de todo el plan.** Es invertible a nivel pre-seed/seed *condicionado* a probar tres cosas en 90 días: (a) que el ahorro real por usuario es material, (b) que existe disposición a pagar o que los bancos pagan CPA de verdad, y (c) que la recomendación retiene (hábito), no es de un solo uso.

---

## 2. Análisis crítico de la hipótesis central (el pivote)

**El instinto es correcto.** "¿Cuál solicitar?" es un producto de **uso único** y bajo poder de retención — el usuario vuelve una vez cada 1-3 años. Rankia y los bancos ya lo cubren y monetizan por leads. Competir ahí es competir por SEO y CPA contra un incumbente. "¿Cuál usar ahora?" es un producto de **uso recurrente** → mayor frecuencia, retención, datos y, por tanto, mayor potencial de moat y de venture scale. **Estratégicamente, el pivote es el movimiento correcto.**

**Pero hay tres objeciones duras que deben resolverse antes de construir:**

1. **El tamaño del premio en Colombia es pequeño.** Los comparables que validan el modelo (MaxRewards, CardPointers, Kudos) operan en EEUU, donde un usuario puede capturar cientos de USD/año en cashback/millas porque el ecosistema de recompensas es rico y las cuotas son bajas. En Colombia el cashback típico es modesto, las cuotas de manejo son altas, y los programas de millas/puntos son limitados. **Si el ahorro óptimo por usuario es de $20-50k COP/mes, la disposición a pagar suscripción y la economía de CPA se erosionan.** → Validar el "tamaño del premio" es el experimento #1.

2. **El problema no es el algoritmo; es el dato de promociones.** Recomendar "usa la tarjeta X en Éxito" requiere una base de **promociones vigentes, hiper-locales y efímeras** (cambian semanalmente, varían por franquicia/MCC/canal/ciudad). Ese dataset se degrada solo. Mantenerlo fresco y correcto es el verdadero trabajo difícil — y, si se logra, **es el moat.** El algoritmo de matching es commodity.

3. **Conocer "qué tarjetas tengo" es fricción.** Sin Open Finance (que no estará operativo hasta ~2027-2028), el usuario debe declarar manualmente sus tarjetas. Eso es fricción de onboarding y los datos se desactualizan. La magia del producto depende de un dato que hoy solo se obtiene con esfuerzo del usuario.

**Conclusión:** el pivote tiene potencial de empresa de alto crecimiento **solo si** (i) el premio por usuario es suficiente para justificar el hábito, (ii) se domina la operación de datos de promociones, y (iii) hay un camino regional (Colombia sola probablemente no basta para retornos venture).

---

## 3. Riesgos críticos (ordenados por letalidad)

### 3.1 Riesgo de monetización (el más letal)
- **CPA con bancos colombianos es una suposición no probada.** Pocas entidades tienen programas de afiliados maduros con tracking de aprobación. Rankia ya ocupa ese inventario de leads. **No asumas que el CPA existe a tu escala/precio — valídalo con 2-3 entidades antes de construir.**
- **Conflicto de interés estructural:** si te pagan por referir, tu "recomendación objetiva" pierde credibilidad — el activo central del negocio. La transparencia (mostrar que recomiendas lo mejor aunque no pague comisión) es obligatoria y comprime ingresos.
- **Suscripción premium (Fase 2):** baja disposición a pagar en Colombia por software financiero; el ahorro debe ser visiblemente > 3-5x el precio.

### 3.2 Riesgo de mercado / demanda
- **El mercado de tarjetas de crédito en Colombia se está contrayendo** (~14.2M tarjetas en may-2024, número en descenso, más tarjetas bloqueadas). Construir sobre un sustrato que decrece es una bandera amarilla.
- **TAM monetizable estrecho:** usuarios con ≥2-3 tarjetas y gasto suficiente para que la optimización importe son un subconjunto de los bancarizados premium. El ICP real es más pequeño de lo que sugiere "14M tarjetas".

### 3.3 Riesgo de ejecución (datos)
- Mantener el dataset de tarifarios + beneficios + **promociones efímeras** fresco y correcto es intensivo en operación. El scraping se rompe (cambios de sitio, ToS, datos inconsistentes). La curación manual no escala. **El costo operativo de datos puede comerse el margen.**

### 3.4 Riesgo regulatorio
- **Habeas Data (Ley 1581 de 2012)** y tratamiento de datos personales: consentimiento explícito, finalidad, política de privacidad, registro RNBD. Aplica desde el día 1 al recolectar gastos auto-reportados.
- **Protección al consumidor financiero:** si emites "recomendaciones", cuida no cruzar a **asesoría/intermediación financiera** sin las licencias correspondientes (SFC). Enmarca como "información comparativa", no asesoría regulada — definir esto con abogado antes de lanzar.
- **Open Finance (Decreto 0368 de 2026, obligatorio):** oportunidad enorme para Fase 2, pero los estándares/APIs no estarán operativos hasta ~2027-2028. No construyas la tesis sobre datos que aún no existen. Cuando lleguen, requerirá habilitarte como participante del ecosistema.
- **Publicidad de productos financieros:** mostrar tasas/beneficios exige exactitud y vigencia; datos desactualizados generan riesgo legal y reputacional.

### 3.5 Riesgo de adopción
- **Cambio de hábito en el punto de venta:** lograr que el usuario consulte la app *antes* de pagar es un comportamiento difícil de instalar (Kudos lo resuelve con extensión de navegador en e-commerce; en compra física es más duro). El momento de fricción es exactamente cuando el usuario menos quiere abrir una app.
- **Onboarding:** declarar tarjetas manualmente es fricción inicial alta.

### 3.6 Riesgo competitivo
- **Incumbente local:** Rankia (comparador + afiliación + SEO).
- **Bancos/neobancos** (Nu, RappiCard, Lulo) empujan tarjetas con cashback y app propia — pueden incorporar "mejor uso" dentro de su ecosistema cerrado.
- **Importación del modelo:** un MaxRewards/Kudos podría localizarse, o un agregador (Rappi, Nequi) podría añadir la función como feature. Tu defensa no puede ser la idea; debe ser el dato + la confianza + la distribución.

---

## 4. Ventaja competitiva más difícil de copiar (moat)

Por orden de defensibilidad real:

1. **El grafo de beneficios/promociones propietario, fresco y estructurado** (tarjeta × comercio × MCC × canal × ciudad × ventana temporal), con validación humana. Es caro de construir y de mantener; quien lo tenga mejor gana. **Este es el activo central.**
2. **El loop de datos de Open Finance** (cuando llegue): comportamiento de gasto real → mejores recomendaciones → más ahorro demostrado → más confianza → más usuarios → más datos. Efecto de datos compuesto.
3. **Confianza/marca de neutralidad:** ser percibido como "el que está del lado del usuario, no del banco". Difícil de copiar para un banco por conflicto estructural.
4. **Hábito y switching cost ligero:** una vez que el usuario carga sus tarjetas y ve ahorro acumulado, hay inercia.

**Lo que NO es moat:** el algoritmo de matching (commodity), la idea (copiable), el comparador de "cuál solicitar" (ya existe).

---

## 5. Datos indispensables para una recomendación realmente superior

**Lado oferta (tarjetas) — el grafo de beneficios:**
- Tarifario: cuota de manejo, tasa EA, costos asociados, requisitos de ingreso, cupos.
- Beneficios base por categoría/MCC: cashback %, millas/puntos por peso, tope de acumulación, exclusiones.
- **Promociones vigentes con vigencia temporal**: comercio, % o monto, condiciones, canal (físico/online), ciudad, franquicia, tope.
- Convenios y valor de seguros asociados.
- Valor monetario normalizado de millas/puntos (clave para comparar peras con manzanas).

**Lado demanda (usuario):**
- Tarjetas que posee (declaradas → luego Open Finance).
- Perfil de gasto por categoría/comercio (auto-reportado → transaccional real).
- Preferencias declaradas (¿prioriza cashback, millas, o reducir costos?), objetivos.
- Restricciones: cupo disponible, fecha de corte (para timing de pago).

**El dato más diferenciador y escaso:** las **promociones efímeras correctas + el valor real de puntos/millas**. Quien resuelva esto entrega recomendaciones que nadie más puede igualar.

---

## 6. MVP más simple para validar el mercado (NO construir el motor)

**Principio: el MVP no es software; es la prueba de las 3 hipótesis letales (premio, pago, hábito) con el mínimo código.**

**MVP recomendado — "Concierge / Mago de Oz" vía WhatsApp + hoja curada manual (4-6 semanas):**
- **Alcance:** Top 15-20 tarjetas más comunes × Top 15-20 comercios de mayor frecuencia (Éxito, D1, Ara, EDS de combustible, restaurantes, e-commerce, aerolíneas). Dataset 100% manual en una hoja/DB simple.
- **Flujo:** usuario declara sus tarjetas una vez (formulario). Pregunta por WhatsApp "voy a comprar en Éxito" → respuesta: "Usa tu tarjeta X, ahorras ~$Y" (resuelto por humano + hoja al inicio; semi-automatizado después).
- **Qué se mide:** (1) **tamaño del premio** = ahorro promedio por recomendación; (2) **adopción del hábito** = ¿cuántas consultas hace el usuario por semana, sin que se lo pidan?; (3) **acción** = ¿siguió la recomendación? (encuesta/confirmación); (4) **disposición a pagar** = test de precio (oferta de "plan premium" simulada).
- **Por qué así:** valida demanda y economía **sin** invertir en scraping, motor de IA, ni base de datos completa. Si el premio es chico o nadie repite, lo sabes en 6 semanas y no en 12 meses.

**Lo que explícitamente NO se construye en el MVP:** scraping automatizado, motor de ML/scoring, Open Finance, app nativa pulida, base de datos exhaustiva de todas las tarjetas del país. Eso es Fase 1 *post-validación*.

---

## 7. Métricas que demostrarían Product-Market Fit

| Métrica | Señal de PMF |
|---|---|
| **Tasa de recurrencia** (consultas/usuario/semana, no provocadas) | El usuario vuelve solo → hay hábito. **La métrica #1.** |
| **Retención semana 4 / semana 8** (curva que se aplana, no a cero) | Retención plana ≈ PMF |
| **Ahorro real por usuario activo / mes** | Debe ser materialmente > costo del premium (3-5x) |
| **Tasa de acción** (% recomendaciones seguidas) | Confianza + utilidad reales |
| **Referidos orgánicos / coef. viral (k)** | "Pull" del mercado |
| **Disposición a pagar** (conversión a premium en test de precio) | Valida monetización Fase 2 |
| **% de leads que convierten en aprobación (si CPA)** | Valida monetización Fase 1 |

Regla de descarte: si tras el MVP la recurrencia no provocada es baja **y** el ahorro por usuario es pequeño, **el negocio no es venture-scale en Colombia** — reconsiderar pivote, mercado o tesis.

---

## 8. Arquitectura de datos (propuesta de bajo costo/riesgo)

Modelo conceptual (suficiente para MVP y extensible). Entidades núcleo y relaciones clave:

- **`usuarios`** — perfil, ingresos declarados, preferencias (peso cashback/millas/costo), objetivos. (PII → cifrado, base legal habeas data).
- **`usuario_tarjetas`** — relación N:N usuario↔tarjeta (qué tarjetas posee), cupo, fecha de corte.
- **`bancos`** — entidad emisora, info institucional.
- **`tarjetas`** — producto: franquicia, cuota de manejo, tasa EA, requisitos de ingreso, cupos min/max, costos. FK→banco.
- **`beneficios`** — beneficio base por tarjeta: tipo (cashback/millas/puntos/descuento/seguro), categoría/MCC, tasa, tope, exclusiones. FK→tarjeta.
- **`comercios`** — comercio/cadena, categoría, MCC, ciudad/ubicación.
- **`promociones`** — **la tabla crítica**: tarjeta × comercio × beneficio × **vigencia (fecha_inicio/fin)** × canal × ciudad × tope × condiciones. Versionada.
- **`gastos`** — gasto auto-reportado (Fase 1) → transaccional (Fase 2 Open Finance): monto, comercio/categoría, fecha. FK→usuario.
- **`recomendaciones`** — log inmutable: contexto (comercio/monto) → tarjeta recomendada → ahorro estimado → si fue seguida. Alimenta métricas y, luego, el modelo.
- **`historial_*`** — versionado de cambios de promociones/beneficios/recomendaciones (auditoría + entrenamiento futuro de IA).

**Decisiones de arquitectura:**
- **Base relacional (PostgreSQL)** para el núcleo: la integridad referencial tarjeta↔beneficio↔promoción importa más que la escala temprana. Sobra para años.
- **`promociones` e `historial_*` versionadas desde el día 1** (append-only) — el histórico es activo de datos y materia prima de IA futura; nunca sobrescribir.
- **Separar PII** (usuarios/gastos) en esquema con controles de acceso y cifrado; diseñar para minimización y anonimización (habilita Fase 3 B2B sin reidentificación).
- **IA por fases:** Fase 1 = motor de **reglas determinista** (matching contexto→beneficio→ranking por valor monetario normalizado). NO ML todavía — no hay datos ni se justifica. ML (scoring/recomendación personalizada) solo cuando `recomendaciones` + `gastos` reales acumulen volumen (post Open Finance).

---

## 9. Roadmap por fases (alineado a tu monetización)

- **Fase 0 — Validación (0-3 meses):** MVP concierge (§6). Datos manuales. Motor = reglas + humano. Objetivo: probar premio, hábito, pago. Sin levantar capital aún (o pre-seed pequeño).
- **Fase 1 — Producto + CPA (3-12 meses):** app real, dataset semi-automatizado (scraping + validación humana), motor de reglas, base propia de tarjetas/promos. Cerrar 2-3 acuerdos CPA *reales* (validar la hipótesis de ingresos). Habeas data + términos en regla.
- **Fase 2 — Premium + Open Finance (12-30 meses):** suscripción premium; integrar Open Finance a medida que los estándares SFC se publiquen (~2027+); ML de personalización con datos reales. Expansión a un 2º país (la tesis regional empieza aquí).
- **Fase 3 — B2B / plataforma (30+ meses):** APIs, licenciamiento del motor, inteligencia de mercado anonimizada (cumpliendo regulación). Aquí está el techo venture-scale real.

---

## 10. ¿Invertiría como VC? (veredicto honesto)

**Como socio de seed:** invertiría un **cheque pequeño pre-seed condicionado**, no una ronda seria todavía. Razones:

**A favor:**
- El pivote a "qué usar ahora" es un wedge de retención real, no un comparador más.
- Open Finance obligatorio (Decreto 0368/2026) crea una ola regulatoria a favor en 18-36 meses — buen *timing* si sobrevives hasta ahí.
- Comparables internacionales (MaxRewards 800k usuarios, Kudos, CardPointers) prueban que el modelo funciona y monetiza.
- El moat de datos de promociones es real si se ejecuta bien.

**En contra (lo que me haría dudar):**
- **Mercado colombiano delgado y en contracción** de tarjetas + premio por usuario probablemente pequeño → dudo del *venture scale* sin tesis regional clara desde el principio.
- **Monetización Fase 1 (CPA) no probada** con bancos locales; riesgo de que el motor de ingresos simplemente no exista a tu precio.
- **Conflicto neutralidad vs. comisión** sin resolver.
- **Costo operativo del dato** puede ahogar el margen.

**Condiciones para convertir mi "tal vez" en un "sí" de ronda seed (en 90 días):**
1. MVP muestra **recurrencia no provocada** (hábito) y **ahorro material** por usuario.
2. Al menos **una carta de intención/acuerdo CPA real** firmada con una entidad, o evidencia fuerte de disposición a pagar suscripción.
3. Una **narrativa regional** creíble (Colombia es la cabeza de playa, no el TAM total).

**Si esas tres no se cumplen, como VC paso** — sería un buen *producto/feature*, pero no necesariamente una *empresa* de retornos venture en Colombia sola.

---

## 11. Verificación / próximos pasos accionables

Cómo probar que la tesis es real, en orden:
1. **Test del premio (semana 1-2):** construir a mano el grafo de Top 20 tarjetas × Top 20 comercios y calcular, para 10-15 perfiles reales, cuánto ahorrarían/mes optimizando. Si es chico, parar aquí.
2. **Test de CPA (semana 1-4, en paralelo):** contactar 2-3 entidades/agregadores y confirmar si pagan CPA, cuánto, y bajo qué tracking. Resultado binario que define el modelo.
3. **MVP concierge WhatsApp (semana 3-6):** 30-50 usuarios reales; medir recurrencia no provocada, tasa de acción y ahorro confirmado.
4. **Test de precio (semana 5-6):** oferta premium simulada; medir conversión.
5. **Revisión legal (paralelo):** abogado fintech valida (a) que "recomendación" no constituye asesoría/intermediación regulada por SFC, y (b) cumplimiento habeas data (Ley 1581) desde el día 1.

**Criterio de Go/No-Go tras 6 semanas:** premio material **Y** (CPA confirmado **O** disposición a pagar) **Y** recurrencia con retención plana → seguir a Fase 1 y levantar. Si no → pivotar tesis o mercado.

---

### Fuentes
- [Sistema financiero colombiano en cifras — Superfinanciera (nov/dic 2025)](https://www.superfinanciera.gov.co/publicaciones/10115988/sistema-financiero-colombiano-en-cifras-noviembre-2025/) · [Informe de tarjetas de crédito y débito](https://www.superfinanciera.gov.co/powerbi/reportes/101/) · [Menos tarjetas de crédito en Colombia (El Colombiano)](https://www.elcolombiano.com/negocios/crisis-de-tarjetas-de-credito-colombia-menos-plasticos-y-mas-bloqueadas-FE25218915)
- [Comparador de Tarjetas — Rankia Colombia](https://www.rankia.co/tarjetas/comparador) · [Ranking mejores tarjetas](https://www.rankia.co/blog/ranking-tarjetas-credito-debito)
- [Open Finance obligatorio — Decreto 0368/2026 (LatamFintech)](https://www.latamfintech.co/articles/colombia-hace-obligatorio-el-open-finance-y-acelera-la-transformacion-del-sistema-financiero) · [Finanzas abiertas obligatorias — SFC](https://www.superfinanciera.gov.co/publicaciones/10116081/finanzas-abiertas-obligatorias-impulsaran-el-desarrollo-del-sistema-y-la-inclusion-financiera-en-el-pais/) · [Nuevo decreto de finanzas abiertas (Holland & Knight)](https://www.hklaw.com/en/insights/publications/2026/04/nuevo-decreto-incorpora-el-sistema-de-finanzas-abiertas-en-colombia)
- [MaxRewards](https://maxrewards.com/) · [CardPointers](https://cardpointers.com/) · [Kudos vs CardPointers](https://www.joinkudos.com/blog/cardpointers-credit-card-app-review)
- [Puntos Colombia — valor del punto (Bancolombia)](https://www.bancolombia.com/personas/beneficios/puntos-colombia) · [Mejor programa de millas Colombia: LifeMiles vs Latam Pass (Pulzo)](https://www.pulzo.com/economia/cual-es-mejor-programa-millas-colombia-lifemiles-latam-pass-PP3488295) · [El valor de las millas (Ingeniero de Millas)](https://ingenierodemillas.com/el-valor-de-las-millas/)

---

# PARTE II — Diseño lógico-matemático del Motor de Recomendación (Fase 1)

> El activo más defensible de la empresa. Diseñado para ser **determinista, transparente y bank-neutral** (sin ML todavía), operando sobre una base curada manualmente de ~50-100 tarjetas y varios miles de promociones. Toda la lógica reduce cualquier beneficio a una sola unidad comparable: **pesos colombianos efectivos esperados (COP_e)**.

## 0. El principio unificador (la idea central)

Bancos, programas y franquicias hablan idiomas distintos (cashback %, millas/dólar, puntos/$800, descuentos, bonos). **El motor traduce todo a una única moneda: COP efectivo esperado por peso gastado.** Esa traducción —la *tabla de Valor Efectivo (VE)*— más el *grafo de promociones fresco* son la propiedad intelectual difícil de copiar. El algoritmo de ranking es relativamente simple; **el valor está en la normalización opinada y en la frescura del dato.**

```
   IDIOMAS DE ENTRADA          CAPA DE NORMALIZACIÓN (VE)        SALIDA COMPARABLE
 ┌─────────────────┐
 │ Cashback 3%     │──┐
 │ 2 millas/USD    │  │      ┌────────────────────────┐      ┌──────────────────────┐
 │ 1 pto / $800    │  ├────► │  VE_moneda × p_red ×    │────► │ tasa efectiva r∈[0,1]│
 │ Desc. 20% Éxito │  │      │  (1 − breakage)         │      │ COP_e por COP gastado │
 │ Bono bienvenida │──┘      └────────────────────────┘      └──────────────────────┘
 └─────────────────┘            (opinión propietaria)            (todo comparable)
```

---

## 1. Variables que considera el algoritmo

**Del usuario (demanda):**
- `perfil_pago` ∈ {totalero, rotativo, mixto} — **la variable que más cambia la recomendación** (ver §1.1).
- Perfil de gasto mensual por categoría/comercio: vector `G = {g_x}` (auto-reportado en Fase 1).
- Tarjetas que ya posee: conjunto `T_user`.
- Ingresos declarados (para elegibilidad) y cupo disponible.
- Preferencias declaradas: peso relativo cashback vs millas vs reducir costos; aerolínea/coalición preferida.
- Comportamiento de redención (¿redime o deja vencer? → ajusta `p_red`).
- Saldo promedio rotado (si rotativo) y día de corte.

**De la tarjeta/oferta (oferta):**
- Costos: cuota de manejo mensual, costos fijos, **tasa EA (interés)**.
- Elegibilidad: requisitos de ingreso, cupo min/máx, segmento.
- Beneficios base: tipo de moneda (cashback/millas/puntos), tasa de acumulación por categoría/MCC, topes, exclusiones.
- Programa de lealtad asociado (→ VE).
- Valor monetario de seguros asociados (solo si el usuario los usa).
- Promociones vigentes (con todas sus restricciones).
- Franquicia (aceptación en el comercio).

**Del contexto de compra (para "qué usar ahora"):**
- Comercio / MCC / categoría, monto `M`, canal (físico/online), ciudad, fecha.

### 1.1 La bifurcación crítica: totalero vs rotativo
```
                 ¿El usuario paga el total cada mes?
                 ┌──────────────┴───────────────┐
              SÍ (totalero)                 NO (rotativo)
        Interés = 0. Optimizar          El interés EA domina TODO.
        recompensas netas − cuota.      Recompensas ≈ ruido.
        → Motor de maximización         → Motor de minimización de
          de beneficios.                  costo: minimizar EA y cuota.
```
**Recomendación específica Colombia:** dado que una fracción grande de tarjetahabientes rota saldo a tasas EA muy altas, *recomendar maximizar millas a un rotativo es malpráctica financiera*. El motor debe detectar esto y, para rotativos, **priorizar tasa de interés baja y plan de pago**, no recompensas. Esto también es diferenciación de marca (estar del lado del usuario).

---

## 2. Cálculo del valor económico real de cada beneficio

Todo se reduce a **VE (Valor Efectivo de una unidad de la moneda de recompensa)**:

> **VE_moneda = ValorRedención_moneda × p_red × (1 − breakage)**

- `ValorRedención`: cuánto vale 1 unidad al redimir (Puntos Colombia ≈ **$7**; LifeMiles ≈ **$15** conservador).
- `p_red` (prob. de redención efectiva): un usuario que nunca redime → VE≈0. Maximizador → p_red alto.
- `breakage`: fracción que vence/se pierde (millas y puntos tienen vigencia ~1 año → haircut).

| Beneficio | Fórmula de valor (COP_e) | Notas Colombia |
|---|---|---|
| **Cashback** | `M × pct_cb` (VE=1.0) | Restar fricción si exige redención mínima o es saldo-a-favor diferido. El más "honesto": vale lo que dice. |
| **Millas** | `(millas_por_peso × M) × VE_milla` | VE_milla conservador ≈ $15 con `p_red`/breakage; ofrecer rango (piso conservador / techo sweet-spot premium). Alta varianza → mostrar valor conservador por defecto. |
| **Puntos** | `(puntos_por_peso × M) × VE_punto` | Puntos Colombia VE base $7; descontar breakage por vigencia 1 año. |
| **Descuentos** | `M × pct_desc`, hasta `tope` | Valor inmediato y cierto (VE=1.0). Suele ser el de mayor valor real en CO. |
| **Beneficios temporales / promos** | `valor_esperado = efecto × p_elegible × p_uso`, capado | Si es "clientes seleccionados" → `p_elegible<1` y se marca "posible", no se promete. |
| **Bono de bienvenida** | `VE_moneda × bono` amortizado, condicionado a `gasto_mínimo` alcanzable | Solo cuenta si el usuario realmente alcanzará el gasto mínimo sin gasto forzado. |
| **Seguros asociados** | `Σ valor_uso_esperado` (0 si no los usa) | Conservador: no inflar el score con seguros que el usuario nunca usará. |

**Tasa efectiva adimensional** (el gran igualador):
> **r_b(x) = unidades_por_peso_b(x) × VE_moneda(b)**  → COP_e ganados por cada COP gastado en la categoría `x`.

Cashback 3% → r=0.03. "1.5 millas por USD" con VE $15 y TRM≈$4.000 → r ≈ (1.5/4000)×15 ≈ 0.0056. **Ahora cashback y millas son directamente comparables.**

---

## 3. Comparar entre bancos y programas de lealtad

La comparación es trivial **una vez normalizado a `r`**. El trabajo difícil (y el moat) está en mantener la **tabla VE** correcta y opinada por programa:

```
  Programa            ValorRedención   p_red   breakage   VE_efectivo
  ──────────────────  ──────────────   ─────   ────────   ───────────
  Puntos Colombia        $7/pto         0.85     0.10        ~$5.4
  LifeMiles (cons.)      $15/milla      0.80     0.15        ~$10.2
  Latam Pass (cons.)     $ x /milla      ...      ...          ...
  Cashback directo       $1/COP         1.00     0.00         $1.00
```
- La VE es **configurable y versionada**: se ajusta con evidencia de redención real (Fase 2 con datos).
- Para benefit que apila (stacking) entre tarjeta-base + promo + coalición, se suman las `r` de grupos apilables (ver §4).
- **Regla de oro de transparencia:** publicar siempre el *Valor Económico Objetivo* (COP_e, neutral) separado del ajuste por preferencia. Esto protege la neutralidad —el activo de confianza.

---

## 4. Promociones con restricciones y condiciones (capa CSP)

Cada promoción se modela como **predicado de aplicabilidad + efecto + condiciones + regla de apilamiento**:

```
PROMO = {
  aplica_si:  merchant/MCC ∈ S, canal ∈ C, ciudad ∈ U,
              fecha ∈ [inicio, fin], franquicia ∈ F, tarjeta ∈ L, segmento
  efecto:     {tipo: %|fijo|multiplicador, valor}
  condiciones:{compra_min, tope_beneficio, requiere_diferir_N_cuotas,
               requiere_inscripción, max_usos_periodo}
  stacking:   {grupo, exclusiva|apilable_con_base}
}
```

**Evaluación por transacción (pipeline determinista):**
```
1. FILTRAR    promos donde aplica_si(promo, contexto, usuario, fecha) = verdadero
2. VALIDAR    condiciones (compra_min ≤ M, etc.); descartar las no cumplidas
3. CAPAR      efecto al tope_beneficio
4. RESOLVER   stacking:
              - particionar en grupos
              - dentro de grupo EXCLUSIVO  → tomar max
              - entre grupos APILABLES     → sumar
5. INCERTIDUMBRE: si segmento = "clientes seleccionados" → marcar "posible"
              con p_elegible, NO prometer el ahorro como cierto
```

**Manejo de incertidumbre (clave para la confianza):** nunca prometer un beneficio condicionado a elegibilidad desconocida. Mostrar tres niveles: **Confirmado** (aplica seguro), **Probable** (`p_elegible` estimada), **Requiere acción** (inscripción/diferir). Esta honestidad es parte del moat —los competidores que prometen de más pierden confianza.

---

## 5. Score único de valor por tarjeta

Modelo de **dos capas** (defendible + personalizado):

**Capa 1 — Valor Económico Objetivo anual (VEO), neutral, en COP_e:**
> **VEO(t, usuario) = 12 · Σ_x [ g_x · R_efectiva(t, x) ]  +  ValorPromos(t)  +  ValorSeguros_uso(t)  −  CostoAnual(t)  −  CostoInterés(t)**

donde:
- `R_efectiva(t,x)` = tasa efectiva combinada (base + promos apilables) de la tarjeta `t` en categoría `x`.
- `CostoAnual(t) = cuota_mensual×12 + costos_fijos`.
- `CostoInterés(t) = saldo_promedio × EA` **solo si rotativo** (si totalero = 0). *Esto puede volver negativo el VEO de tarjetas "premium" para un rotativo — correcto y deseado.*

**Capa 2 — Utilidad Personalizada (UP) para ranking en UI:**
> **UP(t) = VEO(t) · (1 + Σ_k w_k · afinidad_k)  −  penalizaciones**

- `w_k`: pesos de preferencia (ama millas, prefiere Avianca, odia cuotas…).
- `penalizaciones`: complejidad de redención, fricción de uso, requisitos no cumplidos (si no es eliminatorio).
- **Elegibilidad es filtro DURO, no componente del score** (requisitos de ingreso, cupo): una tarjeta no elegible no entra al ranking.

Score 0-100 para UI = normalización min-max de UP dentro del conjunto elegible. **Pero siempre mostrar el VEO en COP** (“con tu perfil, esta tarjeta te deja ~$X/año neto”). El número en pesos es lo que genera confianza y es difícil de disputar.

---

## 6. Lógica de recomendación (los cuatro modos)

Marco unificado: **optimización de portafolio submodular** (beneficios marginales decrecientes → greedy es casi-óptimo y explicable).

Sea `Valor(S, usuario)` = VEO del portafolio S usando, en cada categoría, la **mejor** tarjeta disponible (los beneficios no se suman entre tarjetas en la misma compra; se elige una por compra):
> **Valor(S) = 12 · Σ_x g_x · max_{t∈S} R_efectiva(t,x)  −  Σ_{t∈S} CostoAnual(t)  −  CostoInterés(S)**

### 6.1 ¿Qué tarjeta usar para una compra específica? (tiempo real)
```
contexto X = (comercio, MCC, M, canal, ciudad, fecha)
candidatas = { t ∈ T_user : elegible(t,X) ∧ cupo_disp(t) ≥ M ∧ franquicia(t)∈comercio }
para cada t:  beneficio(t) = M · R_efectiva(t,X)  + Σ promos_aplicables(t,X,fecha)
mejor = argmax beneficio(t)
ahorro_mostrado = beneficio(mejor) − beneficio(tarjeta_default_usuario)
```
**Refinamiento (no-greedy):** ajustar por (a) alcanzar umbral de exención de cuota, (b) avanzar hacia un bono de gasto mínimo, (c) condición de diferir a N cuotas (¿el usuario quiere endeudarse?). En MVP: greedy + estas tres banderas como aviso.

### 6.2 ¿Qué tarjeta solicitar?  (add)
```
para t ∈ (T_elegibles \ T_user):
   ganancia_marginal(t) = Valor(T_user ∪ {t}) − Valor(T_user) − CostoAnual(t)
   ajustar por: p_aprobación(ingresos vs requisitos) y costo de la consulta a centrales
recomendar top-N con ganancia_marginal > umbral
```
Recomienda solicitar solo si **cubre una categoría donde hoy el usuario gana poco** y la ganancia supera la cuota. Greedy submodular evita recomendar 5 tarjetas redundantes.

### 6.3 ¿Qué tarjeta conservar / cancelar?  (drop)
```
para t ∈ T_user:
   contribución(t) = Valor(T_user) − Valor(T_user \ {t})   # solo cuenta donde t es la ganadora
   SI contribución(t) < CostoAnual(t)  → CANDIDATA A CANCELAR
   SINO                                → CONSERVAR
```
**Advertencias no-económicas (obligatorias):** cancelar afecta historial crediticio/antigüedad y cupo total (utilización) → mostrar como aviso, no decidir solo por COP. Una tarjeta sin cuota con poco uso puede convenir conservarla por historial.

```
        FLUJO DE OPTIMIZACIÓN DE PORTAFOLIO
   ┌──────────────┐   ┌───────────────┐   ┌────────────────┐
   │ Perfil gasto │──►│ Mejor tarjeta │──►│ VEO portafolio │
   │  G por cat.  │   │  por categoría│   │  actual        │
   └──────────────┘   └───────────────┘   └───────┬────────┘
                                                   │
              ┌────────────────────────────────────┼───────────────────────┐
              ▼                                     ▼                        ▼
      ¿add t? ganancia_marg            ¿drop t? contribución        Tiempo real:
       > cuota → SOLICITAR              < cuota → CANCELAR           argmax por compra
```

---

## 7. Datos mínimos para el MVP

**Oferta (curado manual, ~50-100 tarjetas):** emisor, franquicia, cuota_manejo, EA, requisitos_ingreso, cupo min/máx; lista de beneficios base `{categoría/MCC, moneda, tasa, tope, exclusiones}`; programa de lealtad; promos clave.

**Tabla VE (decenas de filas):** programa → ValorRedención, p_red, breakage. **Activo curado y opinado.**

**Comercios (top ~100-300):** comercio → categoría/MCC, franquicias aceptadas, ciudad.

**Promociones (miles):** todos los campos de §4 con vigencia.

**Demanda (por usuario):** `T_user`, perfil de gasto `G` por categoría, `perfil_pago`, ingresos, cupo, preferencias.

> Con esto el motor de reglas ya recomienda las cuatro decisiones. **No requiere ML ni Open Finance.**

---

## 8. Reglas deterministas antes de ML

Por qué reglas primero: (a) no hay datos para entrenar; (b) la transparencia es exigible (riesgo regulatorio de "scoring opaco"); (c) la confianza nace de poder explicar *por qué*.

1. **Filtros de elegibilidad** (duros): ingresos, cupo, franquicia, vigencia de promo.
2. **Bifurcación perfil_pago** (totalero/rotativo) → función objetivo distinta.
3. **Normalización VE** → tasas `r` comparables.
4. **Greedy mejor-tarjeta-por-categoría** y **argmax por transacción**.
5. **Greedy submodular** para add/drop de portafolio.
6. **Resolución de stacking** y **capas de certeza** (confirmado/probable/acción).
7. **Desempates** explicables: menor cuota → sin cuota → redención más simple → preferencia del usuario.
8. **Guardarraíles**: nunca recomendar diferir a cuotas a un rotativo solo por una promo; avisar impacto en historial al cancelar.

**Cuándo introducir ML (Fase 2+, con datos):** inferencia de categoría desde transacciones (Open Finance), estimación de VE desde redenciones reales, `p_aprobación` y `p_elegible` de promos segmentadas, aprendizaje de preferencias, y `p_red` por usuario. El **núcleo de ranking permanece basado en reglas + explicable**; el ML alimenta los *parámetros*, no reemplaza la lógica auditable.

---

## 9. Estructuras de datos para operar eficientemente

```
 ┌─ Tabla VE (in-memory, hot-reload) ──────────── programa → VE
 ├─ Catálogo de tarjetas (in-memory, ~100) ────── card_id → atributos + beneficios
 ├─ Índice invertido de beneficios base ───────── (categoría/MCC) → [(card_id, r)]
 │      → consulta por categoría O(tarjetas en esa categoría), no scan total
 ├─ Índice temporal de promociones ────────────── (merchant_id|MCC) → [promos]
 │      + filtro por rango de fecha [inicio,fin]  (índice por intervalo)
 ├─ Wallet de usuario ─────────────────────────── user_id → set(card_id) + G + perfil_pago
 └─ Caché "mejor tarjeta por categoría" por user ─ precomputado; invalidar al
        cambiar promos/wallet → query en tiempo real = lookup O(1)
```
- **Índice invertido categoría→tarjetas** y **índice merchant/fecha→promos** son la clave del rendimiento; el dataset es pequeño, así que casi todo cabe en memoria con recarga periódica.
- **Versionado append-only** de promociones y de la tabla VE (auditoría + futura materia prima de ML).
- **Log inmutable de recomendaciones** (contexto → recomendado → ahorro estimado → ¿seguida? → ahorro real) — alimenta métricas de PMF y, después, el ML.

---

## 10. Cómo convertir el motor en ventaja difícil de copiar

1. **Frescura y cobertura del grafo de promociones** con SLA (ej. promos verificadas < 7 días). La operación de curación + validación humana es difícil y costosa de replicar; es un foso operativo, no solo técnico.
2. **La tabla VE propietaria y opinada** (cómo valorar millas/puntos con `p_red` y breakage reales) — metodología que mejora con datos de redención que solo tú acumulas.
3. **Loop de datos compuesto:** log de recomendaciones → ahorro real demostrado → confianza → más usuarios → más datos de redención/gasto → VE y promos más precisas → mejores recomendaciones. Efecto de red de datos.
4. **Neutralidad verificable** como marca: mostrar siempre el VEO en pesos, recomendar incluso lo que no paga comisión. Un banco no puede copiar esto por conflicto estructural.
5. **Explicabilidad** como feature regulatorio y de confianza: cada recomendación viene con el "por qué" en pesos. Difícil de igualar para un competidor de caja negra.

```
   FOSO = (Frescura del grafo de promos) × (VE propietaria)
          × (Loop de datos de redención) × (Confianza/neutralidad)
   — La idea es copiable; la operación de datos + la confianza acumulada, no.
```

---

## Verificación del motor (Fase 1)

1. **Pruebas con perfiles reales:** 10-15 usuarios reales con sus tarjetas y gastos → el motor debe replicar (o mejorar) la decisión que un experto humano tomaría. Si discrepa, auditar VE/promos.
2. **Test de "qué usar":** 30-50 transacciones reales conocidas → medir si la tarjeta recomendada era efectivamente la óptima ex-post.
3. **Test de calibración VE:** comparar VE supuesta vs valor de redención real observado; ajustar `p_red`/breakage.
4. **Auditoría de neutralidad:** verificar que el ranking no se correlaciona con quién paga CPA (control anti-conflicto).
5. **Backtest de add/drop:** simular recomendaciones de cancelar/solicitar sobre perfiles y verificar ganancia neta anual positiva.

---

# PARTE III — Moat y Defensibilidad: cómo sobrevivir a Nu, Bancolombia y RappiCard

> **La pregunta correcta** (la que mata startups): *"¿Qué construyo para que NO importe si Nu, Bancolombia o RappiCard lanzan exactamente esta función en 2 años?"* Una startup no muere por una mala base de datos; muere por no tener ventaja sostenible. Esta es la parte más importante del plan.

## 0. La verdad incómoda primero

**Al MVP no tienes ningún moat.** La idea es copiable, los datos aún no existen, no hay efecto de red. Lo único que te defiende los primeros 12-18 meses es **velocidad + foco**: un equipo obsesionado con un solo problema le gana a un equipo-feature dentro de un super-app para quien esto es la prioridad #14. El moat **no se tiene, se construye** — y el diseño del negocio debe estar orientado a *fabricar* defensibilidad, no a asumirla. Todo lo de abajo es la fábrica de moat.

```
   MADUREZ DEL MOAT (lo que te defiende en cada etapa)
   MVP ─────────► Tracción ─────────► Escala ─────────► Plataforma
   Velocidad      Loop de datos       Marketplace        Infraestructura
   + Foco         + Confianza/marca   dos lados (CLO)    (B2B / embedding)
   [frágil]       [naciente]          [defendible]       [casi inexpugnable]
```

## 1. El wedge estructural: el conflicto de interés que un emisor NO puede resolver

**Un emisor único jamás puede ser un optimizador neutral entre todas tus tarjetas, porque recomendar la tarjeta de un competidor canibaliza su propio producto.** Nu solo recomendará Nu. Bancolombia solo recomendará Bancolombia. RappiCard solo recomendará RappiCard. La propuesta *"de TODAS tus tarjetas (de todos los bancos), cuál usar ahora"* es **estructuralmente imposible** para un emisor sin destruir su economía.

Esto es la "**Suiza de las tarjetas**": tu neutralidad es un activo que tus mayores competidores **no pueden copiar sin auto-infligirse daño**. Es el equivalente a por qué Booking puede comparar todos los hoteles pero Marriott.com nunca lo hará.

→ **Implicación de diseño:** la neutralidad verificable (mostrar siempre el VEO en pesos, recomendar incluso lo que no paga CPA) no es solo ética — es **arquitectura defensiva**. Encadénala al producto.

## 2. Matriz de amenazas: quién está bloqueado por el wedge y quién no

| Atacante | Tipo | ¿El wedge de neutralidad lo bloquea? | Defensa necesaria |
|---|---|---|---|
| **Nu Colombia** (5M clientes) | Mono-emisor | **SÍ, bloqueado.** No puede recomendar tarjetas de otros sin canibalizar. | El wedge basta. Vigilar si pivota a agregador. |
| **Bancolombia / Puntos Colombia** | Mono-emisor + coalición | **SÍ, bloqueado** como emisor. Su coalición es cerrada (solo Puntos Colombia). | El wedge basta; tú comparas Puntos Colombia *vs* LifeMiles *vs* cashback — ellos no. |
| **RappiCard** (emisor) | Mono-emisor (vía Davivienda) | **SÍ, bloqueado** como tarjeta. | El wedge basta. |
| **Rappi (la PLATAFORMA)** | **Agregador horizontal** | **NO necesariamente.** Tiene distribución masiva + red de comercios + podría hacer ofertas cross-merchant. | **AQUÍ está el riesgo real** → §3-§6. |
| **Nequi / ecosistema Bancolombia** | Agregador horizontal | NO del todo. | Igual que Rappi. |
| **Kudos/MaxRewards localizado** | Agregador puro extranjero | NO. Mismo modelo que tú. | Velocidad + dato local + Open Finance local. |

**Conclusión brutal:** Nu, Bancolombia-emisor y RappiCard-emisor están **estructuralmente bloqueados** — no son tu amenaza letal. Tu amenaza letal es un **agregador horizontal con distribución** (Rappi sobre todo) o un entrante neutral extranjero. Contra ellos el wedge no basta; necesitas las capas siguientes.

## 3. La defensa contra el agregador horizontal: foco + profundidad financiera

Rappi/Nequi son **commerce-first** o **banking-first**, no **optimización-financiera-first**. Para ellos esto es una feature; para ti es la empresa. Tu defensa:

1. **Profundidad que una feature no replica:** la bifurcación totalero/rotativo, la tabla VE calibrada, el grafo de promociones con SLA de frescura, el motor de portafolio (solicitar/conservar/cancelar). Un equipo-feature hace el 20% fácil; el 80% difícil (mantener fresco y correcto el dato de promociones de todo el mercado) es justo donde mueren los esfuerzos secundarios.
2. **Neutralidad creíble que Rappi no tiene:** Rappi empujará comercios/tarjetas que le pagan. Tú eres el árbitro independiente. La confianza del consumidor en "está de mi lado" es lenta de construir y lenta de copiar — es marca + comportamiento acumulado.
3. **Velocidad:** llegar primero al loop de datos y a la mente del consumidor como "la autoridad de tarjetas en Colombia".

## 4. El moat que sí escala: convertirte en marketplace de dos lados (Card-Linked Offers)

**El movimiento estratégico clave.** Hoy dependes de CPA de los bancos — los mismos que querrían matarte. Eso es frágil. La evolución:

```
  FASE 1 (frágil):   Usuario ──recomendación──► Banco paga CPA   [dependes del rival]

  FASE 3 (moat):     ┌── Usuarios con intención de compra + perfil de gasto cross-bank
                     │        (dato que NINGÚN emisor único tiene)
   MARKETPLACE ──────┤
                     └── Comercios y bancos PAGAN por ofertas dirigidas (CLO)
                              → tu ingreso ya no depende de quien quiere matarte
```

- **Card-Linked Offers:** comercios financian descuentos/cashback dirigidos a usuarios con el perfil correcto. Tú tomas un *rake*. Los comercios se vuelven **aliados**, no rivales.
- **El dato que nadie más tiene:** gasto **cross-bank** agregado. Nu ve solo gasto Nu; Bancolombia solo Bancolombia. **Tú ves el portafolio completo del usuario** → inteligencia de mercado que ningún emisor puede igualar. Ese es el activo de Fase 3 B2B y un moat de datos genuino.
- Esto transforma el negocio de "comparador que mendiga CPA" a "**capa de demanda agregada con intención de compra**" — mucho más defendible y valioso.

## 5. El judo: si no puedes vencerlos, sé su infraestructura (B2B + exit)

Doble función — moat y salida:
- **Licenciar el motor** (la tabla VE + el grafo de promociones + el motor de ranking) a bancos/fintechs que quieran ofrecer "mejor uso" *dentro de su app* pero no quieren construir la operación de datos. Si Nu quiere esta feature, le sale más barato **comprártela/licenciarla que construirla** → te conviertes en proveedor, no en víctima.
- Esto también define tu **exit natural**: un incumbente que no puede copiar la operación de datos te adquiere. La defensibilidad es lo que te hace *o* inmatable *o* caro de adquirir — ambos son buenos resultados.

## 6. Open Finance como ecualizador a tu favor

El Decreto 0368/2026 **obliga a los bancos a compartir datos** del cliente vía APIs estandarizadas. Contraintuitivamente, esto **ayuda más al agregador neutral que al incumbente**: hoy tu desventaja es no saber qué tarjetas tiene el usuario ni su gasto real; Open Finance te lo entrega (con consentimiento). Nivela el campo: el dato deja de ser monopolio del emisor.
→ **Sé el agregador del lado del consumidor que se conecta primero.** Habilitarte temprano como participante del ecosistema, antes de que la categoría "asistente neutral de Open Finance" se llene, es una ventana de 18-36 meses.

## 7. Playbook anti-incumbente (secuenciado)

1. **Ahora:** clavar el wedge de neutralidad cross-bank en el ADN del producto y la marca. Ser, para prensa y usuarios, "la autoridad independiente de tarjetas en Colombia" (PR, contenido, comparativas citables → ownership de categoría, estilo "el FICO de los beneficios").
2. **Tracción:** disparar el loop de datos compuesto (recomendación → ahorro real demostrado → confianza → más usuarios → más datos de redención/gasto → mejor VE/promos → mejor recomendación). Cada vuelta amplía la distancia.
3. **Escala:** lanzar Card-Linked Offers → mover el ingreso de CPA-de-bancos a comercios-pagan → independencia de los rivales + dato cross-bank propietario.
4. **Plataforma:** conectarse a Open Finance temprano (embedding como capa de decisión por defecto → switching cost: re-cargar todas tus tarjetas y perder tu historial de ahorro) y abrir el motor B2B (judo).
5. **Siempre:** velocidad y foco. La única ventaja del día 1, y la que compra tiempo para que las demás maduren.

## 8. Veredicto honesto del IC sobre el moat

**Lo que me haría creer (como VC) que esto es defendible:**
- Evidencia de que el **loop de datos** mejora medibles las recomendaciones con el tiempo (la VE calibrada con redenciones reales supera a la genérica).
- **Retención y confianza** que no dependen de incentivos pagados (el usuario vuelve porque confía, no por un cupón).
- Un camino claro al **marketplace de dos lados** que rompa la dependencia del CPA bancario.

**Lo que me haría dudar (y debes vigilar):**
- Si **Rappi** decide hacerlo en serio con su distribución, la ventana es estrecha — tu defensa es foco + profundidad + neutralidad + llegar primero al loop de datos. No es garantía; es una carrera.
- Si el **premio por usuario en Colombia es pequeño** (ver Parte I §2.1), ningún moat compensa un mercado sin disposición a pagar. **El moat solo importa si el mercado vale la pena** — por eso validar el "tamaño del premio" en el MVP sigue siendo el experimento #0.

**Síntesis:** el moat no es la idea ni el motor; es **(neutralidad estructural que los emisores no pueden copiar) × (loop de datos cross-bank que se compone) × (marketplace que invierte la dependencia del CPA) × (confianza/categoría) × (velocidad)**. Construir el negocio explícitamente alrededor de fabricar esas cinco cosas es lo que hace que la entrada de un incumbente "no importe".

### Fuentes (Parte III)
- [Nu llegó a 5 millones de clientes en Colombia (La República)](https://www.larepublica.co/finanzas/nu-llego-a-cinco-millones-de-clientes-en-2026-un-crecimiento-de-10-veces-desde-su-llegada-4400622) · [Nu Colombia 4M clientes / 10% de adultos (Nu International)](https://international.nubank.com.br/es/compania/nu-colombia-alcanza-4-millones-de-clientes-duplicando-su-base-en-un-ano/)
- [RappiCard: ~250k tarjetas, respaldada por Davivienda (Monito)](https://www.monito.com/es/wiki/rappicard-colombia) · [RappiCard (Rankia)](https://www.rankia.co/blog/ranking-tarjetas-credito-debito/5891314-tarjeta-credito-rappicard-rappi)

---

# PARTE IV — ¿Cuán grande es el premio? (validación económica, experimento #0)

> La pregunta que precede a todo: **¿cuánto dinero real al año captura un usuario promedio colombiano con el sistema?** Si el premio es pequeño, ni el moat ni el DDL importan. Análisis por simulación Monte Carlo (200.000 muestras) sobre 5 perfiles, ponderados por su peso en el mercado direccionable, con banda conservadora/central.

## 1. Metodología y supuestos (transparentes y discutibles)

- **Premio = diferencia** entre lo que el usuario captura hoy (uso sin optimizar, una tarjeta default, recompensas que a menudo vencen) y lo que capturaría con el motor (mejor tarjeta por categoría + promos).
- **Dos componentes:** (a) **recompensas** (cashback/millas/puntos/descuentos optimizados, recurrente) y (b) **evitación de costo** (recomendar cancelar una tarjeta con cuota de manejo innecesaria y migrar a una gratuita — recurrente pero gatillado una vez).
- **Normalización VE** de la Parte II: Puntos Colombia ≈$7, LifeMiles ≈$15 conservador, con `p_red` y breakage.
- **Factor de captura** (0.4–0.7 según perfil): el usuario no sigue el 100% de las recomendaciones ni todas las promos aplican (topes, elegibilidad). Modelado con dispersión.
- **Variación de gasto**: lognormal mean-preserving (σ≈0.45) para generar distribución intra-perfil.
- **El supuesto más frágil** (y lo que el MVP DEBE medir): las **tasas óptimas por categoría**. Caso central asume un optimizador comprometido logrando ~2–3% mezclado; conservador, ~1.3–2%. *Todo el resultado escala casi linealmente con este supuesto.*

**Pesos poblacionales del mercado direccionable:** Básico 35% · Profesional joven 25% · Familia 22% · Viajero 10% · Premium 8%.

## 2. Resultado por perfil (caso central, COP/año)

| Perfil | Gasto/mes | Tasa óptima mezclada | Premio recompensas (mediana) | Premio TOTAL c/cuota (mediana) |
|---|---|---|---|---|
| **Básico** | $0.8M | 2.35% | **$90.000** | $322.000 |
| **Profesional joven** | $2.5M | 2.93% | **$385.000** | $557.000 |
| **Familia ingresos medios** | $4.0M | 2.73% | **$542.000** | $789.000 |
| **Viajero frecuente** | $5.0M | 3.00% | **$725.000** | $725.000 |
| **Premium (multi-tarjeta)** | $12.0M | 2.97% | **$1.503.000** | $1.503.000 |

> El premio escala con el gasto. El **Básico** (35% del mercado) casi no obtiene valor de las recompensas (~$90k/año); su premio real es **evitar la cuota de manejo** (~$300k), que es una recomendación de **una sola vez**, no un hábito recurrente. Hallazgo crítico → §5.

## 3. Resultado poblacional (ponderado)

| Métrica | Caso CENTRAL | Caso CONSERVADOR |
|---|---|---|
| Ahorro **medio** anual (solo recompensas) | $496.000 | $199.000 |
| Ahorro **mediano** anual (solo recompensas) | $342.000 | $145.000 |
| Ahorro **medio** anual (total c/cuota) | $631.000 | $333.000 |
| Ahorro **mediano** anual (total c/cuota) | $478.000 | $325.000 |
| **% usuarios < $100.000/año** (total) | 10% | 20% |
| **% usuarios > $500.000/año** (total) | 48% | 23% |
| % < $100.000/año (solo recompensas) | 20% | 39% |
| % > $500.000/año (solo recompensas) | 36% | 7% |

Percentiles caso central (total): p10 ≈ $99k · p25 ≈ $317k · **p50 ≈ $478k** · p75 ≈ $838k · p90 ≈ $1.25M.

## 4. Respuestas a las preguntas planteadas

1. **Ahorro promedio anual:** **~$330k–$630k** (conservador→central), total con cuota; **~$200k–$500k** solo recompensas. Caso central de trabajo: **~$500k/año**.
2. **Ahorro mediano:** **~$325k–$478k** total; **~$145k–$342k** solo recompensas. Honesto: **mediana ≈ $350k–$450k**.
3. **% que obtiene < $100.000/año:** **10%–20%** (total) / 20%–39% (solo recompensas). El segmento Básico es el grueso de esta cola.
4. **% que obtiene > $500.000/año:** **23%–48%** (total) / 7%–36% (solo recompensas). Concentrado en Familia/Viajero/Premium.
5. **Propuesta de valor realista para marketing:** evitar "ahorra millones". Defendible: **"Recupera en promedio ~$40.000 al mes (más de $450.000 al año) en beneficios que hoy estás dejando sobre la mesa."** Para segmentos altos: **"Viajeros y usuarios premium recuperan $700.000–$1.500.000 al año."** Nunca prometer el techo como típico.

## 5. Los tres veredictos (y el hallazgo que reordena la estrategia)

**¿Suficiente para generar HÁBITO?** → **Sí, pero solo para el ~50% superior** (Profesional, Familia, Viajero, Premium), donde el beneficio recurrente supera ~$30–45k/mes — suficiente para que valga la pena consultar antes de comprar. **Para el Básico (35% del mercado), NO**: su premio recurrente de recompensas (~$90k/año ≈ $7.5k/mes) es demasiado pequeño para instalar hábito, y su mayor valor (cuota) es un evento único. **El hábito es un negocio del gasto medio-alto, no del masivo.**

**¿Suficiente para cobrar SUSCRIPCIÓN?** → **Solo en el cuartil superior.** Una suscripción de ~$15–20k/mes ($180–240k/año) necesita entregar >3–5× para justificarse → exige un ahorro >$500k–1M/año, que solo logran Viajero/Premium y parte de Familia (**~25–30% del mercado**). **Conclusión: la suscripción NO es el modelo primario; es un upsell de nicho para alto gasto/viajeros.** El modelo base debe ser **gratis monetizado con CPA + Card-Linked Offers** (Parte III), con premium como capa superior.

**¿Suficiente para que el usuario ENTREGUE info financiera (Open Finance)?** → **Sí para el gasto medio-alto** ($400k–1.5M/año justifica el costo de privacidad), **no para el Básico** (el premio no paga la fricción/privacidad). Refuerza el mismo targeting.

### El hallazgo que reordena la estrategia
El mercado **no es homogéneo y el ICP no es "todo tarjetahabiente"**. Hay dos negocios distintos:
- **Masivo / Básico (35%):** valor = *evitar costo* (cuota). Es un gancho de adquisición de **una sola vez** y de marca ("te ahorré la cuota"), pero **no sostiene hábito ni suscripción**. Útil para crecimiento/PR, no para monetización recurrente.
- **Optimizadores (gasto ≥$2.5M/mes, ≥2 tarjetas, ~40–50%):** valor = *recompensas recurrentes* $400k–1.5M/año. **Aquí están el hábito, la suscripción, el dato cross-bank valioso y el moat.** → **El producto y el go-to-market deben apuntar a este segmento primero**, no al masivo.

## 6. Lo que el MVP DEBE medir para de-riesgar esto (antes del DDL)

El número entero depende de un supuesto no validado: **¿las tarjetas colombianas realmente entregan 2–3% mezclado optimizado?** El concierge (Parte V, próxima) debe medir empíricamente:
1. **Tasa óptima real por categoría** con tarifas/promos reales (no supuestas) → reemplaza mis `OPT` con datos.
2. **Factor de captura real**: ¿qué % de recomendaciones sigue el usuario? ¿cuántas promos resultan elegibles?
3. **Premio realizado por perfil** vs el modelado aquí → recalibrar.
4. **Disposición a pagar** segmentada (validar el cuartil-suscripción).

**Criterio de continuidad:** si el premio realizado mediano del segmento optimizador cae por debajo de ~$300k/año, reconsiderar la tesis; si se confirma en $400k+, el problema es económicamente relevante y se procede al DDL y al motor.

### Fuentes (Parte IV)
Valoraciones ancladas en datos ya citados (Partes I–II): [valor del punto — Puntos Colombia](https://www.bancolombia.com/personas/beneficios/puntos-colombia), [valor de la milla — LifeMiles/Latam Pass](https://www.pulzo.com/economia/cual-es-mejor-programa-millas-colombia-lifemiles-latam-pass-PP3488295). Cifras de premio = modelo Monte Carlo propio (supuestos en §1), **no datos empíricos** — su validación es el objetivo del MVP.

---

# PARTE V — ICP, Adquisición y Validación (plan de 90 días / $10M COP)

> Decisión tomada en Parte IV: **el ICP no es el colombiano promedio**, es el optimizador de gasto medio-alto. Aquí está a quién perseguir, dónde encontrarlo, cómo conseguir los primeros 100/1.000/10.000, y un plan semana a semana para validar mercado **antes** de invertir en tecnología.

## 1. ICP detallado: "El Optimizador"

**Filtros duros:** gasto ≥$2.5M COP/mes en tarjeta · ≥2 tarjetas de crédito · totalero (paga total) · interés activo en viajes/cashback/puntos · potencial ≥$400k/año de valor.

- **Demografía:** 28–45 años; urbano (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga); estrato 4–6; universitario/posgrado; suele tener pareja/familia joven o ser soltero con alto ingreso disponible.
- **Ingresos:** $6–20M COP/mes (suficiente para gastar $2.5M+ en tarjeta y pagar total sin rotar).
- **Profesión:** profesionales corporativos (gerencia media/alta), consultores, ingenieros/TI, médicos/abogados, finanzas, emprendedores digitales, freelancers de alto ingreso, ejecutivos de ventas.
- **Comportamientos financieros:** **totalero** (clave — no rota saldo); ≥2 tarjetas, a menudo una de millas (LifeMiles/Latam) + una de cashback/puntos; ya acumula y redime; viaja 1–3 veces/año (al menos una internacional o varias nacionales); usa apps financieras/fintech; "rewards-aware" pero optimiza de forma manual e incompleta.
- **Motivaciones:** viajar más/mejor con millas; la satisfacción de "ganarle al sistema"; maximizar/eficiencia; estatus (sala VIP, business); no "dejar dinero sobre la mesa"; sentirse financieramente inteligente.
- **Frustraciones:** información dispersa, opaca y en letra pequeña; no saber **qué tarjeta usar en cada compra**; enterarse tarde de promos; **millas/puntos que vencen**; cuotas de manejo que no sabe si valen la pena; comparar tarjetas es tedioso y los comparadores existentes solo dicen "cuál solicitar".

**Anti-ICP (descalificadores — no perseguir al inicio):** rotativos que financian (su problema es la tasa, no las recompensas); usuarios de 1 sola tarjeta o gasto <$1.5M/mes (premio muy pequeño, §IV); sin interés en optimizar; desbancarizados/sub-bancarizados. *Perseguir al masivo al inicio quema dinero y ensucia las señales.*

## 2. Dónde encontrarlos (canales concretos en Colombia)

- **Comunidades de millas/puntos (intención altísima, CAC ~$0):** hilo "Millas, puntos y Lifemiles" en **Laneros**; grupos de Facebook de millas/viajeros (p. ej. "Viajeros Por Colombia" y grupos específicos de LifeMiles/Latam Pass); **Ingeniero de Millas**; "Social Travelers" de Puntos Colombia; subreddits r/Colombia, r/ColombiaFIRE, r/finanzaspersonales.
- **Influencers finanzas + viajes (fit perfecto):** **Nicolás Abril (@nicolasabril, +1M — "Finanzas & Viajes")** es exactamente el cruce ICP; **Sebas Celis (Éxito Financiero, YouTube)**; **Andrés Moreno (@andresmania)**; micro-influencers (10–80k) de millas/viajes/finanzas (mejor ROI inicial que los grandes).
- **Redes:** YouTube y Instagram (top para finanzas personales en LatAm), TikTok finanzas/viajes, X/Twitter fintwit Colombia, LinkedIn (profesionales corporativos del ICP).
- **Ecosistemas relacionados:** comunidades de viajeros frecuentes (salas VIP, Avianca lifemiles), foros de tarjetahabientes premium, grupos de coworking/startups, comunidades de tech/expats en Bogotá/Medellín.
- **Programas de fidelización:** puntos de contacto con usuarios de LifeMiles/Latam Pass/Puntos Colombia (contenido, no spam).

## 3. Estrategia de adquisición por etapas

**Primeros 100 (manual, founder-led, CAC ≈ $0):** participación genuina en comunidades de millas (aportar valor real, no spamear) + reclutamiento 1-a-1 + lista de espera entre conocidos del ICP. Mensaje: *"Te digo gratis qué tarjeta usar en cada compra y cuánto te ahorras — por WhatsApp, durante 30 días."* Estos 100 son **co-creadores**, no clientes: feedback denso.

**Primeros 1.000 (canal + contenido, CAC objetivo <$15k):** 2–4 colaboraciones con **micro-influencers** de finanzas/viajes (contenido "te muestro cuánto dejé de perder") + posts de valor en comunidades + **loop de referidos** (cada usuario invita a 2 con incentivo: reporte premium gratis o gift card pequeña) + lead magnet ("Calculadora: ¿cuánto pierdes al año por no optimizar tus tarjetas?").

**Primeros 10.000 (canal pagado validado + contenido escalable, CAC objetivo <$25k):** escalar el canal con mejor CAC/retención de las etapas previas; SEO/contenido evergreen ("mejor tarjeta para [comercio/categoría]"); 1 influencer mediano-grande (Nicolás Abril-tier) una vez probado el funnel; paid Meta/Google con creatividades validadas; referido viralizado. *Solo se llega aquí si las etapas previas mostraron retención.*

## 4. CAC estimado por canal (orden de magnitud, COP)

| Canal | CAC estimado | Calidad de lead | Escala |
|---|---|---|---|
| Comunidades (Laneros, FB millas) — founder-led | **~$0–3k** | **Altísima** (ICP puro) | Baja (cientos) |
| Loop de referidos | ~$5–10k (costo incentivo) | Alta | Media-alta |
| Micro-influencers finanzas/viajes | ~$8–20k | Alta | Media |
| Influencer grande (Nicolás Abril-tier) | ~$15–40k | Media-alta | Alta |
| Contenido/SEO evergreen | ~$2–8k (amortizado) | Media-alta | Alta (lenta) |
| Paid Meta/Google | ~$20–60k | Media (requiere filtrar anti-ICP) | Alta (cara) |

> Regla: **empezar por los canales baratos y de alta intención** (comunidades, referidos, micro-influencers). El pagado solo después de validar que el producto retiene — pagar CAC por un producto que no engancha es quemar el presupuesto.

## 5. Qué canal validar PRIMERO y por qué

**Comunidades de millas/puntos (Laneros + grupos FB).** Razones: (a) **CAC ≈ $0** — crítico con $10M; (b) **es el ICP puro y concentrado** — gente que YA optimiza manualmente y sufre la frustración exacta; (c) son **conversacionales** → encajan nativamente con un MVP por WhatsApp; (d) dan **feedback denso y honesto** (la comunidad te dirá sin filtro si el valor es real); (e) si **este** público —el más fácil de enamorar— no engancha, ningún público lo hará → es la prueba más barata y más dura a la vez.

## 6. MVP Concierge por WhatsApp en 30 días — sin app

**Principio: el "motor" es un humano + una hoja. Cero desarrollo.**

**Stack (todo no-code, ~$300k):** WhatsApp Business (gratis) · formulario de onboarding (Google Forms/Typeform) · "motor" = Google Sheet/Airtable con (a) tabla VE, (b) ~20 tarjetas × 20 comercios con tasas y promos curadas a mano, (c) registro de consultas · Notion para notas de usuario.

**Operativa:**
1. **Onboarding (1 vez):** el usuario llena formulario → tarjetas que tiene, gasto aproximado por categoría, perfil de pago (totalero/rotativo), preferencia (millas/cashback).
2. **Consulta en vivo:** usuario escribe *"voy a comprar $300k en Éxito"* → operador consulta la hoja → responde *"Usa tu [tarjeta X]: ganas ~$Y vs tu tarjeta normal"* en <5 min (luego se semi-automatiza con respuestas plantilla).
3. **Empuje proactivo semanal:** reporte personalizado *"esta semana, con tus compras, optimizando habrías ganado ~$Z; ojo, promo de [comercio] hasta el viernes con [tarjeta]"*.
4. **Cierre mensual:** *"En 30 días te ayudamos a capturar ~$N que ibas a perder"* + test de precio (*"¿pagarías $15k/mes por esto?"*).

**Qué se mide en cada interacción (el dato de oro):** ¿consulta sin que se lo pidan? ¿siguió la recomendación? ¿el ahorro fue real? → valida empíricamente las tasas/captura supuestas en Parte IV.

## 7. Métricas que demostrarían Product-Market Fit

| Métrica | Umbral señal de PMF |
|---|---|
| **Consultas no provocadas / usuario activo / semana** | ≥2 (hay hábito — **la métrica #1**) |
| **Retención semana 4 (cohorte concierge)** | ≥40% sigue interactuando |
| **Tasa de seguimiento** de la recomendación | ≥50% |
| **Ahorro real confirmado / usuario / mes** | ≥$30–40k (premio se materializa) |
| **Sean Ellis test** ("¿qué tan decepcionado si desaparece?") | ≥40% "muy decepcionado" |
| **Disposición a pagar** (cuartil alto) | ≥25% del segmento dice sí a $15k/mes |
| **Referidos orgánicos** (k) | >0.5 invitaciones efectivas/usuario |
| **NPS / pull cualitativo** | Usuarios piden features, vuelven solos |

## 8. Señales para ABANDONAR o PIVOTAR

- **Premio real demasiado bajo:** ahorro mediano confirmado del segmento optimizador <$300k/año (tasas reales muy por debajo del modelo) → la tesis económica falla.
- **Sin hábito:** consultas caen tras la novedad; retención semana 4 <20%; nadie consulta sin que se le pida → es curiosidad, no necesidad.
- **Sin disposición a pagar NI CPA:** <10% paga y los bancos no pagan CPA → no hay motor de ingresos.
- **El público más fácil (comunidades de millas) no engancha** → si el ICP puro no lo ama, nadie lo hará.
- **El dato no se puede mantener:** mantener promos frescas resulta inviable incluso a escala manual de 20×20.

**Pivotes posibles (antes de abandonar):** (a) enfocarse solo en viajeros/millas (segmento de mayor premio); (b) pivotar a **evitación de costo** (cuota/tasa) para el masivo como producto distinto; (c) pivotar a B2B (licenciar el motor) si el consumo directo no retiene.

## 9. Plan semana a semana — $10M COP / 90 días

**Presupuesto:** Herramientas no-code ~$0.3M · Curación de datos (tú + asistente part-time, hoja 20×20 + VE) ~$2.5M · Micro-influencers (2–3) ~$3M · Incentivos referidos/gift cards ~$1.5M · Prueba paga pequeña (Meta) ~$1.5M · Buffer ~$1.2M. **Objetivo del trimestre: validar hábito + premio real + disposición a pagar en el ICP, NO construir software.**

| Semana | Foco | Acciones | Meta |
|---|---|---|---|
| **1** | Setup + datos | Montar WhatsApp Business, formulario, hoja VE; empezar curación de 20 tarjetas × 20 comercios | Motor manual listo |
| **2** | Datos + reclutamiento | Terminar hoja de promos; entrar a Laneros/grupos FB aportando valor; reclutar primeros 10–15 | 15 usuarios concierge |
| **3** | Operar concierge | Onboarding + consultas en vivo; instrumentar métricas (consultas, follow, ahorro) | 30 usuarios activos |
| **4** | Iterar | Reporte semanal proactivo; entrevistas a 10 usuarios; refinar plantillas | Primeras señales de hábito |
| **5** | Primer canal pago de bajo costo | 1–2 micro-influencers + lead magnet (calculadora de pérdidas) | 60–80 usuarios |
| **6** | Loop de referidos | Activar referidos con incentivo; medir k | 100 usuarios ✅ |
| **7** | Medir premio real | Consolidar ahorro confirmado vs modelo Parte IV; recalibrar tasas/captura | Premio empírico por perfil |
| **8** | Test de precio | Ofrecer premium simulado ($15k/mes) al cuartil alto; medir conversión | % disposición a pagar |
| **9** | Retención | Medir retención cohorte sem-1 (¿semana 4+?); Sean Ellis test | Retención + PMF score |
| **10** | Probar paid pequeño | $1.5M en Meta con creatividad validada; medir CAC real y calidad | CAC por canal real |
| **11** | Escalar el mejor canal | Doblar esfuerzo en el canal con mejor CAC×retención; empujar a 250–400 | Funnel repetible |
| **12** | Decisión Go/No-Go | Consolidar: hábito + premio ≥$400k + (CPA o WTP). Decidir DDL/build o pivote | **Veredicto + datos para recaudar** |

**Criterio Go/No-Go (fin de semana 12):** ✅ avanzar a DDL + producto **solo si**: consultas no provocadas ≥2/sem, retención sem-4 ≥40%, premio real mediano del optimizador ≥$400k/año, y evidencia de monetización (≥25% WTP en cuartil alto **o** un CPA real confirmado con una entidad). Si no → pivotar (§8) antes de gastar en tecnología.

### Fuentes (Parte V)
- [Comunidad Millas, puntos y Lifemiles — Laneros](https://www.laneros.com/temas/millas-puntos-y-lifemiles.235235/) · [Foros y grupos de viajeros (Mochileros.org)](https://mochileros.org/foros-2/) · [Puntos Colombia — Social Travelers](https://www.puntoscolombia.com/personas/aliados/social-travelers)
- [Nicolás Abril — Finanzas & Viajes (Instagram)](https://www.instagram.com/nicolasabril/) · [Creadores que enseñan finanzas personales en Colombia (La República)](https://www.larepublica.co/finanzas-personales/creadores-de-contenido-que-ensenan-finanzas-personales-a-traves-de-sus-redes-sociales-3240836) · [Top influencers finanzas Colombia (HypeAuditor)](https://hypeauditor.com/top-instagram-finance-economics-colombia/)

---

# PARTE VI — Arquitectura de Datos ("MVP hoy, escalable mañana")

> Objetivo: que el esquema que montas para el concierge soporte, sin reconstrucción, 1M usuarios · 500+ tarjetas · miles de comercios · decenas de miles de promociones · historial completo · motor en tiempo real · Open Finance · marketplace · ML. La regla: **una sola base PostgreSQL al inicio, pero modelada por dominios desacoplados y con los patrones duros (versionamiento bitemporal, particionado temporal, feature store) ya sembrados.**

## 1. Filosofía y topología

- **Un PostgreSQL, múltiples *schemas* por dominio** (`catalog`, `promo`, `usr`, `of`, `mkt`, `analytics`, `ml`, `audit`). Cada schema es una futura frontera de servicio: cuando un dominio necesite escalar/extraerse, ya está aislado (sin joins cross-dominio en el código crítico → se reemplazan por API).
- **Separar lo OLTP de lo OLAP desde el diseño:** el núcleo transaccional (catálogo, wallet, promos, recomendaciones en vivo) vive optimizado para lectura puntual; analítica y ML leen de tablas append-only particionadas y, a escala, se replican a un warehouse (BigQuery/Redshift) vía CDC. **No mezclar cargas.**
- **PII aislada** en `usr`/`of` con cifrado y control de acceso; identificadores opacos (UUID) en todas partes; diseño para minimización y anonimización (habilita Fase 3 B2B sin reidentificación → cumple Habeas Data, Ley 1581).
- **Lo que NO se hace en MVP pero el esquema admite:** sharding, read-replicas, particionado por hash de usuario, warehouse externo, online feature store (Redis/Feast). El esquema no los necesita hoy, pero **no los contradice**.

```
        ┌──────────────────────────── PostgreSQL (1 instancia, N schemas) ────────────────────────────┐
        │  catalog → promo → usr → of(open finance) → mkt(marketplace) → analytics → ml → audit         │
        └───────────────┬───────────────────────────────────────────────────┬───────────────────────────┘
        OLTP (puntual)  │                                                     │  OLAP/ML (append-only, particionado)
            Motor en vivo, wallet, promos                         eventos, recomendaciones, features  → (futuro) Warehouse vía CDC
```

## 2. Modelo conceptual (entidades, relaciones, cardinalidades)

```
 ISSUER (banco) 1──────∞ CARD ───────∞ BENEFIT*            LOYALTY_PROGRAM 1───∞ VE_VALUE*
   (catalog)              │  ▲           (catalog,            (catalog)              (catalog, versionado)
                          │  │            versionado)              ▲
                          │  └── CARD_VERSION* (cuota, EA, requisitos — versionado)
                          │                                        │
   USER 1───∞ USER_CARD ∞─┘   CARD ∞───∞ PROMOTION* ∞───∞ MERCHANT ───∞ MERCHANT_CATEGORY ──∞ CATEGORY/MCC
  (usr)        (wallet)         (promo, versionado + vigencia temporal)   (catalog)
     │                                       │
     │ 1                                     │ aplica a
     ├──∞ USER_PROFILE (ingresos, perfil_pago, prefs)
     ├──∞ SPENDING_PROFILE (gasto declarado por categoría)   ── (Fase 2) ──►  OF_TRANSACTION (real)
     │
     ├──∞ OF_CONSENT 1──∞ OF_CONNECTION 1──∞ OF_ACCOUNT 1──∞ OF_TRANSACTION* (particionado por tiempo)
     │        (of: consentimiento → conexión → cuenta → transacción)
     │
     ├──∞ RECOMMENDATION (log inmutable: contexto→tarjeta→ahorro est.→¿seguida?→ahorro real)
     ├──∞ EVENT (analytics, append-only, particionado)
     └──∞ FEATURE_VALUE / LABEL (ml)

 ADVERTISER 1──∞ CAMPAIGN 1──∞ OFFER ∞───(targeting)───∞ USER ;  OFFER 1──∞ CONVERSION (mkt, atribución)

  (*) = entidad VERSIONADA y/o con VIGENCIA TEMPORAL.   Cardinalidad: 1──∞ uno-a-muchos, ∞──∞ muchos-a-muchos.
```

**Dependencias clave:** `BENEFIT` y `PROMOTION` dependen de `CARD`; `PROMOTION` además de `MERCHANT`/`CATEGORY`; `VE_VALUE` de `LOYALTY_PROGRAM`; el motor cruza `USER_CARD × (BENEFIT ⊕ PROMOTION vigente) × VE` para producir `RECOMMENDATION`. Toda decisión del motor es **función de filas vigentes** → la dimensión temporal es de primera clase, no un add-on.

## 3. Modelo lógico por tipo de tabla

| Tipo | Tablas | Patrón |
|---|---|---|
| **Maestras (catálogo)** | `catalog.issuers`, `catalog.cards`, `catalog.loyalty_programs`, `catalog.merchants`, `catalog.categories` | Identidad estable (UUID), atributos mutables van a tablas versionadas |
| **Versionadas (negocio)** | `catalog.card_versions`, `catalog.benefits`, `catalog.ve_values`, `promo.promotions` | Effective-dating (valid-time) + append-only |
| **Transaccionales** | `usr.user_cards`, `of.transactions`, `mkt.conversions`, `analytics.recommendations` | Alta frecuencia; particionado temporal donde crece sin límite |
| **Históricas** | `*_history` de cada versionada + `of.transactions` (inmutable) | Inmutables, solo append |
| **Auditoría** | `audit.change_log` (genérico) | Transaction-time (quién/cuándo cambió qué) |
| **ML futuro** | `ml.feature_definitions`, `ml.feature_values`, `ml.labels`, `ml.training_runs` | Feature store offline + label store |

## 4. Estrategia de versionamiento (bitemporal pragmático)

Dos ejes de tiempo, aplicados solo donde aportan:
- **Valid-time (vigencia de negocio)** — *cuándo el hecho es cierto en el mundo*: una promo vale del 1 al 30 de junio; una VE rige desde tal fecha. Implementado con `valid_during tstzrange` + **exclusion constraint GiST** que impide solapamientos de versiones para la misma clave lógica. El motor consulta `WHERE valid_during @> now()`.
- **Transaction-time (auditoría)** — *cuándo lo supimos/registramos*: `audit.change_log` genérico vía trigger (op, old/new JSONB, actor, timestamp). Responde "¿qué decía esta promo cuando recomendamos X?".

**Patrón único para `benefits`, `ve_values`, `card_versions`, `promotions`:** cada cambio **inserta una nueva fila-versión** (nunca UPDATE destructivo); se cierra el `valid_to` de la versión anterior. La clave lógica (`card_id`, `program_id`, etc.) agrupa las versiones; el `id` (UUID) identifica la versión. Así el histórico es subproducto natural y es **materia prima de ML** (cómo evolucionaron beneficios/promos). Beneficio adicional: reproducibilidad — toda recomendación pasada se puede re-explicar con las filas vigentes en ese instante.

## 5. Estrategia temporal

- **Vigencias y promos futuras:** `valid_during` permite cargar promos con fecha futura (se "encienden" solas); el índice GiST + filtro `@> now()` las excluye hasta su inicio.
- **Expiración:** no se borra; `valid_to` pasa. Las millas/puntos del usuario tienen su propia caducidad → campo `expires_at` en saldos (si se modela saldo) y haircut por breakage en la VE.
- **Historial sin límite:** `of.transactions` y `analytics.events` **particionadas por rango mensual** (declarative partitioning + `pg_partman`); particiones viejas se comprimen/archivan a almacenamiento frío o warehouse. El OLTP solo toca particiones recientes.
- **Reloj único:** todo en `timestamptz` (UTC); la capa de presentación convierte a `America/Bogota`.

## 6. Diseño para el motor de recomendación

**Consultas más frecuentes (las que deben ser <10ms):**
1. *"¿Qué tarjeta usar?"* → dado `user_id` + `merchant_id`/`mcc` + fecha: traer wallet del usuario, sus beneficios base por esa categoría, y **promos vigentes** para (merchant|mcc, fecha, tarjetas del usuario).
2. *Ranking de portafolio* (solicitar/conservar/cancelar) → recorrer wallet × beneficios × perfil de gasto.

**Índices clave:**
- `promo.promotions`: **GiST** `(valid_during)` + btree `(merchant_id)`, `(mcc)`; **índice parcial** `WHERE valid_during @> now()` (promos activas, conjunto pequeño y caliente).
- `promo.promotion_cards (card_id)` y `promo.promotion_merchants (merchant_id)` para el cruce con el wallet.
- `catalog.benefits`: btree `(card_id, category_id)` parcial `WHERE is_current`.
- `usr.user_cards (user_id)`.

**Precálculo (la clave del tiempo real a escala):**
- `reco.user_best_card_by_category` — tabla materializada por usuario: para cada categoría, la mejor tarjeta y su `r` efectiva. Se **invalida/recalcula** ante cambio de wallet, de beneficios o de promos relevantes (event-driven). La consulta en vivo se vuelve un *lookup* O(1).
- Catálogo + tabla VE + beneficios vigentes **cacheados en memoria de aplicación** (dataset pequeño: 500 tarjetas, decenas de miles de promos activas caben en RAM) con recarga ante cambios.

## 7. Diseño para Open Finance (Fase 2)

Modelo en cascada **consentimiento → conexión → cuenta → transacción**, alineado al Decreto 0368/2026:
- `of.consents`: alcance (scopes), `granted_at`, `expires_at`, `status`, `revoked_at`, base legal, versión de términos aceptada. **Inmutable + auditado** (un consentimiento es prueba legal).
- `of.connections`: proveedor/agregador, institución, estado de la conexión, **referencia** a credenciales (los tokens viven en un secret manager/Vault, **nunca** en la tabla).
- `of.accounts`: cuentas/tarjetas vinculadas; mapeo a `catalog.cards` cuando se identifica el producto.
- `of.transactions`: **particionada por mes**; guarda crudo (`raw_description`, `amount`, `posted_at`, `mcc`) + enriquecido (`merchant_id` resuelto, `category_id`). Inmutable.
- `of.transaction_categories`: resultado de categorización con `source` (`rule`|`ml`) y `confidence` → permite reprocesar y comparar reglas vs ML.

## 8. Diseño para Marketplace (Fase 3 — Card-Linked Offers)

- `mkt.advertisers`: comercios/bancos que pagan.
- `mkt.campaigns`: presupuesto, objetivo, ventana.
- `mkt.offers`: oferta patrocinada con `targeting` (JSONB: segmento, categoría, ciudad), términos CLO, `pricing_model` (CPA|CPC|rake), tope.
- `mkt.offer_events`: impresiones/clics (append-only, particionado).
- `mkt.conversions`: atribución (oferta → recomendación → compra confirmada), con ventana de atribución y `status`. **Aquí se cierra el loop económico** y se factura.

## 9. Diseño para analítica

- `analytics.events`: stream append-only, **particionado por mes**; `event_type`, `user_id`, `payload JSONB`, `occurred_at`. Fuente única de verdad de comportamiento.
- `analytics.recommendations`: **log inmutable** del motor (contexto, tarjeta recomendada, `estimated_saving`, `was_followed`, `realized_saving`). Doble función: métrica de producto **y** dataset/labels de ML.
- `analytics.savings_ledger`: ahorro confirmado por usuario (alimenta la propuesta de valor y la métrica de PMF "ahorro real/mes").
- Métricas de producto (retención, consultas no provocadas, PMF) como **vistas materializadas** sobre `events`/`recommendations`; a escala, en el warehouse.

## 10. Diseño para ML futuro

- `ml.feature_definitions`: catálogo de features (nombre, tipo, fuente, versión) → gobernanza.
- `ml.feature_values`: **feature store offline** (`entity_type`, `entity_id`, `feature_id`, `value`, `computed_at`, `valid_during`) — point-in-time correctness para evitar leakage. A escala, se materializa a un online store (Redis/Feast) para inferencia <10ms.
- `ml.labels`: label store (p. ej. `followed_recommendation`, `card_approved`, `churned`) ligado a `entity_id` + tiempo.
- `ml.training_runs` / `ml.datasets`: metadata de entrenamiento (reproducibilidad).
- **Feedback loop:** `recommendations.was_followed` + `realized_saving` + `events` → `labels` → reentrenamiento → mejores parámetros (VE calibrada, `p_elegible`, categorización) → mejores recomendaciones. **El loop es el moat de datos de la Parte III, materializado en tablas.**

## 11. Esquema físico recomendado (resumen)

- **Extensiones:** `pgcrypto` (UUID), `btree_gist` (exclusion constraints temporales), `pg_trgm` (búsqueda de comercios), `pg_partman` (particiones automáticas).
- **Particionado por rango mensual:** `of.transactions`, `analytics.events`, `mkt.offer_events`.
- **UUID v4** como PK en todo (evita colisiones al fragmentar/mergear y no filtra volumen).
- **`timestamptz` siempre; `numeric` para dinero** (nunca float); **`jsonb`** para estructuras flexibles (condiciones de promo, targeting, payloads) con índices GIN donde se consulten.
- **Read-replica** para analítica/ML cuando el OLTP lo sienta; CDC (Debezium) → warehouse a escala.

## 12. DDL PostgreSQL (núcleo crítico)

```sql
-- ============ EXTENSIONES Y SCHEMAS ============
CREATE EXTENSION IF NOT EXISTS pgcrypto;     -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS btree_gist;   -- EXCLUDE con = y &&
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE SCHEMA IF NOT EXISTS catalog;
CREATE SCHEMA IF NOT EXISTS promo;
CREATE SCHEMA IF NOT EXISTS usr;
CREATE SCHEMA IF NOT EXISTS of;        -- open finance
CREATE SCHEMA IF NOT EXISTS mkt;       -- marketplace
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS ml;
CREATE SCHEMA IF NOT EXISTS audit;

-- ============ CATÁLOGO: maestras ============
CREATE TABLE catalog.issuers (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name         text NOT NULL,
    type         text NOT NULL CHECK (type IN ('banco','neobanco','cooperativa','fintech')),
    created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.loyalty_programs (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name         text NOT NULL,             -- 'Puntos Colombia', 'LifeMiles', 'Latam Pass'
    currency     text NOT NULL CHECK (currency IN ('puntos','millas','cashback')),
    created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.categories (          -- taxonomía + MCC
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code         text UNIQUE NOT NULL,      -- 'supermercado','combustible',...
    mcc          int,                       -- merchant category code asociado (nullable)
    parent_id    uuid REFERENCES catalog.categories(id)
);

CREATE TABLE catalog.cards (               -- identidad estable de la tarjeta
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    issuer_id    uuid NOT NULL REFERENCES catalog.issuers(id),
    program_id   uuid REFERENCES catalog.loyalty_programs(id),
    name         text NOT NULL,
    franchise    text NOT NULL CHECK (franchise IN ('visa','mastercard','amex','diners')),
    tier         text,                      -- clásica, gold, platinum, black, signature
    created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE catalog.merchants (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name         text NOT NULL,
    category_id  uuid REFERENCES catalog.categories(id),
    mcc          int,
    city         text,
    created_at   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_merchants_name_trgm ON catalog.merchants USING gin (name gin_trgm_ops);

-- ============ CATÁLOGO: versionadas (effective-dating) ============
-- Atributos mutables de la tarjeta (cuota, EA, requisitos) — una versión por cambio
CREATE TABLE catalog.card_versions (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id         uuid NOT NULL REFERENCES catalog.cards(id),
    cuota_manejo    numeric(12,2) NOT NULL DEFAULT 0,    -- mensual COP
    ea_interes      numeric(6,4),                        -- tasa efectiva anual
    ingreso_min     numeric(14,2),
    cupo_min        numeric(14,2),
    cupo_max        numeric(14,2),
    valid_during    tstzrange NOT NULL DEFAULT tstzrange(now(), 'infinity'),
    is_current      boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now(),
    EXCLUDE USING gist (card_id WITH =, valid_during WITH &&)   -- no solapar versiones
);
CREATE INDEX idx_cardver_current ON catalog.card_versions (card_id) WHERE is_current;

-- Beneficios base por tarjeta y categoría (versionado)
CREATE TABLE catalog.benefits (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id         uuid NOT NULL REFERENCES catalog.cards(id),
    category_id     uuid NOT NULL REFERENCES catalog.categories(id),
    reward_type     text NOT NULL CHECK (reward_type IN ('cashback','millas','puntos','descuento')),
    rate            numeric(10,6) NOT NULL,    -- unidades por peso (o % si cashback/descuento)
    cap_periodo     numeric(14,2),             -- tope de acumulación por periodo (nullable)
    exclusiones     jsonb DEFAULT '{}'::jsonb,
    valid_during    tstzrange NOT NULL DEFAULT tstzrange(now(), 'infinity'),
    is_current      boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now(),
    EXCLUDE USING gist (card_id WITH =, category_id WITH =, valid_during WITH &&)
);
CREATE INDEX idx_benefits_lookup ON catalog.benefits (card_id, category_id) WHERE is_current;

-- Valor Efectivo por programa (la tabla VE de la Parte II — versionada)
CREATE TABLE catalog.ve_values (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id      uuid NOT NULL REFERENCES catalog.loyalty_programs(id),
    redemption_cop  numeric(12,4) NOT NULL,   -- $/unidad (Puntos $7, LifeMiles ~$15)
    p_red           numeric(4,3) NOT NULL DEFAULT 0.85,
    breakage        numeric(4,3) NOT NULL DEFAULT 0.10,
    ve_efectivo     numeric(12,4) GENERATED ALWAYS AS
                    (redemption_cop * p_red * (1 - breakage)) STORED,
    valid_during    tstzrange NOT NULL DEFAULT tstzrange(now(), 'infinity'),
    is_current      boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now(),
    EXCLUDE USING gist (program_id WITH =, valid_during WITH &&)
);

-- ============ PROMO: promociones (versionado + vigencia temporal) ============
CREATE TABLE promo.promotions (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    promo_key       uuid NOT NULL,            -- clave lógica que agrupa versiones
    title           text NOT NULL,
    effect_type     text NOT NULL CHECK (effect_type IN ('porcentaje','fijo','multiplicador')),
    effect_value    numeric(12,4) NOT NULL,
    channel         text CHECK (channel IN ('fisico','online','ambos')),
    city            text,
    mcc             int,
    compra_min      numeric(14,2) DEFAULT 0,
    tope_beneficio  numeric(14,2),
    conditions      jsonb DEFAULT '{}'::jsonb,   -- requiere_inscripcion, cuotas, segmento...
    stacking_group  text,                        -- null = apilable; mismo grupo = exclusivo
    is_targeted     boolean NOT NULL DEFAULT false,  -- 'clientes seleccionados' → p_elegible<1
    valid_during    tstzrange NOT NULL,          -- vigencia (admite futuro)
    is_current      boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now()
);
-- Índice GiST de vigencia + parcial de activas (consulta caliente del motor)
CREATE INDEX idx_promo_valid_gist ON promo.promotions USING gist (valid_during);
CREATE INDEX idx_promo_active ON promo.promotions (mcc)
    WHERE is_current AND upper(valid_during) > now();
CREATE INDEX idx_promo_conditions_gin ON promo.promotions USING gin (conditions);

-- Alcance N:N de la promo (qué tarjetas / qué comercios)
CREATE TABLE promo.promotion_cards (
    promotion_id uuid NOT NULL REFERENCES promo.promotions(id) ON DELETE CASCADE,
    card_id      uuid NOT NULL REFERENCES catalog.cards(id),
    PRIMARY KEY (promotion_id, card_id)
);
CREATE TABLE promo.promotion_merchants (
    promotion_id uuid NOT NULL REFERENCES promo.promotions(id) ON DELETE CASCADE,
    merchant_id  uuid NOT NULL REFERENCES catalog.merchants(id),
    PRIMARY KEY (promotion_id, merchant_id)
);
CREATE INDEX idx_promocards_card ON promo.promotion_cards (card_id);
CREATE INDEX idx_promomerch_merch ON promo.promotion_merchants (merchant_id);

-- ============ USUARIOS (PII aislada) ============
CREATE TABLE usr.users (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email_enc     bytea,                    -- cifrado a nivel app
    phone_enc     bytea,
    status        text NOT NULL DEFAULT 'active',
    created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE usr.user_profiles (
    user_id         uuid PRIMARY KEY REFERENCES usr.users(id) ON DELETE CASCADE,
    ingreso_mensual numeric(14,2),
    perfil_pago     text CHECK (perfil_pago IN ('totalero','rotativo','mixto')),
    preferences     jsonb DEFAULT '{}'::jsonb,   -- pesos cashback/millas, aerolínea
    updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE usr.user_cards (              -- el wallet
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       uuid NOT NULL REFERENCES usr.users(id) ON DELETE CASCADE,
    card_id       uuid NOT NULL REFERENCES catalog.cards(id),
    cupo_disp     numeric(14,2),
    dia_corte     int CHECK (dia_corte BETWEEN 1 AND 31),
    added_at      timestamptz NOT NULL DEFAULT now(),
    removed_at    timestamptz,              -- soft-delete: conserva historial
    UNIQUE (user_id, card_id)
);
CREATE INDEX idx_usercards_user ON usr.user_cards (user_id) WHERE removed_at IS NULL;

CREATE TABLE usr.spending_profile (       -- gasto declarado (Fase 1) por categoría
    user_id      uuid NOT NULL REFERENCES usr.users(id) ON DELETE CASCADE,
    category_id  uuid NOT NULL REFERENCES catalog.categories(id),
    monthly_cop  numeric(14,2) NOT NULL,
    source       text NOT NULL DEFAULT 'declarado' CHECK (source IN ('declarado','open_finance')),
    updated_at   timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, category_id)
);

-- ============ PRECÁLCULO DEL MOTOR ============
CREATE TABLE reco.user_best_card_by_category (
    user_id      uuid NOT NULL,
    category_id  uuid NOT NULL,
    best_card_id uuid NOT NULL REFERENCES catalog.cards(id),
    r_efectiva   numeric(10,6) NOT NULL,
    computed_at  timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, category_id)
);  -- se invalida ante cambio de wallet/beneficios/promos → lookup O(1) en vivo
-- (CREATE SCHEMA reco; antes — omitido por brevedad)

-- ============ OPEN FINANCE (Fase 2) ============
CREATE TABLE of.consents (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       uuid NOT NULL REFERENCES usr.users(id),
    scopes        text[] NOT NULL,
    terms_version text NOT NULL,
    granted_at    timestamptz NOT NULL DEFAULT now(),
    expires_at    timestamptz,
    revoked_at    timestamptz,
    status        text NOT NULL DEFAULT 'active' CHECK (status IN ('active','expired','revoked'))
);  -- inmutable + auditado: prueba legal del consentimiento (Ley 1581 / Decreto 0368)

CREATE TABLE of.connections (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       uuid NOT NULL REFERENCES usr.users(id),
    consent_id    uuid NOT NULL REFERENCES of.consents(id),
    provider      text NOT NULL,            -- agregador / institución
    secret_ref    text NOT NULL,            -- referencia a Vault; NUNCA el token aquí
    status        text NOT NULL DEFAULT 'connected',
    created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE of.accounts (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    connection_id uuid NOT NULL REFERENCES of.connections(id),
    card_id       uuid REFERENCES catalog.cards(id),   -- mapeo al catálogo si se identifica
    account_type  text,
    masked_number text,
    created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE of.transactions (            -- PARTICIONADA por mes
    id              uuid NOT NULL DEFAULT gen_random_uuid(),
    account_id      uuid NOT NULL,
    user_id         uuid NOT NULL,
    amount          numeric(14,2) NOT NULL,
    raw_description text,
    mcc             int,
    merchant_id     uuid,                  -- enriquecido
    category_id     uuid,                  -- enriquecido
    posted_at       timestamptz NOT NULL,
    PRIMARY KEY (id, posted_at)
) PARTITION BY RANGE (posted_at);
CREATE TABLE of.transactions_2026m06 PARTITION OF of.transactions
    FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE INDEX idx_oftx_user_time ON of.transactions (user_id, posted_at DESC);

CREATE TABLE of.transaction_categories (  -- categorización (reglas vs ML)
    transaction_id uuid NOT NULL,
    posted_at      timestamptz NOT NULL,
    category_id    uuid NOT NULL REFERENCES catalog.categories(id),
    source         text NOT NULL CHECK (source IN ('rule','ml')),
    confidence     numeric(4,3),
    PRIMARY KEY (transaction_id, posted_at, source)
);

-- ============ MARKETPLACE (Fase 3) ============
CREATE TABLE mkt.advertisers (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,
    type        text CHECK (type IN ('comercio','banco','fintech')),
    created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE mkt.campaigns (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    advertiser_id uuid NOT NULL REFERENCES mkt.advertisers(id),
    name          text NOT NULL,
    budget_cop    numeric(14,2) NOT NULL,
    valid_during  tstzrange NOT NULL,
    status        text NOT NULL DEFAULT 'active'
);
CREATE TABLE mkt.offers (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    campaign_id   uuid NOT NULL REFERENCES mkt.campaigns(id),
    title         text NOT NULL,
    targeting     jsonb DEFAULT '{}'::jsonb,
    pricing_model text NOT NULL CHECK (pricing_model IN ('cpa','cpc','rake')),
    price_cop     numeric(14,2) NOT NULL,
    cap_cop       numeric(14,2),
    valid_during  tstzrange NOT NULL
);
CREATE INDEX idx_offers_targeting_gin ON mkt.offers USING gin (targeting);

CREATE TABLE mkt.conversions (            -- cierre del loop económico
    id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id       uuid NOT NULL REFERENCES mkt.offers(id),
    user_id        uuid NOT NULL REFERENCES usr.users(id),
    recommendation_id uuid,               -- atribución a la recomendación
    amount_cop     numeric(14,2),
    status         text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','rejected')),
    converted_at   timestamptz NOT NULL DEFAULT now()
);

-- ============ ANALÍTICA ============
CREATE TABLE analytics.events (           -- PARTICIONADA por mes
    id          uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id     uuid,
    event_type  text NOT NULL,
    payload     jsonb DEFAULT '{}'::jsonb,
    occurred_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (id, occurred_at)
) PARTITION BY RANGE (occurred_at);
CREATE TABLE analytics_events_2026m06 PARTITION OF analytics.events
    FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE INDEX idx_events_user_type ON analytics.events (user_id, event_type, occurred_at DESC);

CREATE TABLE analytics.recommendations (  -- log inmutable: producto + dataset ML
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          uuid NOT NULL REFERENCES usr.users(id),
    context          jsonb NOT NULL,        -- merchant/mcc/monto/canal/fecha
    recommended_card uuid NOT NULL REFERENCES catalog.cards(id),
    estimated_saving numeric(14,2) NOT NULL,
    was_followed     boolean,               -- feedback
    realized_saving  numeric(14,2),         -- ahorro real confirmado
    created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_reco_user_time ON analytics.recommendations (user_id, created_at DESC);

CREATE TABLE analytics.savings_ledger (
    id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      uuid NOT NULL REFERENCES usr.users(id),
    period       date NOT NULL,             -- mes
    saving_cop   numeric(14,2) NOT NULL,
    UNIQUE (user_id, period)
);

-- ============ ML (feature store + labels) ============
CREATE TABLE ml.feature_definitions (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text UNIQUE NOT NULL,
    dtype       text NOT NULL,
    source      text,
    version     int NOT NULL DEFAULT 1
);
CREATE TABLE ml.feature_values (          -- offline store, point-in-time correct
    entity_type  text NOT NULL,            -- 'user','card','merchant'
    entity_id    uuid NOT NULL,
    feature_id   uuid NOT NULL REFERENCES ml.feature_definitions(id),
    value        numeric,
    value_text   text,
    valid_during tstzrange NOT NULL DEFAULT tstzrange(now(),'infinity'),
    computed_at  timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (entity_type, entity_id, feature_id, computed_at)
);
CREATE TABLE ml.labels (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type text NOT NULL,
    entity_id   uuid NOT NULL,
    label_name  text NOT NULL,             -- 'followed_reco','card_approved','churned'
    label_value numeric NOT NULL,
    observed_at timestamptz NOT NULL DEFAULT now()
);

-- ============ AUDITORÍA (transaction-time genérica) ============
CREATE TABLE audit.change_log (
    id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    schema_name text NOT NULL,
    table_name  text NOT NULL,
    row_pk      uuid,
    op          text NOT NULL CHECK (op IN ('INSERT','UPDATE','DELETE')),
    old_data    jsonb,
    new_data    jsonb,
    actor       text,
    changed_at  timestamptz NOT NULL DEFAULT now()
);  -- poblada por trigger genérico en las tablas críticas
```

## 13. Justificación de las tablas críticas

- **`catalog.cards` + `catalog.card_versions` (separación identidad/versión):** la tarjeta es estable; cuota/EA/requisitos cambian. Separarlas permite versionar atributos sin duplicar identidad ni romper FKs del wallet. El `EXCLUDE` garantiza una sola versión vigente por tarjeta.
- **`catalog.benefits` (versionado + `EXCLUDE`):** el corazón del cálculo de `r`. Versionado para reproducir cualquier recomendación pasada y para alimentar ML con la evolución de beneficios. Índice parcial `is_current` mantiene la consulta del motor mínima.
- **`catalog.ve_values` (columna generada):** materializa la fórmula VE de la Parte II en la base → consistencia garantizada y versionable; calibrable con datos reales de redención (loop de moat).
- **`promo.promotions` + `EXCLUDE`/GiST:** la tabla más caliente y la de mayor valor (el grafo de promociones, el moat operativo). Vigencia temporal de primera clase (admite promos futuras), `jsonb` para condiciones heterogéneas, e índice parcial de activas para tiempo real.
- **`usr.user_cards` (soft-delete):** el wallet; `removed_at` conserva historial (necesario para explicar recomendaciones pasadas y para ML de churn) sin contaminar el wallet activo.
- **`reco.user_best_card_by_category` (precálculo):** convierte la consulta crítica en un lookup O(1) — la diferencia entre responder en 8ms o en 200ms a 1M usuarios.
- **`of.consents` (inmutable + auditado):** no es una tabla de datos, es **prueba legal**. Su integridad es requisito regulatorio (Habeas Data / Decreto 0368), no una conveniencia.
- **`of.transactions` (particionada):** crece sin límite (1M usuarios × N transacciones/mes). El particionado mensual mantiene el OLTP tocando solo datos recientes y permite archivar lo viejo.
- **`analytics.recommendations` (log inmutable):** triple propósito — métrica de PMF (Parte V), prueba de ahorro real (propuesta de valor, Parte IV) y dataset/labels de ML (Parte II §8). Es donde el negocio se vuelve dato.
- **`ml.feature_values` (point-in-time):** `valid_during` evita *data leakage* en entrenamiento (usar solo features conocidas en el momento de la predicción) — error que arruina modelos en producción.
- **`audit.change_log` (genérico):** un solo mecanismo de transaction-time para todo el sistema; barato hoy, indispensable para forense/cumplimiento mañana.

## Verificación / próximos pasos del esquema
1. **MVP real:** del DDL anterior, el concierge solo necesita `catalog.*`, `promo.*`, `usr.*` y `analytics.recommendations`. El resto (`of`, `mkt`, `ml`) son schemas vacíos que se llenan en sus fases — **existen para que no haya migración traumática**, no para construirse hoy.
2. **Prueba de carga del motor:** poblar con 500 tarjetas + 50k promos sintéticas y validar que la consulta "qué tarjeta usar" responde <10ms con los índices definidos.
3. **Prueba de versionamiento:** insertar 3 versiones de una promo/beneficio y verificar que `EXCLUDE` impide solapamientos y que `valid_during @> ts` reconstruye el estado histórico.
4. **Prueba de particionado:** automatizar creación de particiones con `pg_partman` y validar pruning en consultas por rango de fecha.

---

# PARTE VII — Modelo Financiero y Tesis de Creación de Valor

> No es una hoja de CAC/LTV: es la tesis de si esta fintech puede ser relevante en Colombia y luego en LatAm. Modelo de 3 escenarios × 7 años (cálculo Monte Carlo/determinista propio, TRM $4.000 COP/USD). **El hallazgo central abajo reordena la prioridad estratégica.**

## 1. Resultados por escenario (años clave)

**ESCENARIO A — Conservador** (baja adopción, CPA bajo, baja retención, sin suscripción relevante)

| Año | Registrados | MAU | ARPU/año | LTV/CAC | Ingresos | EBITDA |
|---|---|---|---|---|---|---|
| 1 | 5k | 1k | $1.4 | **0.22** | $7M COP | −$491M COP |
| 3 | 50k | 12k | $1.4 | 0.22 | $68M COP | −$1.170M COP |
| 7 | 500k | 125k | $1.4 | 0.22 | $675M COP (**$0.2M USD**) | −$3.965M COP |

→ **Unit economics ROTOS** (LTV/CAC 0.22: pierdes ~$4 por cada $1 que recuperas). Nunca llega a breakeven. Valoración terminal ~**$1M USD**. *Negocio inviable / lifestyle.*

**ESCENARIO B — Base** (adopción esperada, CPA moderado, algunas alianzas, premium de nicho)

| Año | Registrados | MAU | ARPU/año | LTV/CAC | Ingresos | EBITDA |
|---|---|---|---|---|---|---|
| 1 | 10k | 4k | $5.4 | 1.24 | $86M COP | −$828M COP |
| 3 | 160k | 64k | $6.2 | 1.42 | $1.574M COP | −$4.298M COP |
| 5 | 750k | 300k | $7.6 | 1.74 | $9.080M COP | −$10.194M COP |
| 7 | 2.0M | 800k | $8.2 | **1.88** | $26.080M COP (**$6.5M USD**) | −$12.744M COP |

→ LTV/CAC **<2 (bajo el umbral venture de 3x)**; no alcanza breakeven en 7 años; quema acumulada ~**$12.4M USD**. Valoración terminal **$26–52M USD**. *Buen negocio, no un home-run.*

**ESCENARIO C — Ambicioso** (Open Finance exitoso, marketplace activo, suscripción consolidada, motor licenciado)

| Año | Registrados | MAU | ARPU/año | LTV/CAC | Ingresos | EBITDA |
|---|---|---|---|---|---|---|
| 1 | 15k | 8k | $11.0 | 3.40 | $363M COP | −$1.087M COP |
| 3 | 350k | 193k | $13.9 | 4.30 | $10.695M COP | −$6.394M COP |
| 5 | 2.0M | 1.1M | $19.8 | 6.11 | $86.900M COP | **+$10.920M COP** |
| 7 | 6.5M | 3.6M | $22.5 | **6.95** | $321.300M COP (**$80.3M USD**) | +$129.340M COP |

→ LTV/CAC **3.4→7** (sano); **breakeven Año 5**; quema máx. acumulada solo ~**$3.7M USD** (Año 4) antes de girar a rentable. Valoración terminal **$321–643M USD**. *Caso venture real.*

## 2. Las 19 métricas — síntesis comparativa (Año 7)

| # | Métrica | A Conservador | B Base | C Ambicioso |
|---|---|---|---|---|
| 1 | Registrados | 500k | 2.0M | 6.5M |
| 2 | MAU | 125k | 800k | 3.6M |
| 3 | Retenidos (vida media) | 12 meses | 24 meses | 40 meses |
| 4 | Conversión premium (de MAU) | 1% | 4% | 10% |
| 5 | Ingresos CPA | dominante (~100%) | ~37% | ~22% |
| 6 | Ingresos suscripción | ~0 | ~29% | ~27% |
| 7 | Ingresos marketplace | $0 | ~28% | ~28% (creciente) |
| 8 | Ingresos B2B | $0 | ~4% | ~17% |
| 9 | Ingresos APIs | $0 | ~2% | ~7% |
| 10 | ARPU/año | $1.4 USD | $8.2 USD | $22.5 USD |
| 11 | CAC | $15k COP ($3.75) | $25k ($6.25) | $35k ($8.75) |
| 12 | LTV | ~$3.3k COP | ~$47k COP | ~$243k COP |
| 13 | **LTV/CAC** | **0.22** ❌ | **1.88** ⚠️ | **6.95** ✅ |
| 14 | Margen bruto | 60% | 72% | 82% |
| 15 | Burn (EBITDA Año7) | −$4.0B COP | −$12.7B COP | +$129B COP |
| 16 | Breakeven | nunca | nunca (en 7a) | **Año 5** |
| 17 | Capital a PMF (~fin Año2) | $0.32M USD | $0.70M USD | $1.09M USD |
| 18 | Capital a 100k usuarios | $1.05M USD | $1.78M USD | $2.69M USD |
| 19 | Capital a 1M usuarios | (no llega) | $9.20M USD | ~$1.0M USD* |

*En C el cruce de 1M ocurre cerca del breakeven → quema acumulada baja. *Pico real de capital en C ≈ $3.7M USD (Año 4); un raise realista para acelerar regionalmente sería $15–30M, no por necesidad de supervivencia sino de velocidad.*

## 3. El hallazgo central (que reordena la estrategia)

```
   Ingreso por línea en el tiempo (escenario C):
   Años 1-3  ████████ CPA + suscripción incipiente   ← lo único que funciona temprano
   Años 4-7  ██ CPA   ████████ MARKETPLACE (CLO)   ████ B2B/Licencia   ██ Suscripción
                       └──────── aquí migra el 70%+ del valor ────────┘
```

**La diferencia entre A/B (no-venture) y C (venture) NO es más usuarios — es la migración del modelo de ingresos de CPA hacia marketplace + B2B.** El modelo demuestra cuantitativamente la tesis de la Parte III: *el CPA es una trampa de techo bajo; el valor está en monetizar el dato cross-bank y la demanda agregada.* Si la empresa se queda en CPA + suscripción (caso B), es un negocio de $25–50M; solo activando el marketplace y el licenciamiento (caso C) entra al rango de $100M+.

## 4. Respuestas a las preguntas estratégicas

1. **Línea de mayor potencial:** **Marketplace (Card-Linked Offers)**, seguida de **B2B/licenciamiento del motor**. Son las únicas con techo de $50M+ USD porque monetizan el activo defendible (dato cross-bank + demanda con intención) que ningún emisor único posee. CPA y suscripción son *starters* de techo bajo.
2. **Principal fuente de ingresos Años 1-3:** **CPA / afiliación** (lead-gen a entidades), con suscripción premium de nicho como complemento. Es lo único monetizable antes de tener masa crítica de demanda y datos.
3. **Principal fuente Años 4-7:** **Marketplace (CLO) + B2B/Licencia + APIs.** El valor migra del referido puntual a la plataforma de demanda y la infraestructura.
4. **Mayor motor de valor en una adquisición:** el **dataset propietario de gasto cross-bank + el motor de recomendación + la base de usuarios con intención de compra**. Un emisor (Nu, Bancolombia, Davivienda/Rappi) o un player global compra justo lo que estructuralmente no puede construir: la visión neutral de TODO el portafolio del usuario. Secundariamente, el equipo y la posición regulatoria en Open Finance.

## 5. Las tres preguntas de valoración

**¿Empresa de USD 10M?** → **Sí, alta probabilidad.** Incluso el caso Base llega a $26–52M de valoración en Año 7; un punto medio entre B y la realidad ya cruza $10M. **Qué tiene que ocurrir:** ~100–300k usuarios comprometidos del ICP, CPA funcionando con 3–5 entidades, y premium de nicho. Es el piso esperable si el MVP valida hábito y premio (Parte IV/V). Bar relativamente bajo.

**¿Empresa de USD 100M?** → **Posible, probabilidad media, condicionada.** Requiere las dinámicas del Escenario C: **marketplace CLO activo** (comercios pagando), **B2B/licenciamiento consolidado**, suscripción escalada, ~1–2M usuarios y ~$15–25M USD de ingresos. **Qué tiene que ocurrir:** (a) ejecutar la migración CPA→marketplace; (b) el dato cross-bank alcanzar densidad que lo haga vendible a comercios; (c) probablemente **iniciar expansión regional** (Colombia sola roza el límite, Parte I). Es el objetivo realista de un caso venture exitoso.

**¿Empresa de USD 1.000M?** → **Improbable solo en Colombia; posible como play regional/plataforma.** El mercado colombiano (14.2M tarjetas, en contracción) **no soporta un unicornio de optimización de tarjetas por sí solo**. **Qué tiene que ocurrir:** (a) Escenario C ejecutado casi sin fallas; (b) **replicar el modelo en ≥2–3 mercados LatAm** (México, Brasil, Perú/Chile) apalancando la ola de Open Finance regional; (c) **expandir el alcance** de "optimización de tarjetas" a **capa de decisión financiera / PFM** más amplia (no solo tarjetas); (d) convertirse en **infraestructura** (el motor de recomendación como estándar que terceros licencian). Requiere $50M+ de capital, timing de Open Finance y ejecución de élite. Baja probabilidad, pero es el único camino y es coherente.

## 6. Veredicto financiero del IC

- **El caso conservador es la advertencia:** si la monetización se queda en CPA y la retención es baja, los unit economics no cierran (LTV/CAC 0.22) — **esto es lo que hay que evitar a toda costa**, y es el destino por defecto si no se construye el marketplace.
- **El caso base es la trampa cómoda:** un negocio decente de $25–50M que nunca alcanza escala venture. Aceptable para un fundador, decepcionante para un fondo.
- **El caso ambicioso es el único venture-grade**, y depende de **una sola palanca: ejecutar la migración de CPA hacia marketplace de dos lados + B2B**, sobre la base de datos cross-bank que el moat (Parte III) protege.
- **Eficiencia de capital:** notablemente, el camino a rentabilidad en C cuesta solo ~$3.7M USD de quema máxima — esta es una **empresa capital-eficiente** si el modelo de marketplace funciona, lo que la hace atractiva para VC (alto múltiplo sobre capital invertido).

**Conclusión:** invertible con tesis clara — *no se invierte en un comparador de tarjetas, se invierte en la futura capa neutral de decisión y demanda financiera de LatAm, usando tarjetas como cuña*. La pregunta de fondo (Parte IV) sigue siendo el gate: que el premio por usuario sea real. Si lo es, C es alcanzable; si no, ni A se sostiene.

### Nota metodológica
Cifras = modelo propio con supuestos explícitos (trayectorias de usuarios, activación 25/40/55%, conversión premium 1/4/10%, ARPU por línea, CAC $15–35k COP, margen 60/72/82%, vida media 12/24/40 meses, costo de operación de datos como línea propia). **No son proyecciones empíricas** — son la estructura económica para presionar la tesis. Todos los parámetros deben recalibrarse con los datos reales del MVP (Parte V §6).

---

# PARTE VIII — Manual de Operaciones del MVP Concierge (90 días, cero software)

> Cómo operar el negocio de forma **confiable y repetible** con humanos + hojas, sin app. El objetivo no es eficiencia — es **aprender con máxima fidelidad** y **no quemar la confianza** (un solo mal consejo en dinero destruye la credibilidad que es el moat de la Parte III).

## 0. Principio operativo y stack no-code

**El "motor" es un humano siguiendo un SOP + una hoja estructurada.** Todo proceso debe ser un guion repetible para que cualquier operador produzca la misma salida.

| Función | Herramienta no-code | Costo |
|---|---|---|
| Canal | WhatsApp Business (etiquetas, respuestas rápidas, catálogo) | $0 |
| Onboarding | Google Forms / Typeform | $0 |
| "Motor" + DB de promos + registros | **Airtable** (relacional, vistas, automations) | ~$0–100k/mes |
| SOPs + QA log + reclamos | Notion | $0 |
| Dashboard de métricas | Looker Studio (sobre Airtable/Sheets) | $0 |

**Roles (para ~100 usuarios, 1.5–2 personas):** **Curador de Datos** (mantiene y valida promos/tarifas), **Operador Concierge** (responde consultas, reportes), **QA/Fundador** (muestreo de calidad, reclamos, decisiones). En 100 usuarios una persona puede cubrir Operador+QA y otra (o part-time) el Curador.

## 1. Flujo completo del usuario (end-to-end)

```
 1. DESCUBRE (comunidad/influencer) → 2. ONBOARDING (formulario: tarjetas, gasto x cat,
    perfil_pago, preferencia)  →  3. CONFIRMACIÓN (operador valida wallet en <24h, da bienvenida)
        ↓
 4. CONSULTA "voy a comprar $X en [comercio]"  →  5. RESPUESTA <5 min:
    "Usa [tarjeta] · ganas ~$Y · nivel: [Confirmado/Probable/Acción]"
        ↓
 6. EMPUJE PROACTIVO semanal (reporte de ahorro + promos que vencen)
        ↓
 7. CONFIRMACIÓN DE AHORRO (¿seguiste la recomendación? ¿se aplicó el beneficio?)
        ↓
 8. CIERRE MENSUAL ("capturaste ~$N este mes") + test de precio + pedido de referido
```

## 2. Flujo operativo interno

```
 ENTRA consulta → Operador abre ficha del usuario (wallet) en Airtable
   → filtra promos VIGENTES y VALIDADAS para (comercio/MCC, fecha, sus tarjetas)
   → aplica reglas del motor (Parte II: r efectiva + stacking + perfil_pago)
   → asigna NIVEL DE CONFIANZA → responde con plantilla
   → REGISTRA en log de recomendaciones (contexto, tarjeta, ahorro est., nivel)
 PARALELO diario: Curador ingiere/valida promos; QA muestrea 10% de respuestas del día.
```

## 3. Mantener las promociones actualizadas (data ops)

- **Fuentes:** sitios oficiales de bancos (tarifarios), páginas de "beneficios/promociones" de cada emisor, apps de los bancos, newsletters, redes de los bancos, y **reportes de los propios usuarios** (crowdsourcing — gancho de comunidad).
- **Cadencia:** revisión **semanal** de las ~20 tarjetas × ~20 comercios del alcance; revisión **diaria** de promos con vencimiento en <7 días y de comercios de alta frecuencia (supermercados, EDS, restaurantes).
- **Estado de cada promo en Airtable:** `borrador → validada → vigente → por_vencer → expirada`. Solo `validada/vigente` entra a recomendaciones.
- **SLA de frescura:** ninguna promo recomendada con `last_verified` > 7 días. Campo obligatorio `fuente_url` + `fecha_verificacion` + `verificado_por`.

## 4. Validar una promoción antes de recomendarla (regla de oro)

**Regla de doble fuente / doble ojo:**
1. **Fuente primaria oficial** (sitio/app del banco) — captura de pantalla guardada con fecha.
2. **Segunda confirmación**: términos y condiciones leídos (tope, vigencia, canal, inscripción, exclusiones) **o** segunda fuente.
3. **Cuatro ojos para beneficios "Confirmado":** una promo no se marca como `Confirmado` sin que una segunda persona (o el QA) la valide. Si solo hay una fuente o hay ambigüedad → máximo nivel `Probable`.
4. **Nunca recomendar lo no validado:** si una promo no pasó validación, **no existe** para el motor ese día.

## 5. Manejo de la incertidumbre

- **Promos segmentadas** ("clientes seleccionados"): nunca prometer. Se comunican como `Probable — verifica en tu app`.
- **Datos en conflicto / vencimiento dudoso:** degradar a `Acción requerida` o excluir.
- **Caso desconocido** (comercio/tarjeta fuera del alcance 20×20): responder con honestidad — *"aún no tengo ese comercio validado; te confirmo en X horas"* → y se agrega al backlog del Curador. **Decir "no sé" preserva confianza; inventar la destruye.**

## 6. Comunicar niveles de confianza (estándar de mensajería)

| Nivel | Significado | Plantilla |
|---|---|---|
| 🟢 **Confirmado** | Validado doble fuente, aplica seguro a tu tarjeta | *"Usa tu [tarjeta]: 🟢 ganas ~$Y seguro (promo verificada hasta [fecha])."* |
| 🟡 **Probable** | Beneficio existe pero depende de elegibilidad/segmento | *"Probablemente tu [tarjeta] te da ~$Y 🟡 — confírmalo en tu app antes de pagar."* |
| 🔵 **Acción requerida** | Requiere inscripción/diferir/condición | *"Puedes ganar ~$Y 🔵 pero debes [inscribirte/diferir a N cuotas] primero."* |

Todo mensaje de ahorro lleva nivel. **Prohibido** comunicar un ahorro sin nivel de confianza.

## 7. Medir el ahorro real (loop cerrado)

- **Confirmación post-compra:** 24–48h después, mensaje: *"¿Usaste la [tarjeta] que sugerí? ¿Se aplicó el beneficio?"* → registrar `was_followed` y `realized_saving`.
- **Verificación periódica:** mensual, pedir captura del estado de cuenta / acumulación (voluntario) para validar ahorro real vs estimado → **calibra la tabla VE y el factor de captura** (Parte IV).
- **Savings ledger por usuario:** acumulado mensual → alimenta el cierre mensual y la métrica de PMF "ahorro real/mes".
- **Métrica de calidad del estimado:** error medio |estimado − real| / real; meta <20%.

## 8. Evitar recomendaciones erróneas (guardarraíles)

**Checklist obligatorio antes de enviar cualquier recomendación (en la plantilla):**
1. ¿La tarjeta está en el wallet del usuario? (no recomendar lo que no tiene)
2. ¿La promo está `validada` y `last_verified` ≤ 7 días?
3. ¿El usuario es elegible (segmento, canal, ciudad, compra_min)?
4. ¿Perfil_pago = rotativo? → **no** recomendar diferir a cuotas por una promo; priorizar costo.
5. ¿Hay tope que limite el beneficio? ¿Lo apliqué?
6. ¿Asigné el nivel de confianza correcto?

**Guardarraíl rojo:** ante cualquier duda no resuelta → degradar a `Probable` o decir "te confirmo". **Falso positivo (prometer y fallar) es infinitamente peor que un falso negativo (ser conservador).**

## 9. Gestión de reclamos (SOP de confianza)

1. **Responder en <2h, disculpa + propiedad** ("revisamos esto ya").
2. **Investigar:** ¿fue dato desactualizado, error de elegibilidad, o expectativa mal comunicada? Registrar causa raíz.
3. **Compensar la confianza, no necesariamente el dinero:** transparencia total, corregir el dato, avisar si afectó a otros usuarios.
4. **Post-mortem:** todo reclamo por recomendación errónea entra al `error_log` → revisión semanal de causas raíz → ajuste de SOP/datos.
5. **Métrica:** tasa de reclamos por recomendación; meta <1%.

## 10. Construir confianza desde el día 1

- **Neutralidad explícita:** *"Te recomiendo lo mejor para ti aunque no ganemos nada"* — y demostrarlo recomendando tarjetas/uso que no generan ingreso.
- **Mostrar el "por qué" en pesos** (Parte II): cada consejo viene con el cálculo, no una caja negra.
- **Sub-prometer y sobre-cumplir:** estimados conservadores; que el ahorro real supere lo prometido.
- **Honestidad sobre límites:** decir cuándo no se sabe.
- **Cierre con evidencia:** el reporte mensual de ahorro real es la prueba que genera retención y referidos.

## SOPs (Standard Operating Procedures)

| SOP | Proceso | SLA |
|---|---|---|
| **SOP-01** | Onboarding y validación de wallet | <24h |
| **SOP-02** | Responder consulta "qué tarjeta usar" (con checklist §8) | <5 min en horario |
| **SOP-03** | Ingesta de promociones a Airtable | Semanal + diario para urgentes |
| **SOP-04** | Validación doble fuente / cuatro ojos | Antes de marcar `vigente` |
| **SOP-05** | Reporte proactivo semanal | Cada lunes |
| **SOP-06** | Confirmación y registro de ahorro real | 24–48h post-consulta |
| **SOP-07** | Gestión de reclamo + post-mortem | Respuesta <2h |
| **SOP-08** | QA diario por muestreo (10%) | Diario |
| **SOP-09** | Cierre mensual + test de precio + referido | Fin de mes |

## Métricas diarias y semanales

**Diarias:** # consultas recibidas · tiempo medio de respuesta · # promos validadas/actualizadas · # promos por vencer sin verificar (debe ser 0) · errores detectados en QA.

**Semanales:** consultas **no provocadas** / usuario activo (≥2 = hábito) · tasa de seguimiento de recomendación (≥50%) · ahorro real confirmado/usuario · retención semanal de cohortes · tasa de reclamos (<1%) · precisión de recomendación (≥95%) · error del estimado de ahorro (<20%) · cobertura de datos (% consultas resueltas con dato validado).

## Alertas (disparadores de acción inmediata)

- 🔴 Promo recomendada con `last_verified` > 7 días → bloquear.
- 🔴 Reclamo por recomendación errónea → escalar a QA en <2h.
- 🔴 Tiempo de respuesta > 30 min en horario → falta capacidad.
- 🟠 Precisión semanal < 95% → congelar y auditar datos.
- 🟠 >3 consultas/semana de comercio fuera de alcance → ampliar el 20×20.
- 🟠 Caída de consultas no provocadas → riesgo de pérdida de hábito (señal de pivote, Parte V §8).

## Control de calidad y precisión mínima aceptable

- **QA diario:** muestrear **10%** de las recomendaciones del día; verificar contra fuente y checklist.
- **Precisión mínima aceptable: ≥95%** de recomendaciones correctas (la tarjeta sugerida es efectivamente la mejor opción elegible con el dato validado).
- **Exactitud de `Confirmado`: 100%** — cero tolerancia a un beneficio `Confirmado` que no se materialice. Si ocurre, se degrada todo el flujo de esa promo y se audita.
- **Frescura de datos: 100%** de promos recomendadas con verificación ≤7 días.
- **Error de estimación de ahorro: <20%** medio.

## El runbook: "100 usuarios mañana, cero software"

**Capacidad:** 100 activos × ~2 consultas/semana ≈ **200 consultas/semana (~30/día)**. A 4 min/consulta = **~2h/día de Operador**. Curación de 20×20 = **~2–3h/día de Curador**. → **1.5–2 personas** sostienen 100 usuarios de forma confiable.

**Día tipo:**
- **8:00** Curador revisa promos que vencen hoy/esta semana → actualiza Airtable (SOP-03/04).
- **9:00–18:00** Operador responde consultas <5 min con checklist (SOP-02); registra cada una en el log.
- **13:00** QA muestrea 10% de la mañana (SOP-08).
- **17:30** Revisión de métricas diarias + alertas; resolver pendientes "te confirmo".
- **Lunes** envío de reportes proactivos (SOP-05). **Fin de mes** cierre + test de precio (SOP-09).

**Por qué es confiable y repetible:** (1) toda salida sigue un SOP con checklist → cualquier operador produce lo mismo; (2) regla de doble fuente + cuatro ojos → no entran datos malos; (3) niveles de confianza → nunca se sobre-promete; (4) QA por muestreo + alertas → los errores se detectan el mismo día; (5) todo queda **registrado** (recomendaciones, ahorro, reclamos) → es el dataset que valida la Parte IV y siembra el ML de la Parte VI. **Operación 100% manual hoy, pero generando exactamente los datos que justificarán automatizarla mañana.**

## Verificación / criterio de éxito operativo (fin de 90 días)
Operación lista para escalar/automatizar si: precisión ≥95% sostenida · reclamos <1% · frescura de datos 100% · tiempo de respuesta <5 min · y los datos recogidos permiten recalibrar VE/captura (Parte IV) y poblar las tablas de la Parte VI. Si la operación manual no puede sostener calidad ni con 100 usuarios, **es señal de que el dato es inviable de mantener** (riesgo identificado en Parte I §3.3) → revisar antes de invertir en software.

---

# PARTE IX — Entregables Ejecutivos (consolidación I–VIII)

---

## ENTREGABLE 1 — ONE-PAGER

> *(Nombre tentativo: **Tarjetia / Cardwise** — definir marca aparte)*

**PROBLEMA.** Los colombianos con varias tarjetas dejan dinero sobre la mesa todos los días: no saben qué tarjeta usar en cada compra, se pierden promociones que cambian cada semana y dejan vencer millas y puntos. La información es opaca y dispersa, y los comparadores existentes solo responden "¿cuál solicitar?" — una decisión que se toma una vez cada 1-3 años.

**SOLUCIÓN.** Un asistente neutral que, conociendo TODAS las tarjetas del usuario, le dice **qué tarjeta usar en cada compra para maximizar su beneficio** y cuánto ahorra — además de qué solicitar, conservar o cancelar. Hoy: concierge por WhatsApp (humano + datos curados). Mañana: app + Open Finance + motor de recomendación en tiempo real.

**ICP.** "El Optimizador": 28-45 años, urbano, ingresos $6-20M COP/mes, **gasto ≥$2.5M/mes en tarjeta, ≥2 tarjetas, totalero**, interesado en viajes/millas/cashback. No es el colombiano promedio — es el ~40-50% de mayor gasto que captura $400k-1.5M/año optimizando.

**TAMAÑO DE MERCADO.** ~14.2M tarjetas de crédito en Colombia; segmento optimizador direccionable de varios millones de personas. Colombia es la cabeza de playa; la tesis de escala es **regional LatAm** sobre la ola de Open Finance (obligatorio por Decreto 0368/2026).

**PROPUESTA DE VALOR.** *"Recupera ~$40.000 al mes (+$450.000/año) en beneficios que hoy dejas sobre la mesa."* Viajeros y usuarios premium: $700k-1.5M/año.

**VENTAJA COMPETITIVA.** **Neutralidad estructural**: un emisor (Nu, Bancolombia, RappiCard) nunca puede recomendar la tarjeta de un competidor — nosotros sí. Más: grafo de promociones fresco propietario + dato de gasto **cross-bank** que ningún banco posee + loop de datos que se compone + confianza de marca.

**MODELO DE NEGOCIO.** Fase 1: CPA/afiliación + premium de nicho. Fase 2-3: **marketplace de ofertas (Card-Linked Offers)** + B2B/licenciamiento del motor + inteligencia de mercado anonimizada. El valor migra de CPA hacia marketplace + B2B.

**ESTADO ACTUAL.** Tesis validada en papel (mercado, motor, moat, economía, GTM, datos, finanzas, operación). En arranque: MVP concierge por WhatsApp para validar empíricamente el premio económico y el hábito con los primeros 100 usuarios del ICP, sin software.

**PRÓXIMOS PASOS.** 90 días / $10M COP: montar el motor manual (20 tarjetas × 20 comercios), reclutar 100 optimizadores en comunidades de millas, medir hábito + ahorro real + disposición a pagar. **Go/No-Go a software** si: ≥2 consultas no provocadas/sem · retención sem-4 ≥40% · premio mediano ≥$400k/año · evidencia de monetización.

---

## ENTREGABLE 2 — INVESTOR MEMO

### Tesis de inversión
No se invierte en un comparador de tarjetas. Se invierte en **la futura capa neutral de decisión y demanda financiera de LatAm, usando las tarjetas de crédito como cuña de entrada**. El producto entra resolviendo un dolor recurrente y medible (qué tarjeta usar), construye un dato que ningún incumbente puede replicar (gasto cross-bank), y evoluciona hacia un marketplace de dos lados y una capa de infraestructura. Es capital-eficiente: el camino a rentabilidad en el caso ambicioso cuesta ~$3.7M USD de quema máxima para llegar a ~$80M USD de ingresos en Año 7.

### Hallazgos clave (Partes I-VIII)
- **(I) Mercado real pero con banderas:** 14.2M tarjetas, en contracción; comparador "cuál solicitar" ya ocupado por Rankia; el pivote a "cuál usar" es el movimiento correcto (recurrente vs uso único).
- **(II) El motor es defendible y matemáticamente sólido:** todo se normaliza a pesos efectivos vía la tabla VE (Puntos Colombia $7, LifeMiles ~$15); bifurcación totalero/rotativo; score de dos capas (VEO objetivo + utilidad personalizada); reglas deterministas antes de ML.
- **(III) El moat es construible, no inherente:** neutralidad estructural bloquea a Nu/Bancolombia/RappiCard (mono-emisores); la amenaza real es un agregador horizontal (Rappi); defensa = profundidad + loop de datos + marketplace + velocidad.
- **(IV) El premio es real pero segmentado:** ahorro mediano ~$350-478k/año total; **pero concentrado en el gasto medio-alto** — el masivo casi no captura valor recurrente. Define el ICP.
- **(V) GTM claro:** primer canal = comunidades de millas (CAC ~$0, ICP puro); concierge WhatsApp 30 días; PMF = hábito + ahorro real + WTP.
- **(VI) Arquitectura "MVP hoy, escalable mañana":** un PostgreSQL, schemas por dominio, versionamiento bitemporal, particionado, feature store — sin reconstrucción a 3 años.
- **(VII) Economía:** caso conservador roto (LTV/CAC 0.22), base mediocre (1.88), **ambicioso venture-grade (6.95)**; la diferencia es la migración CPA→marketplace+B2B.
- **(VIII) La operación valida el moat:** si no se puede mantener el dato con calidad ni a 100 usuarios manuales, el negocio no existe — y eso se prueba por $0.

### Mercado
14.2M tarjetas (contrayéndose), pero el segmento optimizador (≥2 tarjetas, gasto alto, totalero) es donde está el valor. Colombia sola no soporta un unicornio; la tesis de escala requiere replicación regional (México, Brasil, Perú/Chile) sobre Open Finance.

### Moat
`(neutralidad estructural) × (dato cross-bank que se compone) × (marketplace que invierte la dependencia del CPA) × (confianza/categoría) × (velocidad)`. Lo copiable es la idea; lo no copiable es la operación de datos + la confianza + la posición neutral.

### Unit Economics (Año 7 por escenario)
| | A | B | C |
|---|---|---|---|
| LTV/CAC | 0.22 ❌ | 1.88 ⚠️ | **6.95 ✅** |
| Margen bruto | 60% | 72% | 82% |
| ARPU/año | $1.4 | $8.2 | $22.5 |
| Ingresos | $0.2M | $6.5M | $80.3M USD |

### Estrategia de crecimiento
Comunidades (0→100) → micro-influencers + referidos (100→1.000) → canal pagado validado + influencer grande (1.000→10.000) → expansión de alcance (más tarjetas/comercios/ciudades) → Open Finance (Fase 2) → marketplace + B2B (Fase 3) → regional.

### Escenarios financieros
Conservador (valoración ~$1M, inviable) · Base ($26-52M, buen negocio) · Ambicioso ($321-643M, venture). Capital a PMF: $0.3-1.1M USD. Capital a 1M usuarios: ~$1-9M según escenario.

### Condiciones necesarias para alcanzar el Escenario C
1. El premio por usuario real se confirma ≥$400k/año en el segmento optimizador (gate #1).
2. Se ejecuta la **migración CPA → marketplace de dos lados** (comercios pagando por ofertas dirigidas).
3. El dato cross-bank alcanza densidad vendible (masa crítica de usuarios con wallet completo).
4. Open Finance se conecta a tiempo (2027+) y se captura la ventana de "asistente neutral".
5. Se inicia expansión regional antes de saturar Colombia.
6. La operación de datos se mantiene con calidad a escala (≥95% precisión).

### ¿Por qué vale la pena invertir?
Porque hay un dolor recurrente y cuantificable, una ventaja estructural que los gigantes no pueden copiar (neutralidad cross-bank), un viento de cola regulatorio (Open Finance obligatorio), un camino capital-eficiente a $80M de ingresos, y un activo de datos que se vuelve más valioso y más adquirible con el tiempo. **El riesgo está acotado y es barato de probar** ($10M COP / 90 días validan o matan la tesis antes de cualquier inversión seria en tecnología). Es una apuesta donde el costo de averiguar si funciona es mínimo y el techo, regional, es grande.

---

## ENTREGABLE 3 — FOUNDER ROADMAP (12 meses)

### Próximos 30 días — "Montar el motor manual y los primeros usuarios"
- **Objetivos:** motor manual operativo; primeros 15-30 usuarios del ICP en concierge.
- **Entregables:** hoja 20 tarjetas × 20 comercios + tabla VE; WhatsApp Business + formulario + Airtable; SOPs base (Parte VIII).
- **Métricas:** # usuarios onboarded · # promos validadas · tiempo de respuesta.
- **Riesgos:** dato difícil de curar/validar; reclutamiento lento.
- **Go/No-Go:** ¿se puede mantener el dato con calidad y conseguir usuarios del ICP? Si no → revisar viabilidad del dato (Parte I §3.3).

### Próximos 90 días — "Validar premio, hábito y disposición a pagar"
- **Objetivos:** 100 usuarios activos; medir empíricamente premio real, hábito y WTP.
- **Entregables:** premio real por perfil (recalibra Parte IV); cohortes de retención; test de precio; ≥1 conversación de CPA con una entidad.
- **Métricas:** consultas no provocadas ≥2/sem · retención sem-4 ≥40% · ahorro confirmado ≥$30-40k/mes · precisión ≥95% · reclamos <1%.
- **Riesgos:** premio menor al modelado; novedad sin hábito; ni WTP ni CPA.
- **Go/No-Go (el grande):** premio mediano ≥$400k/año **Y** hábito **Y** (WTP ≥25% en cuartil alto **o** CPA real) → invertir en software. Si no → pivotar (Parte V §8).

### Próximos 6 meses — "Producto mínimo + primeros ingresos"
- **Objetivos:** pasar de concierge a producto semi-automatizado (DDL Parte VI: `catalog`/`promo`/`usr`/`recommendations`); 500-1.000 usuarios; primer ingreso (CPA o premium).
- **Entregables:** app/web mínima con el motor de reglas; pipeline de datos semi-automatizado con validación humana; loop de referidos.
- **Métricas:** retención M3 · ARPU incipiente · CAC por canal · LTV/CAC.
- **Riesgos:** CPA no se materializa; costo de datos erosiona margen; un incumbente se mueve.
- **Go/No-Go:** ¿unit economics apuntan a LTV/CAC >2 y hay un motor de ingresos real? → levantar seed.

### Próximos 12 meses — "Escala y tesis de marketplace"
- **Objetivos:** 5.000-10.000 usuarios; seed cerrada; primeras pruebas de Card-Linked Offers con 2-3 comercios; preparación Open Finance.
- **Entregables:** ronda seed; piloto de marketplace; cobertura ampliada de tarjetas/comercios; equipo de datos.
- **Métricas:** crecimiento MoM · retención M6 · primer ingreso de marketplace · densidad de dato cross-bank.
- **Riesgos:** dependencia de CPA (trampa caso B); ejecución de marketplace; entrada de Rappi.
- **Go/No-Go:** ¿hay señal de que el marketplace puede funcionar (comercios interesados, dato denso)? → es la bifurcación entre caso B y caso C (Parte VII).

### Las 5 hipótesis NO validadas (ordenadas por riesgo)
1. **🔴🔴🔴 El premio económico real es suficiente** (≥$400k/año en el optimizador). *Si es falso, todo el negocio cae.* — valida: concierge, semanas 1-7.
2. **🔴🔴 Existe hábito recurrente** (la gente consulta antes de comprar, sin que se lo pidan). *Sin hábito es curiosidad, no negocio.* — valida: retención de cohortes, semanas 4-12.
3. **🔴🔴 Hay un motor de ingresos** (los bancos pagan CPA **o** el cuartil alto paga suscripción). *Sin esto no hay empresa, solo un proyecto.* — valida: conversación CPA + test de precio, semanas 7-12.
4. **🔴 El dato de promociones se puede mantener fresco y correcto a escala** (la operación que es el moat). *Si no, el producto se degrada solo.* — valida: operación manual a 100 usuarios, 90 días.
5. **🟠 La migración a marketplace/B2B es ejecutable** (comercios pagarán por demanda dirigida; el dato cross-bank es vendible). *Define caso B vs C — el techo del negocio.* — valida: pilotos, mes 9-12.

### Si fueras el fundador con solo 10 horas/semana × 3 meses — qué hacer y en qué orden
**Principio: con 10h/semana, gastar cada hora en validar la hipótesis #1 y #2 (premio + hábito), no en construir.** Orden:

- **Semanas 1-2 (curación + setup):** 6h/sem construyendo la hoja 20×20 + tabla VE (el activo reutilizable); 4h/sem montando WhatsApp + formulario + Airtable y entrando a comunidades de millas aportando valor.
- **Semanas 3-4 (primeros usuarios):** 5h/sem reclutando y operando concierge para 15-30 usuarios; 5h/sem manteniendo y ampliando el dato. *Empieza a registrar TODO (consultas, ahorro, follow).*
- **Semanas 5-7 (medir premio real):** 6h/sem operando hacia 50-80 usuarios; 4h/sem analizando el ahorro real confirmado vs modelo (recalibrar Parte IV). **Hito: ¿el premio es ≥$400k/año?**
- **Semanas 8-9 (hábito + dinero):** 5h/sem operando + midiendo consultas no provocadas y retención; 5h/sem haciendo el test de precio y **contactando 2-3 entidades para CPA**.
- **Semanas 10-12 (decisión):** 4h/sem consolidando datos de las 3 hipótesis críticas; 3h/sem entrevistas cualitativas; 3h/sem preparando el veredicto Go/No-Go y, si es Go, el material de seed.

**Qué NO hacer con esas 10h:** no escribir código, no diseñar la app, no perfeccionar el branding, no ampliar a 100 tarjetas. **Foco absoluto: probar que el premio es real y que la gente vuelve.** Si esas dos se cumplen, todo lo demás (las Partes VI, VII, IX) ya está diseñado y listo para ejecutar.

---

> **Cierre del plan.** Las Partes I-IX forman un blueprint completo y autoconsistente: la estrategia, el motor, el moat, la economía, el GTM, los datos, las finanzas, la operación y los entregables ejecutivos. **Todo converge en un único gate barato:** validar, con 100 usuarios y $10M COP en 90 días, que el premio económico es real y que genera hábito. Si lo es, esta empresa tiene un camino creíble (y capital-eficiente) hacia $100M+ regional. Si no, se sabrá antes de gastar en tecnología — que es exactamente como debe morir o nacer una startup.

---

# PLAN DE EJECUCIÓN — archivos a generar en la carpeta ELISEO

Decisiones del usuario: PRD **v2 integrado** (estrategia+producto) · ICP **Optimizador (crédito)**, débito secundario · **motor completo Parte II** · monetización **por fases (CPA→marketplace→B2B)** · formato **.md + .docx** · **coexiste como v2** (conservar v1) · audiencia **equipo + inversionistas**.

**Acciones (al salir de modo plan):**
1. **Guardar el blueprint** (Partes I-IX) en la carpeta ELISEO:
   - `/Users/isabelcorredor/Documents/Antigravity/ELISEO/Blueprint_Estrategico_Eliseo_ES.md`
   - `/Users/isabelcorredor/Documents/Antigravity/ELISEO/Blueprint_Estrategico_Eliseo_ES.docx`
2. **Crear el PRD v2 integrado** (fusiona el PRD v1 existente con el rigor del blueprint):
   - `/Users/isabelcorredor/Documents/Antigravity/ELISEO/PRD_Eliseo_ES_v2.md`
   - `/Users/isabelcorredor/Documents/Antigravity/ELISEO/PRD_Eliseo_ES_v2.docx`
3. **Conservar intacto** `PRD_Eliseo_ES.docx` (v1, histórico).
4. Conversión `.md → .docx` vía pandoc (verificar disponibilidad; fallback: otra herramienta de conversión).

**Estructura del PRD v2 integrado (índice):**
1. Resumen ejecutivo + tesis de inversión (de Parte IX) + KPIs/North Star (hábito + ahorro real).
2. Problema y oportunidad de mercado (Parte I) + tamaño/segmentación económica (Parte IV).
3. ICP "El Optimizador" (Parte V) — estrecho a crédito, débito secundario.
4. Propuesta de valor y posicionamiento (neutralidad cross-bank).
5. Ventaja competitiva y moat (Parte III) — análisis Nu/Bancolombia/RappiCard/Rappi.
6. Alcance del producto (MoSCoW) — heredado de v1, recortado al ICP Optimizador.
7. Personas y JTBD (de v1: Andrés + PERSONAS).
8. Requisitos funcionales / user stories (de v1, mejorados) + el **motor de recomendación v2** (Parte II: normalización VE, totalero/rotativo, dos capas, promociones con vigencia, niveles de confianza Confirmado/Probable/Acción) — resuelve la Pregunta Abierta 9.1.
9. Flujos lógicos (de v1) + flujo de confianza/incertidumbre (Parte VIII).
10. Requisitos de datos (Parte VI: esquema versionado, tabla VE, promociones temporales) + reconciliación del bug de nombres front↔BD de v1.
11. Estrategia de datos / ingesta (Parte VIII SOP) — resuelve la Pregunta Abierta 9.2.
12. Monetización por fases + unit economics (Parte VII).
13. NFRs y stack (de v1) + evolución hacia Open Finance/marketplace.
14. Diseño y UX (sistema visual completo de v1, conservado).
15. Roadmap y gates Go/No-Go (Parte IX) + las 5 hipótesis sin validar.
16. Changelog v1 → v2 (qué cambia y por qué).
