---
title: "Experimento de Validación — Supuesto A1"
product: Eliseo
assumption_id: A1
assumption: "Los usuarios quieren conocer y usar beneficios de sus tarjetas de crédito (no solo falta de info sino interés real)"
risk_level: High
status: draft
created: 2026-04-11
owner: TBD
---

# Experimento de Validación A1 — Eliseo

## 1. Tarjeta de Hipótesis

### Hipótesis falsificable
Si le presentamos a colombianos bancarizados (25-45 años, estratos 3-6, con 2+ tarjetas) un listado personalizado de 10 beneficios reales de sus tarjetas de crédito con instrucciones claras de uso, entonces al menos el 20% de esos beneficios serán intentados (clic en instrucciones + acción verificable) en un periodo de 7 días.

### Hipótesis nula (H0)
Los usuarios no intentarán usar más del 10% de los beneficios mostrados en 7 días. Es decir, la falta de uso no se debe a falta de información sino a falta de interés real.

### Métricas

| Métrica | Definición | Meta |
|---------|-----------|------|
| **Primaria: Tasa de intento de uso** | (Beneficios donde el usuario reportó intento) / Total de beneficios mostrados por usuario, promediado | > 20% |
| **Secundaria: Tasa de apertura** | % de usuarios que abren el mensaje con sus beneficios | > 60% |
| **Secundaria: Tasa de conversación** | % de usuarios que responden al menos 1 mensaje en el flujo | > 40% |
| **Cualitativa: Razón de no-uso** | Categorización de por qué no intentaron usar un beneficio | Para diagnóstico |

### Criterios de muerte (Kill criteria)
- Tasa de intento de uso < 10% con n >= 60 usuarios → El supuesto es falso. Pivotar.
- Tasa de apertura < 30% → El canal o el gancho no funciona, rediseñar antes de concluir sobre el supuesto.
- Más del 50% de respuestas cualitativas dicen "no me interesa" o "ya lo sabía y no me importa" → Señal fuerte de que no hay interés real.

### Tamaño de muestra
- **Mínimo**: 60 usuarios (20 por perfil de persona)
- **Ideal**: 90 usuarios (30 por perfil)
- Justificación: Con n=60, una tasa observada de 20% tiene un intervalo de confianza del 95% de aprox. ±10pp.

### Timeline
- **Semana 1**: Reclutamiento y preparación de contenido (5 días hábiles)
- **Semana 2**: Ejecución del experimento — envío de beneficios (7 días corridos)
- **Semana 3**: Seguimiento, encuesta de cierre, análisis (5 días hábiles)
- **Total**: 19 días calendario

---

## 2. Metodología: Concierge MVP vía WhatsApp

No se construye app. Se usa WhatsApp Business + Google Sheets + un operador humano simulando lo que haría Eliseo.

### Fase 0 — Preparación (Días 1-5)

**0.1 Construir la base de beneficios**
- Investigar y documentar los beneficios reales de las 15 tarjetas de crédito más comunes en Colombia (Bancolombia, Davivienda, BBVA, Banco de Bogotá, Nu, Rappi, Falabella, Scotiabank, etc.)
- Para cada beneficio: nombre, descripción corta, instrucciones de uso paso a paso, restricciones, fecha de vencimiento
- Fuentes: páginas web de bancos, términos y condiciones, llamadas a líneas de servicio
- Organizar en Google Sheet: banco, tarjeta, categoría_beneficio, descripción, cómo_usar, restricciones

**0.2 Crear flujo de WhatsApp**
- Cuenta de WhatsApp Business dedicada a "Eliseo"
- Foto de perfil profesional, descripción: "Te ayudo a sacarle jugo a tus tarjetas de crédito"
- Preparar plantillas de mensajes

**0.3 Reclutar participantes**
- **Canal 1**: Pauta en Instagram/Facebook segmentada a Bogotá, Medellín, Cali, Barranquilla. Estratos 3-6, 25-45 años. Copy: "¿Tienes 2 o más tarjetas de crédito? Únete a un experimento gratuito de 7 días." CTA: link a Google Forms.
- **Canal 2**: Grupos de Facebook de finanzas personales Colombia
- **Canal 3**: Referidos directos — pedir a cada reclutado que invite a 1 persona
- **Formulario de ingreso**: Nombre, edad, ciudad, estrato, cuántas tarjetas, cuáles bancos/tarjetas, WhatsApp, qué tan bien conoce sus beneficios (1-5), consentimiento informado
- **Filtro**: Solo personas con 2+ tarjetas que den consentimiento
- **Clasificación**: Según respuestas, clasificar en Power User / Pragmatist / Skeptic

### Fase 1 — Ejecución (Días 6-12)

**1.1 Día 6: Mensaje de bienvenida**
```
Hola [Nombre] 👋 Soy Eliseo.

Durante 7 días te voy a mostrar beneficios reales de tus tarjetas [Banco1] y [Banco2] que probablemente no estás usando.

Cada día recibirás 1-2 beneficios con instrucciones exactas de cómo activarlos.

Si intentas usar alguno, solo respóndeme "Usé el beneficio X" y te cuento cómo le fue a otros.

¿Arrancamos? Responde SÍ para comenzar mañana.
```

**1.2 Días 7-12: Envío diario de beneficios (1-2 por día, ~10 total)**

Formato por beneficio:
```
💳 Beneficio #3 de tu tarjeta [Banco] [Tipo]:

[Nombre del beneficio]
[Descripción en 1 línea]

📋 Cómo usarlo:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

⚠️ Restricción: [si aplica]
📅 Vigente hasta: [fecha]

¿Te interesa intentarlo? Responde:
✅ "Lo voy a intentar"
❌ "No me interesa" (y por qué)
🤔 "Tengo dudas"
```

**Tracking por beneficio**: ¿Abrió? ¿Respondió? ¿Qué respondió? ¿Reportó uso posterior?

**1.3 Día 11: Recordatorio de mitad de semana**
```
[Nombre], van 3 días. De los [X] beneficios que te mostré, ¿has intentado usar alguno?
Cuéntame cómo te fue. Si no has podido, también me sirve saber por qué.
```

**1.4 Día 13: Encuesta de cierre**
```
[Nombre], se acabaron los 7 días. Gracias por participar.

Últimas 3 preguntas:

1. ¿Cuántos beneficios de los que te mostré intentaste usar?
   a) 0  b) 1-2  c) 3-4  d) 5+

2. ¿Por qué no usaste los demás?
   a) No me interesaron  b) No tuve tiempo  c) No entendí cómo
   d) No confío  e) Otro: [cuéntame]

3. ¿Pagarías $9.900/mes por recibir esto automáticamente para todas tus tarjetas?
   a) Sí  b) Tal vez  c) No
```

### Fase 2 — Análisis (Días 14-19)

- Consolidar datos en Google Sheet por usuario
- Calcular métricas primarias y secundarias
- Desglosar por tipo de persona y categoría de beneficio
- Análisis cualitativo: agrupar razones de no-uso, extraer citas

---

## 3. Pre-validación por Persona

### Sebastián Ríos (Power User, pain 9/10)
- **Reacción esperada**: Se inscribe de inmediato. Responde todos los días. Intenta 5-7 de 10 beneficios.
- **Señal**: Si ni Sebastián intenta >20%, el supuesto está muerto.
- **Riesgo**: Outlier, no representativo del mercado masivo.

### Sandra Moreno (Pragmatist, pain 5/10)
- **Reacción esperada**: Se inscribe si el copy es atractivo. Lee mensajes, no responde todos los días. Intenta 1-3 beneficios, especialmente descuentos tangibles.
- **Señal**: Sandra ES el mercado. Su comportamiento es el mejor predictor.
- **Riesgo**: Abandona por pereza de responder.

### Gloria Espinosa (Skeptic, pain 3/10)
- **Reacción esperada**: Probablemente no se inscribe sola. Si llega por referido, lee pero no responde o dice "no me interesa".
- **Señal**: Si Gloria intenta usar beneficios, es señal MUY fuerte.
- **Riesgo**: Bloquea el número. Mitigación: salida fácil.

### Punto ciego
WhatsApp introduce sesgo de "juego" — la gente responde por la interacción humana. Mitigación: la métrica es acción real, no respuesta al mensaje.

---

## 4. Riesgos y Mitigaciones

| # | Riesgo | Prob. | Impacto | Mitigación |
|---|--------|-------|---------|-----------|
| 1 | Reclutamiento insuficiente (<60 personas en 5 días) | Media | Alto | Pauta paga $300K-$500K COP en Meta Ads. Sorteo de $100K Nequi. |
| 2 | Sesgo de selección (solo se inscriben los ya interesados) | Alta | Alto | Copy neutro ("experimento sobre tarjetas"), segmentar por interés previo declarado. |
| 3 | Efecto Hawthorne (se comportan diferente por ser observados) | Media | Medio | Aceptar el sesgo. Si aun así no llegan al 20%, señal clarísima. |
| 4 | Abandono alto (>50% deja de responder después del día 2) | Media | Medio | Mensajes cortos, recordatorio día 4, máx 2 beneficios/día. |
| 5 | Beneficios incorrectos o desactualizados | Media | Alto | Verificar cada beneficio con fuentes oficiales vigentes. |
| 6 | Confusión "interés" vs "acción" | Alta | Medio | Seguimiento explícito: "¿lo hiciste?" Reportar intención Y acción por separado. |
| 7 | Operación manual no escala (90 conversaciones) | Media | Medio | Plantillas + broadcast de WhatsApp Business. Máximo 2 operadores. |

---

## 5. Framework de Decisión

### Escenario A: Tasa de intento > 20% ✅
**Interpretación**: Existe interés real en usar beneficios cuando la info es accesible.

**Acciones**:
1. Documentar qué categorías de beneficios tuvieron mayor intento → priorizar features MVP
2. Documentar diferencias entre personas → definir segmento de lanzamiento
3. Pasar al siguiente supuesto (A2 o A3)
4. Si tasa > 35%: considerar acelerar timeline de MVP

### Escenario B: Tasa de intento < 10% ❌
**Interpretación**: Aun con info perfecta y acompañamiento humano, no hay interés. El supuesto A1 es falso.

**Acciones**:
1. Revisar razones cualitativas:
   - "No tuve tiempo" → pivotar a notificaciones contextuales/geolocalización
   - "No me interesaron" → supuesto falso, pivotar producto completamente
   - "No confío" → problema de confianza, no de interés
2. **Kill criteria**: Si <10% con n>=60 Y razones confirman desinterés → archivar esta hipótesis

### Escenario C: Tasa entre 10% y 20% 🤔
**Interpretación**: Interés moderado, insuficiente para el modelo planteado.

**Acciones**:
1. Segmentar por persona:
   - Power Users >30% pero Pragmatists <15% → mercado nicho
   - Distribución uniforme ~15% → interés tibio
2. Segmentar por tipo de beneficio → pivotar propuesta de valor al más fuerte
3. Repetir con 1 ajuste (framing, canal, o tipo de beneficio). **Máximo 1 repetición.**

---

## Presupuesto Estimado

| Concepto | Costo (COP) |
|----------|-------------|
| Pauta Meta Ads reclutamiento | $300,000 - $500,000 |
| WhatsApp Business API (Twilio) | $150,000 |
| Incentivo sorteo participantes | $100,000 |
| Tiempo del equipo (2 personas, 3 semanas parciales) | Costo de oportunidad |
| **Total directo** | **$550,000 - $750,000** |

---

## Checklist de Ejecución

- [ ] Base de beneficios de 15 tarjetas más comunes lista y verificada
- [ ] Cuenta WhatsApp Business configurada
- [ ] Formulario de reclutamiento en Google Forms
- [ ] Google Sheet de tracking con columnas definidas
- [ ] Pauta de Meta Ads aprobada y publicada
- [ ] Plantillas de mensajes escritas y revisadas
- [ ] Al menos 60 participantes reclutados y clasificados
- [ ] Mensaje de bienvenida enviado a todos
- [ ] 6 días de envío de beneficios completados
- [ ] Recordatorio de mitad de semana enviado
- [ ] Encuesta de cierre enviada
- [ ] Datos consolidados y métricas calculadas
- [ ] Decisión documentada según framework
