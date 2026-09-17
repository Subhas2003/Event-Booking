import { useDispatch } from 'react-redux'
import { navigate } from '../store/uiSlice.js'

const COLUMNS = [
  {
    title: 'Explore',
    links: ['All Events', 'Concerts & Music', 'Tech Summits', 'Workshops'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Press', 'Privacy Policy'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'FAQs', 'Ticket Cancellation', 'Contact Support'],
  },
]

export default function Footer() {
  const dispatch = useDispatch()
  return (
    <footer className="w-full bg-surface1/60 border-t border-white/5 text-text-secondary">
      <div className="max-w-content mx-auto px-4 md:px-8 lg:px-16 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          <div className="lg:col-span-2 space-y-4">
            <button onClick={() => dispatch(navigate({ page: 'home' }))} className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-tertiary flex items-center justify-center font-display font-extrabold text-canvas text-sm">
                E
              </span>
              <span className="font-display font-bold text-xl gradient-text">Evently</span>
            </button>
            <p className="text-sm max-w-sm leading-relaxed">
              Discover experiences. Book memories. The premier curated arena for live concerts, esports arenas, and summits worldwide.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display font-semibold text-text-primary mb-3 text-sm">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <button
                      onClick={() => dispatch(navigate({ page: 'explore' }))}
                      className="hover:text-tertiary-bright transition-colors text-left"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2026 Evently Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span>Privacy</span>
            <span>Security</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
