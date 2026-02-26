import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

export default function Layout() {
  const location = useLocation()
  const isAddCard = location.pathname.includes('/add-card')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      {!isAddCard && <BottomNav />}
    </div>
  )
}
