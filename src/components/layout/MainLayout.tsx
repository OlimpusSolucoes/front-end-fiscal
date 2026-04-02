import { Outlet, NavLink, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

const mobileNav = [
  { path: '/', icon: 'dashboard', label: 'Dashboard' },
  { path: '/notas', icon: 'receipt_long', label: 'Notas' },
  { path: '/importacao', icon: 'upload_file', label: 'Importar' },
  { path: '/fechamento', icon: 'lock_clock', label: 'Fechamento' },
  { path: '/configuracoes', icon: 'settings', label: 'Config' },
]

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#dde6e1' }}>
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 min-w-0 lg:ml-[260px] min-h-screen">
        <div className="w-full max-w-[1680px] px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-10 lg:py-8 lg:pb-10 xl:px-12 2xl:px-14">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center border-t border-outline-variant/20"
        style={{ backgroundColor: 'var(--color-surface-container-lowest, #fff)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {mobileNav.map((item) => {
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex-1 flex flex-col items-center gap-0.5 py-2"
            >
              <div className={`w-12 h-7 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-primary-container' : ''}`}>
                <span className="material-symbols-outlined"
                  style={{
                    fontSize: 20,
                    color: isActive ? '#006d47' : '#5a6062',
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24"
                  }}>
                  {item.icon}
                </span>
              </div>
              <span className={`text-[10px] font-medium leading-none ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                {item.label}
              </span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
