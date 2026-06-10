import type { CSSProperties, ReactNode } from 'react'

/* ELISEO v2 — Iconos de línea (24×24, stroke currentColor) */
const ICON_PATHS = {
  home:        <><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-6h5v6"/></>,
  card:        <><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19"/><path d="M6 14.5h4"/></>,
  cards:       <><rect x="3" y="7" width="14" height="11" rx="2"/><path d="M7 7V5.5A1.5 1.5 0 0 1 8.5 4h10A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H17"/><path d="M3 11h14"/></>,
  sparkles:    <><path d="M12 3.5 13.6 8.4 18.5 10 13.6 11.6 12 16.5 10.4 11.6 5.5 10 10.4 8.4Z"/><path d="M18.5 4v3M20 5.5h-3M5.5 16v2.5M6.75 17.25h-2.5"/></>,
  wand:        <><path d="M5 19 19 5"/><path d="M15 5h4v4"/><path d="M8.5 6 9 4M6 8.5 4 9M11 7.5l-.7-.7"/></>,
  tag:         <><path d="M3.5 12.5V5a1.5 1.5 0 0 1 1.5-1.5h7.5L20.5 11a1.5 1.5 0 0 1 0 2.1l-6.4 6.4a1.5 1.5 0 0 1-2.1 0L3.5 12.5Z"/><circle cx="8" cy="8" r="1.3"/></>,
  user:        <><circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-3.6 3.1-5.5 7-5.5s7 1.9 7 5.5"/></>,
  plus:        <><path d="M12 5v14M5 12h14"/></>,
  chevronL:    <><path d="M15 5l-7 7 7 7"/></>,
  chevronR:    <><path d="M9 5l7 7-7 7"/></>,
  chevronD:    <><path d="M5 9l7 7 7-7"/></>,
  check:       <><path d="M5 12.5 10 17.5 19.5 7"/></>,
  checkCircle: <><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9"/></>,
  x:           <><path d="M6 6l12 12M18 6 6 18"/></>,
  arrowR:      <><path d="M4 12h15M13 6l6 6-6 6"/></>,
  arrowUpR:    <><path d="M7 17 17 7M8 7h9v9"/></>,
  shield:      <><path d="M12 3l7 2.5V11c0 5-3.2 8-7 9.5C8.2 19 5 16 5 11V5.5Z"/><path d="M9 12l2 2 4-4"/></>,
  plane:       <><path d="M10.5 13.5 3.5 11l.8-2 6.2.9 4-4.4a2 2 0 0 1 3 2.7l-3.7 4.1 1 6.3-1.8.6-2.7-6.6Z"/></>,
  utensils:    <><path d="M7 3v8M5 3v4.5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M16 3c-1.5 0-2.5 2-2.5 5 0 2 1 3 2.5 3.2V21"/></>,
  cart:        <><circle cx="9" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/><path d="M3 4h2l2 12h11l1.8-8H6"/></>,
  fuel:        <><rect x="4" y="4" width="9" height="16" rx="1.5"/><path d="M4 11h9"/><path d="M13 8l3.5 3v6a1.5 1.5 0 0 1-3 0v-3"/><path d="M16.5 6.5 15 5"/></>,
  tv:          <><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M8 21h8M9 6 12 3.5 15 6"/></>,
  shirt:       <><path d="M8 3 4 6l1.5 3L8 8v11h8V8l2.5 1L20 6l-4-3-2 1.8a2.8 2.8 0 0 1-4 0Z"/></>,
  ticket:      <><path d="M3 8.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 1.8 1.8 0 0 0 0 3.4 1.8 1.8 0 0 0 0 3.6 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 1.8 1.8 0 0 0 0-3.6A1.8 1.8 0 0 0 3 8.5Z"/><path d="M14 7v10" strokeDasharray="1.5 2.2"/></>,
  trophy:      <><path d="M7 4h10v4a5 5 0 0 1-10 0Z"/><path d="M7 5H4.5v1.5A2.5 2.5 0 0 0 7 9M17 5h2.5v1.5A2.5 2.5 0 0 1 17 9"/><path d="M10 13h4M9.5 20h5M12 13v7"/></>,
  coins:       <><ellipse cx="9" cy="7" rx="5.5" ry="2.8"/><path d="M3.5 7v4c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8V7"/><path d="M14.5 11.5c2.6.3 5 1.4 5 3v3c0 1.5-2.5 2.8-5.5 2.8-1.8 0-3.4-.5-4.4-1.2"/></>,
  wrench:      <><path d="M15.5 4a4.5 4.5 0 0 0-5.6 5.8l-6 6a1.8 1.8 0 0 0 2.5 2.5l6-6A4.5 4.5 0 0 0 20 8l-2.7 2.7-2.3-.7-.7-2.3Z"/></>,
  star:        <><path d="M12 3.5 14.5 9l5.5.5-4.2 3.7 1.3 5.4L12 15.8 6.9 18.6l1.3-5.4L4 9.5 9.5 9Z"/></>,
  bell:        <><path d="M6 9a6 6 0 0 1 12 0c0 5 1.5 6 1.5 6H4.5S6 14 6 9Z"/><path d="M10 19a2 2 0 0 0 4 0"/></>,
  lock:        <><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><circle cx="12" cy="15" r="1"/></>,
  eye:         <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/></>,
  info:        <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  trend:       <><path d="M3 16l5-5 4 3 6-7M16 7h4v4"/></>,
  search:      <><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></>,
  pin:         <><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></>,
  calendar:    <><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9.5h16M8 3v4M16 3v4"/></>,
  percent:     <><path d="M6 18 18 6"/><circle cx="7.5" cy="7.5" r="2"/><circle cx="16.5" cy="16.5" r="2"/></>,
  lounge:      <><path d="M4 12a3 3 0 0 1 6 0v4H4ZM10 16h10v-2a3 3 0 0 0-3-3h-2a2 2 0 0 0-2 2"/><path d="M4 16v3M20 16v3M7 9V6"/></>,
  flag:        <><path d="M6 21V4M6 4h11l-2 4 2 4H6"/></>,
  logout:      <><path d="M14 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M9 12h10M15 8l4 4-4 4"/></>,
  scale:       <><path d="M12 3v18M7 21h10"/><path d="M5 7h14M5 7l-2.5 6a3 3 0 0 0 5 0L5 7ZM19 7l-2.5 6a3 3 0 0 0 5 0L19 7Z"/><path d="M5 7l7-2 7 2"/></>,
  zap:         <><path d="M12 3 5 13h6l-1 8 7-10h-6Z"/></>,
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof ICON_PATHS

interface IconProps {
  name: IconName
  size?: number
  stroke?: number
  style?: CSSProperties
  className?: string
}

export default function Icon({ name, size = 22, stroke = 1.75, style, className }: IconProps) {
  const p = ICON_PATHS[name]
  if (!p) return null
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
         style={style} className={className} aria-hidden="true">
      {p}
    </svg>
  )
}
