import type { CSSProperties, ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

interface BtnProps {
  variant?: 'primary' | 'outline' | 'ghost'
  children: ReactNode
  icon?: IconName
  iconR?: IconName
  onClick?: () => void
  style?: CSSProperties
  block?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
}

export default function Btn({ variant = 'primary', children, icon, iconR, onClick, style, block, disabled, type = 'button' }: BtnProps) {
  return (
    <button type={type} className={`btn btn-${variant}${block ? ' btn-block' : ''}`} onClick={onClick} disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1, ...style }}>
      {icon && <Icon name={icon} size={18} />}
      {children}
      {iconR && <Icon name={iconR} size={18} />}
    </button>
  )
}
