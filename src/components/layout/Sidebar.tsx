import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Dashboard' },
  { path: '/notas', icon: 'receipt_long', label: 'Lista de Notas' },
  { path: '/importacao', icon: 'upload_file', label: 'Importação' },
  { path: '/emissao-avulsa', icon: 'add_circle', label: 'Emissão Avulsa' },
  { path: '/fechamento', icon: 'lock_clock', label: 'Fechamento Mensal' },
  { path: '/configuracoes', icon: 'settings', label: 'Configurações' },
]

const footerItems = [
  { path: '/ajuda', icon: 'help_outline', label: 'Central de Ajuda' },
  { path: '/documentacao', icon: 'menu_book', label: 'Documentação' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[260px] flex flex-col z-20 hidden lg:flex p-3"
      style={{ backgroundColor: '#dde6e1' }}
    >
      {/* Inner container — white rounded card wrapping everything */}
      <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">

        {/* Logo */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined filled" style={{ fontSize: 15, color: '#ffffff' }}>receipt</span>
            </div>
            <p className="text-[14px] font-bold text-on-surface tracking-tight">Exordium.</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-surface-container-lowest text-on-surface border border-primary'
                    : 'text-on-surface-variant hover:bg-white/60 hover:text-on-surface'
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 19,
                    fontVariationSettings: isActive
                      ? "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                      : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                    color: isActive ? '#006d47' : undefined,
                  }}
                >
                  {item.icon}
                </span>
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer links */}
        <div className="px-3 pb-3 space-y-0.5">
          {footerItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] transition-all ${
                  isActive
                    ? 'bg-surface-container-lowest text-on-surface border border-primary'
                    : 'text-on-surface-variant hover:bg-white/60 hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}>
                    {item.icon}
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="my-2 border-t border-outline-variant/20" />

          {/* User */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/60 cursor-pointer transition-all">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
              <span className="text-[12px] font-bold text-secondary">EX</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-semibold text-on-surface truncate leading-tight">Exordium Ltda.</p>
              <p className="text-[11px] text-on-surface-variant truncate leading-tight">admin@exordium.com</p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>expand_more</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
