import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { navigate, toggleMobileNav } from '../store/uiSlice.js'

const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Explore Events', page: 'explore' },
]

export default function Header() {
  const dispatch = useDispatch()
  const page = useSelector((s) => s.ui.page)
  const location = useLocation()
  const activePage = location.pathname === '/explore' ? 'explore' : page
  const mobileNavOpen = useSelector((s) => s.ui.mobileNavOpen)

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleExploreClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
      <div className="h-20 max-w-content mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between gap-6">
        <Link
          to="/"
          onClick={() => {
            dispatch(navigate({ page: 'home' }))
            handleHomeClick()
          }}
          className="flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-tertiary flex items-center justify-center font-display font-extrabold text-canvas text-sm">
            E
          </span>
          <span className="font-display font-bold text-xl tracking-tight gradient-text">Evently</span>
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-bright text-[10px] font-display font-bold border border-secondary/40 uppercase tracking-wider">
            Live
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.page}
              to={`/${link.page}`}
              onClick={() => {
                dispatch(navigate({ page: link.page }))
                if (link.page === 'home') handleHomeClick()
                if (link.page === 'explore') handleExploreClick()
              }}
              className={`px-4 py-2 rounded-xl font-display font-semibold text-sm transition-all ${
                activePage === link.page
                  ? 'text-text-primary bg-surface2'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface1'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(navigate({ page: 'explore' }))}
            aria-label="Search events"
            className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface2 transition-colors hidden sm:flex"
          >
            <SearchIcon />
          </button>
          <Link to="/signup" className="px-4 py-2 rounded-control bg-gradient-to-r from-primary to-secondary text-white font-display font-semibold text-sm shadow-cta hover:shadow-cta-hover transition-all hover:-translate-y-0.5">
            Sign Up
          </Link>
          <button
            onClick={() => dispatch(toggleMobileNav())}
            className="md:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface2"
            aria-label="Toggle menu "
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden border-t border-white/5 bg-canvas/95 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.page}
              to={`/${link.page}`}
              onClick={() => {
                dispatch(navigate({ page: link.page }))
                if (link.page === 'home') handleHomeClick()
                if (link.page === 'explore') handleExploreClick()
              }}
              className={`text-left px-3 py-2.5 rounded-xl font-display font-semibold text-sm ${
                activePage === link.page ? 'bg-surface2 text-text-primary' : 'text-text-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
