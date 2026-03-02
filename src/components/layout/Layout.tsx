import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiX } from 'react-icons/fi'
import Navbar from './Navbar'
import BottomNav from './BottomNav'
import { useGeolocation } from '../../hooks/useGeolocation'

export default function Layout() {
  const location = useLocation()
  const isAddCard = location.pathname.includes('/add-card')
  const { currentOffer, dismissOffer } = useGeolocation()

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Geolocation Push Notification */}
      <AnimatePresence>
        {currentOffer && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-20 left-4 right-4 z-50 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/20 shadow-glass"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                <FiMapPin className="text-orange-500 text-xl" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 leading-tight mb-1">
                  {currentOffer.title}
                </h4>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {currentOffer.description}
                </p>
              </div>
              <button
                onClick={dismissOffer}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400"
              >
                <FiX />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen pb-20">
        <Outlet />
      </main>
      {!isAddCard && <BottomNav />}
    </div>
  )
}
