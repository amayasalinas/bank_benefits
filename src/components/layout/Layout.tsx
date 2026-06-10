import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import { ToastProvider } from '../v2/Toast'

/**
 * Shell v2: columna .app (fullscreen móvil / centrada en desktop) con la
 * pantalla scrollable arriba y la nav fija abajo. El toast vive dentro del
 * shell (usa position:absolute relativa a .app).
 */
export default function Layout() {
  return (
    <div className="app">
      <ToastProvider>
        <Outlet />
        <BottomNav />
      </ToastProvider>
    </div>
  )
}
