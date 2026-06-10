/** Formato de moneda colombiana del diseño v2: $85.000 */
export const COP = (n: number): string => '$' + Math.round(n).toLocaleString('es-CO')

/** Versión compacta en miles: $85k */
export const COPk = (n: number): string => '$' + Math.round(n / 1000).toLocaleString('es-CO') + 'k'
